import React from "react";
import { Route, Switch, withRouter, BrowserRouter, Redirect, Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Layout from "./layout/Layout.jsx";
import Detail from './views/Detail.jsx';
import NotFound from './views/NotFound.jsx';
import Home from './views/Home.jsx';
import './assets/styles/main.scss'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { concat } from "@apollo/client/link/core/concat";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      movie: {}
    };
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleRoute(props) {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput(event) {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit() {
    if (this.state.searchText) {
      let text = this.state.searchText;
      this.setState({ searchText: "" })
      this.props.history.push({
        pathname: "/",
        state: { searchText: text }
      });
    }
  };

  handleFormSubmit(e) {
    e.preventDefault();
    this.handleSearchSubmit();
  }
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <div className="container">
            <Navbar.Brand href="/">I-ON Test</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Form className="form-search" onSubmit={this.handleFormSubmit}>
              <input className="form-control form-control-sm " type="text" placeholder="Search"
                aria-label="Search"
                placeholder="Search"
                value={this.state.searchText}
                onChange={this.handleSearchInput} />
              <FontAwesomeIcon icon={faSearch} onClick={this.handleSearchSubmit} />
            </Form>
          </div>

        </Navbar>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/detail" component={Detail} exact={true} />
          <Route path="/:id" component={Detail} exact={true} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Index);