import insta from "@assets/imgProfile/insta.svg";
import linkedin from "@assets/imgProfile/linkedin.svg";
import agenda from "@assets/imgProfile/agenda.svg";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SCardProfile from "./style";

function CardProfileInfo() {
  const [artistData, setArtistData] = useState([]);
  const { profileId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artist/${profileId}`)
      .then(({ data }) => {
        setArtistData(data);
      });
  }, []);

  const [isFollow, setIsFollow] = useState(false);
  const handleIsFollow = () => {
    setIsFollow(!isFollow);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      lineHeight: "2rem",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <SCardProfile src={artistData}>
      <div
        className={
          artistData.banner === null || artistData.banner === ""
            ? "defaultBanner"
            : "bannerImg"
        }
      />
      <div className="profileInfo">
        <div
          className={
            artistData.avatar === null || artistData.avatar === ""
              ? "defaultAvatar"
              : "avatarImg"
          }
        />
        <div>
          <h1>
            {artistData.firstname} {artistData.lastname}
          </h1>
          <p>{artistData.role}</p>
        </div>
        <button
          type="button"
          className={`followButton ${
            isFollow ? "isNotFollowed" : "isFollowed"
          }`}
          onClick={handleIsFollow}
        >
          Suivre
        </button>
        <ul>
          <li>👥 {artistData.bandname} The goodman</li>
          <li>🌍 {artistData.city}</li>
          <li>€ {artistData.cachet}</li>
        </ul>
        <div className="description">
          <button type="button" onClick={openModal} className="descriptionBtn">
            + d'informations
          </button>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Description"
          >
            <h2>Description</h2>
            <p>{artistData.description}</p>
            <button type="button" onClick={closeModal}>
              close
            </button>
          </Modal>
        </div>

        <div>
          <Link to={`/calendar/${profileId}`}>
            <img className="imgAgenda" src={agenda} alt="Logo agenda" />
          </Link>
          <a href={artistData.instagram}>
            <img className="imgInsta" src={insta} alt="Logo instagram" />
          </a>
          <a href={artistData.linkedin}>
            <img className="imgLinkedin" src={linkedin} alt="Logo linkedin" />
          </a>
        </div>
      </div>
      <div className="bottomProfile">
        <button
          type="button"
          className="btnBottomProfile btnBottomProfileBorder"
        >
          Avis
        </button>
        <button type="button" className="btnBottomProfile">
          MP
        </button>
      </div>
    </SCardProfile>
  );
}

export default CardProfileInfo;
