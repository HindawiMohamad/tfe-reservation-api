const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const sendEmail = require("../utils/sendEmail"); // N'oublie pas cette ligne tout en haut

// -------- Créer une réservation --------
router.post('/', async (req, res) => {
  try {
    const { nom_client, email_client, telephone_client, message, date_rdv, artisan_id } = req.body;

    // ptite vérif basique
    if (!nom_client || !email_client || !telephone_client || !date_rdv || !artisan_id) {
      return res.status(400).json({ msg: "Donnée manquante" });
    }

    // on crée une nouvelle réservation
    const newResa = new Reservation({
      nom_client,
      email_client,
      telephone_client,
      message,
      date_rdv,
      artisan_id
    });

    await newResa.save(); // on l’enregistre en base
    console.log("✅ Réservation enregistrée :", newResa.email_client);

    // Envoi du mail d'avis simulé 20 secondes après la réservation
    setTimeout(async () => {
      console.log("⌛ Déclenchement du setTimeout pour l'avis...");

      try {
        const lienAvis = `http://localhost:5173/avis/${newResa._id}`;
        console.log("📩 Lien généré :", lienAvis);

        await sendEmail({
          to: newResa.email_client,
          subject: "📝 Laissez un avis sur votre artisan",
          html: `
            <h2>Merci pour votre réservation !</h2>
            <p>Vous pouvez maintenant évaluer votre expérience avec <strong>votre artisan</strong>.</p>
            <p><a href="${lienAvis}" style="color: blue;">Cliquez ici pour laisser votre avis</a></p>
            <p>Merci pour votre confiance,</p>
            <strong>L'équipe ArtisanConnect</strong>
          `,
        });

        console.log("📧 Email de demande d'avis envoyé à :", newResa.email_client);
      } catch (err) {
        console.error("❌ Erreur mail :", err.message);
      }
    }, 20000); // 20 sec pour test

    res.status(201).json({ msg: "Réservation envoyée ✅", reservation: newResa });

  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Voir toutes les réservations --------
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('artisan_id', 'nom métier ville');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Voir les réservations d’un artisan spécifique --------
router.get('/artisan/:id', async (req, res) => {
  try {
    const reservations = await Reservation.find({ artisan_id: req.params.id });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Voir une réservation spécifique --------
router.get('/:id', async (req, res) => {
  try {
    const resa = await Reservation.findById(req.params.id);
    if (!resa) return res.status(404).json({ msg: "Réservation introuvable" });

    res.status(200).json(resa);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Voir les réservations d’un artisan à une date précise --------
router.get('/artisan/:id/date/:date', async (req, res) => {
  try {
    const { id, date } = req.params;

    // Créer une plage de date entre début et fin de la journée
    const debut = new Date(`${date}T00:00:00.000Z`);
    const fin = new Date(`${date}T23:59:59.999Z`);

    const reservations = await Reservation.find({
      artisan_id: id,
      date_rdv: { $gte: debut, $lte: fin }
    });

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Erreur filtre réservations :", err);
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});


// -------- Supprimer une réservation --------
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Réservation introuvable" });

    res.status(200).json({ msg: "Réservation supprimée ✅" });
  } catch (err) {
    console.error("Erreur suppression réservation :", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});


module.exports = router;
