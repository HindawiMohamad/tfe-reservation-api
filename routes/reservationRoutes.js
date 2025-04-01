const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// -------- Créer une réservation --------
router.post('/', async (req, res) => {
  try {
    const { nom_client, email_client, message, date_rdv, artisan_id } = req.body;

    // ptite vérif basique
    if (!nom_client || !email_client || !date_rdv || !artisan_id) {
      return res.status(400).json({ msg: "Donnée manquante" });
    }

    // on crée une nouvelle réservation
    const newResa = new Reservation({
      nom_client,
      email_client,
      message,
      date_rdv,
      artisan_id
    });

    await newResa.save(); // on l’enregistre en base

    res.status(201).json({ msg: "Réservation envoyée ✅", reservation: newResa });

  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Voir toutes les réservations --------
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('artisan_id', 'nom métier ville'); // on ajoute quelques infos de l’artisan
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

module.exports = router;
