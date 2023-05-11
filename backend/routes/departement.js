const router = require("express").Router();
const { required } = require("@hapi/joi");
const { DepartementValidation } = require("./validation");
const { updateDepartementValidation } = require("./validation");
const { send } = require("express/lib/response");
const User = require("../model/User");
const Solde = require("../model/Solde");
const Departement = require("../model/Departement");

/**
 * @description : " get all departements "
 * @method :"get"
 * @path : "localhost:5000/api/Departement/getdepartements"
 * @data : no
 *
 */
router.get("/getdepartements", async (req, res) => {
  try {
    const departements = await Departement.find();
    return res.status(200).send(departements);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * @description : " get one Departement "
 * @method :"get"
 * @path : "localhost:5000/api/Departement/"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const departement = await Departement.findOne({ _id });
    res.send(departement);
  } catch (error) {
    return res.status(400).send("leave not find");
  }
});

/**
 * @description : "update Departement "
 * @method :"put"
 * @path : "localhost:5000/api/Departement/"
 * @data : body
 */

router.put("/update", async (req, res) => {
  console.log("body", req.body);
  //Lets validate req

  const { error } = updateDepartementValidation(req.body);
  if (error) return res.status(400).send(error);

  const { _id } = req.body;

  try {
    const getDepartement = await Departement.findOne({ _id });
    console.log("get update ", getDepartement);

    if (getDepartement) {
      const newDepartement = req.body;
      const api = await Departement.updateOne(
        { _id },
        { $set: { ...newDepartement } }
      );

      if (api) {
        return res.status(200).send("Departement updated");
      } else {
        return res.status(400).send("not updated");
      }
    } else {
      return res.status(400).send("not find");
    }
  } catch (error) {
    return res.status(400).send("Departemente not find");
  }
});
/**
 * @description : "delete Departemente "
 * @method :"delete"
 * @path : "localhost:5000/api/Departement/"
 * @data : no
 */
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await Departement.deleteOne({ _id });
    return res.status(200).send("Departement deleted");
  } catch (error) {
    return res.status(400).send("Departement not find");
  }
});
/**
 * @description : " add Departement "
 * @method :"post"
 * @path : "localhost:5000/api/Departement/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Lets validate req

  const { error } = DepartementValidation(req.body);
  if (error) return res.status(400).send(error);

  //Create a new Departement
  const departement = new Departement({
    nom: req.body.nom,
    description: req.body.description,
    service: req.body.service,
   
  });

  try {
    const listDep = await Departement.findOne({nom:req.body.nom})
    if ( listDep){
      return res.status(400).send('existe déja');
    }
    const savedDepartement = await departement.save();
    return res.send(savedDepartement);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
