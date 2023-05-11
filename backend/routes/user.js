const router = require("express").Router();
const { required } = require("@hapi/joi");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../routes/validation");
const { loginValidation } = require("../routes/validation");
const { updateUserValidation } = require("../routes/validation");
const { send } = require("express/lib/response");
const Conge = require("../model/Conge");
const Solde = require("../model/Solde");
const IsAuth = require("./verifyToken");

router.get("/test", (req, res) => {
  res.send("hello test");
});

/**
 * @desc: "current user"
 * @method : post
 * @path : localhost:5000/api/user/register
 */

router.get("/current", IsAuth, (req, res) => {
  res.send(req.user);
});

/**
 * @description : " get all user "
 * @method :"get"
 * @path : "localhost:5000/api/user/getusers"
 * @data : no
 *
 */
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    return res.send(users);
  } catch (error) {
    return  res.status(400).send(error);
  }
});
/**
 * @description : " get all user "
 * @method :"get"
 * @path : "localhost:5000/api/user/getAllusers"
 * @data : no
 *
 */
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return  res.status(400).send(error);
  }
});
/**
 * @description : " get all user by manager  "
 * @method :"get"
 * @path : "localhost:5000/api/user/getUsersByManager/:_id"
 * @data : no
 *
 */
router.get("/getUsersByManager/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const users = await User.find({ id_manager: { _id } });
   return  res.send(users);
  } catch (error) {
   return  res.status(400).send(error);
  }
});

/**
 * @description : " get all manager "
 * @method :"get"
 * @path : "localhost:5000/api/user/getusers"
 * @data : no
 *
 */
router.get("/getmanager", async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" });
    return res.send(managers);
  } catch (error) {
    return res.status(400).send(error);
  }
});
/**
 * @description : " get one user "
 * @method :"get"
 * @path : "localhost:5000/api/user/getone"
 * @data : no
 */
router.get("/getone/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findOne({ _id });
    return res.send(user);
  } catch (error) {
    return res.status(400).send("user not find");
  }
});
/**
 * @description : "update user "
 * @method :"put"
 * @path : "localhost:5000/api/user/"
 * @data : no
 */
router.put("/updateUser", async (req, res) => {
  // validation req
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).send(error);
  const { _id } = req.body;
  try {
    const getuser = await User.findOne({ _id });
    if (getuser) {
      const newuser = req.body;
      const api = await User.updateOne({ _id }, { $set: { ...newuser } });
      if (api) {
        return res.status(200).send("user updated");
      } else {
       return res.status(400).send("not updated");
      }
    } else {
      return res.status(400).send("not find");
    }
  } catch (error) {
    res.status(400).send("user not find");
  }
});
/**
 * @description : "delete user "
 * @method :"delete"
 * @path : "localhost:5000/api/user/"
 * @data : no
 */
router.delete("/deleteUser/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await User.deleteOne({ _id });
   return  res.status(200).send("user deleted");
  } catch (error) {
    return res.status(400).send("user not find");
  }
});
/**
 * @description : " register  user "
 * @method :"post"
 * @path : "localhost:5000/api/user/"
 * @data : body
 */
router.post("/register", async (req, res) => {
  //Lets validate the data before we a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);
  //Checking if the user in already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("username already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    id_manager: req.body.id_manager,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    dateNaissance: req.body.dateNaissance,
    adresse: req.body.adresse,
    genre: req.body.genre,
    tel: req.body.tel,
    username: req.body.username,
    role: req.body.role,
    password: hashedPassword,
    etablissement: req.body.etablissement
  });
  try {
    const savedUser = await user.save();
    const conges = await Conge.find();

    console.log("conge ", conges);

    conges.map((c) => {
      let newSolde = new Solde({
        nbJours: c.periode,
        idEmploye: req.body.username,
        idConge: c.type,
      });
      const res = newSolde.save();
    });

    return res.send(savedUser);
  } catch (err) {
    return  res.status(400).send(err);
  }
});

/**
 * @description : " login user "
 * @method :"post"
 * @path : "localhost:5000/api/user/login"
 * @data : body
 *
 */
router.post("/login", async (req, res) => {
  //Lets validate the data before we a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);
  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
