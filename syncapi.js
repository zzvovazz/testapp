const https = require('https');
const User = require('./dto/user.js');

(async function sync(url) {
    await https.get(url, async (res) => {
        let body = '';
        if (res.statusCode == 200) {
            res.on('data', (data) => body += data);
            res.on('end', async () => {
                try {
                    let data = JSON.parse(body);
                    if (Array.isArray(data.data))
                        data.data.forEach((user) => User.upsert(user));
                    for (let i = 2; i <= data.total_pages && data.page == 1; i++)
                        await sync(url + '?page=' + i);
                } catch (ex) {
                    console.error(ex);
                }
            });
        }
    }).on('error', (e) => {
        console.error(e);
    });
})('https://reqres.in/api/users');

