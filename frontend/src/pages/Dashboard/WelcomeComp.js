import React, { useEffect } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"
import { useDispatch, useSelector } from "react-redux"
import { getallJOUR } from "store/jour/jour_actions"

const WelcomeComp = () => {
  const jours = useSelector(state => state.Jour_reducer.listAll)

  const dispatch = useDispatch()

  useEffect(() => {
    if (jours && !jours.length) {
      dispatch(getallJOUR())
    }
  }, [dispatch, jours])
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Bienvenue</h5>
                <p> Jour férié</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="12">
              <div className="pt-4">
                <Row>
                  {jours.map((jour, i) => (
                    <Col key={i} xs="4" className="mb-3">
                      <h5 className="font-size-15">{jour.title}</h5>
                      <p className="text-muted mb-0">{jour.dateDebut.slice(0,10)} </p>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
