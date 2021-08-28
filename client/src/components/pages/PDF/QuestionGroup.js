import React from "react";
import Disp from "./Disp";
import { questionGroup, topicName, questions, directions, questionGrid, divider } from "./PDF.module.css";

const QuestionGroup = ({ startNumbers, groupJson }) => {
    const numColumns = 2;
    return (
        <div className={questionGroup}>
            <div className={topicName}>{groupJson.topicName}</div>
            {groupJson.groups.map((group, i) => (
                <div key={"QuestionSubGroup" + i} className={questions}>
                    <div className={directions}>{group.directions}</div>
                    <div className={questionGrid} style={{gridTemplateColumns: "repeat(" + numColumns + "," + 100/numColumns + "%)"}}>
                        {group.questions.map((question, j) => (
                            <Disp 
                                key={"Question" + (startNumbers[i] + j)} 
                                number={startNumbers[i] + j} 
                                body={question.prompt} 
                                image={question.promptImage} />
                        ))}
                    </div>
                </div>
            ))}
            <hr className={divider}></hr>
        </div>
    )
}

export default QuestionGroup;