import React, { useState } from "react";
import {
  multiConsult,
  multiCustomXdays,
} from "./../Calendar/helpers/multiConsult";
import { EventContext } from "./../eventContext/EventContext";
import { useDispatch, useSelector } from "react-redux";
// import { dateCustomXdays } from "../Calendar/helpers/aDate";

export const CustomModal = ({ setOpenModal }) => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.events);

  const [inputValue, setInputValue] = useState({
    cantdays: "",
  });
  const { cantdays } = inputValue;

  const { customEvent, customEventXdays } = React.useContext(EventContext);

  const handleCustomClick = () => {
    const day = multiConsult(active);
    dispatch(customEvent(day));
  };

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();

    const events = multiCustomXdays(active, inputValue);
    dispatch(customEventXdays(events));

    setInputValue({
      cantdays: "",
    });
    setOpenModal(false);
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Custom modal</h2>
      <form onSubmit={handleCustomSubmit}>
        <button className="boton" onClick={handleCustomClick}>
          Seleccionar semana siguiente
        </button>
        <div className="campo__custom">
          <label htmlFor="cantdays" className="label__custom">
            Coloca la cantidad de dias:
          </label>
          <input
            className="input__custom"
            type="number"
            onChange={handleChange}
            id="cantdays"
            name="cantdays"
            value={cantdays}
          />
        </div>
        <input type="submit" className="boton" value="Enviar Datos" />
      </form>
    </div>
  );
};
