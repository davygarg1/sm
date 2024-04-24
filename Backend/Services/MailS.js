const nodemailer = require('nodemailer');

async function MailS(Mail) {

    try {

        const transporter = await nodemailer.createTransport({
            host: "smtppro.zoho.in",
            port: 465,
            secure: true,
            auth: {
                user: "support@samarpitam.com",
                pass: "Jashan@1401",
            },
        });

        const info = await transporter.sendMail({
            from: `${Mail.head} <${Mail.from}>`,
            to: Mail.to,
            subject: Mail.subject,
            text: Mail.text,
            html: Mail.html,
        });

        return ({ sent: true, info });

    } catch (error) {
        console.log(error);
        return ({ sent: false, error });

    }
}

module.exports = MailS