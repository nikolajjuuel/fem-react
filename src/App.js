import Strickmode from "react"
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import SearchParam from "./SearchParams";
import Details from "./details";

const App = () => {
  return (
    <div>
      <Router>
        <header>
          <Link to="/">
            <h1>"Adopt Me!"</h1>
          </Link>
        </header>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
            <SearchParam />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(
  <App />
  ,
  document.getElementById("root"));
