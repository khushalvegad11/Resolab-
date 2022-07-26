import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginSignupModal } from "../../redux/header/headerSlice";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const handleOverlay = () => {
    dispatch(setShowLoginSignupModal(false));
  };

  const loginModalStatus = useSelector(
    (state) => state.headerReducer.showLoginSignupModal
  );
  return (
    <>
      <Header />
      <div>this is dashboard</div>
      <Footer />
      {loginModalStatus ? (
        <div className="overlay fade show" onClick={handleOverlay}></div>
      ) : null}
    </>
  );
};
