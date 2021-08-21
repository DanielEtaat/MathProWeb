import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import CartContext from "../../../context/Cart/CartContext";
import { subTopicBtn, subTopicSelected } from "./Button.module.css";

const SubTopicButton = ({ subTopic }) => {
  /* determines 1) if a subtopic button has been pressed, and
	   equivalently 2) if the subtopic appears in the shopping cart
	*/
  const { topicCart, removeSubTopic, addSubTopic } = useContext(CartContext);
  const { subjectName } = useParams();

  const containsSubtopic = () =>
    topicCart[subjectName] && topicCart[subjectName].indexOf(subTopic) !== -1;

  return (
    <button
      className={containsSubtopic() ? subTopicSelected : subTopicBtn}
      onClick={
        containsSubtopic()
          ? () => removeSubTopic(subjectName, subTopic)
          : () => addSubTopic(subjectName, subTopic)
      }
    >
      {subTopic}
    </button>
  );
};

SubTopicButton.propTypes = {
  subTopic: PropTypes.string.isRequired,
};

export default SubTopicButton;
