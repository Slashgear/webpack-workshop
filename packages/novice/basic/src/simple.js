let changeCount = 0;

setInterval(() => {
  changeCount++;
  document.querySelector(
    "h1"
  ).innerHTML = `This title will change ! ${changeCount}`;
}, 1000);
