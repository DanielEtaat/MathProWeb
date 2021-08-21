import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  buttons,
  topicButton,
  topicButtonSelected,
  topicButtonUnselected,
  pointer,
  hiddenPointer,
  subtopics,
  hidden,
} from "./Button.module.css";

import SubTopicGrid from "./SubTopicGrid";

const TopicGrid = ({ topicsMap }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const clickTopicButton = (topic) => {
    setSelectedTopic(topic === selectedTopic ? "" : topic);
  };

  const topics = Object.keys(topicsMap);
  const numTopicColumns = 4;
  const topicButtonClass = (topic) => {
    switch (selectedTopic) {
      case "":
        return topicButton;
      case topic:
        return topicButtonSelected;
      default:
        return topicButtonUnselected;
    }
  };
  const buttonComponents = [];
  for (let i = 0; i < topics.length; i += numTopicColumns) {
    buttonComponents.push(
      topics.slice(i, i + numTopicColumns).map((topic) => (
        <div key={topic}>
          <button
            className={topicButtonClass(topic)}
            onClick={() => clickTopicButton(topic)}
          >
            {topic}
          </button>
          <div
            className={topic === selectedTopic ? pointer : hiddenPointer}
          ></div>
        </div>
      ))
    );
    buttonComponents.push(
      topics.slice(i, i + numTopicColumns).map((topic) => (
        <div
          key={topic}
          className={topic === selectedTopic ? subtopics : hidden}
        >
          <SubTopicGrid subTopics={topicsMap[topic]} />
        </div>
      ))
    );
  }

  return <div className={buttons}>{buttonComponents}</div>;
};

TopicGrid.propTypes = {
  topicsMap: PropTypes.object.isRequired,
};

export default TopicGrid;
