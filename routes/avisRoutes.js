const express = require('express');
const router = express.Router();
const Avis = require('../models/Avis');
const Reservation = require("../models/Reservation");


// -------- Créer un avis --------
router.post('/', async (req, res) => {
  try {
    const { note, commentaire, reservation_id, artisan_id } = req.body;

    // on check vite fait si tout est là
    if (!note || !reservation_id) {
      return res.status(400).json({ msg: "Il manque des infos pr laisser un avis" });
    }
    

    const nouvelAvis = new Avis({
      note,
      commentaire,
      reservation_id,
      artisan_id
    });

    await nouvelAvis.save(); // on l’enregistre
    res.status(201).json({ msg: "Merci pour l'avis ⭐", avis: nouvelAvis });

  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Voir tous les avis d’un artisan --------
router.get('/artisan/:id', async (req, res) => {
  try {
    const avis = await Avis.find({ artisan_id: req.params.id });
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Calculer la note moyenne d’un artisan --------
router.get('/artisan/:id/moyenne', async (req, res) => {
  try {
    const avis = await Avis.find({ artisan_id: req.params.id });

    if (avis.length === 0) return res.status(200).json({ moyenne: 0 });

    const total = avis.reduce((acc, a) => acc + a.note, 0); // on additione tout
    const moyenne = total / avis.length; // on divise par le nb d'avis

    res.status(200).json({ moyenne: moyenne.toFixed(1) }); // genre 4.5

  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Vérifie s’il existe déjà un avis pour une réservation --------
router.get('/reservation/:id', async (req, res) => {
  try {
    const avis = await Avis.findOne({ reservation_id: req.params.id });
    if (!avis) return res.status(404).json({ msg: "Aucun avis" });

    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});


module.exports = router;
