import React, { useContext } from "react";
import CartContext from "../../context/Cart/CartContext";
import { crossOut } from "./Cart.module.css";
import PropTypes from "prop-types";

const CrossOutBtn = ({ subject, subtopic }) => {
  const { removeSubTopic } = useContext(CartContext);

  return (
    <button
      className={crossOut}
      aria-label="Close alert"
      type="button"
      onClick={() => removeSubTopic(subject, subtopic)}
      data-close
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

CrossOutBtn.propTypes = {
  subject: PropTypes.string.isRequired,
  subtopic: PropTypes.string.isRequired,
};

export default CrossOutBtn;
