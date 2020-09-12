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
	questionList = params["questionList"].split(";");
	questionList = splitStrings(questionList);
	answerList = params["answerList"].split(";");
	answerList = splitStrings(answerList);
	instructionList = params["instructionList"].split(";");
	topicList = params["topicList"].split(";");
	genPDF(topicList, instructionList, questionList, answerList);
}

var splitStrings = function(strings) {
	var splitCollection = [];
	for (var i = 0; i < strings.length; i++) {
		splitCollection.push(strings[i].split(","));
	}
	return splitCollection;
}

// Your web app's Firebase configuration
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
var db = firebase.firestore();

//after the page is filled with the questions and answers from Firebase
//run this function to apply MathJax to the page!
//MathJax must be run AFTER the questions have been loaded.
function dynamicMathJax(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax

	var config = `MathJax.Hub.Config({ config: "MathJax.js",
										tex2jax: { inlineMath: [['$', '$'], ["\\(","\\)"]] }
							});`

	if (window.opera) {script.innerHTML = config}
	           else {script.text = config}

	document.getElementsByTagName("head")[0].appendChild(script);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function getInstructions(querySnapshot){
	var collected = false;
	var instructions = "For questions " + "1" + " to " + "10" + ", ";
    querySnapshot.forEach(function(doc) {
    	if (collected != true){
	        instructions += doc.data()["instructions"];
	        collected = true;
	      	}
    });

    return instructions
}

/*
function genPDF(question_generator_name){
	var question_selection = ["Add Integers (small numbers)", "Subtract Integers (small numbers)"];
	//counters and limits
	var blockCounter_q = 0;
	var blockCounter_a = 0;
	var count_q = 0; //once count goes over the limit, make a new page and reset the count
	var count_a = 0;
	//[0] displacement, [1] displacement factor
	var displacement_q = [0, 14];
	var displacement_a = [0, 16];
	//[0] leftLim, [1] rightLim
	var lim_q = [7, 14];
	var lim_a = [8, 16];
	//dump each requested question
	var package = [blockCounter_q, blockCounter_a, count_q, count_a, displacement_q, displacement_a, lim_q, lim_a];
	console.log("here");
	//for(i = 0; i < question_selection.length; i++){
	for(var i = 0; i < 1; i++){
		console.log("i: " + i);
		var question_generator_name = question_selection[i];
		console.log(question_generator_name);
		//get the instruction names
		var instructions = "";
		db.collection(question_generator_name).where("data", "==", "YES")
		.get()
		.then(function(querySnapshot) {
		    instructions = getInstructions(querySnapshot);
			})
		.catch(function(error) {
		    console.log("Error getting documents: ", error);
			});
		console.log("i  --" + i);
		//dump questions
		var instruction_block = document.getElementById("question_instruction" + i);
		db.collection(question_generator_name).where("number", ">", 0)
		.get()
		.then(function(querySnapshot) {
			console.log("suddenly i " + i);
			console.log("question_instruction" + i);
			instruction_block.innerHTML = instructions;
			console.log("all my dreams");
			package = databaseCollectionToHTMLPage(querySnapshot, package);
		    })
		.catch(function(error) {
		    console.log("Error getting documents: ", error);
			});
	}
}
*/

function genPDF(question_names, question_instructions, question_problems, question_answers){

	//counters and limits
	var blockCounter_q = 0;
	var blockCounter_a = 0;

	var count_q = 0; //once count goes over the limit, make a new page and reset the count
	var count_a = 0;

	//[0] displacement, [1] displacement factor
	var displacement_q = [0, 14];
	var displacement_a = [0, 16];

	//[0] leftLim, [1] rightLim
	var lim_q = [7, 14];
	var lim_a = [8, 16];

	//dump each requested question

	var package = [blockCounter_q, blockCounter_a, count_q, count_a, displacement_q, displacement_a, lim_q, lim_a];
	console.log("here");

	//page header -- put all the names

	var message = "";
	for(i = 0; i < question_names.length; i++){
		message += question_names[i] + ", ";
	}
	console.log(question_names);
	message = message.slice(0, message.length - 2);
	console.log("message: ", message);

	var topic_name_p = document.getElementById("topic names");
	topic_name_p.innerHTML = message;

	for(i = 0; i < question_names.length; i++){
		console.log(question_names.length);

		var instruction_block = document.createElement("p");
		instruction_block.id = "question_instruction" + i;
		instruction_block.style = "text-align: left;";

		var instruction = question_instructions[i];

		var problems = question_problems[i];
		var answers = question_answers[i];

		package = databaseCollectionToHTMLPage(problems, answers, instruction, instruction_block, package);
	}
}
