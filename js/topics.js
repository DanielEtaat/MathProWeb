var subject;
var selectedTopics = [];

window.onload = function() {
  console.log("getting arguments.");
  var params = getParams(window.location.href);
  subject = params["subject"];
  addSubject();
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

var addSubject = function() {
  var element = document.getElementById("subject");
  element.innerText = subject;
}

var selectTopic = function(element) {
  var topic = element.innerText;
  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    selectedTopics.splice(selectedTopics.indexOf(topic), 1);
  } else {
    element.classList.add("selected");
    selectedTopics.push(topic);
  }
  var e = document.getElementById("topics-list");
  e.innerText = selectedTopicsToString(selectedTopics);
}

var selectedTopicsToString = function(topics) {
  var string = "";
  for (var i = 0; i < topics.length; i++) {
    if (i == topics.length-1 && i != 0) {
      string += "and " + topics[i] + ".";
    } else if (topics.length == 1) {
      string += topics[i] + ".";
    } else if (topics.length == 2 && i == 0) {
      string += topics[i] + " ";
    } else {
      string += topics[i] + ", "
    }
  }
  return string;
}
