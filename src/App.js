import React, { Component } from 'react';

import {
  Col,
  Row,
  Container,
  Navbar,
  Nav,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contributors: [],
      contributionsTotal: 0,
    };

    this.getContributors();
  }

  getContributors() {
    fetch("https://api.github.com/repos/shaderboi/hexagon-engine/contributors")
      .then((dataJson) => dataJson.json())
      .then((data) => {
        this.setState({
          contributors: data,
          contributionsTotal: data.reduce(
            (acc, curr) => acc + curr.contributions
            , this.state.contributionsTotal)
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">
            <img
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Hexagon Engine logo"
            />{' '}
            Hexagon Engine
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav>
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Tutorial</Nav.Link>
            <Nav.Link href="docs/">Documentation</Nav.Link>
          </Nav>
          <Nav className="ml-auto pr-md-5">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 200 }}
              overlay={<Tooltip id="t-github">Github</Tooltip>}
            >
              <Nav.Link
                href="https://github.com/shaderboi/hexagon-engine"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
                <span className="sr-only">GitHub</span>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar>
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h2>Hexagon Engine</h2>
              <small>Experimental game engine</small>
              <h2>Contributors</h2>
              <p>Hexagon Engine is a community project and is very thankful for the many community contributions it receives.</p>
              <p>We have had {this.state.contributors.length} individuals with total {this.state.contributionsTotal} contributions so far. Thank you so much!</p>
              <Container>
                <Row>
                  {
                    this.state.contributors.map(
                      (data) => (
                        <>
                          <Col sm={3}>
                            <img src={data.avatar_url} alt={data.login} style={{ width: '100%' }} />
                            <h2>{data.login}</h2>
                            <p>Contributions: {data.contributions}</p>
                          </Col>
                        </>
                      )
                    )
                  }
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
