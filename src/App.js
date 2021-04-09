import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import * as ROUTES from "./constants/routes";
import AccountPage from "./components/AccountPage/AccountPage";
import ProductsListPage from "./components/ProductsListPage/ProductListPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path={ROUTES.LANDING}>
            <HomePage />
          </Route>
          <Route path={ROUTES.HOME}>
            <HomePage />
          </Route>
          <Route path={ROUTES.ACCOUNT}>
            <AccountPage />
          </Route>
          <Route path={ROUTES.OFFERS}>
            <ProductsListPage />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;