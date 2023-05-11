import React, { useState } from "react";
import MetaTags from "react-meta-tags";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

function DemandeEtap1() {




    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          dateDemande: '',
          dateConfirmation: '',
          dateDebut: '',
          status: '',
          raison: '',
          commentaire: '',
        },
        validationSchema: Yup.object({
          dateDemande: Yup.string().required(" Entrer  la Date de demande"),
          dateConfirmation: Yup.string().required(" Entrer  la Date de confirmation"),
          dateDebut: Yup.string().required(" Entrer  la Date de debut"),
          status: Yup.string().required(" Entrer un  Status"),
          raison: Yup.string().required(" Entrer ton  Raison"),
          commentaire: Yup.string().required("entrer un commentaire"),
        }),
        onSubmit: (values) => {
          console.log("values", values);
        }
      });

      
 
  return (
   
    <React.Fragment>
    <div className="page-content">
      <MetaTags>
        <title>
        Demande de conge
        </title>
      </MetaTags>
      <Container fluid={true}>
        
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                
                <Form className="needs-validation"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom01">Date de Demande</Label>
                        <Input
                          name="dateDemande"
                          placeholder="date de demande"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.dateDemande || ""}
                          invalid={
                            validation.touched.dateDemande && validation.errors.dateDemande ? true : false
                          }
                        />
                        {validation.touched.dateDemande && validation.errors.dateDemande ? (
                          <FormFeedback type="invalid">{validation.errors.dateDemande}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Date de confirmation</Label>
                        <Input
                          name="dateConfirmation"
                          placeholder="Date de confirmation"
                          type="date"
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.dateConfirmation || ""}
                          invalid={
                            validation.touched.dateConfirmation && validation.errors.dateConfirmation ? true : false
                          }
                        />
                        {validation.touched.dateConfirmation && validation.errors.dateConfirmation ? (
                          <FormFeedback type="invalid">{validation.errors.dateConfirmation}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom03">date Debut</Label>
                        <Input
                          name="dateDebut"
                          placeholder="Date Debut"
                          type="date"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.dateDebut || ""}
                          invalid={
                            validation.touched.dateDebut && validation.errors.dateDebut ? true : false
                          }
                        />
                        {validation.touched.dateDebut && validation.errors.dateDebut ? (
                          <FormFeedback type="invalid">{validation.errors.dateDebut}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom04">Status</Label>
                        <Input
                          name="status"
                          placeholder="Status"
                          type="text"
                          className="form-control"
                          id="validationCustom04"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.status || ""}
                          invalid={
                            validation.touched.status && validation.errors.status ? true : false
                          }
                        />
                        {validation.touched.status && validation.errors.status ? (
                          <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom05">Raison</Label>
                        <Input
                          name="raison"
                          placeholder="Raison"
                          type="text"
                          className="form-control"
                          id="validationCustom05"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.raison || ""}
                          invalid={
                            validation.touched.raison && validation.errors.raison ? true : false
                          }
                        />
                        {validation.touched.raison && validation.errors.raison ? (
                          <FormFeedback type="invalid">{validation.errors.raison}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom04">Commentaire</Label>
                        <Input
                          name="commentaire"
                          placeholder="Commentaire"
                          type="text"
                          className="form-control"
                          id="validationCustom04"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.commentaire || ""}
                          invalid={
                            validation.touched.commentaire && validation.errors.commentaire ? true : false
                          }
                        />
                        {validation.touched.commentaire && validation.errors.commentaire ? (
                          <FormFeedback type="invalid">{validation.errors.commentaire}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup className="mb-3">
                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="invalidCheck"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="invalidCheck"
                          >
                            {" "}
                            Accepter les termes et conditions
                          </Label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" type="submit">
                    Envoyer
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>

          
        </Row>
       
      </Container>
    </div>
  </React.Fragment>

  )
}

export default DemandeEtap1