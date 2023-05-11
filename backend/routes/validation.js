//Validation
const Joi = require("@hapi/joi");

//Register validation

const registerValidation = (data) => {
  const schema = {
    id_manager:Joi.string().required(),
    nom: Joi.string().min(2).required(),
    prenom: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    dateNaissance: Joi.required(),
    adresse: Joi.string().required(),
    genre: Joi.string().required(),
    tel: Joi.string().min(8).max(8).required(),
    username: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().required(),
    etablissement: Joi.string().allow(""),
  };
  return Joi.validate(data, schema);
};

//login validation

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

//update user validation
const updateUserValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    id_manager:Joi.string().required(),
    nom: Joi.string().min(2).required(),
    prenom: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    dateNaissance: Joi.required(),
    adresse: Joi.string().required(),
    genre: Joi.string().required(),
    tel: Joi.string().min(8).max(8).required(),
    username: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().required(),
    etablissement: Joi.string().allow(""),
  };
  return Joi.validate(data, schema);
};

//demande validation

const demandeValidation = (data) => {
  const schema = {
    dateDemande: Joi.date().required(),
    dateConfirmManager: Joi.string().allow("").allow(null),
    dateConfirmAdmin:Joi.string().allow("").allow(null),
    status: Joi.string().required(),
    dateDebut: Joi.required(),
    idManager: Joi.string().required(),
    raison: Joi.string().required(),
    idConge: Joi.string().required(),
    idEmploye: Joi.string().required(),
    nbJours: Joi.number().required(),
  };
  return Joi.validate(data, schema);
};

//update demande validation
const updateDemandeValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    dateDemande: Joi.date().required(),
    dateConfirmManager: Joi.string().allow("").allow(null),
    dateConfirmAdmin:Joi.string().allow("").allow(null),
    status: Joi.string().required(),
    dateDebut: Joi.required(),
    idManager: Joi.string().required(),
    raison: Joi.string().required(),
    idConge: Joi.string().required(),
    idEmploye: Joi.string().required(),
    nbJours: Joi.number().required(),
    __v:Joi.allow("").allow(null),

  };
  return Joi.validate(data, schema);
};

// solde validation

const soldeValidation = (data) => {
  const schema = {
    nbJours: Joi.number().required(),
    idEmploye: Joi.string().required(),
    idConge: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

// update solde validation
const updateSoldeValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    nbJours: Joi.number().required(),
    idEmploye: Joi.string().required(),
    idConge: Joi.string().required(),
    __v:Joi.allow("").allow(null),

  };
  return Joi.validate(data, schema);
};

//Jour fériés validation

const jourValidation = (data) => {
  const schema = {
    dateDebut: Joi.date().required(),
    dateFin: Joi.date().required(),
    title: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

//update jours validation
const updateJourValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    dateDebut: Joi.date().required(),
    dateFin: Joi.date().required(),
    title: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

//conge validation

const congeValidation = (data) => {
  const schema = {
    type: Joi.string().required(),
    periode: Joi.string().required(),
    labelle: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

//update conge validation
const updateCongeValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    type: Joi.string().required(),
    periode: Joi.string().required(),
    labelle: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};


//etablissemnt validation

const EtablissementValidation = (data) => {
  const schema = {
    nom: Joi.string().required(),
    raison_sociale: Joi.string().required(),
    matricule_fiscale:Joi.string().required(),
    type: Joi.string().required(),
    date_creation: Joi.string().required(),
    adresse: Joi.string().required(),
    tel: Joi.string().required(),
    departement: Joi.string().required(),
   
  };
  return Joi.validate(data, schema);
};
//etablissemnt validation

const updateEtablissementValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    nom: Joi.string().required(),
    raison_sociale: Joi.string().required(),
    matricule_fiscale:Joi.string().required(),
    type: Joi.string().required(),
    date_creation: Joi.string().required(),
    adresse: Joi.string().required(),
    tel: Joi.string().required(),
    departement: Joi.string().required(),
    __v:Joi.allow("").allow(null),
   
  };
  return Joi.validate(data, schema);
};
const updateDepartementValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    nom: Joi.string().required(),
    description: Joi.string().required(),
    service:Joi.string().required(),
    __v:Joi.allow("").allow(null),
   
  };
  return Joi.validate(data, schema);
};
//etablissemnt validation

const DepartementValidation = (data) => {
  const schema = {
    nom: Joi.string().required(),
    description: Joi.string().required(),
    service:Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

const CarriereValidation = (data) => {
  const schema = {
    post: Joi.string().required(),
    date_embauche: Joi.string().required(),
    date_fin:Joi.string().required(),
    email_pro: Joi.string().required(),
    tel_pro: Joi.string().required(),
    employer: Joi.string().required(),
    departement: Joi.string().required(),
   
  };
  return Joi.validate(data, schema);
};

const updateCarriereValidation = (data) => {
  const schema = {
    _id:Joi.required(),
    post: Joi.string().required(),
    date_embauche: Joi.string().required(),
    date_fin:Joi.string().required(),
    email_pro: Joi.string().required(),
    tel_pro: Joi.string().required(),
    employer: Joi.string().required(),
    departement: Joi.string().required(),
    __v:Joi.allow("").allow(null),
   
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.demandeValidation = demandeValidation;
module.exports.soldeValidation = soldeValidation;
module.exports.jourValidation = jourValidation;
module.exports.congeValidation = congeValidation;
module.exports.updateUserValidation = updateUserValidation;
module.exports.updateDemandeValidation = updateDemandeValidation;
module.exports.updateJourValidation = updateJourValidation;
module.exports.updateCongeValidation = updateCongeValidation;
module.exports.updateSoldeValidation = updateSoldeValidation;
module.exports.EtablissementValidation = EtablissementValidation;
module.exports.updateEtablissementValidation = updateEtablissementValidation;
module.exports.DepartementValidation = DepartementValidation;
module.exports.updateDepartementValidation = updateDepartementValidation;
module.exports.updateCarriereValidation = updateCarriereValidation;
module.exports.CarriereValidation = CarriereValidation;

