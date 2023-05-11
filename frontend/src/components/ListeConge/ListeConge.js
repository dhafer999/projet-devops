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
import { addUser, currentUser, deleteuser, getalluser, getusers, updateuser } from "store/user/user_action"
import { addConge, deleteConge, getallConge, updateConge } from "store/conge/conge_action"

const CongeList = props => {
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
      type: (contact && contact.type)||"",
      periode: (contact && contact.periode) || "",
      labelle: (contact && contact.labelle) || "",
     
    },
    validationSchema: Yup.object({
        type: Yup.string().required(),
        periode: Yup.string().required(),
        labelle: Yup.string().required(),
     
    }),
    onSubmit: values => {
      console.log("submit ")

      if (isEdit) {
        const updateconge = {
          _id: contact._id,
          type: values.type,
          periode: values.periode,
          labelle: values.labelle,
         
        }

        // update user
        dispatch(updateConge(updateconge))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newConge = {
            type: values.type,
            periode: values.periode,
            labelle: values.labelle,
        }
        // save new user
        console.log("new conge :: >> ", newConge)
        dispatch(addConge(newConge))
        // validation.resetForm()
      }
      toggle()
    },
  })

  const users = useSelector(state => state.Conge_reducer.listAll).reverse()


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
                {user?.type?.charAt(0)}
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
     dataField: "type",
      text: "Type ",
      sort: true,
    },
    {
      dataField: "periode",
      text: "Periode ",
      sort: true,
    },
    {
      text: "Description ",
      dataField: "labelle",
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
      dispatch(getallConge())
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
    console.log('edit')
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
    dispatch(deleteConge(contact))
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
          <title>Liste des congés</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="congés" />
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
                                      Nouvel conge
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
                                                      Type
                                                    </Label>
                                                    <Input
                                                      name="type"
                                                      type="text"
                                                      placeholder="type congée "
                                                      onChange={
                                                        validation.handleChange
                                                      }
                                                      onBlur={
                                                        validation.handleBlur
                                                      }
                                                      value={
                                                        validation.values
                                                          .type || ""
                                                      }
                                                      invalid={
                                                        validation.touched
                                                          .type &&
                                                        validation.errors
                                                          .type
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {validation.touched
                                                      .type &&
                                                    validation.errors
                                                      .type ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .type
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                         

                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label className="form-label">
                                                  periode
                                                  </Label>
                                                  <Input
                                                    name="periode"
                                                    label="periode"
                                                    type="text"
                                                    placeholder="periode"
                                                    onChange={
                                                      validation.handleChange
                                                    }
                                                    onBlur={
                                                      validation.handleBlur
                                                    }
                                                    value={
                                                      validation.values.periode ||
                                                      ""
                                                    }
                                                    invalid={
                                                      validation.touched
                                                        .periode &&
                                                      validation.errors.periode
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  {validation.touched.periode &&
                                                  validation.errors.periode ? (
                                                    <FormFeedback type="invalid">
                                                      {validation.errors.periode}
                                                    </FormFeedback>
                                                  ) : null}
                                                </div>
                                              </Col>
                                            </Row>
                                            
                                              <Row>
                                                <Col xs={12}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Description 
                                                    </Label>
                                                    <Input
                                                      name="labelle"
                                                      type="text"
                                                      placeholder="labelle"
                                                      onChange={
                                                        validation.handleChange
                                                      }
                                                      onBlur={
                                                        validation.handleBlur
                                                      }
                                                      value={
                                                        validation.values
                                                          .labelle || ""
                                                      }
                                                      invalid={
                                                        validation.touched
                                                          .labelle &&
                                                        validation.errors
                                                          .labelle
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {validation.touched
                                                      .labelle &&
                                                    validation.errors
                                                      .labelle ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .labelle
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

export default withRouter(CongeList)
