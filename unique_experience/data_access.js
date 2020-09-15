//the user is associated with an email
//this email is associated with a series of counters for question types
//return the question counter data if the email exists
//return None if the email does not currently exist in the database
function retrieve_email_data(){}



//the user is associated with an email
//this email has not been encountered before
//make a new document in firebase for this email that holds counters for question types
//return ?
function create_email_data(){}




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


//collection 			documents 		


//email_address								"email":"nimsi@berkeley.edu"
//											"extra_data": "who knows"
//											...


//ID_codes									"ID": "65HJ36GL34K20345898"
//											"extra_data": "who knows"
//											...




//retrieve_data("email_address", "email", "nimsi@berkeley.edu")
//retrieve_data("ID_codes", "ID", "7635HJLG7HJ3LH6")
function retrieve_data(collection_name, key_identifier, value_identifier){

	db.collection(collection_name).where(key_identifier, "==", value_identifier)
	  .get()
	  .then(function(querySnapshot) {
	      querySnapshot.forEach(function(doc) {
	          return doc.data()["whatever you want"];
	      })
	  })

	  //implicitly return None

}

//create_data("email_address", "email", "nimsi@berkeley.edu", data_object)
//create_data("ID_codes", "ID", "9DH3KG67C9VM7CXDG9C4G7", data_object)
function create_data(collection_name, key_identifier, value_identifier, data_object){}