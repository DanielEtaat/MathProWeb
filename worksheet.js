WIDTH = "1050px";

function generateWorksheetHTML(json, numCols=2, addTopicNames=2) {
	/* Returns the worksheet represented as an HTML element. */

	if (numCols > 4)
		console.warn("Paramater numCols should not be larger than 4.");
	const topics = json.topics;
  //
  //console.log(json);
  //console.log(json.topics);
  //console.log(topics);
  //
	const numQuestions = countQuestions(topics);

	const colSize = (12/numCols).toString();
  const answersPerColumn = Math.ceil(numQuestions/numCols);
  var answerList = [];

  // HTML components of the worksheet
	const container = jQuery.parseHTML("<div id='container' style='width: calc(" + WIDTH + " + 100px)'></div>")[0];
	const pdf = jQuery.parseHTML("<div id='pdf' style='width: " + WIDTH + ";'></div>")[0];
	const heading = jQuery.parseHTML("<div id='heading' class='row'></div>")[0];
	const prompts = jQuery.parseHTML("<div id='prompts' class='row'></div>")[0];
	const answers = jQuery.parseHTML("<div id='answers' class='row'><div class='col-12 title'><p>Answers</p></div></div>")[0];
	container.appendChild(getMathJaxScript());

	// Add the worksheet data to the worksheet
	var probNumber = 1;
	for (const topic of topics) {

		// Add the topic name to the worksheet
		if (addTopicNames) {
			prompts.appendChild(jQuery.parseHTML(
				"<div class='topic col-12'><p>" + topic.topicName + "</p></div>"
			)[0]);
		}

		for (const group of topic.groups) {

			// Add the directions for each question group to the worksheet
			if (group.directions) {
				prompts.appendChild(jQuery.parseHTML(
					"<div class='directions col-12'><p>" + group.directions + "</p></div>"
				)[0]);
			}

			// Add the questions from each question group to the worksheet
			var promptsPerColumn = Math.ceil(group.questions.length/numCols);
			for (var i = 0; i < numCols; i++) {

        var column = jQuery.parseHTML("<div class='col-" + colSize + "'></div>")[0];
        for (var j = 0; j < promptsPerColumn; j++) {

          var index = i*promptsPerColumn+j;
          if (index >= group.questions.length)
            break

          // Create the HTML elements representing the prompt and answer for each question
          var question = group.questions[index];
					var prompt = generatePromptHTML(question, probNumber);
          var answer = generateAnswerHTML(question, probNumber);

					column.appendChild(prompt);
          answerList.push(answer);
					probNumber++;
				}

				prompts.appendChild(column);
			}

		}
    // Add a divider between topics
    prompts.appendChild(jQuery.parseHTML("<div class='col-12'><hr></div>")[0]);

	}

  // Add the answers from each question to the worksheet
  for (var i = 0; i < numCols; i++) {
    var column = jQuery.parseHTML("<div class='col-" + colSize + "'></div>")[0];
    for (var j = 0; j < answersPerColumn; j++) {
      var index = i*answersPerColumn+j;
      if (index >= numQuestions)
        break;
      column.appendChild(answerList[index]);
    }
    answers.appendChild(column);
  }

	pdf.appendChild(heading);
	pdf.appendChild(prompts);
	pdf.appendChild(answers);
	container.appendChild(pdf);
	return container;
}

function generatePDF() {}

function countQuestions(topics) {
  /* Counts the total number of questions in the Json object used by a Worksheet. */

  var numQuestions = 0;
  for (var topic of topics) {
    for (var group of topic.groups) {
      numQuestions += group.questions.length;
    }
  }
  return numQuestions;
}

function generatePromptHTML(question, probNumber) {
  /* Creates an HTML element that displays a question's prompt. */

  var prompt = jQuery.parseHTML("<div class='prompt row'><div class='col number' style='flex: 0;'>" + probNumber.toString() + ") </div></div>")[0];
  prompt.appendChild(jQuery.parseHTML(
    "<div class='col'></div>"
  )[0]);

  // Add the prompt's text to the worksheet (if it exists)
  if (question.prompt) {
    question.prompt = prepareLatex(question.prompt);
    prompt.children[1].appendChild(jQuery.parseHTML(
      "<div class='latex'>" + question.prompt + "</div>"
    )[0]);
  }

  // Add the prompt's image to the worksheet (if it exists)
  question.promptImage = loadImage(question.promptImage);
  if (question.promptImage !== null) {
    prompt.children[1].appendChild(question.promptImage);
  }

  return prompt;
}

function generateAnswerHTML(question, probNumber) {
  /* Creates an HTML element that displays a question's answer. */

  var answer = jQuery.parseHTML("<div class='answer row'><div class='col number' style='flex: 0;'>" + probNumber.toString() + ") </div></div>")[0];
  answer.appendChild(jQuery.parseHTML(
    "<div class='col'></div>"
  )[0]);

  // Add the answer's text to the worksheet (if it exists)
  if (question.answer) {
    question.answer = prepareLatex(question.answer);
    answer.children[1].appendChild(jQuery.parseHTML(
      "<div class='latex'>" + question.answer + "</div>"
    )[0]);
  }

  // Add the answer's image to the worksheet (if it exists)
  question.answerImage = loadImage(question.answerImage);
  if (question.answerImage !== null) {
    answer.children[1].appendChild(question.answerImage);
  }

  return answer;
}

function getMathJaxScript() {
	/* Returns a script element that will render latex delimited by '$' on an
	 * HTML page */

	let script = document.createElement("script");
	let config = `MathJax.Hub.Config({ config: "MathJax.js", tex2jax: { inlineMath: [['$', '$']] } });`

	script.type = "text/javascript";
	script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"; // use the location of your MathJax
	if (window.opera) {
	  script.innerHTML = config
	} else {
	  script.text = config
	}
	return script;
}


/* Helper functions. */
function loadImage(imageJson) {
	/* Returns an HTML img element based on the given json instructions. */
	if (!imageJson) {
		return null;
	} else if (imageJson.imageType == "Graph") {
		return loadGraph(imageJson);
	}
	return null;
}

function loadGraph(imageJson) {
	/* Uses the Desmos API to plot a graph based on the given json instructions. */

	let calculator = Desmos.GraphingCalculator();
	calculator.updateSettings(imageJson.updateSettings);

	for (expression of imageJson.expressions) {
		calculator.setExpression({latex: expression});
	}

	let img = document.createElement('img');
	function setImageSrc(data) {
		img.src = data;
	}
	calculator.asyncScreenshot(imageJson.screenshot, setImageSrc);
  img.className = "question-image"
	return img;
}

function prepareLatex(latex) {
	/* Adds '$' delimiters around latex expressions (excluding \\text{} elements). */

  var preparedLatex = "";
  var correcting = false;

  while (latex.length > 0) {

    var textStart = latex.indexOf("\\text{");
    if (textStart == -1) {
      preparedLatex += correcting ? latex + "$" : "$" + latex + "$";
      break;
    }

    if (textStart != 0) {
      preparedLatex += correcting ? latex.slice(0, textStart+6) : "$" + latex.slice(0, textStart) + "$";
    }
    latex = latex.slice(textStart+6);

    // Correcting for joined text-latex expressions (i.e "\\text{f(} x \\text{)}")
    var textEnd = latex.indexOf("}");
    if (correcting) {
      var correctEnd = latex.slice(0, textEnd).indexOf(" ");
      if (correctEnd == -1) {
        correctEnd = textEnd;
      }
      preparedLatex += latex.slice(0, correctEnd) + "}$";
      latex = latex.slice(correctEnd);
      correcting = false;
    }

    var textEnd = latex.indexOf("}");
    if (textEnd > 0 && latex[textEnd-1] == "(") { // TODO: check if the condition should be latex[textEnd-1] !== " "
      var nearTextEnd = latex.slice(0, textEnd).lastIndexOf(" ");
      preparedLatex += latex.slice(0, nearTextEnd+1);
      preparedLatex += "$\\text{" + latex.slice(nearTextEnd+1, textEnd+1);
      correcting = true;
    } else {
      preparedLatex += latex.slice(0, textEnd)
    }

    latex = latex.slice(textEnd+1);
  }

  return preparedLatex;
}

const jsonExample = {
  "topics": [{
    "topicName": "Evaluate polynomials using synthetic division",
    "num": 10,
    "groups": [{
      "directions": "",
      "questions": [{
        "prompt": "\\text{If f(y) = } - y^{3} + 3 y^{2} - 4 y - 4 \\text{, use synthetic division to find f(} 2 \\text{)}",
        "answer": "-8",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(w) = } 1 w^{4} - 3 w^{3} + 3 w^{2} - 7 w - 1 \\text{, use synthetic division to find f(} 1 \\text{)}",
        "answer": "-7",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(r) = } - r^{3} - 4 r^{2} - 7 r - 1 \\text{, use synthetic division to find f(} -1 \\text{)}",
        "answer": "3",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(x) = } 1 x^{4} + 3 x^{3} + 2 x^{2} + 5 x - 7 \\text{, use synthetic division to find f(} -2 \\text{)}",
        "answer": "-17",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(x) = } 3 x^{3} - 2 x^{2} + 6 x - 5 \\text{, use synthetic division to find f(} 2 \\text{)}",
        "answer": "23",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(w) = } 1 w^{3} - 3 w^{2} + 5 w - 1 \\text{, use synthetic division to find f(} 2 \\text{)}",
        "answer": "5",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(q) = } 1 q^{3} - 2 q^{2} + 2 q - 6 \\text{, use synthetic division to find f(} 2 \\text{)}",
        "answer": "-2",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(x) = } - 2 x^{3} + 3 x^{2} + 3 x - 9 \\text{, use synthetic division to find f(} -2 \\text{)}",
        "answer": "13",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(r) = } - r^{3} - r^{2} - 6 r - 4 \\text{, use synthetic division to find f(} 1 \\text{)}",
        "answer": "-12",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{If f(z) = } 1 z^{4} + 1 z^{3} - 4 z^{2} - 4 z - 6 \\text{, use synthetic division to find f(} -1 \\text{)}",
        "answer": "-6",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Find the roots of factored polynomials",
    "num": 10,
    "groups": [{
      "directions": "Find the zeros of the function f(x).",
      "questions": [{
        "prompt": "\\text{f(x) = } x \\left(x + 10 \\right) \\text{}",
        "answer": "\\mathtt{\\text{0, -10}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{f(x) = } \\left(x - 3\\right)^{3} \\text{}",
        "answer": "\\mathtt{\\text{3}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{f(x) = } x \\left(x + 5 \\right) \\text{}",
        "answer": "\\mathtt{\\text{0, -5}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{f(x) = } \\left(x + 10\\right)^{2} \\text{}",
        "answer": "\\mathtt{\\text{-10}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{f(x) = } x \\left(x - 6 \\right) \\text{}",
        "answer": "\\mathtt{\\text{6, 0}}",
        "promptImage": {},
        "answerImage": {}
      }]
    }, {
      "directions": "Find the roots of the factored polynomial.",
      "questions": [{
        "prompt": " x \\left(x - 3 \\right) ",
        "answer": "\\mathtt{\\text{3, 0}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(x - 3 \\right) \\left(x - 3 \\right) \\left(x + 5 \\right) ",
        "answer": "\\mathtt{\\text{3, -5}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(x + 4 \\right) \\left(x - 7 \\right) ",
        "answer": "\\mathtt{\\text{7, -4}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " x \\left(x - 7 \\right) ",
        "answer": "\\mathtt{\\text{7, 0}}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(x - 8\\right)^{3} ",
        "answer": "\\mathtt{\\text{8}}",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Reciprocal functions at special angles",
    "num": 10,
    "groups": [{
      "directions": "Simplify",
      "questions": [{
        "prompt": " \\cot{\\left(120 ^{\\circ} + 0 \\right)} ",
        "answer": "- \\frac{\\sqrt{3}}{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cot{\\left(60 ^{\\circ} + 0 \\right)} ",
        "answer": "\\frac{\\sqrt{3}}{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cot{\\left(120 ^{\\circ} + 0 \\right)} ",
        "answer": "- \\frac{\\sqrt{3}}{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\sec{\\left(270 ^{\\circ} + 0 \\right)} ",
        "answer": "\\tilde{\\infty}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\sec{\\left(\\frac{5 \\pi}{3} + 0 \\right)} ",
        "answer": "2",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\sec{\\left(\\frac{\\pi}{3} + 0 \\right)} ",
        "answer": "2",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cot{\\left(135 ^{\\circ} + 0 \\right)} ",
        "answer": "-1",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\csc{\\left(300 ^{\\circ} + 0 \\right)} ",
        "answer": "- \\frac{2 \\sqrt{3}}{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cot{\\left(270 ^{\\circ} + 0 \\right)} ",
        "answer": "0",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cot{\\left(180 ^{\\circ} + 0 \\right)} ",
        "answer": "\\tilde{\\infty}",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Properties of sin functions.",
    "num": 10,
    "groups": [{
      "directions": "",
      "questions": [{
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 2 \\text{, period } 360 \\text{, and contains the point (} \\frac{3 \\pi}{2} \\text{, } 1 \\text{).}",
        "answer": "y = 1 - 2 \\cos{\\left(x \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 4 \\text{, period } \\pi \\text{, and contains the point (} \\frac{\\pi}{4} \\text{, } - \\frac{\\sqrt{2}}{2} \\text{).}",
        "answer": "y = 4 \\sin{\\left(2 x + \\frac{\\pi}{4} \\right)} - \\frac{\\sqrt{2}}{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 3 \\text{, period } \\frac{\\pi}{2} \\text{, and contains the point (} \\frac{11 \\pi}{6} \\text{, } \\frac{1}{2} \\text{).}",
        "answer": "y = \\frac{1}{2} - 3 \\cos{\\left(x + \\frac{\\pi}{3} \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 3 \\text{, period } 2 \\pi \\text{, and contains the point (} \\frac{\\pi}{6} \\text{, } - \\frac{1}{2} \\text{).}",
        "answer": "y = - \\frac{1}{2} + 3 \\sin{\\left(\\frac{\\pi}{6} + x \\pi^{2} \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 3 \\text{, period } 90 \\text{, and contains the point (} \\frac{7 \\pi}{4} \\text{, } \\frac{\\sqrt{2}}{2} \\text{).}",
        "answer": "y = \\frac{\\sqrt{2}}{2} - 3 \\cos{\\left(4 x + \\frac{\\pi}{4} \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 3 \\text{, period } 360 \\text{, and contains the point (} \\frac{7 \\pi}{4} \\text{, } \\frac{\\sqrt{2}}{2} \\text{).}",
        "answer": "y = \\frac{\\sqrt{2}}{2} - 3 \\cos{\\left(x + \\frac{\\pi}{4} \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 4 \\text{, period } 90 \\text{, and contains the point (} \\frac{\\pi}{2} \\text{, } -1 \\text{).}",
        "answer": "y = -1 + 4 \\cos{\\left(4 x \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 1 \\text{, period } 2 \\pi \\text{, and contains the point (} \\frac{3 \\pi}{2} \\text{, } 1 \\text{).}",
        "answer": "y = 1 - \\cos{\\left(x \\pi^{2} \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 3 \\text{, period } \\pi \\text{, and contains the point (} \\frac{7 \\pi}{6} \\text{, } \\frac{1}{2} \\text{).}",
        "answer": "y = \\frac{1}{2} - 3 \\sin{\\left(2 x + \\frac{\\pi}{6} \\right)}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Find an equation for a } \\sin \\text{ function that has amplitude } 2 \\text{, period } 360 \\text{, and contains the point (} \\frac{3 \\pi}{2} \\text{, } 1 \\text{).}",
        "answer": "y = 1 - 2 \\cos{\\left(x \\right)}",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Add and subtract polynomials",
    "num": 10,
    "groups": [{
      "directions": "Add.",
      "questions": [{
        "prompt": " \\left(- 8 x^{2} + 9 x + 2 \\right) + \\left(5 x^{2} - 10 x - 5 \\right) + \\left(- 9 x^{2} + 8 x - 4 \\right) ",
        "answer": "-7 - 12 x^{2} + 7 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(5 w - 1 \\right) + \\left(- 5 w - 4 \\right) + \\left(- 3 w - 3 \\right) ",
        "answer": "-8 - 3 w",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(10 r^{2} - 10 r + 1 \\right) + \\left(9 r^{2} - 4 r - 7 \\right) ",
        "answer": "-6 - 14 r + 19 r^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(6 z - 2 \\right) + \\left(- 9 z - 6 \\right) + \\left(8 z^{2} - 2 z - 3 \\right) ",
        "answer": "-11 - 5 z + 8 z^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(5 x^{2} - 4 x - 4 \\right) + \\left(- 6 x + 2 \\right) + \\left(5 x + 4 \\right) ",
        "answer": "2 - 5 x + 5 x^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(- 5 r^{2} + 2 r + 10 \\right) + \\left(7 r + 5 \\right) + \\left(- 5 r - 4 \\right) ",
        "answer": "11 - 5 r^{2} + 4 r",
        "promptImage": {},
        "answerImage": {}
      }]
    }, {
      "directions": "Subtract.",
      "questions": [{
        "prompt": " \\left(9 r^{2} + 1 r - 10 \\right) - \\left(1 r^{2} + 3 r - 1 \\right) - \\left(- 6 r + 4 \\right) ",
        "answer": "-13 + 4 r + 8 r^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(- 5 r^{2} + 7 r + 2 \\right) - \\left(- r^{2} + 4 r + 7 \\right) - \\left(9 r^{2} + 1 r + 4 \\right) ",
        "answer": "-9 - 13 r^{2} + 2 r",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(5 z - 2 \\right) - \\left(- 6 z + 10 \\right) ",
        "answer": "-12 + 11 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(- 2 q^{2} + 3 q - 3 \\right) - \\left(- 9 q + 9 \\right) ",
        "answer": "-12 - 2 q^{2} + 12 q",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Write a polynomial from its roots",
    "num": 10,
    "groups": [{
      "directions": "",
      "questions": [{
        "prompt": "\\text{Write the polynomial of least degree with roots } -3 \\text{, } 3 \\text{, } 1 \\text{, and } -1 \\text{. Write the equation in standard form.}",
        "answer": "9 + x^{4} - 10 x^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } 2 \\text{, } 5 \\text{, } 1 \\text{, and } -4 \\text{. Write the equation in standard form.}",
        "answer": "-40 + x^{4} - 15 x^{2} - 4 x^{3} + 58 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } -4 \\text{, } 1 \\text{, } 2 \\text{, and } -4 \\text{. Write the equation in standard form.}",
        "answer": "32 + x^{4} - 32 x - 6 x^{2} + 5 x^{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } 3 \\text{ and } -5 \\text{. Write the equation in standard form.}",
        "answer": "-15 + x^{2} + 2 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } -5 \\text{, } -2 \\text{, } 1 \\text{, and } 2 \\text{. Write the equation in standard form.}",
        "answer": "20 + x^{4} - 16 x - 9 x^{2} + 4 x^{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } -3 \\text{, } -3 \\text{ and } -3 \\text{. Write the equation in standard form.}",
        "answer": "27 + x^{3} + 9 x^{2} + 27 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } 1 \\text{ and } -2 \\text{. Write the equation in standard form.}",
        "answer": "-2 + x + x^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } 3 \\text{, } -4 \\text{, } -4 \\text{, and } -1 \\text{. Write the equation in standard form.}",
        "answer": "-48 + x^{4} - 56 x - 3 x^{2} + 6 x^{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } -4 \\text{, } -5 \\text{, } -3 \\text{, and } -4 \\text{. Write the equation in standard form.}",
        "answer": "240 + x^{4} + 16 x^{3} + 95 x^{2} + 248 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": "\\text{Write the polynomial of least degree with roots } -2 \\text{, } 3 \\text{ and } -1 \\text{. Write the equation in standard form.}",
        "answer": "-6 + x^{3} - 7 x",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Elementary trigonometric functions at special angles",
    "num": 10,
    "groups": [{
      "directions": "Simplify",
      "questions": [{
        "prompt": " \\sin{\\left(\\frac{\\pi}{2} + 0 \\right)} ",
        "answer": "1",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cos{\\left(\\frac{7 \\pi}{4} + 0 \\right)} ",
        "answer": "\\frac{\\sqrt{2}}{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\sin{\\left(270 ^{\\circ} + 0 \\right)} ",
        "answer": "-1",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\tan{\\left(\\frac{\\pi}{3} + 0 \\right)} ",
        "answer": "\\sqrt{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\tan{\\left(\\frac{\\pi}{6} + 0 \\right)} ",
        "answer": "\\frac{\\sqrt{3}}{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cos{\\left(\\frac{3 \\pi}{4} + 0 \\right)} ",
        "answer": "- \\frac{\\sqrt{2}}{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cos{\\left(330 ^{\\circ} + 0 \\right)} ",
        "answer": "\\frac{\\sqrt{3}}{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\tan{\\left(135 ^{\\circ} + 0 \\right)} ",
        "answer": "-1",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\sin{\\left(90 ^{\\circ} + 0 \\right)} ",
        "answer": "1",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\cos{\\left(\\frac{\\pi}{6} + 0 \\right)} ",
        "answer": "\\frac{\\sqrt{3}}{2}",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Multiply polynomials",
    "num": 10,
    "groups": [{
      "directions": "Find the square.",
      "questions": [{
        "prompt": " \\left(x + 9\\right)^{2} ",
        "answer": "81 + x^{2} + 18 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(x - 9\\right)^{2} ",
        "answer": "81 + x^{2} - 18 x",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(z - 5\\right)^{2} ",
        "answer": "25 + z^{2} - 10 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(z - 3\\right)^{2} ",
        "answer": "9 + z^{2} - 6 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(z + 1\\right)^{2} ",
        "answer": "1 + z^{2} + 2 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(w + 2\\right)^{2} ",
        "answer": "4 + w^{2} + 4 w",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(z - 9\\right)^{2} ",
        "answer": "81 + z^{2} - 18 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(z + 9\\right)^{2} ",
        "answer": "81 + z^{2} + 18 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(w - 9\\right)^{2} ",
        "answer": "81 + w^{2} - 18 w",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\left(r - 1\\right)^{2} ",
        "answer": "1 + r^{2} - 2 r",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Divide polynomials using long division",
    "num": 10,
    "groups": [{
      "directions": "Divide.",
      "questions": [{
        "prompt": " \\frac{- 35 z^{2} - 43 z + 36}{- 5 z - 9} ",
        "answer": "-4 + 7 z",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{6 q^{4} - 10 q^{3}}{6 q - 10} ",
        "answer": "q^{3}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{- 16 w^{2} + 38 w - 12}{8 w - 3} ",
        "answer": "4 - 2 w",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{- 64 w^{3} - 96 w^{2} - 35 w}{- 8 w - 5} ",
        "answer": "w \\left(7 + 8 w\\right)",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{- 8 w^{3} - 4 w^{2}}{- 4 w - 2} ",
        "answer": "2 w^{2}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{- 40 z - 10}{8 z + 2} ",
        "answer": "-5",
        "promptImage": {},
        "answerImage": {}
      }]
    }, {
      "directions": "Divide. Include any remainder as a fraction.",
      "questions": [{
        "prompt": " \\frac{- 6 y + 3}{- 6 y + 5} ",
        "answer": "1 - \\frac{2}{5 - 6 y}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{- 3 y^{2} - 4 y + 10}{- y - 3} ",
        "answer": "-5 - \\frac{5}{-3 - y} + 3 y",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{24 w + 1}{4 w - 4} ",
        "answer": "6 + \\frac{25}{-4 + 4 w}",
        "promptImage": {},
        "answerImage": {}
      }, {
        "prompt": " \\frac{- 20 q^{2} + 50 q - 16}{5 q - 10} ",
        "answer": "2 - 4 q + \\frac{4}{-10 + 5 q}",
        "promptImage": {},
        "answerImage": {}
      }]
    }]
  }, {
    "topicName": "Graph a quadratic function",
    "num": 10,
    "groups": [{
      "directions": "Graph the function.",
      "questions": [{
        "prompt": "\\text{y = } 19 x^{2} \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["19 x^{2}"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } - 8 x^{2} - 13 \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["- 8 x^{2} - 13"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } 15 x^{2} \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["15 x^{2}"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } \\left(\\frac{3}{2} \\right) x^{2} + \\left(\\frac{3}{2} \\right) x + \\frac{5}{2} \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["\\left(\\frac{3}{2} \\right) x^{2} + \\left(\\frac{3}{2} \\right) x + \\frac{5}{2}"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } - 6 x^{2} - 6 \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["- 6 x^{2} - 6"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } 17 \\left(x + 5\\right)^{2} + 3 \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["17 \\left(x + 5\\right)^{2} + 3"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } \\left(\\frac{4}{1} \\right) \\left(x - 3\\right)^{2} - 2 \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["\\left(\\frac{4}{1} \\right) \\left(x - 3\\right)^{2} - 2"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } 18 x^{2} \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["18 x^{2}"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } - 15 x^{2} \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["- 15 x^{2}"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }, {
        "prompt": "\\text{y = } \\left(\\frac{2}{3} \\right) x^{2} + \\left(\\frac{10}{3} \\right) x + \\frac{10}{3} \\text{}",
        "answer": null,
        "promptImage": {},
        "answerImage": {
          "expressions": ["\\left(\\frac{2}{3} \\right) x^{2} + \\left(\\frac{10}{3} \\right) x + \\frac{10}{3}"],
          "screenshot": {
            "mode": "contain",
            "height": 200,
            "width": 200,
            "preserveAxisNumbers": true
          },
          "updateSettings": {
            "polarMode": false,
            "polarNumbers": false
          },
          "imageType": "Graph"
        }
      }]
    }]
  }]
}
