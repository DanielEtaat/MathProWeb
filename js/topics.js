var subject;
var selectedTopics = [];
var topics;

// Creating Subjects Array
var subjects = {};
subjects["Algebra 1"] = ["Add Integers (small numbers)", "Add Integers (large numbers)", "Subtract Integers (small numbers)", "Subtract Integers (large numbers)", "Multiply Integers (small numbers)", "Multiply Integers (large numbers)", "Divide Integers (small numbers)", "Divide Integers (large numbers)", "Order of Operations with Integers", "Order of Operations", "Order of Operations with Rational Numbers", "Add Rational Numbers", "Subtract Rational Numbers", "Multiply Rational Numbers", "Divide Rational Numbers", "Square Roots", "Cube Roots", "Equivalent Ratios", "Proportions", "Finding the midpoint between two points", "Finding the endpoint", "Finding the distance between two points"];
subjects["Algebra 2"] = ["Adding and Subtracting Complex Numbers", "Adding and Subtracting Complex Numbers with Rational Numbers", "Finding the Complex Conjugate", "Multiplying Complex Numbers", "Dividing Complex Numbers", "Absolute Value of Complex Numbers", "Powers of i", "Solve quadratics using the quadratic formula", "Find the discriminant", "Solve quadratics by factoring", "Write a quadratic equation from roots"];
subjects["Pre-Calculus"] = ["Radian to Degree Conversion", "Degree to Radian Conversion", "Finding Reference Angles in Radians", "Finding Reference Angles in Degrees", "Finding Coterminal Angles in Radians", "Finding Coterminal Angles in Degrees", "Finding ratios of trigonometric functions (in radians)", "Finding ratios of trigonometric functions (in degrees)", "Finding inverses of trigonometric functions (in radians)", "Finding inverses of trigonometric functions (in degrees)"];


window.onload = function() {
  console.log('getting arguments.');
  var params = getParams(window.location.href);
  subject = params['subject'];
  topics = subjects[subject];
  addSubject();
  addTopics();
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
  var element = document.getElementById('subject');
  element.innerText = subject;
};

var addTopics = function() {
  var e = document.getElementById("topics");
  for (var i = 0; i < topics.length; i++) {
    var topicNode = document.createElement("div");
    var buttonNode = document.createElement("button");
    var t = topics[i];
    topicNode.classList.add("col-lg-3");
    topicNode.classList.add("col-md-4");
    topicNode.classList.add("col-sm-6");
    topicNode.classList.add("col-12");
    buttonNode.classList.add("btn-topic");
    buttonNode.id = topics[i];
    buttonNode.onclick = createSelectTopic(topics[i]);
    buttonNode.innerText = topics[i]
    topicNode.appendChild(buttonNode);
    e.appendChild(topicNode);
  }
};

var createSelectTopic = function(id) {
  var callSelectTopic = function() {
    var element = document.getElementById(id);
    selectTopic(element);
  }
  return callSelectTopic;
};


var selectTopic = function(element) {
  var topic = element.innerText;
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    selectedTopics.splice(selectedTopics.indexOf(topic), 1);
  } else {
    element.classList.add('selected');
    selectedTopics.push(topic);
  }
  // var e = document.getElementById('topics-list');
  // e.innerText = selectedTopicsToString(selectedTopics);
};

var selectedTopicsToString = function(topics) {
  var string = '';
  for (var i = 0; i < topics.length; i++) {
    if (i == topics.length-1 && i != 0) {
      string += 'and ' + topics[i] + '.';
    } else if (topics.length == 1) {
      string += topics[i] + '.';
    } else if (topics.length == 2 && i == 0) {
      string += topics[i] + ' ';
    } else {
      string += topics[i] + ', '
    }
  }
  return string;
};


var submitTopics = function() {
    url = "/submit.html?topics=" + selectedTopics.join(";");
    window.location.href = url;
}
