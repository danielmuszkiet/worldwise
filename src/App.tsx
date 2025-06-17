import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/FakeAuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import HomePage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="product"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <Product />
                </Suspense>
              }
            />
            <Route
              path="pricing"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <Pricing />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<SpinnerFullPage />}>
                    <AppLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>

            <Route
              path="*"
              element={
                <Suspense fallback={<SpinnerFullPage />}>
                  <PageNotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
