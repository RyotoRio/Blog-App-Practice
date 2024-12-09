const nodemail = require("nodemailer");
const { emailPassword, senderEmail } = require("../config/keys");

const sendEmail = async ({
    emailTo,
    subject,
    code,
    content
}) => {
    const transporter = nodemail.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: senderEmail,
            pass: emailPassword
        }
    });

    const message = {
        to: emailTo,
        subject,
        html: `<div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px; background-color: #f9f9f9; max-width: 500px; margin: 20px auto; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    <h3 style="font-family: Arial, sans-serif; color: #333; font-size: 24px; text-align: center; margin-bottom: 15px;">
        Use this code to ${content}
    </h3>
    <p style="font-family: Arial, sans-serif; color: #555; font-size: 18px; text-align: center;">
        <strong style="color: #333;">Code:</strong> ${code}
    </p>
</div>
`,

    };

    await transporter.sendMail(message)
}

module.exports = sendEmail;