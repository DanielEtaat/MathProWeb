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
