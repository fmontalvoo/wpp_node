const { Router } = require('express');

const router = Router();

router.post('/msg/:phone', async (req, res) => {
    let phone = req.params.phone;
    let message = req.body.message;

    console.log(phone, message);
    console.log(`[*] Sending message to ${phone}`);


    if (phone == undefined || message == undefined) {
        res.send({ status: "error", message: "please enter valid phone and message" })
    } else {
        client.sendMessage(phone + '@c.us', message).then((response) => {
            if (response.id.fromMe) {
                res.send({ status: 'success', message: `Message successfully sent to ${phone}` })
            }
        });
    }
});

module.exports = router;