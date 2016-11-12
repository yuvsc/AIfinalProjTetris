var a,b,c,d;
var bestGame = []; // this will contain a,b,c,d, score: {lines cleared, holes, index through the bag of pieces}
games = [];
var n;
TotalGenerations = 3;
NumberOfPieces = 71;
GenerationsLeft = TotalGenerations;
var A = [];


function population(x){ // n is the number in population (can be changed in index.html
	n = x;
	//this.generations = 1;
	//generations = this.generations;
	//this.games = []; // includes {game manager... to get lines cleared, holes, index through pieces} -> then get the best of them and say bestGame = to that
	makeGeneration(TotalGenerations,n);
	
	// now from completed lines, holes, height, don't need pieces gone through,
	// completed: (getFinalScore): completed lines, height, holes
	// sort the games: max(completed lines), min(height), min(holes)
	
	// lines ; height ; holes
	// wisdom of crowds: keep a 2 d array with the 4 lists (a,b,c,d) and in there numbers with how many times they occurred. Choose the ones which have occurred most frequently 
	
	console.log("end of population");
};
function makeGeneration(generations_left,n){
	if(generations_left>0){
		newBag(); // generate a new list of pieces
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
	Math.seed;
	/*a= 0.4203 ;
	b = 0.7097 ;
	c = 0.8591 ;
	d = 0.8667;*/
	//generate random numbers between 0 and 1
	a = Math.random() * 1;
	b = Math.random() * 1;
	c = Math.random() * 1;
	d= Math.random() * 1;
};
function setNewABCD(i){
	//console.log("setting new ABCDs");
	a = A[i][0];
	b = A[i][1];
	c = A[i][2];
	d = A[i][3];
}
function newBag(){
	bag = []; // bag of pieces
	Math.seed;
	//bag = [6,2,6,5,4,2,5,2,0,0,6,3,6,5,6,6,4,4,1,1,3];
	for(var i = 0; i<NumberOfPieces; i++){//last piece will not be used
		bag.push(Math.floor(Math.random() * 7) + 0);//random number between 0-6
	}
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
	} else {
		console.log("out of loop scores:");
		var gameScores = []
		for(game in games){
			gameScores.push(games[game].getFinalScore());
			console.log(games[game].getFinalScore()); // all game scores
		}
	//	console.log(gameScores);
		//	console.log("highest score: "+Math.max.apply( Math, gameScores));
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
		
		games = [];
		crossover(gameScores[0][3],gameScores[1][3]);
		GenerationsLeft--;
		
		makeGeneration(GenerationsLeft,n);
		//checkAgain();
	}
	//crossover + mutate
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
		Math.seed;
		var x = Math.floor(Math.random() * 4) + 0;//from values zero to 3
		for (z = x; z < 4; z++){
			child[z] = parents[0][z];
		}
		for(z = 0; z < x; z++){
			child[z] = parents[1][z];
		}
		A.push(child);
<<<<<<< HEAD
	}	
	console.log("Before mutations: "+A);
=======
	}
	//console.log("Before mutations: "+A);
>>>>>>> f45670b3db2b5ea67bce164b84450f78092db18d
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
			//console.log("passed mutation 2");
			y = Math.random() * -0.1;
			if(A[index][i] + y >= 0){// make sure not negative
				A[index][i] += y; // generate value between -1 and 1
			}			
		}
	}
};
