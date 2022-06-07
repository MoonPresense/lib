require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "spongkiran@gmail.com",
        pass: "YF860hyn"
    }
})

exports.activationMail = async (to, link) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Aктивация на аккаунте на ' + process.env.API_URL,
        text: '',
        html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
    })
}
