var a,b,c,d;
var bestGame = []; // this will contain a,b,c,d, score: {lines cleared, holes, index through the bag of pieces}

function population(n){ // n is the number in population (can be changed in index.html
	var generations = 1;
	games = [] // includes {game manager... to get lines cleared, holes, index through pieces} -> then get the best of them and say bestGame = to that
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
			//maybe use throw / catch errors to find what the score is at the end of the games to compare them within a generation
		}
	}
	setTimeout(function ah(){if(games[0].isRunning == true){console.log("in the loop");setTimeout(ah, 9000);}}, 9000);
	
	console.log("out of the check "+games[0].finalScore);
};
function generateNewRandoms(){
	Math.seed;
	//generate random numbers between 0 and 1
	a = Math.random() * 1;
	b = Math.random() * 1;
	c = Math.random() * 1;
	d= Math.random() * 1;
};
function newBag(){
	bag = [] // bag of pieces
	Math.seed;
	for(var i = 0; i<11; i++){//last piece will not be used
		bag.push(Math.floor(Math.random() * 7) + 0);//random number between 0-6
	}
};
function checkAgain(){
	if(this.games[0].isRunning == true){
		console.log("in the loop");
		setTimeout(checkAgain, 9000);
	}
};