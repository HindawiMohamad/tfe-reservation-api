const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "m.hindawi.96@gmail.com",
        pass: "xgwh vsth atgz yrhd", // le mot de passe d'application de Google
      },
    });

    const mailOptions = {
      from: '"ArtisanConnect" <m.hindawi.96@gmail.com>',
      to,
      subject,
      html,
    };
    
    await transporter.sendMail(mailOptions);
    console.log("📧 Mail envoyé à", to);
  } catch (err) {
    console.error("❌ Erreur envoi mail :", err);
  }
};

module.exports = sendEmail;
