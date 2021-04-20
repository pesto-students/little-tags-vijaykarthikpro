import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import * as ROUTES from './constants/routes';
import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AccountPage from './components/AccountPage/AccountPage';
import ProductsListPage from './components/ProductsListPage/ProductListPage';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
// import Wishlist from "./components/Wishlist/Wishlist";
import withAuthentication from './components/Session/withAuthentication';

var x;

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <Router>
          <Header />
          <Switch>
            <Route path={ROUTES.ACCOUNT}>
              <AccountPage />
            </Route>
            <Route path={ROUTES.OFFERS}>
              <ProductsListPage />
            </Route>
            <Route path={ROUTES.PRODUCT}>
              <ProductsListPage />
            </Route>
            <Route path={ROUTES.PRODUCT_DETAILS}>
              <ProductDetailsPage />
            </Route>
            {/* <Route path={ROUTES.WISHLIST}>
              <Wishlist />
            </Route> */}
            <Route path={ROUTES.CHECKOUT}>
              <CheckoutPage />
            </Route>
            <Route path={ROUTES.HOME}>
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default withAuthentication(App);
