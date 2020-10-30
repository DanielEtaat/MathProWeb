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

var questionList, answerList, instructionList, topicList;
window.onload = function() {
	var params = getParams(window.location.href);
  questionList = splitStrings(params["questionList"].split(";"));
  answerList = splitStrings(params["answerList"].split(";"));
	instructionList = params["instructionList"].split(";");
	topicList = params["topicList"].split(";");
  generatePDF();
  dynamicMathJax();
}

var splitStrings = function(strings) {
	var splitCollection = [];
	for (var i = 0; i < strings.length; i++) {
		splitCollection.push(strings[i].split("@"));
	}
	return splitCollection;
}

var generatePDF = function() {

  // Adding Questions to the PDF
  var count = 1;

  for (var i = 0; i < questionList.length; i++) {

    var qs = document.getElementById("questions");
    var breakElement = document.createElement("hr");
    qs.appendChild(breakElement);

    var rowElement = document.createElement("div");
    rowElement.classList.add("row");
    rowElement.classList.add("question-row");

    var topicElement = document.createElement("div");
    topicElement.classList.add("col-12");
    topicElement.classList.add("question-left");

    var subTopicElement = document.createElement("h5");
    subTopicElement.innerText = instructionList[i];

    topicElement.appendChild(subTopicElement);
    rowElement.appendChild(topicElement);
    qs.appendChild(rowElement);

    for (var j = 0; j < questionList[i].length; j++) {

      var rowElement = document.createElement("div");
      rowElement.classList.add("row");
      rowElement.classList.add("question-row");

      var questionElement1 = document.createElement("div");
      questionElement1.classList.add("col-6");
      questionElement1.classList.add("question-left");

      var subQuestionElement1 = document.createElement("p");
      subQuestionElement1.innerText = (count).toString() + ") " + questionList[i][j];
      questionElement1.appendChild(subQuestionElement1);
      rowElement.appendChild(questionElement1);

      count++;

      if (j+1 < questionList[i].length) {

        var questionElement2 = document.createElement("div");
        questionElement2.classList.add("col-6");
        questionElement2.classList.add("question-left");

        var subQuestionElement2 = document.createElement("p");
        subQuestionElement2.innerText = (count).toString() + ") " + questionList[i][j+1];
        questionElement2.appendChild(subQuestionElement2);
        rowElement.appendChild(questionElement2);

        count++;

      }

      qs.appendChild(rowElement);
      j++

    }
  }

  // Adding Answers to the PDF
  var count = 1;

  for (var i = 0; i < answerList.length; i++) {

    var ans = document.getElementById("answers");
    var breakElement = document.createElement("hr");
    ans.appendChild(breakElement);

    for (var j = 0; j < answerList[i].length; j++) {

      var rowElement = document.createElement("div");
      rowElement.classList.add("row");
      rowElement.classList.add("question-row");

      var answerElement1 = document.createElement("div");
      answerElement1.classList.add("col-6");
      answerElement1.classList.add("question-left");

      var subAnswerElement1 = document.createElement("p");
      subAnswerElement1.innerText = (count).toString() + ") " + answerList[i][j];
      answerElement1.appendChild(subAnswerElement1);
      rowElement.appendChild(answerElement1);

      count++;

      if (j+1 < answerList[i].length) {

        var answerElement2 = document.createElement("div");
        answerElement2.classList.add("col-6");
        answerElement2.classList.add("question-left");

        var subAnswerElement2 = document.createElement("p");
        subAnswerElement2.innerText = (count).toString() + ") " + answerList[i][j+1];
        answerElement2.appendChild(subAnswerElement2);
        rowElement.appendChild(answerElement2);

        count++;

      }

      ans.appendChild(rowElement);
      j++

    }
  }

}

function dynamicMathJax() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax
	var config = `MathJax.Hub.Config({ config: "MathJax.js",
										tex2jax: { inlineMath: [['$', '$'], ["\\(","\\)"]] }
							});`
	if (window.opera) {
    script.innerHTML = config
  } else {
    script.text = config
  }
	document.getElementsByTagName("head")[0].appendChild(script);
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
