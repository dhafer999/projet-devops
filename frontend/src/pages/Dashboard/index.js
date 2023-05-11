import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"

import classNames from "classnames"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import { getChartsData as onGetChartsData } from "../../store/actions"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
import { getalldepartement } from "store/departement/departement_action"
import { getalluser } from "store/user/user_action"
import { getallConge } from "store/conge/conge_action"
import { getalletablissement } from "store/etablissement/etablissement_action"
import { getallJOUR } from "store/jour/jour_actions"
import { Player } from 'video-react';


const Dashboard = props => {
  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData,
  }))

  const dispatch = useDispatch()

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  const listDep = useSelector(state => state.Departement_reducer.listAll)
  const users = useSelector(state => state.User_reducer.listUser)
  const conges = useSelector(state => state.Conge_reducer.listAll)
  const etabs = useSelector(state => state.Etablissement_reducer.listAll)
  const jours = useSelector(state => state.Jour_reducer.listAll)
  const departements = useSelector(state => state.Departement_reducer.listAll)

  useEffect(() => {
    if (listDep && !listDep.length) {
      dispatch(getalldepartement())
    }
    if (users && !users.length) {
      dispatch(getalluser())
    }
    if (conges && !conges.length) {
      dispatch(getallConge())
    }
    if (etabs && !etabs.length) {
      dispatch(getalletablissement())
    }
    if (departements && !departements.length) {
      dispatch(getalldepartement())
    }
    if (jours && !jours.length) {
      dispatch(getallJOUR())
    }
  }, [dispatch, listDep, users, conges, etabs, departements])

  const reports = [
    {
      title: "Emplyers",
      iconClass: "bx-copy-alt",
      description: `${users.filter(u => u.role === "user").length}`,
    },
    {
      title: "Congés",
      iconClass: "bx-purchase-tag-alt",
      description: conges.length,
    },
    {
      title: "Departements",
      iconClass: "bx-archive-in",
      description: departements.length,
    },
    {
      title: "Manager",
      iconClass: "bx-archive-in",
      description: `${users.filter(u => u.role === "manager").length}`,
    },
    { title: "Jours", iconClass: "bx-archive-in", description: jours.length },
    {
      title: "Etablissements",
      iconClass: "bx-purchase-tag-alt",
      description: etabs.length,
    },
  ]
  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])

  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(onGetChartsData(pType))
  }

  useEffect(() => {
    dispatch(onGetChartsData("yearly"))
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Tableau de bord | React template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Tableau de bord")}
            breadcrumbItem={props.t("Tableau de bord")}
          />

          <Row>
            <Col xl="4">
              <WelcomeComp />
              {/* <MonthlyEarning /> */}
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
              
            </Col>
           
          </Row>

      

      
        </Container>
      </div>

      {/* subscribe ModalHeader */}
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
