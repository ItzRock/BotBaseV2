module.exports = (client) => {
    const https = require("https")
    client.https = {
        get: (url) => {
            const data = new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    res.on('data', async (raw) => { // do function when get data
                        try {
                            const output = JSON.parse(raw);
                            resolve(output)
                        } catch (error) {
                            reject(error)
                        }
                    })
                }).on('error', (e) => {
                    reject(e)
                });
            })
            return data.then(output => {
                return output;
            })
        },
        post: (data, options) => {
            const promise = new Promise((resolve, reject) => {
                const req = https.request(options, res => {
                    res.on('data', d => {
                        const output = JSON.parse(d);
                        resolve(output)
                    })
                })
                req.on('error', error => {
                    reject(error)
                })
                req.write(data)
                req.end()
            })
            return promise.then(output => {
                return output;
            })
        }
    }
}