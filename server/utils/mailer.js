const nodeMailer = require('nodemailer');
const mailConfig = require('../config/mail.config');
const dotenv = require('dotenv');
dotenv.config();

module.exports.sendMail = async (to, subject, htmlContent) => {
    console.log('sendMail', to, subject, htmlContent);
    try {
        const transport = nodeMailer.createTransport({
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false,
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD
            },
        });

        const options = {
            from: mailConfig.FROM_ADDRESS,
            to: to,
            subject: subject,
            html: htmlContent
        };
        
        await transport.sendMail(options);
        console.log('Email sent successfully to ' + to);
    }
    catch (error){
        console.log('There is an error. Email not sent');
        console.log(error);
    }
}
