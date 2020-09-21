var topics;

/*
Runs when the page submit.html loads.
It stores the data from the url paramaters and uses this data to addTopics to the page.
*/
window.onload = function() {
  topics = getParams(window.location.href)["topics"].split(";");
  addTopics(topics);
}

/*
Same as the function in topics.js
*/
var getParams = function(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

/*
This function adds input elements to the page that allow the user to select
how many question of each topic they would like to have generated. It uses a similar procedure
to addTopics() in topics.js.
*/
var addTopics = function(topics) {
  var e = document.getElementById("topics");
  for (var i = 0; i < topics.length; i++) {

    var divElement = document.createElement("div");
    var topicElement = document.createElement("li");
    var breakElement = document.createElement("br");
    var inputElement = document.createElement("input");

    divElement.classList.add("col-12");
    divElement.classList.add("topics-element");
    topicElement.innerText = topics[i] + ". ";
    inputElement.placeholder = "How Many?"
    inputElement.id = topics[i] + "input";

    topicElement.appendChild(breakElement)
    topicElement.appendChild(inputElement)
    divElement.appendChild(topicElement);
    e.appendChild(divElement);
  }
}

var questionList = [];
var answerList = [];
var instructionList = [];
var topicList = [];

/*
This function submits all the data inputed by the user to a firebase database.
The firebase database returns questions, answers and instructions that are then submitted to pdf.html.
Most of the work is done by the function getQuestions() which comes from the firebase.js. This function communicates
with the firebase database.
*/
var submitGenerate = function() {
  var topic, numQuestions;
  var lastOne = false;
  for (var i = 0; i < topics.length; i++) {
    if (i == topics.length-1) {
      lastOne = true;
    }
    topic = topics[i];
    numQuestions = parseInt(document.getElementById(topics[i]+"input").value);
    getQuestions(topic, 1, numQuestions, questionList, answerList, instructionList, lastOne);
    topicList.push(topic);
  }
}
