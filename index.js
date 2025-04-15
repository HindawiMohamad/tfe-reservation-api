const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const artisanRoutes = require('./routes/artisanRoutes');
app.use('/api/artisans', artisanRoutes); // les routes commenceront par /api/artisans

const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);

const avisRoutes = require('./routes/avisRoutes');
app.use('/api/avis', avisRoutes);

const disponibiliteRoutes = require('./routes/disponibiliteRoutes');
app.use('/api/disponibilites', disponibiliteRoutes);

const uploadPhotoRoute = require('./routes/uploadPhotoRoute');
app.use('/api/artisans', uploadPhotoRoute);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const testMailRoute = require("./routes/testMailRoute");
app.use("/api/test-mail", testMailRoute);




// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err));

// Route test
app.get('/', (req, res) => {
  res.send('API TFE en ligne 🚀');
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
