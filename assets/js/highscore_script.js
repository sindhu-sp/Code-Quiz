var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const list = document.querySelector("#scr")

const listitems = highScores.map(function (element) {
    return "<li>" + element.name + "  : " + element.score + "</li>"
});
list.innerHTML = listitems.join('');


