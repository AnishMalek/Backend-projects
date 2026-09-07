const nodemailer = require("nodemailer");

function getTransporter() {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
}

async function sendOTP(email, otp) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: email,
    subject: "Admin Panel Password Reset OTP",
    text: `Your password reset OTP is ${otp}. It expires in 5 minutes.`
  });
}

module.exports = { sendOTP };