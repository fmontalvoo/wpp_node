const fs = require('fs');

const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = `${__dirname}/../session.json`;

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    console.log('[*] Loading session from file.');
    sessionCfg = require(SESSION_FILE_PATH);
}


global.client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--unhandled-rejections=strict'
        ]
    },
    session: sessionCfg
});


client.on('qr', (qr) => {
    console.log(qr);
    fs.writeFileSync('./last.qr', qr);
});

client.on('authenticated', (session) => {
    console.log("AUTH!");
    sessionCfg = session;

    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
        authed = true;
    });

    try {
        fs.unlinkSync('./last.qr')
    } catch (err) { }
});

client.on('auth_failure', () => {
    console.log("AUTH Failed!")
    sessionCfg = ""
    process.exit()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();