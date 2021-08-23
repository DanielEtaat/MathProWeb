import React from "react";
import PropTypes from "prop-types";

import { emptySubTopicRow } from "./Button.module.css";

import SubTopicButton from "./SubTopicButton";

const SubTopicGrid = ({ topic, subTopics }) => {
  const numButtonColumns = 5;
  const buttons = [];
  for (let i = 0; i < subTopics.length; i += numButtonColumns) {
    buttons.push(
      subTopics
        .slice(i, i + numButtonColumns)
        .map((subTopic) => (
          <SubTopicButton topic={topic} subTopic={subTopic} key={subTopic} />
        ))
    );
    buttons.push(<div className={emptySubTopicRow} key={i}></div>);
  }
  return <>{buttons.slice(0, -1)}</>;
};

SubTopicGrid.propTypes = {
  subTopics: PropTypes.array.isRequired,
};

export default SubTopicGrid;
