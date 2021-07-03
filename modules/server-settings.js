module.exports = async (client) => {
    const defaults = client.config.defaults;
    const collections = client.config.Database.collections
    const interval = setInterval(()=>{
        if(client.database !== undefined) {
            clearInterval(interval)
        }
    }, 100)

    const settingPropertyConfiguration = {
        overrideBlacklist: [
            "value",
        ],
    };
    const filterGuildData = async (guildData) => {
        /*
            Documentation (provided by anthony)

            ßħœŧĸĳ¶Ĳ®¥Ĳ®¥ŊĦÐŊŁŒ®Œ¥€⅜Ŧ¥↑ĲĿ
        */
        
        for (let [defaultSettingKey, defaultSettingValue] of Object.entries(defaults)) {
            if (!defaultSettingKey || !defaultSettingValue) continue;
            else if(!defaultSettingValue.name || !defaultSettingValue.value) continue;
            else if(defaultSettingKey !== (defaultSettingValue.name).toString()) continue;

            const defaultSettingName = (defaultSettingValue.name).toString();
            if (!guildData[defaultSettingName]) {
                guildData[defaultSettingName] = defaultSettingValue;
            } else {
                for (let [settingPropertyKey, settingPropertyValue] of Object.entries(guildData[defaultSettingName])) {                   
                    const defaultSettingPropertyValue = defaultSettingValue[settingPropertyKey]

                    if (settingPropertyConfiguration.overrideBlacklist.includes(settingPropertyKey.toString())) continue;

                    if (!settingPropertyKey) continue;
                    else if (!settingPropertyValue || settingPropertyValue !== defaultSettingPropertyValue) {
                        guildData[defaultSettingName][settingPropertyKey] = defaultSettingPropertyValue
                    }
                };
            };
        };

        let pendingSettingDeletion = [];
        for (let [guildSettingKey, guildSettingValue] of Object.entries(guildData)) {
            if (!guildSettingKey || !guildSettingValue) continue;
            else if(!guildSettingValue.name || !guildSettingValue.value) continue;
            else if(guildSettingKey !== (guildSettingValue.name).toString()) continue;
            
            const guildSettingName = (guildSettingValue.name).toString();
            if (!defaults[guildSettingName]) pendingSettingDeletion.push(guildSettingName);
        };

        pendingSettingDeletion.forEach(keyNameString => {
            delete guildData[keyNameString]
        })

        return guildData
    }
    client.settings = {
        read: async (guild) => {
            const data = await client.database.read({GuildID: guild}, collections.ServerSettings)
            const newData = filterGuildData(data[0])
            if(data.length == 0) {
                const creationData = await client.settings.create(guild)
                return creationData
            } else {
                if (data[0] !== newData) {
                    const dataUpdateResult = await client.data.update({GuildID: guild}, {Settings: newData.Settings}, collections.ServerSettings)
                };
                
                return newData
            }
        },
        create: async (guild) => {
            const data = await client.database.write({GuildID: guild, Settings: defaults}, collections.ServerSettings)
            return data
        }
    }

}