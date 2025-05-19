// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({ data }) => {
  // Sample data for key metrics
  const keyMetrics = {
    totalTransactions: 12456, // Example data
    totalEarnings: 78900, // Example data
    activeUsers: 345, // Example data
    realTimeBalance: {
      gateway1: 10000,
      gateway2: 15000,
      gateway3: 20000,
    },
  };

  return (
    <>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            {data && (
              <Row>
                <Col lg="6" xl="3">
              
                  <Card className="card-stats mb-4 mb-xl-0">
                    
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Total Transactions
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {keyMetrics.totalTransactions}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Total Earnings
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            ${keyMetrics.totalEarnings}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Active Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {keyMetrics.activeUsers}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Real-Time Balance
                          </CardTitle>
                          <ul className="list-unstyled mb-0">
                            {Object.entries(keyMetrics.realTimeBalance).map(
                              ([gateway, balance]) => (
                                <li
                                  key={gateway}
                                  className="h2 font-weight-bold mb-0">
                                  {gateway}: ${balance}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-dollar-sign" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 5.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </Container>
    </>
  );
};

export default Header;
