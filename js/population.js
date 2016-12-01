var a,b,c,d;
var bestGame = []; // this will contain a,b,c,d, score: {lines cleared, holes, index through the bag of pieces}
games = [];
var n;
// variables that can be changed:------------
TotalGenerations = 20;				//-------
NumberOfPieces = 141;				//-------
WOC = false;						//-------
// end of variables to change-----------------
GenerationsLeft = TotalGenerations;
var A = []; // abcd values of each game
var WOCA = []; // 
var WOCbag = 0;

function population(x){ // n is the number in population (can be changed in index.html
	n = x;
	if(WOC == false){
		newBag();
		makeGeneration(TotalGenerations,n);
	} else { // when WOC is true
		makeWOCGen(TotalGenerations,n);
	}
	
	// now from completed lines, holes, height, don't need pieces gone through,
	// completed: (getFinalScore): completed lines, height, holes
	// sort the games: max(completed lines), min(height), min(holes)
	
	// lines ; height ; holes
	// wisdom of crowds: keep a 2 d array with the 4 lists (a,b,c,d) and in there numbers with how many times they occurred. Choose the ones which have occurred most frequently 
	
	//WOC: keep array of game[0]
	
	console.log("end of population");
};
function makeWOCGen(gen_left,n){
	if(gen_left > 0){
		if(gen_left%5 == 0){
				newBag();//every 5 generations generate a new bag - after 2 bags (10 generations) do WOC where you average
				WOCbag++;
		} 
		for(var i=0; i<n; i++){ //for every game
			if(TotalGenerations == gen_left){generateNewRandoms();
			} else {
				setNewABCD(i);//set new ABCD according to A for every game, i
			}
			var manager = new GameManager(i+1,a,b,c,d,bag);
			manager.actuate(manager.grid, manager.workingPiece);
			games.push(manager);
		}
		console.log("NEW GENERATION MADE - WOC");
		//WOCA.push(A[0]);// add to WOCA the first abcd of A doing this in checkAgain
		A = []; // Clear A
		setTimeout(checkAgain, 5000); // wait 5 seconds
	}
};
function makeGeneration(generations_left,n){
	if(generations_left>0){
		//newBag(); // generate a new list of pieces
		console.log("here are the pieces (in population.js): "+bag); //for testing
		for(var i = 0; i<n; i++){
			if(TotalGenerations==generations_left){generateNewRandoms();}// in the first generation, a b c and d are random
			else{
				setNewABCD(i); // sets the new abcd values according to A
				//console.log("in else");//mutate and crossover results
			}
			var manager = new GameManager(i+1,a,b,c,d,bag);
			manager.actuate(manager.grid, manager.workingPiece);
			games.push(manager);
		}
		console.log("NEW GENERATION MADE");
		A = []; // Clear A
		setTimeout(checkAgain, 5000); // wait 5 seconds
	}
};
function generateNewRandoms(){
	/*a= 0.4203 ;
	b = 0.7097 ;
	c = 0.8591 ;
	d = 0.8667;*/
	//generate random numbers between 0 and 1
	Math.seed;
	a = Math.random() * 1;
	b = Math.random() * 1;
	c = Math.random() * 1;
	d = Math.random() * 1;
};
function setNewABCD(i){
	//console.log("setting new ABCDs");
	a = A[i][0];
	b = A[i][1];
	c = A[i][2];
	d = A[i][3];
}
function newBag(){
	//bag = []; // bag of pieces
	//Math.seed;
	
	//Sequence 1
	/*bag = [6, 1, 5, 4, 3, 2, 0, 1, 0, 5, 4, 3, 6, 2, 
			1, 4, 5, 2, 6, 0, 3, 1, 5, 2, 0, 6, 3, 4, 
			4, 2, 6, 0, 1, 3, 5, 6, 3, 5, 2, 4, 0, 1, 
			1, 6, 3, 0, 2, 5, 4, 0, 6, 1, 3, 5, 2, 4, 
			3, 4, 2, 0, 1, 6, 5, 4, 5, 3, 1, 2, 0, 6, 
			0, 6, 5, 4, 1, 3, 2, 5, 4, 0, 6, 2, 3, 1, 
			3, 6, 4, 0, 2, 5, 1, 6, 2, 4, 3, 1, 5, 0, 
			0, 6, 4, 2, 3, 5, 1, 0, 2, 4, 5, 3, 6, 1, 
			5, 2, 0, 4, 6, 1, 3, 5, 4, 1, 0, 3, 6, 2, 
			3, 1, 0, 5, 2, 4, 6, 5, 2, 3, 0, 6, 4, 1]*/
		
	//Sequence 2
	/*bag = [3, 5, 2, 1, 6, 4, 0, 4, 1, 6, 3, 5, 0, 2, 
			3, 1, 0, 5, 6, 4, 2, 4, 2, 3, 6, 5, 0, 1, 
			1, 5, 3, 2, 0, 4, 6, 1, 4, 6, 3, 0, 2, 5, 
			5, 0, 6, 2, 4, 3, 1, 3, 2, 6, 5, 0, 1, 4, 
			1, 6, 3, 0, 4, 2, 5, 3, 2, 4, 5, 6, 0, 1, 
			5, 0, 1, 4, 6, 2, 3, 2, 4, 5, 6, 0, 1, 3, 
			1, 4, 2, 0, 6, 3, 5, 3, 4, 2, 6, 5, 1, 0, 
			4, 2, 5, 6, 3, 0, 1, 2, 5, 1, 4, 0, 3, 6, 
			2, 5, 3, 1, 0, 6, 4, 5, 0, 3, 1, 4, 2, 6, 
			3, 5, 6, 4, 1, 0, 2, 1, 6, 4, 0, 2, 3, 5]*/
		
	//Sequence 3	
	bag = [6, 3, 4, 5, 0, 2, 1, 2, 3, 6, 0, 1, 5, 4, 
			0, 6, 5, 3, 2, 4, 1, 6, 0, 5, 1, 3, 4, 2, 
			2, 4, 6, 5, 0, 3, 1, 0, 4, 3, 6, 2, 1, 5, 
			1, 6, 4, 2, 3, 0, 5, 3, 5, 2, 6, 1, 0, 4, 
			3, 5, 4, 2, 1, 0, 6, 6, 5, 1, 0, 4, 2, 3, 
			2, 3, 5, 6, 1, 4, 0, 1, 2, 6, 0, 3, 5, 4, 
			5, 1, 6, 3, 2, 0, 4, 5, 4, 1, 2, 3, 0, 6, 
			6, 2, 0, 3, 1, 4, 5, 2, 6, 5, 4, 1, 0, 3, 
			4, 5, 1, 0, 2, 3, 6, 4, 1, 3, 5, 6, 0, 2, 
			4, 1, 5, 0, 2, 3, 6, 5, 6, 3, 0, 2, 4, 1]
	// for(var i = 0; i<NumberOfPieces; i++){//last piece will not be used
		// bag.push(Math.floor(Math.random() * 7) + 0);//random number between 0-6
	// }
};
function checkAgain(){
	var allGamesDone = true;
	//console.log("in check again "+games)
	for(game in games){
		if(games[game].isRunning == true){
			allGamesDone = false;
			break; // a game is still running so break out of the loop and check again in a second
		}
	
	}
	if(allGamesDone == false){
		console.log("in the loop");
		setTimeout(checkAgain, 1000);
	} else { // out of settimeout loop
		console.log("out of loop scores:");
		var gameScores = []
		for(game in games){
			gameScores.push(games[game].getFinalScore());
			console.log(games[game].getFinalScore()); // all game scores
		}
	
		gameScores = sortArr(gameScores);//sort the array
		
		// print sorted array for testing
		/*for(i in gameScores){
			console.log("sorted all: "+gameScores[i]);
		}*/
		
		if(GenerationsLeft == TotalGenerations){ // check for best game
			bestGame = gameScores[0];//a b c d values of best game
		} else {
			var isItBest = [];
			isItBest.push(gameScores[0]); // add the best game in the generation
			isItBest.push(bestGame); // add the best game overall
			isItBest = sortArr(isItBest); // sort them
			bestGame = isItBest[0]; // take the one at the top as total best game
			console.log("NEW BEST GAME");
		}
		
		//display fittest individual before continuing
		this.bestgame=document.getElementById('best-game');
		//var data = '{a = '+fit1[0].toFixed(4) +' b = '+fit1[1].toFixed(4)+' c = '+fit1[2].toFixed(4)+' d = '+fit1[3].toFixed(4)+'}';
		this.bestgame.innerHTML = '<p style="text-align: center; font-size: 25px">Generation number: '+(TotalGenerations-GenerationsLeft+1)+'<br />Completed Lines: '+bestGame[0]+'<br />Height: '+bestGame[1]+'; Holes: '+bestGame[2]+'<br />Values: {a = '+bestGame[3][0].toFixed(4) +' b = '+bestGame[3][1].toFixed(4)+' c = '+bestGame[3][2].toFixed(4)+' d = '+bestGame[3][3].toFixed(4)+'}</p>';
		
		games = [];
		crossover(gameScores[0][3],gameScores[1][3]);
		GenerationsLeft--;
		// for woc
		if(WOC){
			WOCA.push(A[0]);
			if((WOCbag-1)%2 == 0 && WOCbag-1!=0){// if we are doing WOC and it has been through 2 bags
				console.log("This is WOCA");
				console.log(WOCA);
				parents = averageThem(WOCA);
				WOCA = [];
				crossover(parents,gameScores[0][3]);
			//	generateNewRandoms();//for new bag
			}
			makeWOCGen(GenerationsLeft,n);
		} else {
			makeGeneration(GenerationsLeft,n);
		}
		
		//checkAgain();
	} // end else
	//crossover + mutate
};
function averageThem(arr){ // averaging WOCA	
	var suma = 0, sumb = 0, sumc = 0, sumd = 0;
	
	for(item = 0; item<arr.length; item++){
		suma += arr[item][0];
		sumb += arr[item][1];
		sumc += arr[item][2];
		sumd += arr[item][3];
	}
	var avga = suma/arr.length;
	var avgb = sumb/arr.length;
	var avgc = sumc/arr.length;
	var avgd = sumd/arr.length;
	
	var returnme = [avga,avgb,avgc,avgd];
	return returnme; // for now just do averages of all 10 games
	
	/*//second bag
	var suma = 0, sumb = 0, sumc = 0, sumd = 0;
	
	for(item = 0; item<arr.length; item++){
		suma += arr[item][0];
		sumb += arr[item][1];
		sumc += arr[item][2];
		sumd += arr[item][3];
	}
	var avga = suma/arr.length;
	var avgb = sumb/arr.length;
	var avgc = sumc/arr.length;
	var avgd = sumd/arr.length;
	
	var returnme[1] = [avga,avgb,avgc,avgd];
	*/
	
};
//sort the array according to max(completed lines),min(height),min(holes)
function sortArr(gameScores){
	gameScores.sort(function(a, b) {
			return (b[0]) - (a[0]);//complete lines
		});
		gameScores.sort(function(a, b) {
			if (a[0] === b[0]) {
				return (a[1]) - (b[1]);//height
			} else {
				return 0;
			}
		});
		gameScores.sort(function(a, b) {
			if (a[0] === b[0] && a[1] == b[1]) {
				return (a[2]) - (b[2]);//holes
			} else {
				return 0;
			}
		});
	return gameScores;
};
function crossover(fit1, fit2){
	var parents = [fit1, fit2];
	//do crossover
	for (j = 0; j < 10; j++){
		var child = [];		
		//var x = Math.floor(Math.random() * 4) + 0;//from values zero to 3
		for(var z = 0; z<4; z++){
			Math.seed;
			var x = Math.floor(Math.random() * 2) + 0;//from values 0 and 1
			child[z] = parents[x][z];
		}
		A.push(child);
	}
	//console.log("Before mutations: "+A);
	//mutation
	for (i in A){
		//if 20% changed
		var x = Math.floor(Math.random() * 2) + 0;
		if(x == 0){
			//console.log("passed mutation 1");
			mutation(i);
		}
	}
	//console.log("After mutations: "+A);
};
function mutation(index){
	Math.seed;
	for(i in A[index]){ // go through all a,b,c,d in A[index]
		if(Math.floor(Math.random() * 5) + 1 == 1){ //25% change of mutation (if == 1 then mutate)
			Math.seed;
			if(Math.floor(Math.random() * 8) + 1 == 3){ // random chance of all new randoms
				A[index] = [Math.random() * 1,Math.random() * 1,Math.random() * 1,Math.random() * 1];
			} else {
				y = ((Math.random() * 3) - 1) * 0.1 ;
				if(A[index][i] + y >= 0 && A[index][i] + y <=1){// make sure not negative
					A[index][i] += y; // generate value between -1 and 1
				}
			}				
		}
	}
};
