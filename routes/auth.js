const fs = require('fs');

const { Router } = require('express');

const router = Router();

router.get('/check', async (req, res) => {
    client.getState().then((data) => {
        res.send(data);
    }).catch((err) => {
        if (err) {
            res.send("DISCONNECTED");
            try {
                fs.unlinkSync(`${__dirname}/../session.json`);
            } catch (err) {
                console.error('No existe sesion');
            }
        }
    })
});


router.get('/qr', (req, res) => {
    const qrjs = fs.readFileSync(`${__dirname}/../lib/qrcode.js`);

    fs.readFile(`${__dirname}/../last.qr`, (err, last_qr) => {
        fs.readFile(`${__dirname}/../session.json`, (serr, sessiondata) => {
            if (err && sessiondata) {
                res.write("<html><body><h2>Already Authenticated</h2></body></html>");
                res.end();
            } else if (!err && serr) {
                const page = `
                    <html>
                        <body>
                            <script>${qrjs}</script>
                            <div id="qrcode"></div>
                            <script type="text/javascript">
                                new QRCode(document.getElementById("qrcode"), "${last_qr}");
                            </script>
                        </body>
                    </html>
                `
                res.write(page);
                res.end();
            }
        })
    });
});

module.exports = router;