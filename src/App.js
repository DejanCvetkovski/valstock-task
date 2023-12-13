import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Albums, Details, Login } from "./pages";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import React, { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/albums/:id" element={<Albums />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
      </Provider>
    </>
  );
}

export default App;
