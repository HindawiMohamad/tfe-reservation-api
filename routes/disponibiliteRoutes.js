const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');
const Reservation = require('../models/Reservation');
const moment = require('moment'); // pour gérer les heures facilement

// Route pour récupérer les créneaux dispo d'un artisan à une date donnée
router.get('/:id/disponibilites-libres', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query; // format attendu : YYYY-MM-DD

  if (!date) {
    return res.status(400).json({ msg: 'Date requise en query param (format YYYY-MM-DD)' });
  }

  try {
    const artisan = await Artisan.findById(id);
    if (!artisan) return res.status(404).json({ msg: 'Artisan introuvable' });

    const jourMoment = moment(date).locale('fr'); // force le français
    const jourSemaine = jourMoment.format('dddd').toLowerCase(); // genre "vendredi"
    

    // chercher dans les dispo de l'artisan le jour concerné
    const dispoJour = artisan.disponibilites.find(d => d.jour.toLowerCase() === jourSemaine);

    if (!dispoJour) return res.status(200).json({ creneaux: [] }); // pas dispo ce jour-là

    // on découpe la plage horaire en créneaux de 1h
    const creneaux = [];
    let heure = moment(`${date}T${dispoJour.heureDebut}`);
    const fin = moment(`${date}T${dispoJour.heureFin}`);

    while (heure < fin) {
      creneaux.push(heure.format('HH:mm'));
      heure.add(1, 'hour');
    }

    // on récupère les réservations déjà prises ce jour-là
    const reservations = await Reservation.find({
      artisan_id: id,
      date_rdv: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`)
      }
    });

    const heuresReservees = reservations.map(r => moment(r.date_rdv).format('HH:mm'));

    // on filtre les créneaux dispo
    const creneauxLibres = creneaux.filter(h => !heuresReservees.includes(h));

    res.status(200).json({ creneaux: creneauxLibres });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur', err });
  }
});

module.exports = router;