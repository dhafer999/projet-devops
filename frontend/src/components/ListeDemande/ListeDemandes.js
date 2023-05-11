import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import { Button, Card, CardBody, Col, Row, Badge, Container } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import Breadcrumbs from "components/Common/Breadcrumb"

import { MetaTags } from "react-meta-tags"
import {  getalldemandeAd, updatedemande } from "store/demande/demande_action"

const LatestTranaction = props => {
  const dispatch = useDispatch()
const orders = useSelector(state => state.Demande_reducer.listAllAd).reverse()

  //   useEffect(() => {
  //     dispatch(onGetOrders())
  //   }, [dispatch])

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [orderList, setOrderList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }

  const actionsDemande = (demande, action) => {
    demande.status = action
    demande.dateConfirmAdmin = new Date().toISOString().slice(0,10) 
    console.log("demande ", demande)
    console.log("action ", action)
    dispatch(updatedemande(demande))
  }

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1)

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "idEmploye",
      text: "Demandeur",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.idEmploye}
        </Link>
      ),
    },
    {
      dataField: "idManager",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "dateDebut",
      text: "Date debut",
      sort: true,
    },
    {
      dataField: "idConge",
      text: "Congé",
      sort: true,
    },
    {
      dataField: "nbJours",
      text: "Période ",
      sort: true,
    },
    {
      dataField: "raison",
      text: "Raison",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    // {
    //   dataField: "paymentMethod",
    //   isDummyField: true,
    //   text: "Payment Method",
    //   sort: true,
    //   // eslint-disable-next-line react/display-name
    //   formatter: (cellContent, row) => (
    //     <>
    //       <i
    //         className={
    //           row.paymentMethod !== "COD"
    //             ? "fab fa-cc-" + toLowerCase1(row.paymentMethod) + " me-1"
    //             : "fab fas fa-money-bill-alt me-1"
    //         }
    //       />{" "}
    //       {row.paymentMethod}
    //     </>
    //   ),
    // },
    {
      dataField: "view",
      isDummyField: true,
      text: "Actions",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          {(row.status !== "Refus" && row.status !== "Confirm Admin" )? (
            <>
              <Button
                type="button"
                color="primary"
                className="btn-sm btn-rounded"
                onClick={() => actionsDemande(row, "Confirm Admin")}
              >
                Confirm
              </Button>
              <Button
                type="button"
                color="danger"
                className="btn-sm btn-rounded"
                onClick={() => actionsDemande(row, "Refus")}
              >
                Refuser
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ]
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    console.log("orders ", orders.length)
    if (orders && !orders.length) {
      dispatch(getalldemandeAd())
    }
  }, [orders])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Liste des demande </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Liste" breadcrumbItem="demandes" />
          {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
          <Row>
            <Card>
              <CardBody>
                {/* <div className="mb-4 h4 card-title">Latest Transaction</div> */}
                <PaginationProvider
                  pagination={paginationFactory(pageOptions)}
                  keyField="id"
                  columns={EcommerceOrderColumns(toggle)}
                  data={orders}
                >
                  {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                      keyField="id"
                      data={orders}
                      columns={EcommerceOrderColumns(toggle)}
                      bootstrap4
                      search
                    >
                      {toolkitProps => (
                        <React.Fragment>
                          <Row>
                            <Col xl="12">
                              <div className="table-responsive">
                                <BootstrapTable
                                  keyField="id"
                                  responsive
                                  bordered={false}
                                  striped={false}
                                  defaultSorted={defaultSorted}
                                  selectRow={selectRow}
                                  classes={
                                    "table align-middle table-nowrap table-check"
                                  }
                                  headerWrapperClasses={"table-light"}
                                  {...toolkitProps.baseProps}
                                  {...paginationTableProps}
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="pagination pagination-rounded justify-content-end">
                            <PaginationListStandalone {...paginationProps} />
                          </div>
                        </React.Fragment>
                      )}
                    </ToolkitProvider>
                  )}
                </PaginationProvider>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(LatestTranaction)
