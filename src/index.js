import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import Detail from './views/Detail.jsx';
import NotFound from './views/NotFound.jsx';
import Home from './views/Home.jsx';
import './assets/styles/main.scss'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      movie: {}
    };
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this)
  }

  handleSearchInput() {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit() {
    if (this.state.searchText) {
      let text = this.state.searchText;
      debugger;
      this.setState({ searchText: "" });
      this.props.history.push({
        pathname: "/",
        state: { searchText: text }
      })
    }
  };

  handleSearchKeyUp() {
    if (event.key === 'Enter' && event.keyCode === 13) {
      this.handleSearchSubmit();
    }
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.handleSearchSubmit();
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <div className="container">
            <Navbar.Brand href="/">I-ON Test</Navbar.Brand>
            {/* <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav> */}
            <Form className="form-search" onSubmit={this.handleFormSubmit}>
              <FormControl type="text" placeholder="Search"
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
      </>
    );
  }
}

export default withRouter(Index);