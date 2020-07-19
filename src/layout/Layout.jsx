import React, { Component } from "react";
import routes from '../routes';
import { Route, Switch } from "react-router-dom";
import '../assets/styles/main.scss'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      movie: {}
    };
  }
  handleInputChange(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  handleSubmit() {

  }
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand href="/">I-ON Test</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form className="form-search" action="/" onSubmit={this.handleSubmit}>
            <input className="form-control form-control-sm " type="text" placeholder="Search"
              aria-label="Search"
              placeholder="Search"
              value={this.state.filter}
              onChange={(events) => this.handleInputChange(events)} />
            <FontAwesomeIcon icon={faSearch} onClick={this.handleSubmit} />
          </Form>
        </div>

      </Navbar>
    );
  }
}

export default Admin;
