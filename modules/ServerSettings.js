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
            const creationData = new Promise(async (resolve, reject) => {
                try {
                    const data = await client.database.write({GuildID: guild, Settings: defaults}, collections.ServerSettings)
                    if (!data || data === null) return reject("No data returned upon creation");
                    else return resolve(data);
                } catch (error) {
                    return reject(error);
                };
            })

            return creationData
        },
        fetch: async (guild) => {
            const fetchedData = new Promise(async (resolve, reject) => {
                try {
                    const data = await client.database.read({GuildID: guild}, collections.ServerSettings);
                    if (!data || data.length <= 0) {
                        const creationData = await client.settings.create(guild);
                        return resolve(creationData);
                    } else {
                        const newData = await filterGuildData(data[0]);
                        if (!newData || newData === null) return reject("No data returned from filterGuildData");
                        else if (data[0] !== newData) {
                            const dataUpdateResult = await client.database.update({GuildID: guild}, {Settings: newData.Settings}, collections.ServerSettings);
                        };
                        
                        return resolve(newData);
                    };
                } catch (error) {
                    return reject(error);
                };
            });

            return fetchedData
        },
        update: async (guild, setting, value) => {
            const results = new Promise(async (resolve, reject) => {
                try {
                    let data = await client.settings.fetch(guild);
                    data = data.Settings;
                    if(data[setting].valueType == "array" && typeof(value) !== "object") return reject("Unsupported, Use: add and negate");
                    if(typeof(value) == "string") value = value.toLowerCase()
                    if(typeof(value) !== "object" && data[setting].valueType == "boolean") value = value == "true" ||  value == "on" || value == "enable"  ? true : value == "false" || value == "disable" || value == "off" ? false : value;
                    data[setting].value = value
                    resolve(await client.database.update({GuildID: guild}, {Settings: data}, collections.ServerSettings))
                } catch (error) {
                    return reject(error);
                }
            })
            return results;
        }
    }

}