export const displayDate = (dateFormat) => {
  let date = new Date(dateFormat);
  let month = date.getMonth() + 1;
  let displayDate = `${date.getFullYear()}-${
    month >= 10 ? month : "0" + month
  }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()} ${
    date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
  }:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()}`;
  return displayDate;
};
