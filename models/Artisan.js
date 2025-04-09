const mongoose = require('mongoose');

// ici on prepare le schema pour les artisans
const ArtisanSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  métier: { type: String, required: true },
  téléphone: { type: String },
  ville: { type: String },
  description: { type: String },
  photos: [String],

  // on ajoute les dispo de l’artisan ici
  disponibilites: [
    {
      jour: String, 
      heureDebut: String, 
      heureFin: String    
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Artisan', ArtisanSchema);
