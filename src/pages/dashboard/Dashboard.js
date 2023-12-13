import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData, useGetImagesListQuery } from "../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../redux/modalSlice";
import "./dashboard.css";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.images);

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchApiData());
    }
  }, [dispatch, data.length]);

  const addToAlbum = (id) => {
    dispatch(showModal(id));
  };

  return (
    <Container>
      <div className="grid-container">
        {status !== "success" ? (
          <small>no data found...</small>
        ) : (
          data.map((image) => (
            <div key={image.id} className="image-container">
              <img
                alt="img"
                src={image.download_url}
                onClick={() => navigate(`/details/${image.id}`)}
              />
              <button
                type="button"
                className="overlay-btn"
                onClick={() => addToAlbum(image.id)}
              >
                ADD TO ALBUM
              </button>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
