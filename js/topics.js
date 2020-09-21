var subject;
var selectedTopics = [];
var topics;

// Creating Subjects Array
var subjects = {};
subjects["Algebra 1"] = ["Add Integers (small numbers)", "Add Integers (large numbers)", "Subtract Integers (small numbers)", "Subtract Integers (large numbers)", "Multiply Integers (small numbers)", "Multiply Integers (large numbers)", "Divide Integers (small numbers)", "Divide Integers (large numbers)", "Order of Operations with Integers", "Order of Operations", "Order of Operations with Rational Numbers", "Add Rational Numbers", "Subtract Rational Numbers", "Multiply Rational Numbers", "Divide Rational Numbers", "Square Roots", "Cube Roots", "Equivalent Ratios", "Proportions", "Finding the midpoint between two points", "Finding the endpoint", "Finding the distance between two points"];
subjects["Algebra 2"] = ["Adding and Subtracting Complex Numbers", "Adding and Subtracting Complex Numbers with Rational Numbers", "Finding the Complex Conjugate", "Multiplying Complex Numbers", "Dividing Complex Numbers", "Absolute Value of Complex Numbers", "Powers of i", "Solve quadratics using the quadratic formula", "Find the discriminant", "Solve quadratics by factoring", "Write a quadratic equation from roots"];
subjects["Pre-Calculus"] = ["Radian to Degree Conversion", "Degree to Radian Conversion", "Finding Reference Angles in Radians", "Finding Reference Angles in Degrees", "Finding Coterminal Angles in Radians", "Finding Coterminal Angles in Degrees", "Finding ratios of trigonometric functions (in radians)", "Finding ratios of trigonometric functions (in degrees)", "Finding inverses of trigonometric functions (in radians)", "Finding inverses of trigonometric functions (in degrees)"];


/*
Runs when the page topics.html loads.
Stores data from the url paramaters and uses them to generate the topics and the subject displayed on the page.
*/
window.onload = function() {
  console.log('getting arguments.');
  var params = getParams(window.location.href);
  subject = params['subject'];
  topics = subjects[subject];
  addSubject();
  addTopics();
}

/*
Function found on stack overflow.
Returns the paramaters from the url as a dictionary object.
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
Adds the subject header to the page based on the paramaters in the url.
*/
var addSubject = function() {
  var element = document.getElementById('subject');
  element.innerText = subject;
};

/*
Adds all the topics to the page based on the paramaters in the url.
It creates elements using document.createElement and appends them as children elements
of the div element with id="topics".
*/
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

/*
Helper function for addTopics().
This is a higher order function. It takes in an element id that corresponds to a topic on the page.
It then creates a function that, when it is called, calls the function selectTopic on that element.
It then returns this function.
*/
var createSelectTopic = function(id) {
  var callSelectTopic = function() {
    var element = document.getElementById(id);
    selectTopic(element);
  }
  return callSelectTopic;
};

/*
This function, when called on an element, selects the topic associated with that element for the user.
The function procedure includes adding the topic name to a list containing all selected topics and
changing the color of the topic to green on the page.
*/
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

/*
OLD FUNCTION NOT USED ANYMORE,
Returns a string including all the selected topics.
*/
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

/*
This function, when called, submits all the selected topics as data to the page submit.html.
*/
var submitTopics = function() {
    url = "/MathProgramWebsite/submit.html?topics=" + selectedTopics.join(";");
    window.location.href = url;
}
