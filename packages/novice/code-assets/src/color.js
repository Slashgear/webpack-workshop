const _ = require("lodash");

let colors = [
  "#ffebee",
  "#ffcdd2",
  "#ef9a9a",
  "#e57373",
  "#ef5350",
  "#f44336",
  "#e53935",
  "#d32f2f",
  "#c62828",
  "#b71c1c",
  "#ff8a80",
  "#ff5252",
  "#ff1744",
  "#d50000"
];

exports.getRandomColor = () => _.sample(colors);
