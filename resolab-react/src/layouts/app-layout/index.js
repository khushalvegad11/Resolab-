import React from "react";
import { Header, Footer } from "components/layout-components";
import AppViews from "pages";

export const AppLayout = ({ location, direction }) => {
  return (
    <>
      <Header />
      <AppViews />
      <Footer />
    </>
  );
};