const mongoose = require('mongoose');

// ici on gere les avis laissé apres les rdv
const AvisSchema = new mongoose.Schema({
  note: { type: Number, required: true },
  commentaire: { type: String }, 
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  artisan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan' },
}, { timestamps: true });

module.exports = mongoose.model('Avis', AvisSchema); 
