import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { currentUser } from "store/user/user_action"
import { getallSoldeByUser } from "store/solde/solde_action"
import { getOneetablissement } from "store/etablissement/etablissement_action"

const UserProfile = props => {
  const dispatch = useDispatch()

  const curUser = useSelector(state => state.User_reducer.user)
  const conges = useSelector(state => state.Solde_reducer.listMySolde)
  const etab = useSelector(state => state.Etablissement_reducer.etablissement)

  useEffect(() => {
    if (curUser && !curUser?._id) {
      dispatch(currentUser())
      dispatch(getOneetablissement('test'))

    }
  }, [dispatch, curUser])

  useEffect(() => {
    if (conges && !conges?.length) {
      dispatch(getallSoldeByUser())
    }
  }, [dispatch, conges])

  useEffect(() => {
    if (!etab._id) {
      dispatch(getOneetablissement(curUser.etablissement))
    }
  }, [dispatch, etab])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {/* {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{curUser.username}</h5>
                        <p className="mb-1">{curUser.role}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Details : </h4>

          <Card>
            <CardBody>
              <Row>
                <Col xs={3}>
                  <div className="mb-3 d-flex flex-column align-items-left">
                    <Label className="form-label">Nom : </Label>
                    <p className="form-label">{curUser.nom} </p>
                    <Label className="form-label">Prénom : </Label>
                    <p className="form-label">{curUser.prenom}</p>
                  </div>
                </Col>

                <Col xs={3}>
                  <Label className="form-label">Email : </Label>
                  <p className="form-label">{curUser.email} </p>
                  <Label className="form-label">Date de naissance : </Label>
                  <p className="form-label">{curUser.dateNaissance}</p>
                </Col>
                <Col xs={3}>
                  <Label className="form-label">Adresse : </Label>
                  <p className="form-label">{curUser.adresse} </p>
                  <Label className="form-label">Téléphone :</Label>
                  <p className="form-label">{curUser.tel}</p>
                </Col>
               
                {curUser.role !== "admin" && (
                 <>
           
                   <Col xs={3}>
                   <Label className="form-label">Etablissement : </Label>
                   <p className="form-label">{curUser.etablissement} </p>
                   <Label className="form-label">Departement :</Label>
                   <p className="form-label">{etab.departement}</p>
                 </Col>
                 <Col xs={12}>
                    <Label className="form-label">Soldes : </Label>
                    {conges?.map((c, i) => (
                      <span className="mb-3" style={{margin:'0 2%'}} key={i}>
                        {" "}
                        {c.idConge} : <a style={{color:'red'}}> {c.nbJours}</a>{" "}
                      </span>
                    ))}
                  </Col>
                 </> 
                )}
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
