var convertInput = function() {
  var questionList = [];
  var e = document.getElementById("text");
  questionList.push(e.value);
  var url = "/MathProgramWebsite/pdf.html?";
  url += "questionList=" + [].join(";");
  url += "&answerList=" + [].join(";");
  url += "&instructionList=" + [].join(";");
  url += "&topicList=" + [].join(";");
  window.location.href = url;
}
