import React, { useState } from "react";
import ProfileItem from "./ProfileItem";

import Nima from "./profile-images/NimaRahmanian.jpeg";
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
} from "./AboutUsModal.module.css";

const AboutUsModal = () => {
  const [isModalShown, toggleModal] = useState(false);

  const clickOffModal = (e) => {
    if (e.target.id === "modalBackground") {
      e.preventDefault();
      toggleModal(false);
    }
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
                <ProfileItem
                  imageSrc={Nima}
                  name="Name Surname"
                  title="CEO & Founder"
                  githubURL="https://www.apple.com/"
                  linkedinURL="https://www.apple.com/"
                />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
                <ProfileItem name="Name Surname" title="CEO & Founder" />
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
