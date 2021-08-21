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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      destination.droppableId !== source.droppableId ||
      destination.index === source.index
    ) {
      return;
    }

    topicCart[source.droppableId].splice(source.index, 1);
    topicCart[source.droppableId].splice(destination.index, 0, draggableId);
  };

  for (const subject in topicCart) {
    topicCart[subject].length !== 0 &&
      subjectQuestions.push(
        <Fragment key={subject}>
          <h1>{subject}</h1>
          <p>Order Topics Below</p>
          <Droppable droppableId={subject}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                className={orderItemsContainer}
                {...provided.droppableProps}
              >
                {topicCart[subject].map((topicStr, index) => (
                  <OrderItem key={topicStr} topicStr={topicStr} index={index} />
                ))}
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
