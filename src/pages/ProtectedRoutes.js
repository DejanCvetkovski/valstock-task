import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/Modal/CustomModal";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import { useEffect } from "react";
import { hideMessage } from "../redux/message";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isOpen = useSelector((state) => state.modalReducer.isOpen);
  const { message, showMessage } = useSelector((state) => state.successMessage);

  useEffect(() => {
    const close = (e) => {
      if (showMessage) {
        dispatch(hideMessage());
      } else {
        return;
      }
    };
    document.addEventListener("mousedown", close);
  });

  return isLoggedIn ? (
    <>
      <Outlet />
      {isOpen && <CustomModal />}
      {showMessage && <SuccessMessage>{message}</SuccessMessage>}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
