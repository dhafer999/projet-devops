const router = require("express").Router();
const { required } = require("@hapi/joi");
const { updateCarriereValidation, CarriereValidation } = require("./validation");
const { send } = require("express/lib/response");
const User = require("../model/User");
const Solde = require("../model/Solde");
const Carriere = require("../model/Carriere");

/**
 * @description : " get all carriere "
 * @method :"get"
 * @path : "localhost:5000/api/carriere/getcarriere"
 * @data : no
 *
 */
router.get("/getcarrieres", async (req, res) => {
  try {
    const carrieres = await Carriere.find();
    return res.status(200).send(carrieres);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * @description : " get one carriere "
 * @method :"get"
 * @path : "localhost:5000/api/carriere/"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const carriere = await Carriere.findOne({ _id });
    res.send(carriere);
  } catch (error) {
    return res.status(400).send("carriere not find");
  }
});

/**
 * @description : "update carriere "
 * @method :"put"
 * @path : "localhost:5000/api/carriere/"
 * @data : body
 */

router.put("/update", async (req, res) => {
  console.log("body", req.body);
  //Lets validate req

  const { error } = updateCarriereValidation(req.body);
  if (error) return res.status(400).send(error);

  const { _id } = req.body;

  try {
    const getcarriere = await Carriere.findOne({ _id });
    console.log("get update ", getcarriere);

    if (getcarriere) {
      const newcarriere = req.body;
      const api = await Carriere.updateOne(
        { _id },
        { $set: { ...newcarriere } }
      );

      if (api) {
        return res.status(200).send("carriere updated");
      } else {
        return res.status(400).send("not updated");
      }
    } else {
      return res.status(400).send("not find");
    }
  } catch (error) {
    return res.status(400).send("carrieree not find");
  }
});
/**
 * @description : "delete carrieree "
 * @method :"delete"
 * @path : "localhost:5000/api/carriere/"
 * @data : no
 */
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await Carriere.deleteOne({ _id });
    return res.status(200).send("carriere deleted");
  } catch (error) {
    return res.status(400).send("carriere not find");
  }
});
/**
 * @description : " add carriere "
 * @method :"post"
 * @path : "localhost:5000/api/carriere/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Lets validate req

  const { error } = CarriereValidation(req.body);
  if (error) return res.status(400).send(error);

  //Create a new carriere
  const _carriere = new Carriere({
    post: req.body.post,
    date_embauche: req.body.date_embauche,
    date_fin: req.body.date_fin,
    email_pro: req.body.email_pro,
    tel_pro: req.body.tel_pro,
    employer: req.body.employer,
    departement: req.body.departement,
   
  });

  try {
    const listDep = await Carriere.findOne({employer:req.body.employer})
    if ( listDep){
      return res.status(400).send('existe déja');
    }
    const savedcarriere = await _carriere.save();
    return res.send(savedcarriere);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
