import React, { Fragment, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CartContext from "../../../context/Cart/CartContext";
import OrderItem from "./OrderItem";

import {
  content,
  buttonLeft,
  buttonRight,
} from "./WorksheetCustomization.module.css";
import { orderContainer, orderItemsContainer } from "./OrderTopics.module.css";
import { back, next } from "./Button.module.css";

const OrderTopics = () => {
  const { subjectName } = useParams();
  const { topicCart } = useContext(CartContext);

  const subjectQuestions = [];
  const subjectSet = new Set();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      destination.droppableId !== source.droppableId ||
      destination.index === source.index
    ) {
      return;
    }

    const [subject, topic, subtopic] = draggableId.split("-");
    const draggedItem = { subject, topic, subtopic };
    topicCart.splice(source.index, 1);
    topicCart.splice(destination.index, 0, draggedItem);
  };

  for (const topicItem of topicCart) {
    subjectSet.add(topicItem.subject);
  }

  for (const currSubject of subjectSet) {
    subjectQuestions.push(
      <Fragment key={currSubject}>
        <h1>{currSubject}</h1>
        <p>Order Topics Below</p>
        <Droppable droppableId={currSubject}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={orderItemsContainer}
              {...provided.droppableProps}
            >
              {topicCart
                .filter((topicItem) => currSubject === topicItem.subject)
                .map((topicItem, index) => {
                  const { subject, topic, subtopic } = topicItem;

                  return (
                    <OrderItem
                      key={subtopic}
                      subject={subject}
                      topic={topic}
                      subtopic={subtopic}
                      index={index}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Fragment>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="content worksheet-customization-content">
        <div className={`${content} ${orderContainer}`}>{subjectQuestions}</div>
        <div className={buttonLeft}>
          <Link to={`/custom/${subjectName}/`}>
            <button className={back}>{"<"} Topics</button>
          </Link>
        </div>
        <div className={buttonRight}>
          <Link
            to={`/custom/${subjectName}/final`}
            onClick={(e) => e.preventDefault()}
          >
            <button className={next}>Final Touch {">"}</button>
          </Link>
        </div>
      </div>
    </DragDropContext>
  );
};

export default OrderTopics;
