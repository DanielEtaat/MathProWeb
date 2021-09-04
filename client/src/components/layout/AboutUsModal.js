import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  modal,
  modalContent,
  button,
  aboutUsButton,
  closeButton,
  aboutUsText,
  aboutUsTextContainer,
  aboutUsProfiles,
  profilesGrid,
  profileItem,
  profileTextContainer,
  profileName,
  profileTitle,
  profileLink,
} from "./AboutUsModal.module.css";

const AboutUsModal = () => {
  const [isModalShown, toggleModal] = useState(false);

  const clickOffModal = (e) => {
    e.preventDefault();
    e.target.id === "modalBackground" && toggleModal(false);
  };

  return (
    <>
      <button
        className={`${button} ${aboutUsButton}`}
        onClick={() => {
          toggleModal(true);
        }}
      >
        About Us
      </button>
      {isModalShown && (
        <div onClick={clickOffModal} className={modal} id="modalBackground">
          <div className={modalContent}>
            <div className={aboutUsTextContainer}>
              <h1>Our Team.</h1>
              <p className={aboutUsText}>
                With the help of this talented, motivated, and selfless team,
                we offer MathPro as a free service for all users. 
              </p>
            </div>
            <div className={aboutUsProfiles}>
              <div className={profilesGrid}>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                <div className={profileItem}>
                  <div className={profileTextContainer}>
                    <h2 className={profileName}>Name Surname</h2>
                    <h3 className={profileTitle}>Founder & CEO</h3>
                  </div>
                  <Link to="/" className={profileLink}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
            <button
              className={`${button} ${closeButton}`}
              onClick={() => {
                toggleModal(false);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUsModal;
