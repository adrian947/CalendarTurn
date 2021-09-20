import React, { useState, useContext, useEffect } from "react";
import { EventContext } from "../eventContext/EventContext";
import { aDate } from "./../Calendar/helpers/aDate";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ setOpenModal, infoOfEvent, dateFin }) => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.events);

  const [formValues, setFormValues] = useState({
    start: infoOfEvent.start,
    end: infoOfEvent.end,
    title: "",
    obs: "",
  });
  
  useEffect(() => {
    if (active) {
      setFormValues({
        // ...formValues,
        start: active[0].start,
        end: active[0].end,
        title: active[0].title,
        obs: active[0].obs,
        id: active[0].id
      });
    }
    //eslint-disable-next-line
  }, [dateFin]);

  const { pushEvent, addEvent, upDateEvent } = useContext(EventContext);

  const { start, end, title, obs } = formValues;
  
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValues);
    const newValues = aDate(formValues);
    setFormValues(newValues);
    setOpenModal(false);
    pushEvent(newValues);
    
    
    if (active) {    
      dispatch(upDateEvent(formValues));
    } else {
      dispatch(addEvent(newValues));
    }
  };

  return (
    <div className="conteiner">
      <div className="conteiner-header">
        {active ? <h1>Editar Evento </h1> : <h1>Ingresar Evento </h1>}
        <button className="botonCerrar" onClick={() => setOpenModal(false)}>
          Cerrar
        </button>
      </div>

      <form className="form-start-end" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="start">Start</label>
          <input
            type="datetime-local"
            onChange={handleInputChange}
            value={start}
            id="start"
            name="start"
          />
        </div>
        <div className="campo">
          <label htmlFor="end">End</label>
          <input
            type="datetime-local"
            value={end}
            id="end"
            name="end"
            onChange={handleInputChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            id="title"
            onChange={handleInputChange}
            value={title}
            name="title"
          />
        </div>
        <div className="campo">
          <label htmlFor="obs">Obs</label>
          <textarea
            id="obs"
            name="obs"
            onChange={handleInputChange}
            value={obs}
          >
            {" "}
          </textarea>
        </div>
        {active ? (
          <input type="submit" value="Editar Consulta" className="boton" />
        ) : (
          <input type="submit" value="Agregar Consulta" className="boton" />
        )}
      </form>
    </div>
  );
};

export default Modal;
