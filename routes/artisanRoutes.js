const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan'); // on importe le model
const bcrypt = require('bcrypt'); // pour hash le mot de passe

// -------- Créer un compte artisan --------
router.post('/register', async (req, res) => {
  try {
    const { nom, email, mot_de_passe, métier, téléphone, ville, description } = req.body;

    // on check si l'email existe déjà
    const exist = await Artisan.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email déjà utilisé" });

    // on hash le mdp avant de le stocker
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const newArtisan = new Artisan({
      nom,
      email,
      mot_de_passe: hashedPassword,
      métier,
      téléphone,
      ville,
      description,
      photos: [] // on met un tableau vide pour l’instant
    });

    await newArtisan.save(); // on l’enregistre
    res.status(201).json({ msg: "Compte créé", artisan: newArtisan });

  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Connexion artisan --------
router.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // on cherche si l’artisan existe
    const artisan = await Artisan.findOne({ email });
    if (!artisan) return res.status(404).json({ msg: "Artisan introuvable" });

    // on compare les mdp
    const isMatch = await bcrypt.compare(mot_de_passe, artisan.mot_de_passe);
    if (!isMatch) return res.status(401).json({ msg: "Mot de passe incorrect" });

    res.status(200).json({ msg: "Connexion ok", artisan });

  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Obtenir tous les artisans (ex : pour la recherche) --------
router.get('/', async (req, res) => {
  try {
    const artisans = await Artisan.find(); // on prend tout
    res.status(200).json(artisans);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Obtenir un artisan par son ID --------
router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ msg: "Artisan pas trouvé" });
    res.status(200).json(artisan);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

// -------- Modifier un artisan (mettre à jour profil) --------
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const artisan = await Artisan.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ msg: "Profil mis à jour", artisan });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", err });
  }
});

module.exports = router;
