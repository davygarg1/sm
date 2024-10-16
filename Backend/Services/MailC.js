const nodemailer = require('nodemailer');

async function MailC(Mail) {

    try {
        // Create transport for Zoho SMTP
        const transporter = await nodemailer.createTransport({
            host: "smtppro.zoho.in",
            port: 465,
            secure: true,
            auth: {
                user: "consultation@samarpitam.com",  // Zoho SMTP credentials
                pass: "Jashan@1401",                  // Replace with actual password securely
            },
        });

        // Send the email
        const info = await transporter.sendMail({
            from: `${Mail.head} <${Mail.from}>`,  // Sender name and email
            to: Mail.to,                          // Receiver email
            cc: Mail.cc,
            subject: Mail.subject,                // Email subject
            text: Mail.text || "",                // Fallback to plain text if no HTML
            html: Mail.html,                      // HTML body content
            attachments: Mail.attachments || [],  // Attachments (if any)
        });

        // Return success response
        return { sent: true, info };

    } catch (error) {
        return { sent: false, error };
    }
}

module.exports = MailC;
