import React, { useState } from 'react';
import './App.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { createBrowserHistory } from "history";

const client = new ApolloClient({
  uri: 'https://ion-movies.herokuapp.com/',
  cache: new InMemoryCache(),
});

const history = createBrowserHistory();

function App() {
  const [searchText, setSearchText] = useState("");
  const handleSearchSubmit = () => {
    setSearchText(searchText);
    history.push({
      pathname: `/?title=${searchText}`,
    });
    history.go(0);

  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit();
  }
  const handleSearchKeyUp = (event) => {
    if (event.key === 'Enter' && event.keyCode === 13) {
      handleSearchSubmit();
    }
  }
  const handleSearchInput = (event) => {
    event.preventDefault();
    setSearchText(event.target.value)

  }


  return (
    <ApolloProvider client={client} history={history}>
      <Navbar bg="dark" variant="dark" >
        <div className="container">
          <Navbar.Brand href="/">I-ON Movies</Navbar.Brand>
          <Form className="form-search" onSubmit={handleFormSubmit}>
            <FormControl type="text" placeholder="Search" aria-label="Search"
              value={searchText}
              onChange={handleSearchInput}
              onKeyUp={handleSearchKeyUp}
            />
            <FontAwesomeIcon icon={faSearch} onClick={handleSearchSubmit} />
          </Form>
        </div>
      </Navbar>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={`?title=${searchText}`} component={Home} />
          <Route exact path="/:id" component={Detail} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
