var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 1025,           
    host: "localhost",
});

module.exports = transporter