import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./album.css";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { removeImage } from "../../redux/albums";

const Albums = () => {
  const dispatch = useDispatch();
  const { myAlbums } = useSelector((state) => state.albums);
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedAlbum = myAlbums.find((album) => album.id === id);

  const imagesListColumClass =
    selectedAlbum.images.length === 1
      ? "col1"
      : selectedAlbum.images.length === 2
      ? "col2"
      : "col3";

  const removeImageFromAlbum = (imageId) => {
    dispatch(removeImage({ albumId: id, itemId: imageId }));
  };

  return (
    <Container>
      <div className="album-content">
        <h1>{selectedAlbum.albumName}</h1>
        <p>Date created: {selectedAlbum.creationDate}</p>
        <div className={`album-images-container-${imagesListColumClass}`}>
          {selectedAlbum.images.length !== 0 ? (
            selectedAlbum.images.map((img) => (
              <div key={img.id} className="image-container">
                <img
                  alt="img"
                  loading="lazy"
                  src={img.download_url}
                  onClick={() => navigate(`/details/${img.id}`)}
                />
                <button
                  type="button"
                  className="overlay-remove-btn"
                  onClick={() => removeImageFromAlbum(img.id)}
                >
                  REMOVE
                </button>
              </div>
            ))
          ) : (
            <p>No Images</p>
          )}
        </div>
        <div className="buttons-bottom">
          <Button onClick={() => navigate(-1)}>GO BACK</Button>
          <Button black onClick={() => navigate(-1)}>
            SAVE
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Albums;
