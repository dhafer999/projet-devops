import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

import {User_reducer} from "./user/User_reducer"
import {Conge_reducer} from "./conge/conge_reducer"
import {Jour_reducer} from "./jour/jour_reducer"
import {Solde_reducer} from "./solde/solde_reducer"
import {Demande_reducer} from "./demande/demande_reducer"
import {Etablissement_reducer} from "./etablissement/etablissement_reducer"
import {Departement_reducer} from "./departement/departement_reducer"
import {Carriere_reducer} from "./carriere/carriere_reducer"



const rootReducer = combineReducers({
  // public
  Departement_reducer,
  Carriere_reducer,
  Etablissement_reducer,
  Demande_reducer,
  Solde_reducer,
  User_reducer,
  Conge_reducer,
  Jour_reducer,
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas
})

export default rootReducer
