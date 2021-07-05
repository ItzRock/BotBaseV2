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

    const filterGuildSetting = async (settingData) => {
        if (!settingData || !settingData.name) return settingData;

        for (let [settingPropertyKey, settingPropertyValue] of Object.entries(settingData)) {                   
            const defaultSettingPropertyValue = defaults[settingData.name][settingPropertyKey]

            if (!defaultSettingPropertyValue || defaultSettingPropertyValue === null) continue;
            else if (settingPropertyConfiguration.overrideBlacklist.includes(settingPropertyKey.toString())) continue;

            if (!settingPropertyKey) continue;
            else if (!settingPropertyValue || settingPropertyValue !== defaultSettingPropertyValue) {
                settingData[settingPropertyKey] = defaultSettingPropertyValue
            }
        };

        return settingData;
    };

    const filterGuildData = async (guildData) => {
        if (!guildData) return guildData;
        else if (!guildData.Settings) guildData.Settings = {};

        for (let [defaultSettingKey, defaultSettingValue] of Object.entries(defaults)) {
            if (!defaultSettingKey || !defaultSettingValue) continue;
            else if(!defaultSettingValue.name || !defaultSettingValue.value) continue;
            else if(defaultSettingKey !== (defaultSettingValue.name).toString()) continue;

            const defaultSettingName = (defaultSettingValue.name).toString();
            if (!guildData.Settings[defaultSettingName]) {
                guildData.Settings[defaultSettingName] = defaultSettingValue;
            } else {
                const guildSetting = guildData.Settings[defaultSettingName]
                guildData.Settings[defaultSettingName] = await filterGuildSetting(guildSetting)
            };
        };

        let pendingSettingDeletion = [];
        for (let [guildSettingKey, guildSettingValue] of Object.entries(guildData.Settings)) {
            if (!guildSettingKey || !guildSettingValue) continue;
            else if(!guildSettingValue.name || !guildSettingValue.value) continue;
            else if(guildSettingKey !== (guildSettingValue.name).toString()) continue;
            
            const guildSettingName = (guildSettingValue.name).toString();
            if (!defaults[guildSettingName]) pendingSettingDeletion.push(guildSettingName);
        };

        pendingSettingDeletion.forEach(keyNameString => {
            delete guildData.Settings[keyNameString]
        })

        return guildData
    }
    client.settings = {
        create: async (guild) => {
            const data = await client.database.write({GuildID: guild, Settings: defaults}, collections.ServerSettings)
            return data
        },
        fetch: async (guild) => {
            const data = await client.database.read({GuildID: guild}, collections.ServerSettings)
            if (!data || data.length <= 0) {
                const creationData = await client.settings.create(guild)
                return creationData
            } else {
                const newData = await filterGuildData(data[0])
                if (data[0] !== newData) {
                    const dataUpdateResult = await client.database.update({GuildID: guild}, {$set: {Settings: newData.Settings}}, collections.ServerSettings)
                };
                
                return newData
            }
        },
        update: async (guild, settingKey, settingValue) => {
            return "Not finished";
            /*
            const data = await client.database.read({GuildID: guild}, collections.ServerSettings)
            if (!data || data.length <= 0) {
                throw new Error("Failed setting update (Guild does not have valid settings :: Guild: " + guild.toString());
            } else {
                const settingData = data[0].Settings[settingKey]
                if (!settingData || settingData === null) {
                    throw new Error("Failed setting update (Got undefined or null return for key: " + settingKey.toString());
                }
                
                const newSettingData = filterGuildSetting(settingData)
                if (settingData !== newSettingData) {

                }

                if (newSettingData.valueType && typeof(settingValue) !== newSettingData.valueType)                
            }
            */
        }
    }

}