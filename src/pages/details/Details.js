import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./details.css";
import { showModal } from "../../redux/modalSlice";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { showMessage } from "../../redux/message";

const Details = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.images.data);
  const { id } = useParams();
  const imageDetails = data.find((image) => image.id === id);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(showModal(id));
  };

  const downloadImage = async (url, name = "newImage") => {
    return fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        return Promise.resolve();
      });
  };

  function handleDownload() {
    downloadImage(imageDetails.download_url, `image${imageDetails.id}`)
      .then(() =>
        dispatch(
          showMessage({ showMessage: true, message: "IMAGE DOWNLOADED" })
        )
      )
      .catch(() => console.log("error"));
  }

  return (
    <Container>
      <div className="content-details">
        <div className="btn-top">
          <Button onClick={handleOpenModal}>ADD TO ALBUM +</Button>
          <Button
            black
            onClick={() => handleDownload(imageDetails.download_url)}
          >
            DOWNLOAD
          </Button>
        </div>
        <div className="image-details">
          <img alt="img" loading="lazy" src={imageDetails?.download_url} />
        </div>
        <div className="bottom-info">
          <p>UPLOADED BY</p>
          <h1>{imageDetails?.author}</h1>
          <p>{`${imageDetails?.width}W x ${imageDetails?.height}H`}</p>
          <Button onClick={() => navigate(-1)}>GO BACK</Button>
        </div>
      </div>
      {/* {successMessage && <SuccessMessage>DOWNLOAD SUCCESSFUL</SuccessMessage>} */}
    </Container>
  );
};

export default Details;
