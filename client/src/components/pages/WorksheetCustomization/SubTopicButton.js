import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import CartContext from "../../../context/Cart/CartContext";
import { subTopicBtn, subTopicSelected } from "./Button.module.css";

const SubTopicButton = ({ topic, subTopic }) => {
  /* determines 1) if a subtopic button has been pressed, and
	   equivalently 2) if the subtopic appears in the shopping cart
	*/
  const { topicCart, addSubTopic, removeSubTopic } = useContext(CartContext);
  const { subjectName } = useParams();

  const containsSubtopic = () => {
    for (let i = 0; i < topicCart.length; i++) {
      const request = topicCart[i];
      if (request.topic === topic
              && request.subtopic === subTopic) {
        return true;
      }
    }
    return false;
  };

  return (
    <button
      className={containsSubtopic() ? subTopicSelected : subTopicBtn}
      onClick={
        containsSubtopic()
          ? () => removeSubTopic(subjectName, topic, subTopic)
          : () => addSubTopic(subjectName, topic, subTopic)
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
