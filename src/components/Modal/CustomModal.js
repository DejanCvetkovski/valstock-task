import React, { useState } from "react";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/modalSlice";
import { addAlbum, addToExisting } from "../../redux/albums";
import Button from "../Button/Button";
import { showMessage } from "../../redux/message";

const CustomModal = () => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedBtn] = useState("btnCreate");
  const [albumName, setAlbumName] = useState("");
  const [selectedExistingAlbum, setSelectedExistingAlbum] = useState("");
  const { isOpen, itemId } = useSelector((state) => state.modalReducer);
  const { myAlbums } = useSelector((state) => state.albums);
  const data = useSelector((state) => state.images.data);
  const { user } = useSelector((state) => state.auth);
  const imageDetails = data.find((image) => image.id === itemId);
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleCloseModal = () => {
    dispatch(hideModal(false));
  };

  const handleCreteNewAlbum = () => {
    setSelectedBtn("btnCreate");
    setSelectedExistingAlbum("");
  };

  const handleAddToAlbum = () => {
    setSelectedBtn("btnAdd");
  };

  const handleSave = () => {
    if (selectedButton === "btnAdd") {
      dispatch(
        addToExisting({ id: selectedExistingAlbum, image: { ...imageDetails } })
      );
      dispatch(showMessage({ showMessage: true, message: "ADD TO ALBUM" }));
    } else {
      dispatch(
        addAlbum({
          id: albumName,
          albumName: albumName,
          createdBy: user.username,
          creationDate: date.toLocaleDateString("en-GB", options),
          images: [{ ...imageDetails }],
        })
      );
      dispatch(
        showMessage({ showMessage: true, message: "NEW ALBUM CREATED" })
      );
    }
    dispatch(hideModal());
  };

  const addAlbumName = (e) => {
    setAlbumName(e.target.value);
  };

  return (
    <section role="dialog" className="overlay">
      <article className={`modal-container`}>
        <div className="actions-top">
          <button
            type="button"
            className={`${
              selectedButton === "btnCreate"
                ? "selected-btn"
                : "notSelected-btn"
            }`}
            onClick={() => handleCreteNewAlbum()}
          >
            CREATE NEW ALBUM
          </button>
          <button
            type="button"
            className={`${
              selectedButton === "btnAdd" ? "selected-btn" : "notSelected-btn"
            }`}
            onClick={() => handleAddToAlbum()}
          >
            ADD TO EXISTING
          </button>
        </div>
        <div className="center-container">
          {selectedButton === "btnCreate" && (
            <div className="form-group">
              <label htmlFor="albumName"></label>
              <input
                type="text"
                className="form-control input-albumName"
                name="albumName"
                aria-describedby="albumName"
                placeholder="Enter title here"
                onChange={addAlbumName}
              />
            </div>
          )}
          {selectedButton === "btnAdd" && (
            <div className="select-albums">
              {myAlbums.map((album, index) => (
                <h2
                  key={index}
                  onClick={() => setSelectedExistingAlbum(album.albumName)}
                  className={`${
                    selectedExistingAlbum === album.albumName ? "selected" : ""
                  }`}
                >
                  {album.albumName}
                </h2>
              ))}
            </div>
          )}
        </div>
        <div className="buttons-bottom">
          <Button onClick={handleCloseModal}>CANCEL</Button>
          <Button
            black
            onClick={handleSave}
            disabled={albumName === "" && selectedButton === "btnCreate"}
          >
            SAVE
          </Button>
        </div>
      </article>
    </section>
  );
};

export default CustomModal;
