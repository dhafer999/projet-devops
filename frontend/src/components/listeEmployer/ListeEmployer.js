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
import { getalletablissement } from "store/etablissement/etablissement_action"

const UsersList = props => {
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
      id_manager: curUser?._id||"",
      nom: (contact && contact.nom) || "",
      prenom: (contact && contact.prenom) || "",
      email: (contact && contact.email) || "",
      dateNaissance: (contact && contact.dateNaissance) || "",
      adresse: (contact && contact.adresse) || "",
      genre: (contact && contact.genre) || "",
      tel: (contact && contact.tel) || "",
      role: (contact && contact.role) || "manager",
      password: (contact && contact.password) || "",
      cpassword: (contact && contact.cpassword) || "",
      username: (contact && contact.username) || "",
      etablissement: (contact && contact.etablissement) || "",
    },
    validationSchema: Yup.object({
      nom: Yup.string().min(2).required(),
      prenom: Yup.string().required(),
      email: Yup.string().email().required(),
      dateNaissance: Yup.date().required(),
      adresse: Yup.string().required(),
      genre: Yup.string().required(),
      tel: Yup.string().min(8).max(8).required(),
      username: Yup.string().required(),
      role: Yup.string().required(),
      password: Yup.string().required(),
      cpassword: Yup.string().required(),
    }),
    onSubmit: values => {
      console.log("submit ")

      if (isEdit) {
        const updateUser = {
          _id: contact._id,
          id_manager: contact.id_manager,
          nom: values.nom,
          prenom: values.prenom,
          email: values.email,
          dateNaissance: values.dateNaissance,
          adresse: values.adresse,
          genre: values.genre,
          tel: values.tel,
          role: "user",
          password: values.password,
          username: values.username,
          etablissement: values.etablissement,
        }

        // update user
        dispatch(updateuser(updateUser))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newUser = {
          id_manager: curUser?._id||'',
          nom: values.nom,
          prenom: values.prenom,
          email: values.email,
          dateNaissance: values.dateNaissance,
          adresse: values.adresse,
          genre: values.genre,
          tel: values.tel,
          role: "user",
          password: values.password,
          username: values.username,
          etablissement: values.etablissement,
        }
        // save new user
        console.log("new user :: >> ", newUser)
        dispatch(addUser(newUser))
        validation.resetForm()
      }
      toggle()
    },
  })

  const users = useSelector(state => state.User_reducer.listUser).reverse()
  const listEtab = useSelector(state => state.Etablissement_reducer.listAll)

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
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.nom}
            </Link>
          </h5>
          <p className="text-muted mb-0">{user.prenom}</p>
        </>
      ),
    },
    {
      dataField: "email",
      text: "Email",
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
      dataField: "etablissement",
      text: "Etablissement  ",
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
      dispatch(getusers())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    if (listEtab && !listEtab.length) {
      dispatch(getalletablissement())
    }
  }, [dispatch, listEtab])

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
      id_manager: user?.id_manager||'1',
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      dateNaissance: user.dateNaissance,
      adresse: user.adresse,
      genre: user.genre,
      tel: user.tel,
      password: user.password,
      cpassword: user.password,
      username: user.username,
      etablissement: user.etablissement,
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
    dispatch(deleteuser(contact))
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
          <title>Liste des employers</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="employers" />
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
                                      Nouvel utilisateur
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
                                        {!!isEdit ? "Modifier" : "Ajouter"}
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
                                              {!isEdit && (
                                                <Col xs={6}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Nom utilisateur
                                                    </Label>
                                                    <Input
                                                      name="username"
                                                      type="text"
                                                      placeholder="nom d'utilisateur "
                                                      onChange={
                                                        validation.handleChange
                                                      }
                                                      onBlur={
                                                        validation.handleBlur
                                                      }
                                                      value={
                                                        validation.values
                                                          .username || ""
                                                      }
                                                      invalid={
                                                        validation.touched
                                                          .username &&
                                                        validation.errors
                                                          .username
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {validation.touched
                                                      .username &&
                                                    validation.errors
                                                      .username ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .username
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                              )}

                                              <Col xs={isEdit ? "12" : "6"}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Email
                                                  </Label>
                                                  <Input
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    placeholder="email"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.email ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .email &&
                                                      validation.errors.email
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.email &&
                                                  validation.errors.email ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.email}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                            </Row>
                                            {!isEdit && (
                                              <Row>
                                                <Col xs={6}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Mot de passe
                                                    </Label>
                                                    <Input
                                                      name="password"
                                                      type="text"
                                                      placeholder="password"
                                                      onChange={
                                                        validation.handleChange
                                                      }
                                                      onBlur={
                                                        validation.handleBlur
                                                      }
                                                      value={
                                                        validation.values
                                                          .password || ""
                                                      }
                                                      invalid={
                                                        validation.touched
                                                          .password &&
                                                        validation.errors
                                                          .password
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {validation.touched
                                                      .password &&
                                                    validation.errors
                                                      .password ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .password
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                                <Col xs={6}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      confirm password
                                                    </Label>
                                                    <Input
                                                      name="cpassword"
                                                      type="password"
                                                      placeholder="prenom"
                                                      onChange={
                                                        validation.handleChange
                                                      }
                                                      onBlur={
                                                        validation.handleBlur
                                                      }
                                                      value={
                                                        validation.values
                                                          .cpassword || ""
                                                      }
                                                      invalid={
                                                        validation.touched
                                                          .cpassword &&
                                                        validation.errors
                                                          .cpassword
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {validation.touched
                                                      .cpassword &&
                                                    validation.errors
                                                      .cpassword ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .cpassword
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                              </Row>
                                            )}

                                            <Row>
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
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label htmlFor="validationCustom02">
                                                    Prenom
                                                  </Label>
                                                  <Input
                                                    name="prenom"
                                                    placeholder="prenom"
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
                                                        .prenom || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .prenom &&
                                                      validation.errors.prenom
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.prenom &&
                                                  validation.errors.prenom ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.prenom}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    dateNaissance
                                                  </Label>
                                                  <Input
                                                    name="dateNaissance"
                                                    type="date"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .dateNaissance || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .dateNaissance &&
                                                      validation.errors
                                                        .dateNaissance
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched
                                                    .dateNaissance &&
                                                  validation.errors
                                                    .dateNaissance ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .dateNaissance
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
                                                    genre
                                                  </Label>
                                                  <Input
                                                    name="genre"
                                                    label="genre"
                                                    type="text"
                                                    placeholder="genre"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.genre ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .genre &&
                                                      validation.errors.genre
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.genre &&
                                                  validation.errors.genre ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.genre}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    tel
                                                  </Label>
                                                  <Input
                                                    name="tel"
                                                    label="tel"
                                                    type="text"
                                                    placeholder="tel"
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
                                                <Col xs={6}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Etablissement
                                                    </Label>
                                                    <select
                                                    defaultValue={
                                                      validation.values
                                                        .etablissement || ""
                                                    }
                                                    className="form-select"
                                                    name="etablissement"
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

                                                    {listEtab.map(e => (
                                                      <option
                                                        key={e._id}
                                                        value={e.nom}
                                                      >
                                                        {e.nom}
                                                      </option>
                                                    ))}
                                                  </select>
                                                    
                                                  
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

export default withRouter(UsersList)
