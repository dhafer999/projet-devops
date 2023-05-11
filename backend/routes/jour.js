const router = require("express").Router();
const { required } = require("@hapi/joi");
const Jour = require("../model/Jour");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("./validation");
const { send } = require("express/lib/response");

/**
 * @description : " get all jours "
 * @method :"get"
 * @path : "localhost:5000/api/jour/getjours"
 * @data : no
 *
 */
router.get("/getjours", async (req, res) => {
  try {
    const jours = await Jour.find();
    return res.send(jours);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * @description : " get one jour "
 * @method :"get"
 * @path : "localhost:5000/api/jour/"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const jour = await Jour.findOne({ _id });
    return res.send(jour);
  } catch (error) {
    return res.status(400).send("jour not find");
  }
});

/**
 * @description : "update jour "
 * @method :"put"
 * @path : "localhost:5000/api/jour/"
 * @data : no
 */

router.put("/update", async (req, res) => {
  // validation req

  const { _id } = req.body;

  try {
    const getjour = await Jour.findOne({ _id });

    if (getjour) {
      const newjour = req.body;
      const api = await Jour.updateOne({ _id }, { $set: { ...newjour } });
      if (api) {
        return res.status(200).send("Jour updated");
      } else {
        return res.status(400).send("not updated");
      }
    }
  } catch (error) {
    return res.status(400).send("Jour not find");
  }
});

/**
 * @description : "delete congee "
 * @method :"delete"
 * @path : "localhost:5000/api/jour/delete/:_id"
 * @data : no
 */
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await Jour.deleteOne({ _id });
    return res.status(200).send("jour deleted");
  } catch (error) {
    return res.status(400).send("jour not find");
  }
});

/**
 * @description : " add jour "
 * @method :"post"
 * @path : "localhost:5000/api/jour/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Create a new jour
  const jour = new Jour({
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    title: req.body.title,
  });
  try {
    const savedJour = await jour.save();
    res.send(savedJour);
  } catch (err) {
    return res.status(400).send(err);
  }
  //getone
  //getall
  //    getsoldebyuser
});

module.exports = router;
