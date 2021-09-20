import React, { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./../Modal/Modal";
import timeGridPlugin from "@fullcalendar/timegrid";
import { aDateForModal } from "./helpers/aDate";
import { EventContext } from "../eventContext/EventContext";
import { useSelector, useDispatch } from "react-redux";

const Calendari = () => {
  const [openModal, setOpenModal] = useState(false);
  const [infoOfEvent, setInfoOfEvent] = useState({});
  const [dateFin, setDateFin] = useState();
  const dispatch = useDispatch();

  const { event } = useSelector((state) => state.events);

  const renderEventContent = () => {
    <b>HOla como va</b>;
  };

  useEffect(() => {
    if (!openModal) {
      dispatch(activeClean());
    }
    //eslint-disable-next-line
  }, [openModal]);

  const { activeEvent, activeClean } = useContext(EventContext);

  //seleccion de varias horas
  const handleSelect = (info) => {
    const infoForModal = aDateForModal(info);

    setInfoOfEvent({
      start: infoForModal.startnew,
      end: infoForModal.endnew,
    });
    setOpenModal(true);
  };

  //seleccion de una hora
  const handleDateClick = (info) => {
    setOpenModal(true);
    setInfoOfEvent({ start: info.dateStr });
  };

  //seleccion de un evento
  const handleEventClick = (e) => {
    const parseDate = aDateForModal(e.event);

    const dateActive = {
      title: e.event.title,
      start: parseDate.startnew,
      end: parseDate.endnew,
      obs: e.event.extendedProps.obs,
      id: e.event.id,
    };

    setOpenModal(true);

    dispatch(activeEvent([dateActive]));
    setDateFin(dateActive);
  };

  return (
    <>
      {!openModal ? (
        <div className="calendar-screen">
          <FullCalendar
            selectable="true"
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            expandRows="true"
            dateClick={(e) => handleDateClick(e)}
            events={event}
            eventContent={renderEventContent}
            select={(e) => handleSelect(e)}
            slotMinTime={"08:00:00"}
            slotMaxTime={"20:00:00"}
            height="100%"
            nowIndicator="true"
            eventClick={(e) => {
              handleEventClick(e);
            }}
          />
        </div>
      ) : null}
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          infoOfEvent={infoOfEvent}
          dateFin={dateFin}
        />
      )}
    </>
  );
};

export default Calendari;
