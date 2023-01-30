const moment = require('moment');


module.exports = {

  get_emoji: () => {
    const randomNum = Math.random();
    let book = "📗";

    if (randomNum > 0.7) {
      book = "📘";
    } else if (randomNum > 0.4) {
      book = "📙";
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },

  moment: moment,
  
  formatDate: (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  },

  bgColor: (index) => {
    if (index % 2 === 0) {
      return "lavender";
    } else {
      return "white";
    }
  },
  
};
