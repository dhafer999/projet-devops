const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var corss = require("cors");
//import Routes
const user = require("./routes/user");
const solde = require("./routes/solde");
const jour = require("./routes/jour");
const demande = require("./routes/demande");
const conge = require("./routes/conge");
const etablissement = require("./routes/etablissement");
const departement = require("./routes/departement")
const carriere = require("./routes/carriere")
dotenv.config();
//Connect to BD
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db! ")
);
//Middleware
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3000","*","https://testconge.alwaysdata.net"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(corss(corsOptions));
//Route Middlewares
app.use("/api/user", user);
app.use("/api/solde", solde);
app.use("/api/jour", jour);
app.use("/api/demande", demande);
app.use("/api/conge", conge);
app.use("/api/etablissement", etablissement);
app.use("/api/departement", departement);
app.use("/api/carriere", carriere);
app.listen(process.env.PORT, () => console.log(`Server up and running in port : ${process.env.PORT}`));
