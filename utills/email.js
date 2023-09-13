const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Automex technologies<noreply@mail.com>',
    //to: options.email,
    to: 'brianmujjuni@gmail.com',
    subject: options.subject,
    text: options.message,
    //html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
