import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/not-found";
import NavBar from "./components/common/nav-bar";
import MovieForm from "./components/movie-form";
import { ContactUsForm } from "./components/contact-us-form";
import { Register } from "./components/register";

/* The routing works as follows. The Switch component makes sure only one
 *  URL is matched. Then the Route renders the components associated with the
 *  URL-path. And then Redirect makes sure only legal URL's are used, and otherwise
 *  it send/redirect the user to a NotFound page.
 * */
export default function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={ContactUsForm} />
          <Route path="/register" component={Register} />
          <Route path="/contact-us" component={ContactUsForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}
