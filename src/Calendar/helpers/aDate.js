import moment from "moment";
import shortid from "shortid"

export const aDate = (formValues) => {
  const startnew = moment(formValues.start).format("YYYY-MM-DD HH:mm");
  const endnew = moment(formValues.end).format("YYYY-MM-DD HH:mm");
  const id = shortid.generate()
  return {
    ...formValues,
    startnew,
    endnew,
    id
  };
};

export const aDateForModal = (date) => {
  const startnew = moment(date.startStr).format("YYYY-MM-DDTHH:mm");
  const endnew = moment(date.endStr).format("YYYY-MM-DDTHH:mm");
  return {
    startnew,
    endnew,
  };
};





