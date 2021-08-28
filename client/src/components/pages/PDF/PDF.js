import React from "react";
import QuestionGroup from "./QuestionGroup";
import Disp from "./Disp";
import { prompts, answers } from "./PDF.module.css";

const PDF = ({ topics }) => {
  let startNumbers = [];
  let count = 1;
  for (let i = 0; i < topics.length; i++) {
    startNumbers.push([]);
    for (let j = 0; j < topics[i].groups.length; j++) {
      startNumbers[i].push(count);
      count += topics[i].groups[j].questions.length;
    }
  }

  return (
    <>
      <div className={prompts}>
        {topics.map((groupJson, i) => (
          <QuestionGroup
            key={"QuestionGroup" + i}
            startNumbers={startNumbers[i]}
            groupJson={groupJson}
          />
        ))}
      </div>
      <div className={answers}>
        {topics.map((topicJson, i) =>
          topicJson.groups.map((group, j) =>
            group.questions.map((question, k) => (
              <Disp
                key={`Answer-${startNumbers[i][j] + k}`}
                number={startNumbers[i][j] + k}
                body={question.answer}
                image={question.answerImage}
              />
            ))
          )
        )}
      </div>
    </>
  );
};

export default PDF;
