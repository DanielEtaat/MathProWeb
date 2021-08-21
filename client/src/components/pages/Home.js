import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ShowcaseSVG } from "../../showcase.svg";
import { ReactComponent as ButtonSVG } from "../../subject_button.svg";

const Home = () => {
  return (
    <div className="content home-content">
      <section className="hero">
        <div className="showcase-container">
          <div className="showcase-svg">
            <ShowcaseSVG height="400px" />
          </div>
          <div className="showcase-text">
            <h1 className="text-bolder" id="showcase-header">
              Lorem ipsum dolor sit amet.
            </h1>
            <p id="showcase-message">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim.Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim.Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim.
            </p>
          </div>
        </div>
        <Link to="/custom/Algebra 2" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Algebra 2
        </Link>
        <Link to="#" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          <p>Coming Soon</p>
        </Link>
        <Link to="#" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Coming Soon
        </Link>
        <Link to="#" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Coming Soon
        </Link>
        <Link to="#" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Coming Soon
        </Link>
        <Link to="#" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Coming Soon
        </Link>
      </section>
      <section className="memo">
        We have generated over<span className="text-bold"> 10,000 </span>
        worksheets
      </section>
      <section className="sample">
        <div className="rectangles-container">
          <div className="rectangle"></div>
          <div className="rectangle rectangle-short"></div>
          <div className="rectangle rectangle-short"></div>
          <div className="rectangle"></div>
        </div>
        <div className="samples-container">
          <div className="sample-temp"></div>
          <div className="sample-temp"></div>
          <div className="sample-temp"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
