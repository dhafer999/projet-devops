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
import { currentUser } from "store/user/user_action"
import {
  addSolde,
  deleteSolde,
  getallSolde,
  updateSolde,
} from "store/solde/solde_action"

const SoldeList = props => {
  const dispatch = useDispatch()

  const curUser = useSelector(state => state.User_reducer.user)
  useEffect(() => {
    if (curUser && !curUser?._id) {
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
      nbJours: (contact && contact.nbJours) || "",
      idEmploye: (contact && contact.idEmploye) || "",
      idEmploye: (contact && contact.idEmploye) || "",
    },
    validationSchema: Yup.object({
      nbJours: Yup.string().required(),
      idEmploye: Yup.string().required(),
      idConge: Yup.string().required(),
    }),
    onSubmit: values => {
      console.log("submit ")

      if (isEdit) {
        const updatejour = {
          _id: contact._id,
          nbJours: values.nbJours,
          idEmploye: values.idEmploye,
          idConge: values.idConge,
        }

        // update user
        dispatch(updateSolde(updatejour))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newjour = {
          nbJours: values.nbJours,
          idEmploye: values.idEmploye,
          idConge: values.idConge,
        }
        // save new user
        dispatch(addSolde(newjour))
        // validation.resetForm()
      }
      toggle()
    },
  })

  const users = useSelector(state => state.Solde_reducer.listAll).reverse()

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
                {user?.idConge?.charAt(0)}
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
      dataField: "nbJours",
      text: "nombre des jours ",
      sort: true,
    },
    {
      dataField: "idEmploye",
      text: "Nom d'tilisateur  ",
      sort: true,
    },
    {
      text: "type de conge  ",
      dataField: "idConge",
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
          {/* <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(user)}
            ></i>
          </Link> */}
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (users && !users.length) {
      dispatch(getallSolde())
      setIsEdit(false)
    }
  }, [dispatch, users])

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

    setContact(arg)
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
    dispatch(deleteSolde(contact))
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
          <title>Liste des soldes</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="soldes" />
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
                                      Nouvel solde
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
                                        {!!isEdit
                                          ? "Modifier solde"
                                          : "Ajouter Solde"}
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
                                              <Col xs={4}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Nombre de jour
                                                  </Label>
                                                  <Input
                                                    name="nbJours"
                                                    type="number"
                                                    placeholder=" nombre des jours   "
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
                                                      {
                                                        validation.errors
                                                          .nbJours
                                                      }
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>

                                              <Col xs={4}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    Nom utilisateur
                                                  </Label>
                                                  <Input
                                                    name="idEmploye"
                                                    label="utilisateur "
                                                    type="text"
                                                    placeholder="utilisateur "
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .idEmploye || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .idEmploye &&
                                                      validation.errors
                                                        .idEmploye
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched
                                                    .idEmploye &&
                                                  validation.errors
                                                    .idEmploye ? (
                                                    <FormFeedback type="invalid">
                                                      {
                                                        validation.errors
                                                          .idEmploye
                                                      }
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                              <Col xs={4}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                    type de conge
                                                  </Label>
                                                  <Input
                                                    name="idConge"
                                                    label="Type conge "
                                                    type="text"
                                                    placeholder="text"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values
                                                        .idConge || ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .idConge &&
                                                      validation.errors.idConge
                                                        ? true
                                                        : false
                                                    }
                                                  />
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

export default withRouter(SoldeList)
