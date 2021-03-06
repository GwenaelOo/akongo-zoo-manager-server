const urlMongo = require('../../config/config');

const express = require('express');
const router = express.Router();

// Connexion à la base de donnée

// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose');
// Ces options sont recommandées par mLab pour une connexion à la base
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

// Nous connectons l'API à notre base de données
mongoose.connect(urlMongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});

// Création du modèle pour une espèce

var specieSchema = mongoose.Schema({
    SpecieName: String,
    SpecieLatinName: String,
    SpecieEnglishName: String,

    SpecieClass: String,
    SpecieOrder: String,
    SpecieFamilly: String,

    SpecieProfilePicture: String,
    SpeciePict1: String,
    newSpeciePict2: String,

    SpecieGestation: String,
    SpecieWeight: String,
    SpecieLifeExpectancy: String,

    SpecieOrigin: String,
    SpecieDiet: String,
    SpecieOrigin: String,
}); 


// Debut des routes

// Route GET 

router.get('/:zooId', (req, res, next) => {

    let collection = 'species-' + req.params.zooId;
    let Specie = mongoose.model('Specie', specieSchema, collection);
    let specie = new Specie();  

    Specie.find(function (err, SpeciesList) {
        if (err) {
            res.send(err);
        }
        res.json(SpeciesList);
        console.log("[GET] Récupération de l'ensemble de la collection du ZOO " + req.params.zooId)  
    });
});


// Route POST Permettant de poster une nouvelle espèce

router.post('/:zooId', (req, res, next) => {

    let collection = 'species-' + req.params.zooId ;
    let Specie = mongoose.model('Specie', specieSchema, collection);
    let specie = new Specie();  
    
    specie.SpecieName = req.body.newSpecie.SpecieName;
    specie.SpecieLatinName = req.body.newSpecie.SpecieLatinName;
    specie.SpecieEnglishName = req.body.newSpecie.SpecieEnglishName;

    specie.SpecieClass = req.body.newSpecie.SpecieClass;
    specie.SpecieOrder = req.body.newSpecie.SpecieOrder;
    specie.SpecieFamilly = req.body.newSpecie.SpecieFamilly;

    specie.SpecieProfilePicture = req.body.newSpecie.SpecieProfilePicture;
    specie.SpeciePict1 = req.body.newSpecie.SpeciePict1;
    specie.SpeciePict2 = req.body.newSpecie.newSpeciePict2;

    specie.SpecieGestation = req.body.newSpecie.SpecieGestation;
    specie.SpecieWeight = req.body.newSpecie.SpecieWeight;
    specie.SpecieLifeExpectancy = req.body.newSpecie.SpecieLifeExpectancy;

    specie.SpecieOrigin = req.body.newSpecie.SpecieOrigin;
    specie.SpecieDiet = req.body.newSpecie.SpecieDiet;
    specie.SpecieOrigin = req.body.newSpecie.SpecieOrigin;

        
    specie.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Bravo, la piscine est maintenant stockée en base de données' });
        console.log("[POST] Ajout de l'espèce " + req.body.newSpecie.SpecieName + " à la collection d'espèces du ZOO " + req.params.zooId)
    })
});

module.exports = router;