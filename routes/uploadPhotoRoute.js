const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Artisan = require('../models/Artisan');

// dossier de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// route POST pour upload une photo
router.post('/:id/photos', upload.single('photo'), async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ msg: 'Artisan introuvable' });

    const photoPath = `/uploads/${req.file.filename}`;
    artisan.photos.push(photoPath);
    await artisan.save();

    res.status(200).json({ msg: 'Photo uploadée', photo: photoPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
