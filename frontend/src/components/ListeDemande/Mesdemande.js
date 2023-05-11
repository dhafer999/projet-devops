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
  Badge,
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { useFormik } from "formik"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import * as Yup from "yup"

import images from "assets/images"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import Select from "react-select"

import { isEmpty, size, map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import {
  addUser,
  currentUser,
  deleteuser,
  getalluser,
  getusers,
  updateuser,
} from "store/user/user_action"
import { adddemande, deletedemande, getalldemandeMy, updatedemande } from "store/demande/demande_action"
import { getallConge } from "store/conge/conge_action"

const MesDemandeList = props => {
  const dispatch = useDispatch()

  const curUser = useSelector(state => state.User_reducer.user)
  // console.log("🚀 ~ file: Mesdemande.js ~ line 55 ~ curUser", curUser)
  useEffect(() => {
    if (curUser && !curUser?._id) {
      dispatch(currentUser())
    }
  }, [dispatch, curUser])

  const [contact, setContact] = useState()
  const [ancienSolde,setancienSolde]=useState(0)
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      dateDebut: (contact && contact.dateDebut) || "",
      raison: (contact && contact.raison) || "",
      idConge: (contact && contact.idConge) || "",
      nbJours: (contact && contact.nbJours) || "",
    },
    validationSchema: Yup.object({
      dateDebut: Yup.string().required(),
      raison: Yup.string().required(),
      idConge: Yup.string().required(),
      nbJours: Yup.string().required(),
    }),
    onSubmit: values => {
      console.log("submit ",values)

      if (isEdit) {
        const updateDemande = {
          _id: contact._id,
          idManager: contact.idManager,
          dateDemande: contact.dateDemande,
          idEmploye: contact.idEmploye,
          dateConfirmAdmin: "",
          dateDebut: values.dateDebut,
          raison: values.raison,
          idConge: contact.idConge,
          dateConfirmManager :contact.dateConfirmManager ,
          status: contact.status,
          nbJours: values.nbJours,
        }
        

        console.log("🚀 ~ file: Mesdemande.js ~ line 94 ~ updateDemande", updateDemande)

        // update user
        dispatch(updatedemande(updateDemande,ancienSolde))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newDemande = {
          dateConfirmManager: `${curUser.role === "manger" ? new Date().toISOString().slice(0,10) : ""}`,
          status: `${
            curUser.role === "manger" ? "Confirm Manager" : "Encours"
          }`,
          idManager: curUser.id_manager,
          dateDemande: new Date().toISOString().slice(0,10),
          idEmploye: curUser.username,
          dateConfirmAdmin: "",
          dateDebut: values.dateDebut,
          raison: values.raison,
          idConge: values.idConge,
          nbJours: values.nbJours,
        }
        // save new user
        console.log("new newDemande :: >> ", newDemande)
        dispatch(adddemande(newDemande))
        validation.resetForm()
      }
      toggle()
    },
  })

  const users = useSelector(state => state.Demande_reducer.listAllMy).reverse()

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search
  const sizePerPage = 15
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
                {user?.idEmploye?.charAt(0)}
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
      text: "Date demande ",
      dataField: "dateDemande",
      sort: true,
    },
    {
      dataField: "dateDebut",
      text: "Date debut",
      sort: true,
    },
    {
      text: "Congé ",
      dataField: "idConge",
      sort: true,
    },
    {
      text: "Période ",
      dataField: "nbJours",
      sort: true,
    },
    {
      text: "Manager ",
      dataField: "dateConfirmManager",
      sort: true,
    },
    {
      dataField: "Admin",
      text: "dateConfirmAdmin",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={
            "font-size-12 badge-soft-" +
            `${
              row.status === "Refus"
                ? "danger"
                : row.status === "Confirm Manager"
                ? "warning"
                : row.status === "Confirm Admin"
                ? "success"
                : "primary"
            }`
          }
          color={"danger"}
          pill
        >
          {row.status}
        </Badge>
      ),
    },
    {
      dataField: "raison",
      text: "Raison ",
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
          {user.status === "Encours" && (
            <>
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
            </>
          )}
        </div>
      ),
    },
  ]



  const conges = useSelector(state => state.Conge_reducer.listAll)
  console.log("🚀 ~ file: Mesdemande.js ~ line 280 ~ conges", conges)
  

  useEffect(() => {
    if (conges && !conges.length) {
      dispatch(getallConge()).then(
        conges.map(c => setListeConge(prev => [...prev, c.type]))
      )
    }

    // console.log("🚀 ~ file: Mesdemande.js ~ line 277 ~ listConges", listConges)
  }, [dispatch, conges])

  useEffect(() => {
    if ((curUser && !curUser?._id) && (users && !users.length)) {
      dispatch(currentUser()).then(dispatch(getalldemandeMy(curUser)))
     
  
      // console.log(
      //   "🚀 ~ file: Mesdemande.js ~ line 266 ~ useEffect ~ users",
      //   users
      // )
    } else if (users && !users.length) {
      dispatch(getalldemandeMy(curUser))
    }

  }, [dispatch, curUser, users])

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
    console.log("edit")
    const user = arg
    setancienSolde(user.nbJours)

    setContact({
      _id: user._id,
          idManager: user.idManager,
          dateDemande: user.dateDemande,
          idEmploye: user.idEmploye,
          dateConfirmAdmin: "",
          dateDebut: user.dateDebut,
          raison: user.raison,
          idConge: user.idConge,
          dateConfirmManager :user.dateConfirmManager ,
          status: user.status,
          nbJours:user.nbJours
    })
    setIsEdit(true)
    console.log("contact",contact)
    console.log("user " ,user)

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
    dispatch(deletedemande(contact))
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
          <title>Mes demndes</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="Demandes" />
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
                                      Nouvel demande
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
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Date debut
                                                  </Label>
                                                  <Input
                                                    name="dateDebut"
                                                    type="date"
                                                    placeholder="nom"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .dateDebut || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .dateDebut &&
                                                      validation.errors
                                                        .dateDebut
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched
                                                    .dateDebut &&
                                                  validation.errors
                                                    .dateDebut ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .dateDebut
                                                      }
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label htmlFor="validationCustom02">
                                                    Type de congé
                                                  </Label>

                                                  <select
                                                    defaultValue={
                                                      validation.values
                                                        .idConge || ""
                                                    }
                                                    className="form-select"
                                                    name="idConge"
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

                                                    {conges.map(e => (
                                                      <option
                                                        key={e._id}
                                                        value={e.type}
                                                      >
                                                        {e.type}
                                                      </option>
                                                    ))}
                                                  </select>

                                                  {validation.touched.idConge &&
                                                  validation.errors.idConge ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .idConge
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
                                                    Raison
                                                  </Label>
                                                  <Input
                                                    name="raison"
                                                    type="text"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .raison || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .raison &&
                                                      validation.errors.raison
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.raison &&
                                                  validation.errors.raison ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.raison}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Période
                                                  </Label>
                                                  <Input
                                                    name="nbJours"
                                                    type="number"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .nbJours || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .nbJours &&
                                                      validation.errors.nbJours
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.nbJours &&
                                                  validation.errors.nbJours ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.nbJours}
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

export default withRouter(MesDemandeList)
