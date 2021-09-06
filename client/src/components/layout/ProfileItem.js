import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  profileItemCard,
  profileItemContainer,
  profileItem,
  profileItemBack,
  profileItemFlip,
  profileTextContainer,
  profileImage,
  profileName,
  profileTitle,
  profileLink,
} from "./AboutUsModal.module.css";

const ProfileItem = ({ name, title, imageSrc, linkedinURL, githubURL }) => {
  const [isBackShown, setIsBackShown] = useState(false);

  const onProfileClick = (e) => {
    switch (e.target.id) {
      case "profile-container":
      case "profile-card":
      case "profile-front":
      case "profile-back":
      case "profile-image":
      case "profile-name":
      case "profile-title":
        e.preventDefault();
        setIsBackShown(!isBackShown);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={profileItemContainer}
      id="profile-container"
      onClick={onProfileClick}
    >
      <div
        className={`${profileItemCard} ${isBackShown ? profileItemFlip : ""}`}
        id="profile-card"
      >
        <div className={profileItem} id="profile-front">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="profile"
              className={profileImage}
              id="profile-image"
            />
          )}
          <div className={profileTextContainer}>
            <h2 className={profileName} id="profile-name">
              {name}
            </h2>
            <h3 className={profileTitle} id="profile-title">
              {title}
            </h3>
          </div>
        </div>
        <div className={profileItemBack} id="profile-back">
          {linkedinURL && (
            <a
              className={profileLink}
              id="linkedin-link"
              aria-label="LinkedIn profile link"
              target="_blank"
              rel="noreferrer"
              href={linkedinURL}
            >
              <i className="fab fa-linkedin" id="linkedin-icon"></i>
            </a>
          )}
          {githubURL && (
            <a
              className={profileLink}
              id="github-link"
              aria-label="GitHub profile link"
              target="_blank"
              rel="noreferrer"
              href={githubURL}
            >
              <i className="fab fa-github-square" id="github-icon"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  linkedinURL: PropTypes.string,
  githubURL: PropTypes.string,
};

export default ProfileItem;
