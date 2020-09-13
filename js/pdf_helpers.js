//sometimes, there will be a left over block with no questions in it
//this extra block messes up the PDF printing
//cut the fat!
function cutFat(){
	var pages = document.getElementsByClassName("page");

	var lastPage = pages[pages.length-1]

	var i;
	for(i = 0; i < pages.length; i++){
		var blocks = pages[i].getElementsByTagName("DIV");

		var secondLastB = blocks[blocks.length-2];
		var lastBlock = blocks[blocks.length-1];


		if (lastBlock.innerHTML == ""){
			lastBlock.remove();
			secondLastB.style = "float:left; width:100%;";
		}
	}
}

//this is a helper method to genPDF
//dump the text from Firebase into the appropriate block
function dumpElement(blockIdentifier, questionNumber, data){

	//The LaTeX text needs space from one another. Achieve this by adding many line breaks
	document.getElementById(blockIdentifier).innerHTML += `<p style= "float:left; left:0%;">` + (questionNumber + '.') + `</p>`;
	document.getElementById(blockIdentifier).innerHTML += `<p>` + data + `</p> <br><br><br>`;

}

function dumpInstruction(blockIdentifier, instruction){
	document.getElementById(blockIdentifier).innerHTML += `<p style= "float:left; left:0%;">` + instruction + `</p> <br><br><br>`;
}

function createBlocksForNewPage(flag, blockCounter, textType){
	//add blocks to this new page
	var block;
	if (textType == "problem") {
		block = "question_block";
	}
	else{
		block = "answer_block";
	}

	var blockName_left = "l" + flag + "b" + blockCounter;
	var blockName_right = "r" + flag + "b" + blockCounter;

	document.getElementById(block).innerHTML += `
	<div class = "page">
        <div id = ` + blockName_left + ` style = "float:left; width:50%;"></div>
		<div id = ` + blockName_right + ` style = "float:left; width:50%;"></div>
		<div class="pagebreak"> </div>
	</div>
	`;
}

function manageTextDump(blockCounter, displacement, count, lim, data, textType){

	//determines which block we are working with
	var flag;
	if (textType == "problem"){
		flag = "q";
	}
	else if (textType == "answer"){
		flag = "a";
	}
  else if (textType == "instruction"){
    flag = "bomb";
  }


	if (count < lim[0]){
		//dump to the left blocks
		var blockName = "l" + flag + "b" + blockCounter;

	    if (flag == "bomb"){
	    	dumpInstruction(blockName, data);
	    }
	    else{
			var question_number = count + displacement[0] + 1;
			dumpElement(blockName, question_number, data);
	        }
    }
    else if (count < lim[1]){
    	//dump to the right blocks
    	var blockName = "r" + flag + "b" + blockCounter;

		if (flag == "bomb"){
			dumpInstruction(blockName, data);
		}
		else{
			var question_number = count + displacement[0] + 1;
			dumpElement( blockName, question_number, data);
		}

    	}
    else if (count >= lim[1]){
    	//make a new page
    	//	add div blocks for questions and answers

    	blockCounter+= 1;
    	count = -1; //to offset the upcoming count += 1;
    	displacement[0] += displacement[1];

    	//with the info part out of the way, we can fit more questions into the page!
    	lim[0] = 8;
    	lim[1] = 16;
    	displacement[1] = 16;

		createBlocksForNewPage(flag, blockCounter, textType);

    }

    count += 1;

    //return updates to counters and stuff
    return [blockCounter, displacement, count, lim];
}

function databaseCollectionToHTMLPage(problems, answers, instruction, instruction_block, package){
	//this function operates on a single question type that the user selected
	//it is used as a part of the body of a for loop (iterating over all of the questions selected by the user)

	//counters and limits
	var blockCounter_q = package[0];
	var blockCounter_a = package[1];

	var count_q = package[2]; //once count goes over the limit, make a new page and reset the count
	var count_a = package[3];

	//[0] displacement, [1] displacement factor
	var displacement_q = package[4];
	var displacement_a = package[5];

	//[0] leftLim, [1] rightLim
	var lim_q = package[6];
	var lim_a = package[7];

	//data dumping

	/*
    querySnapshot.forEach(function(doc) {
    	//doc represents the single problem data from firebase
    	//put the doc's data to the html page
		var lil = [];
		lil = manageTextDump(blockCounter_q, displacement_q, count_q, lim_q, doc, "problem");
		//update changes to variables
		blockCounter_q = lil[0];
		displacement_q = lil[1];
		count_q = lil[2];
		lim_q = lil[3];
		lil = manageTextDump(blockCounter_a, displacement_a, count_a, lim_a, doc, "answer");
		//update changes to variables
		blockCounter_a = lil[0];
		displacement_a = lil[1];
		count_a = lil[2];
		lim_a = lil[3];

        //incremement the question number counter
        count_q += 1;
        count_a += 1;
    });
    */

    //update instructions
    var lil = [];
    lil = manageTextDump(blockCounter_q, displacement_q, count_q, lim_q, instruction, "instruction");

	blockCounter_q = lil[0];
	displacement_q = lil[1];
	count_q = lil[2];
	lim_q = lil[3];


    //add to the counter because of the instruction's space

    for(var i = 0; i < problems.length; i++) {
    	//doc represents the single problem data from firebase
    	//put the doc's data to the html page

		//problems[i] is a single problem
		lil = manageTextDump(blockCounter_q, displacement_q, count_q, lim_q, problems[i], "problem");
		//update changes to variables
		blockCounter_q = lil[0];
		displacement_q = lil[1];
		count_q = lil[2];
		lim_q = lil[3];

		lil = manageTextDump(blockCounter_a, displacement_a, count_a, lim_a, answers[i], "answer");
		//update changes to variables
		blockCounter_a = lil[0];
		displacement_a = lil[1];
		count_a = lil[2];
		lim_a = lil[3];

    }

    return [blockCounter_q, blockCounter_a, count_q, count_a, displacement_q, displacement_a, lim_q, lim_a];
}
