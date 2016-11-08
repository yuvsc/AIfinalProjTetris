function RandomPieceGenerator(bag_list){
	//Math.seed
    this.bag = bag_list;//[3,3,3,4,4,4,3];//[0, 1, 2, 3, 4, 5, 6];
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