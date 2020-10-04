const Dates = require('./dto/dates.js');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://develop.pub.afflu.net');
    await page.waitForSelector('.login-form');
    await page.evaluate(() => {
        let form = document.querySelector('.login-form');
        let username = form.querySelector('input[name="username"]');
        let password = form.querySelector('input[name="password"]');
        let button = form.querySelector('button[type="submit"]');
        username.value = 'developertest@affluent.io';
        password.value = 'SOpcR^37';
        button.click();
    });
    await page.waitForSelector('a[href="list?type=dates"]');
    await page.goto('https://develop.pub.afflu.net/list?type=dates&startDate=2019-04-01&endDate=2019-04-30');
    await page.waitForSelector('div.dataTables_info');
    await page.evaluate(() => {
        let table = document.querySelector('div[data-name="dates"]');
        table.querySelector('a[href="#setupColumns2"]').click();
        let setup = document.querySelector('#setupColumns2');
        setup.querySelectorAll('div.right-list ol.dd-list>li>button').forEach((b) => b.click());
        setup.querySelector('button[onclick="TABLES.saveColumns2()"]').click();
    });
    await page.waitForFunction('document.querySelector(\'div.table-container table[data-url="dates"]>tbody>tr\') && (document.querySelector(\'div.table-container table[data-url="dates"]>tbody>tr\').children.length == 29)');
    while (true) {
        const result = await page.evaluate(() => {
            let table = document.querySelector('div.table-container');
            let info = (document.head.affluent_info = table.querySelector('div.dataTables_info').innerText).split(' ');
            let columns = table.querySelectorAll('table[data-url="dates"]>thead>tr.heading>th');
            let data = [];
            table.querySelectorAll('table[data-url="dates"]>tbody>tr').forEach((line) => {
                let obj = {};
                columns.forEach((column, idx) => {
                    if (line.children[idx] == undefined) {
                        console.log('idx: ' + idx);
                        console.log(line);
                    } else {
                        if (idx == 0) {
                            obj[column.getAttribute('data-data')] = line.children[idx].children[0].innerText;
                        } else {
                            obj[column.getAttribute('data-data')] = line.children[idx].innerText;
                        }
                    }
                });
                console.log(obj);
                data.push(obj);
            });
            if (info[3] !== info[5]) {
                table.querySelector('a[title="Next"]').click();
            }
            console.log(document.head.affluent_info);
            console.log(info);
            return {
                'next': info[3] === info[5],
                data,
            }
        });
        result.data.forEach((line) => Dates.upsert(line));
        if (result.next) {
            break;
        }
        await page.waitFor(() => {
            if (document.head.affluent_info) {
                let info = document.querySelector('div.table-container div.dataTables_info').innerText;
                if (document.head.affluent_info === info) {
                    return true;
                }
            } 
            document.head.affluent_info = document.querySelector('div.table-container div.dataTables_info').innerText;
            return false;
        });
    } 
    await browser.close();
})();

