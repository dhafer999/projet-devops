import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  FormGroup,
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as Yup from "yup"
import { useFormik } from "formik"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import images from "assets/images"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"


import { isEmpty, size, map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import { addUser, currentUser, deleteuser, getalluser, getusers, updateuser } from "store/user/user_action"
import { addetablissement, deleteetablissement, getalletablissement, updateetablissement } from "store/etablissement/etablissement_action"
import { getalldepartement } from "store/departement/departement_action"

const EtablissementList = props => {
  const dispatch = useDispatch()

  const curUser = useSelector(state => state.User_reducer.user)
  useEffect(() => {
    if (curUser&&!curUser?._id) {
      dispatch(currentUser())
    }
  }, [dispatch, curUser])

  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      _id: (contact && contact._id) || "",
      nom: (contact && contact.nom) || "",
      raison_sociale: (contact && contact.raison_sociale) || "",
      matricule_fiscale: (contact && contact.matricule_fiscale) || "",
      date_creation: (contact && contact.date_creation) || "",
      adresse: (contact && contact.adresse) || "",
      type: (contact && contact.type) || "",
      tel: (contact && contact.tel) || "",
      departement: (contact && contact.departement) || "",
    },
    validationSchema: Yup.object({
      nom: Yup.string().min(2).required(),
      raison_sociale: Yup.string().required(),
      matricule_fiscale: Yup.string().required(),
      date_creation: Yup.date().required(),
      adresse: Yup.string().required(),
      type: Yup.string().required(),
      tel: Yup.string().min(8).max(8).required(),
      departement: Yup.string().required(),
    }),
    onSubmit: values => {
      console.log("submit ")

      if (isEdit) {
        const updateEtab = {
          _id: contact._id,
          nom: values.nom,
          raison_sociale: values.raison_sociale,
          matricule_fiscale: values.matricule_fiscale,
          date_creation: values.date_creation,
          adresse: values.adresse,
          type: values.type,
          tel: values.tel,
          departement: values.departement,
        }

        // update user
        dispatch(updateetablissement(updateEtab))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newEtab = {
          nom: values.nom,
          raison_sociale: values.raison_sociale,
          matricule_fiscale: values.matricule_fiscale,
          date_creation: values.date_creation,
          adresse: values.adresse,
          type: values.type,
          tel: values.tel,
          departement: values.departement,
        }
        // save new user
        console.log("new newEtab :: >> ", newEtab)
        dispatch(addetablissement(newEtab))
        validation.resetForm()
      }
      toggle()
    },
  })

  const users = useSelector(state => state.Etablissement_reducer.listAll).reverse()
  const departements = useSelector(state => state.Departement_reducer.listAll)

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search
  const sizePerPage = 10
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: users.length, // replace later with size(users),
    custom: true,
  }
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ]

  const selectRow = {
    mode: "checkbox",
  }

  const contactListColumns = [
    {
      text: "id",
      dataField: "_id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: user => <>{user.id}</>,
    },
    {
      dataField: "img",
      text: "#",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user?.nom?.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[user.img]}
                alt=""
              />
            </div>
          )}
        </>
      ),
    },
    {
      text: "Nom ",
      dataField: "nom",
      sort: true,   
    },
    {
      dataField: "matricule_fiscale",
      text: "matricule_fiscale",
      sort: true,
    },
    {
      dataField: "raison_sociale",
      text: "Raison sociale",
      sort: true,
    },
    {
      dataField: "date_creation",
      text: "Date de création",
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },
    {
      text: "Télephone ",
      dataField: "tel",
      sort: true,
    },
    {
      dataField: "adresse",
      text: "Adresse ",
      sort: true,
    },
    {
      dataField: "departement",
      text: "Departement  ",
      sort: true,
    },

    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (users && !users.length) {
      dispatch(getalletablissement())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    if (departements && !departements.length) {
      dispatch(getalldepartement())
    }
  }, [dispatch, departements])

  useEffect(() => {
    setContact(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    console.log('edit')
    const user = arg

    setContact({
      _id: user._id,
      nom: user.nom,
      raison_sociale: user.raison_sociale,
      matricule_fiscale: user.matricule_fiscale,
      date_creation: user.date_creation,
      adresse: user.adresse,
      type: user.type,
      tel: user.tel,
      departement: user.departement,
    })
    setIsEdit(true)
    console.log(contact)
    console.log(user)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(deleteetablissement(contact))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setUserList("")
    setIsEdit(false)
    toggle()
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Liste des etablissement</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="etablissement" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={users}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Nouvel etablissement
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Modifier etablissement" : "Ajouter etablissement"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={e => {
                                            e.preventDefault()
                                            validation.handleSubmit()
                                            return false
                                          }}
                                        >
                                          <Row form>
                                            <Row>
                                              
                                                <Col xs={6}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Departement
                                                    </Label>
                                                    <select
                                                    defaultValue={
                                                      validation.values
                                                        .departement || ""
                                                    }
                                                    className="form-select"
                                                    name="departement"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                  >
                                                    <option value="">
                                                      Choose...
                                                    </option>

                                                    {departements.map(e => (
                                                      <option
                                                        key={e._id}
                                                        value={e.nom}
                                                      >
                                                        {e.nom}
                                                      </option>
                                                    ))}
                                                  </select>
                                                    
                                                    {validation.touched
                                                      .departement &&
                                                    validation.errors
                                                      .departement ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .departement
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                                <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Nom
                                                  </Label>
                                                  <Input
                                                    name="nom"
                                                    type="text"
                                                    placeholder="nom"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.nom ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched.nom &&
                                                      validation.errors.nom
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.nom &&
                                                  validation.errors.nom ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.nom}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                           

                                              
                                            </Row>
                                              

                                            <Row>
                                            <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    matricule_fiscale
                                                  </Label>
                                                  <Input
                                                    name="matricule_fiscale"
                                                    label="matricule fiscale"
                                                    type="text"
                                                    placeholder="matricule fiscale"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.matricule_fiscale ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .matricule_fiscale &&
                                                      validation.errors.matricule_fiscale
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.matricule_fiscale &&
                                                  validation.errors.matricule_fiscale ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.matricule_fiscale}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label htmlFor="validationCustom02">
                                                    Raison sociale
                                                  </Label>
                                                  <Input
                                                    name="raison_sociale"
                                                    placeholder="raison_sociale"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom02"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .raison_sociale || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .raison_sociale &&
                                                      validation.errors.raison_sociale
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.raison_sociale &&
                                                  validation.errors.raison_sociale ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.raison_sociale}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Date de création
                                                  </Label>
                                                  <Input
                                                    name="date_creation"
                                                    type="date"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .date_creation || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .date_creation &&
                                                      validation.errors
                                                        .date_creation
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched
                                                    .date_creation &&
                                                  validation.errors
                                                    .date_creation ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .date_creation
                                                      }
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    adresse
                                                  </Label>
                                                  <Input
                                                    name="adresse"
                                                    label="adresse"
                                                    type="text"
                                                    placeholder="adresse"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .adresse || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .adresse &&
                                                      validation.errors.adresse
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.adresse &&
                                                  validation.errors.adresse ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .adresse
                                                      }
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    type
                                                  </Label>
                                                  <Input
                                                    name="type"
                                                    label="type"
                                                    type="text"
                                                    placeholder="type"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.type ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .type &&
                                                      validation.errors.type
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.type &&
                                                  validation.errors.type ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.type}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Télephone 
                                                  </Label>
                                                  <Input
                                                    name="tel"
                                                    label="tel"
                                                    type="text"
                                                    placeholder="21458796"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.tel ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched.tel &&
                                                      validation.errors.tel
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.tel &&
                                                  validation.errors.tel ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.tel}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                            </Row>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Enregistrer
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(EtablissementList)
