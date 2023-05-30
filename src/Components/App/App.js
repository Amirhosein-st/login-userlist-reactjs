import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedLayout from "../Layout/Layout";
import ProtectedLayoutLS from "../Layout/Layout-2";
import NotFound from "../../Pages/NotFound/notFound";
import Header from "../../Components/Header - Footer/Header-Footer-Site/Header";
import Footer from "../../Components/Header - Footer/Header-Footer-Site/Footer";
import HeaderLS from "../../Components/Header - Footer/Header-Footer-LS/Header-LS";

import LoginPage from '../../Pages/LoginPage/LoginPage';
import HomePage from '../../Pages/HomePage/HomePage';
import UserListPage from '../../Pages/UserListPage/UserListPage';
import UserPage from '../../Pages/UserPage/UserPage';

function App() {

  return (
    <Routes>

      <Route element={<ProtectedLayoutLS />}>
        <Route path="/" element={
          <HeaderFooterLS>
            <LoginPage />
          </HeaderFooterLS>} />
        <Route path="/Login" element={
          <HeaderFooterLS>
            <LoginPage />
          </HeaderFooterLS>} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedLayout />}>

        <Route path="/home" element={
          <HeaderFooterSite>
            <HomePage />
          </HeaderFooterSite>} />

        <Route path="/home/userlist" element={
          <HeaderFooterSite>
            <UserListPage />
          </HeaderFooterSite>} />

        <Route path="/home/userlist/user/:id" element={
          <HeaderFooterSite>
            <UserPage />
          </HeaderFooterSite>} />

        {/* <Route path="*" element={<NotFound />} /> */}
        
      </Route>

    </Routes>
  );
}

function HeaderFooterSite({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
function HeaderFooterLS({ children }) {
  return (
    <>
      <HeaderLS />
      {children}

    </>
  );
}

export default App;