var firebaseConfig = {
  apiKey: "AIzaSyD3u8ClnrlQmWkuwIEfdPtVXiTBEF1FoyQ",
  authDomain: "math-program.firebaseapp.com",
  databaseURL: "https://math-program.firebaseio.com",
  projectId: "math-program",
  storageBucket: "math-program.appspot.com",
  messagingSenderId: "841452449648",
  appId: "1:841452449648:web:36560ddd8f91f52f6429b5",
  measurementId: "G-JGSPK5H191"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

/*
This function communicates with firebase.
@param topic: a string which will be used to filter out questions from a specific topic in the database.
@params start, stop: the range from which questions will be selected in the data base.
@params questionList, answerList, instructionList: These lists will be filled with questions from the database.
@param lastOne: if this is True, the function will submit all the data is has read from the database to pdf.html.
*/
function getQuestions(topic, start, stop, questionList, answerList, instructionList, lastOne) {
  var questions = [];
  var answers = [];
  db.collection(topic).where("number", ">=", start)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          if (doc.data()["number"] <= stop) {
              questions.push(doc.data()["problem"]);
              answers.push(doc.data()["answer"]);
          }
      })
  })
  .then(function() {
    questionList.push(questions);
    answerList.push(answers);
  })

  db.collection(topic).where("data", "==", "YES")
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          instructionList.push(doc.data()["instructions"]);
      })
  })
  .then(function() {
    console.log(lastOne);
    if (lastOne) {
      var url = "/MathProgramWebsite/pdf.html?";
      for (var i = 0; i < questionList.length; i++) {
        questionList[i] = questionList[i].join("@");
        answerList[i] = answerList[i].join("@");
      }
      url += "questionList=" + questionList.join(";");
      url += "&answerList=" + answerList.join(";");
      url += "&instructionList=" + instructionList.join(";");
      url += "&topicList=" + topicList.join(";");
      window.location.href = url;
    }
  })
}

// getQuestions("Subtract Integers (large numbers)", 1, 2);
