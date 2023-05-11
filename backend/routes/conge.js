const router = require("express").Router();
const { required } = require("@hapi/joi");
const Conge = require("../model/Conge");
const { congeValidation } = require("../routes/validation");
const { updateCongeValidation } = require("../routes/validation");
const { send } = require("express/lib/response");
const User = require("../model/User");
const Solde = require("../model/Solde");

/**
 * @description : " get all conges "
 * @method :"get"
 * @path : "localhost:5000/api/conge/getconges"
 * @data : no
 *
 */
router.get("/getconges", async (req, res) => {
  try {
    const conges = await Conge.find();
    return res.status(200).send(conges);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * @description : " get one conge "
 * @method :"get"
 * @path : "localhost:5000/api/conge/"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const conge = await Conge.findOne({ _id });
    res.send(conge);
  } catch (error) {
    return res.status(400).send("leave not find");
  }
});

/**
 * @description : "update conge "
 * @method :"put"
 * @path : "localhost:5000/api/conge/"
 * @data : body
 */

router.put("/update", async (req, res) => {
  console.log("body", req.body);
  //Lets validate req

  const { error } = updateCongeValidation(req.body);
  if (error) return res.status(400).send(error);

  const { _id } = req.body;

  try {
    const getconge = await Conge.findOne({ _id });
    console.log("get update ", getconge);

    if (getconge) {
      const newconge = req.body;
      const api = await Conge.updateOne({ _id }, { $set: { ...newconge } });

      if (api) {
        return res.status(200).send("conge updated");
      } else {
        return res.status(400).send("not updated");
      }
    } else {
      return res.status(400).send("not find");
    }
  } catch (error) {
    return res.status(400).send("congee not find");
  }
});
/**
 * @description : "delete congee "
 * @method :"delete"
 * @path : "localhost:5000/api/conge/"
 * @data : no
 */
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await Conge.deleteOne({ _id });
    return res.status(200).send("conge deleted");
  } catch (error) {
    return res.status(400).send("conge not find");
  }
});
/**
 * @description : " add conge "
 * @method :"post"
 * @path : "localhost:5000/api/conge/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Lets validate req

  const { error } = congeValidation(req.body);
  if (error) return res.status(400).send(error);

  //Create a new conge
  const conge = new Conge({
    type: req.body.type,
    periode: req.body.periode,
    labelle: req.body.labelle,
  });

  try {
    listUsers = await User.find();

    if (!listUsers.length) {
      return res.status(400).send("list users empty");
    }

    listUsers.map( (u) => {
      let newSolde = new Solde({
        nbJours: conge.periode,
        idEmploye: u.username,
        idConge: conge.type,
      });
      console.log("🚀 ~ file: conge.js ~ line 127 ~ listUsers.map ~ newSolde", newSolde)
      try {
         newSolde.save();
      } catch (error) {
        return res.status(400).send(error);
      }
    });
    const savedConge = await conge.save();
    return res.send(savedConge);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
