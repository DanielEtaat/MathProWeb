var topics;

window.onload = function() {
  topics = getParams(window.location.href)["topics"].split(";");
  addTopics(topics);
}

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
