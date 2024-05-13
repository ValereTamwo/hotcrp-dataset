// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Mot } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve les fichiers statiques (comme les fichiers HTML) depuis le dossier public

// Route pour servir la page HTML contenant le formulaire
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/formulaire.html');
});

app.get('/data', async (req, res) => { 
  try {
    // Récupérez toutes les données de la base de données
    const donnees = await Mot.findAll();
    return res.json(donnees);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
  }
});

// Route pour gérer la soumission du formulaire
app.post('/donnees', async (req, res) => {
  const { langue, mots, contexte_positif, contexte_negatif } = req.body;

  // Vérifiez que tous les champs sont fournis
  if (!langue || !mots || !contexte_positif || !contexte_negatif) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
  }

  try {
    // Enregistrez les données dans la base de données
    await Mot.create({
      langue,
      mots,
      contexte_positif,
      contexte_negatif
    });
    return res.status(201).json({ message: 'Données enregistrées avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données:', error);
    return res.status(500).json({ message: 'Erreur lors de l\'enregistrement des données.' });
  }
});

// Démarrez le serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
});
