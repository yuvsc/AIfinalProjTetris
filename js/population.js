var a,b,c,d;

function population(n){
	for(var i = 0; i<n; i++){
		generateNewRandoms();
		var manager = new GameManager(i+1,a,b,c,d);
		manager.actuate(manager.grid, manager.workingPiece);
	}
	
	/*generateNewRandoms();
    var manager = new GameManager(1,a,b,c,d);
    manager.actuate(manager.grid, manager.workingPiece);
	
	generateNewRandoms();
	var manager2 = new GameManager(2,a,b,c,d);
    manager2.actuate(manager2.grid, manager2.workingPiece);
	
	generateNewRandoms();
	var manager3 = new GameManager(3,a,b,c,d);
    manager3.actuate(manager3.grid, manager3.workingPiece);
	
	generateNewRandoms();
	var manager4 = new GameManager(4,a,b,c,d);
    manager4.actuate(manager4.grid, manager4.workingPiece);
	
	generateNewRandoms();
	var manager5 = new GameManager(5,a,b,c,d);
    manager5.actuate(manager5.grid, manager5.workingPiece);
	
	generateNewRandoms();
	var manager6 = new GameManager(6,a,b,c,d);
    manager6.actuate(manager6.grid, manager6.workingPiece);
	
	generateNewRandoms();
	var manager7 = new GameManager(7,a,b,c,d);
    manager7.actuate(manager7.grid, manager7.workingPiece);
	
	generateNewRandoms();
	var manager8 = new GameManager(8,a,b,c,d);
    manager8.actuate(manager8.grid, manager8.workingPiece);
	
	generateNewRandoms();
	var manager9 = new GameManager(9,a,b,c,d);
    manager9.actuate(manager9.grid, manager9.workingPiece);
	
	generateNewRandoms();
	var manager10 = new GameManager(10,a,b,c,d);
    manager10.actuate(manager10.grid, manager10.workingPiece);
	
	/*var manager11 = new GameManager(11);
    manager11.actuate(manager11.grid, manager11.workingPiece);
	
	var manager12 = new GameManager(12);
    manager12.actuate(manager12.grid, manager12.workingPiece);*/
};
function generateNewRandoms(){
	Math.seed;
	a = Math.random() * 1;
	b = Math.random() * 1;
	c = Math.random() * 1;
	d= Math.random() * 1;
};