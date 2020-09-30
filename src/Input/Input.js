import React from "react";
import "./Input.css";
import { useForm } from "react-hook-form";

const Input = (props) => {
  const { register, handleSubmit } = useForm();
  const { onSubmit } = props;

  return (
    <div className="Container main-cont">
      <div className="cont-input">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="input"
            placeholder="Search Your City..."
            ref={register}
            name="city"
          />
          <button className="btn btn-secondary">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Input;
