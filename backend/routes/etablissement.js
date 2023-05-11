const router = require("express").Router();
const { required } = require("@hapi/joi");
const Etablissement = require("../model/Etablissement");
const { EtablissementValidation } = require("./validation");
const { updateEtablissementValidation } = require("./validation");
const { send } = require("express/lib/response");
const User = require("../model/User");
const Solde = require("../model/Solde");
const Departement = require("../model/Departement");

/**
 * @description : " get all etablissements "
 * @method :"get"
 * @path : "localhost:5000/api/Etablissement/getetablissements"
 * @data : no
 *
 */
router.get("/getetablissements", async (req, res) => {
  try {
    const etablissements = await Etablissement.find();
    return res.status(200).send(etablissements);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * @description : " get one Etablissement "
 * @method :"get"
 * @path : "localhost:5000/api/Etablissement/"
 * @data : no
 */
router.get("/getone/:nom", async (req, res) => {
  const { nom } = req.params;
  try {
    const etablissement = await Etablissement.findOne({ nom });
    res.send(etablissement);
  } catch (error) {
    return res.status(400).send("leave not find");
  }
});

/**
 * @description : "update Etablissement "
 * @method :"put"
 * @path : "localhost:5000/api/Etablissement/"
 * @data : body
 */

router.put("/update", async (req, res) => {
  console.log("body", req.body);
  //Lets validate req

  const { error } = updateEtablissementValidation(req.body);
  if (error) return res.status(400).send(error);

  const { _id } = req.body;

  try {
    const getEtablissement = await Etablissement.findOne({ _id });

    if (getEtablissement) {
      const newEtablissement = req.body;
      
      const api = await Etablissement.updateOne(
        { _id },
        { $set: { ...newEtablissement } }
      );

      if (api) {
        return res.status(200).send("Etablissement updated");
      } else {
        return res.status(400).send("not updated");
      }
    } else {
      return res.status(400).send("not find");
    }
  } catch (error) {
    return res.status(400).send("Etablissemente not find");
  }
});
/**
 * @description : "delete Etablissemente "
 * @method :"delete"
 * @path : "localhost:5000/api/Etablissement/"
 * @data : no
 */
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {

    await Etablissement.deleteOne({ _id });
    return res.status(200).send("Etablissement deleted");
  } catch (error) {
    return res.status(400).send("Etablissement not find");
  }
});
/**
 * @description : " add Etablissement "
 * @method :"post"
 * @path : "localhost:5000/api/Etablissement/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Lets validate req

  const { error } = EtablissementValidation(req.body);
  if (error) return res.status(400).send(error);

  //Create a new Etablissement
  const etablissement = new Etablissement({
    nom: req.body.nom,
    raison_sociale: req.body.raison_sociale,
    matricule_fiscale: req.body.matricule_fiscale,
    type: req.body.type,
    date_creation: req.body.date_creation,
    adresse: req.body.adresse,
    tel: req.body.tel,
    departement: req.body.departement
  });

  try {
    const listDep = await Etablissement.findOne({nom:req.body.nom})
    if ( listDep){
      return res.status(400).send('existe déja');
    }
    const savedEtablissement = await etablissement.save();
    return res.status(200).send(savedEtablissement);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
