const router = require("express").Router();
const Solde = require("../model/Solde");
const { soldeValidation, updateSoldeValidation } = require("./validation");
/**
 * @description : " get all Soldes by username  "
 * @method :"get"
 * @path : "localhost:5000/api/Solde/getSoldes"
 * @data : no
 *
 */
router.get("/getSoldesByUser/:username", async (req, res) => {
  try {
    const Soldes = await Solde.find({idEmploye:req.params.username});
    return res.send(Soldes);
  } catch (error) {
    return  res.status(400).send(error);
  }
});

/**
 * @description : " get all Soldes by username and type conge "
 * @method :"get"
 * @path : "localhost:5000/api/Solde/getSoldes"
 * @data : no
 *
 */
router.get("/getSoldesByUser/:username/:type", async (req, res) => {
  try {
    const Soldes = await Solde.find({idEmploye:req.params.username,idConge:req.params.type});
    return res.send(Soldes);
  } catch (error) {
    return  res.status(400).send(error);
  }
});
/**
 * @description : " get all Soldes "
 * @method :"get"
 * @path : "localhost:5000/api/Solde/getSoldes"
 * @data : no
 *
 */
router.get("/getSoldes", async (req, res) => {
  try {
    const Soldes = await Solde.find();
    return res.send(Soldes);
  } catch (error) {
    return  res.status(400).send(error);
  }
});
/**
 * @description : " get one Solde "
 * @method :"get"
 * @path : "localhost:5000/api/Solde/"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const Solde = await Solde.findOne({ _id });
   return res.send(Solde);
  } catch (error) {
    return  res.status(400).send("Solde not find");
  }
});
/**
 * @description : "update Solde "
 * @method :"put"
 * @path : "localhost:5000/api/Solde/update"
 * @data : no
 */
router.put("/update", async (req, res) => {
  // validation req
  const { error } = updateSoldeValidation(req.body);
  if (error) return  res.status(400).send(error);
  const { _id } = req.body;
  try {
    const getSolde = await Solde.findOne({ _id });
    if (getSolde) {
      const newSolde = req.body;
      const api = await Solde.updateOne({ _id }, { $set: { ...newSolde } });
      if (api) {
       return res.status(200).send("Solde updated");
      } else {
        return  res.status(400).send("not updated");
      }
    }
  } catch (error) {
    return  res.status(400).send("Solde not find");
  }
});
/**
 * @description : " add Solde "
 * @method :"post"
 * @path : "localhost:5000/api/Solde/add"
 * @data : body
 */
router.post("/add", async (req, res) => {
  //Lets validate the req
  const { error } = soldeValidation(req.body);
  if (error) return res.status(400).send(error);
  //Create a new Solde
  const solde = new Solde({
    nbJours: req.body.nbJours,
    idEmploye: req.body.idEmploye,
    idConge: req.body.idConge,
  });
  try {
    const savedSolde = await solde.save();
    return res.send(savedSolde);
  } catch (err) {
    return  res.status(400).send(err);
  }
  //getone
  //getall
  //    getsoldebyuser
});
module.exports = router;
