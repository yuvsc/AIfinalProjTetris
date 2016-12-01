function RandomPieceGenerator(bag_list){
	//Math.seed
    this.bag = bag_list;
	// this.bag = [6, 1, 5, 4, 3, 2, 0, 1, 0, 5, 4, 3, 6, 2, 
				// 1, 4, 5, 2, 6, 0, 3, 1, 5, 2, 0, 6, 3, 4, 
				// 4, 2, 6, 0, 1, 3, 5, 6, 3, 5, 2, 4, 0, 1, 
				// 1, 6, 3, 0, 2, 5, 4, 0, 6, 1, 3, 5, 2, 4, 
				// 3, 4, 2, 0, 1, 6, 5, 4, 5, 3, 1, 2, 0, 6, 
				// 0, 6, 5, 4, 1, 3, 2, 5, 4, 0, 6, 2, 3, 1, 
				// 3, 6, 4, 0, 2, 5, 1, 6, 2, 4, 3, 1, 5, 0, 
				// 0, 6, 4, 2, 3, 5, 1, 0, 2, 4, 5, 3, 6, 1, 
				// 5, 2, 0, 4, 6, 1, 3, 5, 4, 1, 0, 3, 6, 2, 
				// 3, 1, 0, 5, 2, 4, 6, 5, 2, 3, 0, 6, 4, 1]
	//this.shuffleBag(); //don't suffle the bag for now
    this.index = -1;
};

RandomPieceGenerator.prototype.nextPiece = function(){
    this.index++;
	//console.log("this is the index "+this.index);
	if(this.index>=this.bag.length){ // checks for the end of the bag
		//should never get to this because it is caught first in game_manager.js
		throw new Error("game is over - went through all of the pieces in the bag - something went wrong");
		return -1;
	} else {
		/*if (this.index >= this.bag.length){
			this.shuffleBag();
			this.index = 0;
		}*/
		return Piece.fromIndex(this.bag[this.index]);
	}
};

RandomPieceGenerator.prototype.shuffleBag = function() { // is not called
    var currentIndex = this.bag.length
        , temporaryValue
        , randomIndex
        ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.bag[currentIndex];
        this.bag[currentIndex] = this.bag[randomIndex];
        this.bag[randomIndex] = temporaryValue;
    }
};