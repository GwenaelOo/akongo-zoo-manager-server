const express = require('express');
const router = express.Router();

router.get('/:specieId', (req, res, next) => {
    console.log("Nouvelle requette GET")
    res.status(200).json({
        message: "Récupération (GET) des infos espèces",
        specieId: req.params.specieId
    });
});

router.post('/:specieId', (req, res, next) => {
        console.log("[POST] Ajout de l'espèce " + req.body.newSpecie.SpecieName)
    res.status(200).json({
        message: "Récupération (POST) des infos espèces",
        specieId: req.params.specieId,
        name: req.params.name
    });
});

module.exports = router;