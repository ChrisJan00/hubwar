var graphics = new GraphicsManager();
var gameControl = new GameControl();
var mouseManager = new MouseManager();

// grid is 21 x 21

function loaderProgress() {
	return 100;
}

function prepareGame() {
	graphics.init();
	mouseManager.registerCanvas( graphics.gameCanvas );
	mouseManager.pressedFunction = pressed;
	
	// data
	grid = {
		width: 21,
		height: 21
	}
	
	
	
	
	graphics.linksLayer = graphics.createLayer();
	graphics.computersLayer = graphics.createLayer();
	graphics.popLayer = graphics.createLayer();
	
	graphics.getContext(graphics.popLayer).font = "10px";
	
	var ctxt = graphics.getContext( graphics.linksLayer );
	ctxt.fillStyle = "#FFFFFF";
	ctxt.fillRect(0,0,graphics.width, graphics.height);
	
	drawComputers();
	
	graphics.mark(0,0,graphics.width, graphics.height);
	
	graphics.redraw();
}

function launchGame() {
	gameControl.start();
}

function update(dt) {
	//player.update(dt);
}

function draw(dt) {
//	player.undraw(dt);
//	player.draw(dt);
//	if (lightsManager.dirty) {
//		lightsManager.computeLights();
//		graphics.redraw();
//		lightsManager.dirty = false;
//	}
	
}

function drawComputers() {
	var ctxt2 = graphics.getContext( graphics.linksLayer );
	var xside = graphics.width / grid.width;
	var yside = graphics.height / grid.height;
	
	for (var i=0; i<ComputerList.length; i++) {
		var x = (ComputerList[i].x + 0.5) * xside;
		var y = (ComputerList[i].y + 0.5) * yside;
	
		drawComputer(i);
		drawPop(i);
		
		for (var j=0; j<ComputerList[i].links.length; j++) {
			var dest = ComputerList[i].links[j];
			if (dest <= i)
				continue;
			
			var x2 = (ComputerList[dest].x + 0.5) * xside;
			var y2 = (ComputerList[dest].y + 0.5) * yside;
			
			ctxt2.strokeStyle = "#404040";
			ctxt2.linewidth = 4
		
			ctxt2.beginPath();
			ctxt2.moveTo(x,y);
			ctxt2.lineTo(x2,y2);
			ctxt2.stroke();
		}
	}
}

function drawComputer(index) {
	var ctxt = graphics.getContext( graphics.computersLayer );
	var xside = graphics.width / grid.width;
	var yside = graphics.height / grid.height;
	
	var x = (ComputerList[index].x + 0.5) * xside;
	var y = (ComputerList[index].y + 0.5) * yside;
	var r = (yside / 2);
		
	if (ComputerList[index].selected)
		ctxt.fillStyle="#A0A0A0";
	else
	switch(ComputerList[index].owner) {
		case 0: ctxt.fillStyle = "#A0A0A0"; break;
		case 1: ctxt.fillStyle = "#FF0000"; break;
		case 2: ctxt.fillStyle = "#0000FF"; break;
	}
		
	ctxt.beginPath();
	ctxt.arc(x, y , r, 0,Math.PI*2,true);
	ctxt.closePath();
	ctxt.fill();
		
	graphics.mark(ComputerList[index].x * xside, ComputerList[index].y * yside, xside, yside);
}

function findComputer(x,y) {
	var xpos = Math.floor(x / graphics.width * grid.width);
	var ypos = Math.floor(y / graphics.height * grid.height);
	
	for (var i=0;i<ComputerList.length;i++)
		if (ComputerList[i].x == xpos && ComputerList[i].y == ypos)
			return i;
	return -1;
}

function pressed() 
{
	// find which computer was pressed
	var computerIndex = findComputer(mouseManager.x, mouseManager.y);
	if (computerIndex == -1)
		return;
		
	if (ComputerList[computerIndex].selected)
		ComputerList[computerIndex].selected = false;
	else
		ComputerList[computerIndex].selected = true;
		
	drawComputer(computerIndex);
	graphics.redraw();
}

function drawPop(index) 
{
	var ctxt = graphics.getContext( graphics.popLayer );
	var xside = graphics.width / grid.width;
	var yside = graphics.height / grid.height;
	
	var x = ComputerList[index].x * xside;
	var y = ComputerList[index].y * yside;
	
	ctxt.clearRect( x, y, xside, yside );
	
	var string = ""+ComputerList[index].pop;
	var textLen = ctxt.measureText( string ).width;
		
	ctxt.strokeStyle = "#000000";
	ctxt.strokeText(string, x + xside/2 - textLen/2, y + yside/2 + 5);
		
	graphics.mark(ComputerList[index].x * xside, ComputerList[index].y * yside, xside, yside);
}
