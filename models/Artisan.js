const mongoose = require('mongoose');

// ici on prepare le schema pour les artisans genre plombier, electricien etc
const ArtisanSchema = new mongoose.Schema({
  nom: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  mot_de_passe: { type: String, required: true }, 
  métier: { type: String, required: true },
  téléphone: { type: String }, 
  ville: { type: String }, 
  description: { type: String }, 
  photos: [String], 
}, { timestamps: true }); // ça ajoute createdAt et updatedAt tout seul

module.exports = mongoose.model('Artisan', ArtisanSchema); // on exporte pour l’utiliser ailleurs
