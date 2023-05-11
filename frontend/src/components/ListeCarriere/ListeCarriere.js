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
import { addcarriere, deletecarriere, getallcarriere, updatecarriere } from "store/carriere/carriere_action"

const CarriereList = props => {
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
      post: (contact && contact.post) || "",
      date_embauche: (contact && contact.date_embauche) || "",
      date_fin: (contact && contact.date_fin) || "",
      email_pro: (contact && contact.email_pro) || "",
      tel_pro_pro: (contact && contact.tel_pro) || "",
      employer: (contact && contact.employer) || "",
      departement: (contact && contact.departement) || "",
    },
    validationSchema: Yup.object({
      post: Yup.string().required(),
      date_embauche: Yup.date().required(),
      date_fin: Yup.date().required(),
      email_pro: Yup.string().email().required(),
      employer: Yup.string().required(),
      tel_pro: Yup.string().min(8).max(8).required(),
      departement: Yup.string().required(),
    }),
    onSubmit: values => {
      console.log("submit ")

      if (isEdit) {
        const updatecarrie = {
          _id: contact._id,
          post: values.post,
          date_embauche: values.date_embauche,
          date_fin: values.date_fin,
          email_pro: values.email_pro,
          employer: contact.employer,
          tel_pro: values.tel_pro,
          departement: values.departement,
        }

        // update user
        dispatch(updatecarriere(updatecarrie))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newCarriere = {
          post: values.post,
          date_embauche: values.date_embauche,
          date_fin: values.date_fin,
          email_pro: values.email_pro,
          tel_pro: values.tel_pro,
          employer: values.employer,
          departement: values.departement,
        }
        // save new user
        console.log("new newEtab :: >> ", newCarriere)
        dispatch(addcarriere(newCarriere))
        validation.resetForm()
      }
      toggle()
    },
  })

  const users = useSelector(state => state.Carriere_reducer.listAll).reverse()
  const departements = useSelector(state => state.Departement_reducer.listAll)
  const employers = useSelector(state => state.User_reducer.listUser).filter(e=>e.role!=='admin')

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
                {user?.post?.charAt(0)}
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
      text: "post ",
      dataField: "post",
      sort: true,   
    },
    {
      dataField: "date_fin",
      text: "date_fin",
      sort: true,
    },
    {
      dataField: "date_embauche",
      text: "Raison sociale",
      sort: true,
    },
    {
      dataField: "email_pro",
      text: "Date de création",
      sort: true,
    },
    {
      text: "Télephone ",
      dataField: "tel_pro",
      sort: true,
    },
    {
      dataField: "employer",
      text: "employer ",
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
      dispatch(getallcarriere())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    if (departements && !departements.length) {
      dispatch(getalldepartement())
    }
  }, [dispatch, departements])
  useEffect(() => {
    if (employers && !employers.length) {
      dispatch(getalluser())
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
      post: user.post,
      date_embauche: user.date_embauche,
      date_fin: user.date_fin,
      email_pro: user.email_pro,
      employer: user.employer,
      tel_pro: user.tel_pro,
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
    dispatch(deletecarriere(contact))
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
          <title>Liste des carrieres</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="carriere" />
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
                                      Nouvel carriere
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
                                        {!!isEdit ? "Modifier carriere" : "Ajouter carriere"}
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
                                              
                                               { !isEdit && 
                                               <Col xs={6}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Employer
                                                    </Label>
                                                    <select
                                                    defaultValue={
                                                      validation.values
                                                        .employer || ""
                                                    }
                                                    className="form-select"
                                                    name="employer"
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

                                                    {employers.map(e => (
                                                      <option
                                                        key={e._id}
                                                        value="test"
                                                      >
                                                        {e.username}
                                                      </option>
                                                    ))}
                                                  </select>
                                                    
                                                    {validation.touched
                                                      .employer &&
                                                    validation.errors
                                                      .employer ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .employer
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>}
                                                <Col xs={isEdit ? 12 :6}>
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
                                               
                                           

                                              
                                            </Row>
                                              

                                            <Row>
                                            <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    post
                                                  </Label>
                                                  <Input
                                                    name="post"
                                                    type="text"
                                                    placeholder="post"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.post ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched.post &&
                                                      validation.errors.post
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.post &&
                                                  validation.errors.post ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.post}
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
                                                    name="tel_pro"
                                                    label="tel_pro"
                                                    type="text"
                                                    placeholder="21458796"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.tel_pro ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched.tel_pro &&
                                                      validation.errors.tel_pro
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.tel_pro &&
                                                  validation.errors.tel_pro ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.tel_pro}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              
                                            </Row>
                                            <Row>
                                              <Col xs={12}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Email professionnel
                                                  </Label>
                                                  <Input
                                                    name="email_pro"
                                                    type="text"
                                                    placeholder="emailàemail.com"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .email_pro || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .email_pro &&
                                                      validation.errors
                                                        .email_pro
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched
                                                    .email_pro &&
                                                  validation.errors
                                                    .email_pro ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .email_pro
                                                      }
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Date embauche
                                                  </Label>
                                                  <Input
                                                    name="date_embauche"
                                                    label="date embauche "
                                                    type="date"
                                                    placeholder="date fin"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.date_embauche ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .date_embauche &&
                                                      validation.errors.date_embauche
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.date_embauche &&
                                                  validation.errors.date_embauche ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.date_embauche}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Date fin
                                                  </Label>
                                                  <Input
                                                    name="date_fin"
                                                    label="date fin "
                                                    type="date"
                                                    placeholder="date fin"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.date_fin ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .date_fin &&
                                                      validation.errors.date_fin
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.date_fin &&
                                                  validation.errors.date_fin ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.date_fin}
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

export default withRouter(CarriereList)
