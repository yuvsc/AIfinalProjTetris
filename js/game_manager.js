function GameManager(i, a, b, c, d,pieces_list){//number, height, line, holes, bumpiness, bag of pieces 
    this.gridCanvas = document.getElementById('grid-canvas'+i);
    this.nextCanvas = document.getElementById('next-canvas'+i);
    this.scoreContainer = document.getElementById("score-container"+i);
    this.resetButton = document.getElementById('reset-button');
    this.aiButton = document.getElementById('ai-button');
	
	this.finalScore = 0;
	this.finalIndex = 0;
	this.finalHeight = 0;
	this.finalHoles = 0;
	this.i = i;
	
	this.isRunning = true;
	
	this.bag = pieces_list;
	
	// display the numbers of a,b,c,d in the next-number box
	this.randomNumbers=document.getElementById('next-number'+i);
	var allofthem = 'a = '+a.toFixed(4) +'\nb = '+b.toFixed(4)+'\n c = '+c.toFixed(4)+'\n d = '+d.toFixed(4);
	this.randomNumbers.innerHTML = allofthem;
	
    this.gravityUpdater = new Updater();
    this.gravityUpdater.skipping = this.aiActive;
    this.gravityUpdater.onUpdate(function(){
        self.applyGravity();
        self.actuate();
    });

    var self = this;
    document.addEventListener("keydown", function (event){
        switch(event.which){
            case 32: //drop
                self.drop();
                self.gravityUpdater.doUpdate(Date.now());
                break;
            case 40: //down
                self.gravityUpdater.doUpdate(Date.now());
                break;
            case 37: //left
                self.moveLeft();
                self.actuate();
                break;
            case 39: //right
                self.moveRight();
                self.actuate();
                break;
            case 38: //up
                self.rotate();
                self.actuate();
                break;
        }
    });
    this.aiButton.onclick = function(){
        if (self.aiActive){
            self.stopAI();
        }else{
            self.startAI();
        }
    }
    this.resetButton.onclick = function(){
        self.setup(a,b,c,d);
    }

    this.setup(a,b,c,d);
    this.startAI();
    this.gravityUpdater.checkUpdate(Date.now());
};

GameManager.prototype.setup = function(a,b,c,d){
    this.grid = new Grid(22, 10);
    this.rpg = new RandomPieceGenerator(this.bag);
    this.ai = new AI(a,b,c,d)//height, line, holes, bumpiness(0.510066, 0.760666, 0.35663, 0.184483);
    this.workingPieces = [this.rpg.nextPiece(), this.rpg.nextPiece()];
    this.workingPiece = this.workingPieces[0];

    this.isOver = true;
    this.score = 0;

    this.stopAI();
    this.actuate();
};

GameManager.prototype.actuate = function(){
    var _grid = this.grid.clone();
    if (this.workingPiece != null) {
        _grid.addPiece(this.workingPiece);
    }

    var context = this.gridCanvas.getContext('2d');
    context.save();
    context.clearRect(0, 0, this.gridCanvas.width, this.gridCanvas.height);
    for(var r = 2; r < _grid.rows; r++){
        for(var c = 0; c < _grid.columns; c++){
            if (_grid.cells[r][c] == 1){
                context.fillStyle="#FF0000";
                context.fillRect(20 * c, 20 * (r - 2), 20, 20);
                context.strokeStyle="#FFFFFF";
                context.strokeRect(20 * c, 20 * (r - 2), 20, 20);
            }
        }
    }
    context.restore();

    context = this.nextCanvas.getContext('2d');
    context.save();
    context.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    var next = this.workingPieces[1];
    var xOffset = next.dimension == 2 ? 20 : next.dimension == 3 ? 10 : next.dimension == 4 ? 0 : null;
    var yOffset = next.dimension == 2 ? 20 : next.dimension == 3 ? 20 : next.dimension == 4 ? 10 : null;
    for(var r = 0; r < next.dimension; r++){
        for(var c = 0; c < next.dimension; c++){
            if (next.cells[r][c] == 1){
                context.fillStyle="#FF0000";
                context.fillRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
                context.strokeStyle="#FFFFFF";
                context.strokeRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
            }
        }
    }
    context.restore();

    this.scoreContainer.innerHTML = this.score.toString();
};

GameManager.prototype.startAI = function(){
    this.aiActive = true;
    this.aiButton.style.backgroundColor = "#e9e9ff";
    this.gravityUpdater.skipping = true;
};

GameManager.prototype.stopAI = function(){
    this.aiActive = false;
    this.aiButton.style.backgroundColor = "#f9f9f9";
    this.gravityUpdater.skipping = false;
};

GameManager.prototype.setWorkingPiece = function(){
    this.grid.addPiece(this.workingPiece);
    this.score += this.grid.clearLines();
    if (!this.grid.exceeded() && this.rpg.index +1 <this.bag.length){
        for(var i = 0; i < this.workingPieces.length - 1; i++){
            this.workingPieces[i] = this.workingPieces[i + 1];
        }
        this.workingPieces[this.workingPieces.length - 1] = this.rpg.nextPiece();
        this.workingPiece = this.workingPieces[0];
        if (this.aiActive) {
            this.aiMove();
            this.gravityUpdater.skipping = true;
        }
    }else{ // when game is over
		this.finalIndex = this.rpg.index; // pieces gone through
		this.finalScore = this.score; // completed lines
		console.log("final score for "+this.i+" is "+this.finalScore);
		//change isRunning to false
		this.isRunning = false;
		
		this.actuate();//draw one more time
		
		//height
	    var grid_clone = this.grid.clone(); // 2 cells above (0 starts from very top) .cells[row][column]
		for(var findIt_index = 0; findIt_index < grid_clone.rows; findIt_index++){
			for(var c = 0; c<grid_clone.columns; c++){
				if(grid_clone.cells[findIt_index][c] == 1){//find the first 1
					this.finalHeight = 22 - findIt_index;
					break;
				}
			}
			if(this.finalHeight != 0){break;}
		}
		console.log("Final Height: "+this.finalHeight);
		
		//holes
		this.finalHoles = grid_clone.holes();
		console.log("Final Hole Count: "+ this.finalHoles);
		
        //alert("Game Over!");
		throw new Error("game is over");
    }
};

GameManager.prototype.getFinalScore = function(){
	var results = []
	results.push(this.finalScore); // completed lines
	results.push(this.finalHeight); // height
	results.push(this.finalHoles); // holes
	//results.push(this.finalIndex);// pieces gone through
	return results
};

GameManager.prototype.applyGravity = function(){
    if (this.grid.canMoveDown(this.workingPiece)) {
        this.workingPiece.row++;
    }else{
        this.gravityUpdater.skipping = false;
        this.setWorkingPiece();
    }
};

GameManager.prototype.drop = function(){
    while(this.grid.canMoveDown(this.workingPiece)){
        this.workingPiece.row++;
    }
};

GameManager.prototype.moveLeft = function(){
    if (this.grid.canMoveLeft(this.workingPiece)){
        this.workingPiece.column--;
    }
};

GameManager.prototype.moveRight = function(){
    if (this.grid.canMoveRight(this.workingPiece)){
        this.workingPiece.column++;
    }
};

GameManager.prototype.rotate = function(){
    var offset = this.grid.rotateOffset(this.workingPiece);
    if (offset != null){
        this.workingPiece.rotate(1);
        this.workingPiece.row += offset.rowOffset;
        this.workingPiece.column += offset.columnOffset;
    }
};

GameManager.prototype.aiMove = function(){
    this.workingPiece = this.ai.best(this.grid, this.workingPieces, 0).piece;
};


