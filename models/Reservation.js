const mongoose = require('mongoose');

// ici on prepare le schema pr les reservation des clients
const ReservationSchema = new mongoose.Schema({
  nom_client: { type: String, required: true },
  email_client: { type: String, required: true }, 
  telephone_client: { type: String },
  message: { type: String },
  date_rdv: { type: Date, required: true }, 
  artisan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true }, 
}, { timestamps: true }); // createdAt, updatedAt

module.exports = mongoose.model('Reservation', ReservationSchema); // on exporte
