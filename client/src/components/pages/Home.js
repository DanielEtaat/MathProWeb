import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ShowcaseSVG } from "../../showcase.svg";
import { ReactComponent as ButtonSVG } from "../../subject_button.svg";
import DataContext from "../../context/Data/DataContext";

const Home = () => {
  const { loading, getData, hasLoaded } = useContext(DataContext);
  
  useEffect(() => {
    if (!(hasLoaded() || loading)) {
      getData();
    }
  });

  return (
    <div className="content home-content">
      <section className="hero">
        <div className="showcase-container">
          <div className="showcase-svg">
            <ShowcaseSVG height="400px" />
          </div>
          <div className="showcase-text">
            <h1 className="text-bolder" id="showcase-header">
              Create math worksheets!
            </h1>
            <br></br>
            <p id="showcase-message">
              MathPro aims to supplement free, online educational resources. 
              MathPro is the only place on the Internet where users have access 
              to an unlimited number of free math practice problems.
            </p>
          </div>
        </div>
        <Link to="/custom/Algebra 1" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Algebra 1
        </Link>
        <Link to="/custom/Algebra 2" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Algebra 2
        </Link>
        <Link to="/custom/Calculus" className="subject-btn">
          <div className="button-svg">
            <ButtonSVG width="110px" height="101px" />
          </div>
          Calculus
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
    </div>
  );
};

export default Home;
