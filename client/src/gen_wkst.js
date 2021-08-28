import Desmos from "desmos";

const WIDTH = "1050px";

const createDivHTML = (html, element = "div") => {
  const div = document.createElement(element);
  div.innerHTML = html;
  return div.firstChild;
};

export const generateWorksheetHTML = (json, numCols = 2, addTopicNames = 2) => {
  /* Returns the worksheet represented as an HTML element. */

  if (numCols > 4)
    console.warn("Parameter numCols should not be larger than 4.");

  const topics = json.topics;
  const numQuestions = countQuestions(topics);

  const colSize = (12 / numCols).toString();
  const answersPerColumn = Math.ceil(numQuestions / numCols);
  let answerList = [];

  // HTML components of the worksheet
  // const doc = document.implementation.createHTMLDocument("PDF Generation");
  // const meta = createDivHTML('<meta charset="utf-8" />', "meta");
  const pdfCSS = document.createElement("style");
  // pdfCSS.innerText = "body,#container{background-color:lightblue !important;} #container{margin:auto;} #pdf{font-size:16px;margin:50px;background:white;box-shadow:1px 1px 2px 1px grey;padding:75px;} .title{font-family:times;font-size:26px;text-align:center;padding-bottom:20px;} .topic{font-family:times;font-size:24px;text-align:center;padding-bottom:10px;} .directions{font-size:18px;font-family:times;} .number{width:0px!important;padding-right:20px!important;} .prompt,.answer{font-size:inherit;font-family:times;margin-left:10px!important;margin-bottom:25px;} .question-image{border:1px solid black;} .latex{font-size:inherit;padding-left:0px!important;padding-bottom:5px;} hr{padding-bottom:25px;}";
  pdfCSS.innerText = "*{color:black;}";
  // doc.head.appendChild(meta);
  // doc.head.appendChild(pdfCSS);
  // doc.head.appendChild(bootstrap);

  const container = createDivHTML(
    "<div id='container' style='width: calc(" + WIDTH + " + 100px)'></div>"
  );
  const pdf = createDivHTML(
    "<div id='pdf' style='width: " + WIDTH + ";'></div>"
  );
  const heading = createDivHTML("<div id='heading' class='row'></div>");
  const prompts = createDivHTML("<div id='prompts' class='row'></div>");
  const answers = createDivHTML(
    "<div id='answers' class='row'><div class='col-12 title'><p>Answers</p></div></div>"
  );
  // container.appendChild(getMathJaxScript());

  // Add the worksheet data to the worksheet
  let probNumber = 1;
  for (const topic of topics) {
    // Add the topic name to the worksheet
    if (addTopicNames) {
      prompts.appendChild(
        createDivHTML(
          "<div class='topic col-12'><p>" + topic.topicName + "</p></div>"
        )
      );
    }

    for (const group of topic.groups) {
      // Add the directions for each question group to the worksheet
      if (group.directions) {
        prompts.appendChild(
          createDivHTML(
            "<div class='directions col-12'><p>" +
              group.directions +
              "</p></div>"
          )
        );
      }

      // Add the questions from each question group to the worksheet
      const promptsPerColumn = Math.ceil(group.questions.length / numCols);
      for (let i = 0; i < numCols; i++) {
        const column = createDivHTML("<div class='col-" + colSize + "'></div>");
        for (let j = 0; j < promptsPerColumn; j++) {
          const index = i * promptsPerColumn + j;
          if (index >= group.questions.length) break;

          // Create the HTML elements representing the prompt and answer for each question
          const question = group.questions[index];
          const prompt = generatePromptHTML(question, probNumber);
          const answer = generateAnswerHTML(question, probNumber);

          column.appendChild(prompt);
          answerList.push(answer);
          probNumber++;
        }

        prompts.appendChild(column);
      }
    }
    // Add a divider between topics
    prompts.appendChild(createDivHTML("<div class='col-12'><hr></div>"));
  }

  // Add the answers from each question to the worksheet
  for (let i = 0; i < numCols; i++) {
    const column = createDivHTML("<div class='col-" + colSize + "'></div>");
    for (let j = 0; j < answersPerColumn; j++) {
      const index = i * answersPerColumn + j;
      if (index >= numQuestions) break;
      column.appendChild(answerList[index]);
    }
    answers.appendChild(column);
  }

  pdf.appendChild(heading);
  pdf.appendChild(prompts);
  pdf.appendChild(answers);
  container.appendChild(pdf);
  // doc.body.appendChild(container);
  return container.innerHTML;
};

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
  var prompt = createDivHTML(
    "<div class='prompt row'><div class='col number' style='flex: 0;'>" +
      probNumber.toString() +
      ") </div></div>"
  );
  prompt.appendChild(createDivHTML("<div class='col'></div>"));

  // Add the prompt's text to the worksheet (if it exists)
  if (question.prompt) {
    question.prompt = prepareLatex(question.prompt);
    prompt.children[1].appendChild(
      createDivHTML("<div class='latex'>" + question.prompt + "</div>")
    );
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

  var answer = createDivHTML(
    "<div class='answer row'><div class='col number' style='flex: 0;'>" +
      probNumber.toString() +
      ") </div></div>"
  );
  answer.appendChild(createDivHTML("<div class='col'></div>"));

  // Add the answer's text to the worksheet (if it exists)
  if (question.answer) {
    question.answer = prepareLatex(question.answer);
    answer.children[1].appendChild(
      createDivHTML("<div class='latex'>" + question.answer + "</div>")
    );
  }

  // Add the answer's image to the worksheet (if it exists)
  question.answerImage = loadImage(question.answerImage);
  if (question.answerImage !== null) {
    answer.children[1].appendChild(question.answerImage);
  }

  return answer;
}

export const getMathJaxScript = () => {
  /* Returns a script element that will render latex delimited by '$' on an
   * HTML page */
  if (!document.getElementById("jxscript")) {
    let a = document.createElement("script");
    let b = document.createElement("script");
    a.type = "text/javascript";
    a.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    a.async = true;  // use the location of your MathJax
    a.id = "jxscript";
    let content = `MathJax = {tex: {inlineMath: [['$', '$']]}};`
    if (window.opera) {
      b.innerHTML = content;
    } else {
      b.text = content;
    }
    document.head.appendChild(b);
    document.head.appendChild(a);
  }
}

/* Helper functions. */
function loadImage(imageJson) {
  /* Returns an HTML img element based on the given json instructions. */

  if (!imageJson) {
    return null;
  } else if (imageJson.imageType === "Graph") {
    return loadGraph(imageJson);
  }
  return null;
}

function loadGraph(imageJson) {
  /* Uses the Desmos API to plot a graph based on the given json instructions. */
  let calculator = Desmos.GraphingCalculator();
  calculator.updateSettings(imageJson.updateSettings);

  for (const expression of imageJson.expressions) {
    calculator.setExpression({ latex: expression });
  }

  const img = document.createElement("img");
  const setImageSrc = (data) => {
    img.src = data;
  };
  // console.log(imageJson.screenshot);
  calculator.asyncScreenshot(imageJson.screenshot, setImageSrc);
  img.className = "question-image";
  return img;
}

function prepareLatex(latex) {
  /* Adds '$' delimiters around latex expressions (excluding \\text{} elements). */

  var preparedLatex = "";
  var correcting = false;

  while (latex.length > 0) {
    var textStart = latex.indexOf("\\text{");
    if (textStart === -1) {
      preparedLatex += correcting ? latex + "$" : "$" + latex + "$";
      break;
    }

    if (textStart !== 0) {
      preparedLatex += correcting
        ? latex.slice(0, textStart + 6)
        : "$" + latex.slice(0, textStart) + "$";
    }
    latex = latex.slice(textStart + 6);

    // Correcting for joined text-latex expressions (i.e "\\text{f(} x \\text{)}")
    var textEnd = latex.indexOf("}");
    if (correcting) {
      var correctEnd = latex.slice(0, textEnd).indexOf(" ");
      if (correctEnd === -1) {
        correctEnd = textEnd;
      }
      preparedLatex += latex.slice(0, correctEnd) + "}$";
      latex = latex.slice(correctEnd);
      correcting = false;
    }

    // var textEnd = latex.indexOf("}");
    if (textEnd > 0 && latex[textEnd - 1] === "(") {
      // TODO: check if the condition should be latex[textEnd-1] !== " "
      var nearTextEnd = latex.slice(0, textEnd).lastIndexOf(" ");
      preparedLatex += latex.slice(0, nearTextEnd + 1);
      preparedLatex += "$\\text{" + latex.slice(nearTextEnd + 1, textEnd + 1);
      correcting = true;
    } else {
      preparedLatex += latex.slice(0, textEnd);
    }

    latex = latex.slice(textEnd + 1);
  }

  return preparedLatex;
}
