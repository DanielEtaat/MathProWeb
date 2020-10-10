var convertInput = function() {
  var questionList = [];
  var e = document.getElementById("text");
  questionList.push(e.value);
  var url = "/MathProgramWebsite/pdf.html?";
  url += "questionList=" + questionList.join(";");
  url += "&answerList=" + answerList.join(";");
  url += "&instructionList=" + instructionList.join(";");
  url += "&topicList=" + topicList.join(";");
  window.location.href = url;
}
