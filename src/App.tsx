import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/not-found";

export default function App() {
  return (
    <main className="container">
      <Route path="/movies" component={Movies} />
      <Route path="/customers" component={Customers} />
      <Route path="/rentals" component={Rentals} />
      <Route path="/not-found" component={NotFound} />
    </main>
  );
}
