const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

// Route GET simple pour tester l'envoi
router.get("/", async (req, res) => {
  try {
    await sendEmail({
      to: "m.hindawi.96@gmail.com",
      subject: "🎉 Test d'envoi - ArtisanConnect",
      html: "<h2>Bravo boss 😎</h2><p>Ton système d’envoi de mail fonctionne !</p>",
    });

    res.status(200).json({ msg: "Mail envoyé !" });
  } catch (err) {
    res.status(500).json({ msg: "Erreur lors de l'envoi du mail", err });
  }
});

module.exports = router;
