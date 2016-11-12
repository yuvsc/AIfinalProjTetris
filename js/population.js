var a,b,c,d;
var bestGame = []; // this will contain a,b,c,d, score: {lines cleared, holes, index through the bag of pieces}

function population(n){ // n is the number in population (can be changed in index.html
	var generations = 1;
	games = [] // includes {game manager... to get lines cleared, holes, index through pieces} -> then get the best of them and say bestGame = to that
//	this.makeGeneration(this.generations,n);
	for(var current_generation = 0; current_generation<generations; current_generation++){
		newBag(); // generate a new list of pieces
		console.log("here are the pieces (in population.js): "+bag); //for testing
		for(var i = 0; i<n; i++){
			if(current_generation==0){generateNewRandoms();}// in the first generation, a b c and d are random
			else{
				//mutate and crossover results
			}
			var manager = new GameManager(i+1,a,b,c,d,bag);
			manager.actuate(manager.grid, manager.workingPiece);
			games.push(manager);
		}
	}
	//setTimeout(function ah(){if(games[0].isRunning == true){console.log("in the loop");setTimeout(ah, 9000);}}, 9000);
	//setTimeout(checkAgain, 1000);
	checkAgain();
	
	// now from completed lines, holes, height, don't need pieces gone through,
	// completed: (getFinalScore): completed lines, height, holes
	// sort the games: max(completed lines), min(height), min(holes)
	
	// lines ; height ; holes
	// wisdom of crowds: keep a 2 d array with the 4 lists (a,b,c,d) and in there numbers with how many times they occurred. Choose the ones which have occurred most frequently 
	
	console.log("end of population");
};
population.prototype.makeGeneration = function(generations_left,n){
	newBag(); // generate a new list of pieces
	console.log("here are the pieces (in population.js): "+bag); //for testing
	for(var i = 0; i<n; i++){
		if(this.generations==generations_left){generateNewRandoms();}// in the first generation, a b c and d are random
		else{
			console.log("in else");//mutate and crossover results
		}
		console.log("making them rain");
		var manager = new GameManager(i+1,a,b,c,d,bag);
		manager.actuate(manager.grid, manager.workingPiece);
		this.games.push(manager);
	}
};
function generateNewRandoms(){
	Math.seed;
	/*a = 0;
	b = 0;
	c = 0;
	d = 0;*/
	a= 0.4203 ;
	b = 0.7097 ;
	c = 0.8591 ;
	d = 0.8667;
	//generate random numbers between 0 and 1
	a = Math.random() * 1;
	b = Math.random() * 1;
	c = Math.random() * 1;
	d= Math.random() * 1;
};
function newBag(){
	bag = [] // bag of pieces
	Math.seed;
	bag = [6,2,6,5,4,2,5,2,0,0,6,3,6,5,6,6,4,4,1,1,3];
	/*for(var i = 0; i<21; i++){//last piece will not be used
		bag.push(Math.floor(Math.random() * 7) + 0);//random number between 0-6
	}*/
};
function checkAgain(){
	var allGamesDone = true;
	for(game in this.games){
		if(this.games[game].isRunning == true){
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
		for(game in this.games){
			gameScores.push(this.games[game].getFinalScore());
			console.log(this.games[game].getFinalScore()); // all game scores
		}
		console.log(gameScores);
	//	console.log("highest score: "+Math.max.apply( Math, gameScores));
	//sort the array
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
		// print sorted array for testing
		for(i in gameScores){
			console.log("sorted all: "+gameScores[i]);
		}
	
	}
	//crossover + mutate
};