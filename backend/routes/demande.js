const router = require("express").Router();
const { required } = require("@hapi/joi");
const Demande = require("../model/Demande");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { demandeValidation } = require("../routes/validation");
const { updateDemandeValidation } = require("../routes/validation");
const { send } = require("express/lib/response");
const User = require("../model/User");
const Conge = require("../model/Conge");
/**
 * @description : " get all demandes "
 * @method :"get"
 * @path : "localhost:5000/api/demande/getdemandes"
 * @data : no
 *
 */
router.get("/getdemandes", async (req, res) => {
  try {
    const demandes = await Demande.find();
    return res.send(demandes);
  } catch (error) {
    return res.status(400).send(error);
  }
});
/**
 * @description : " get all demandes by user "
 * @method :"get"
 * @path : "localhost:5000/api/demande/getdemandes"
 * @data : no
 *
 */
router.get("/getdemandesByuser/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).send("user not find");
    }
    const demandes = await Demande.find({ idEmploye: user.username });
    return res.send(demandes);
  } catch (error) {
    return res.status(400).send(error);
  }
});
/**
 * @description : " get all demandes by manager "
 * @method :"get"
 * @path : "localhost:5000/api/demande/getdemandesByManager/:id"
 * @data : no
 *
 */
router.get("/getdemandesByManager/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).send("user not find");
    }
    const demandes = await Demande.find({ idManager: user.username });
    res.send(demandes);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * @description : " get all demandes by admin "
 * @method :"get"
 * @path : "localhost:5000/api/demande/getdemandesByAdmin"
 * @data : no
 *
 */
router.get("/getdemandesByAdmin", async (req, res) => {
  try {
    const demandes = await Demande.find({
      status: ["Confirm Manager", "Refus", "Confirm Admin"],
    });
    res.send(demandes);
  } catch (error) {
    return res.status(400).send(error);
  }
});
/**
 * @description : " get one demande "
 * @method :"get"
 * @path : "localhost:5000/api/demande/"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const demande = await Demande.findOne({ _id });
    res.send(demande);
  } catch (error) {
    return res.status(400).send("demand not find");
  }
});
/**
 * @description : "update demande "
 * @method :"put"
 * @path : "localhost:5000/api/demande/update"
 * @data : body
 */
router.put("/update", async (req, res) => {
  // validation req
  const { error } = updateDemandeValidation(req.body);
  if (error) return res.status(400).send(error);
  const { _id } = req.body;
  try {
    const getdemande = await Demande.findOne({ _id });
    if (getdemande) {
      const newdemande = req.body;
      console.log(
        "🚀 ~ file: demande.js ~ line 113 ~ router.put ~ newdemande",
        newdemande
      );

      const api = await Demande.updateOne({ _id }, { $set: { ...newdemande } });
      if (api) {
        return res.status(200).send("demande updated");
      } else {
        return res.status(400).send("not updated");
      }
    } else {
      return res.status(400).send("not find");
    }
  } catch (error) {
    return res.status(400).send("demande not find");
  }
});
/**
 * @description : "delete demande "
 * @method :"delete"
 * @path : "localhost:5000/api/demande/delete/:_id"
 * @data : no
 */
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await Demande.deleteOne({ _id });
    return res.status(200).send("demande deleted");
  } catch (error) {
    return res.status(400).send("demande not find");
  }
});
/**
 * @description : " add demande "
 * @method :"post"
 * @path : "localhost:5000/api/demande/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Lets validate req
  const { error } = demandeValidation(req.body);
  if (error) return res.status(400).send(error);
  //Create a new demande
  const demande = new Demande({
    dateDemande: req.body.dateDemande,
    dateConfirmation: req.body.dateConfirmation,
    status: req.body.status,
    dateDebut: req.body.dateDebut,
    idManager: req.body.idManager,
    raison: req.body.raison,
    idConge: req.body.idConge,
    idEmploye: req.body.idEmploye,
    dateConfirmManager: req.body.dateConfirmManager,
    dateConfirmAdmin: req.body.dateConfirmAdmin,
    nbJours: req.body.nbJours,
  });
  try {
    const user = await User.findOne({ username: req.body.idEmploye });
    const manager = await User.findOne({ _id: req.body.idManager });

    if (!user||!manager) {
      return res.status(400).send("user not find ");
    } else {
      demande.idManager=manager.username
    }

    const conge = await Conge.findOne({ type: req.body.idConge });
    if (!conge) {
      return res.status(400).send("conge not find ");
    }

    const savedDemande = await demande.save();
    return res.send(savedDemande);
  } catch (err) {
    return res.status(400).send(err);
  }
});
module.exports = router;
