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

function getQuestions(topic, start, stop, questionList, answerList, instructionList) {
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
    answerList.push(questions);
  })

  db.collection(topic).where("data", "==", "YES")
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          instructionList.push(doc.data()["instructions"]);
      })
  })
}

// getQuestions("Subtract Integers (large numbers)", 1, 2);
