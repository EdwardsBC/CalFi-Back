const nodemailer = require('nodemailer');
const transporter = require('../config/emailConfig');

exports.sendVerificationEmail = async (correo, codigo) => {
  await transporter.sendMail({
    from: `"Cale-Fin" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: 'Código de confirmación',
    text: `Tu código de verificación es: ${codigo}`
  });
};
