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
	
	turnDelay = 2000; // ms
	turnTimer = 0;
	selectedComputer = -1;
	playerIndex = 1;
	
	Packets = [];
	
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
	turnTimer -= dt;
	if (turnTimer <= 0) {
		turnTimer = turnDelay;
		manageTurn();
	}
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
		case 1: ctxt.fillStyle = "#FF4444"; break;
		case 2: ctxt.fillStyle = "#4444FF"; break;
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
		
//	if (ComputerList[computerIndex].selected)
//		ComputerList[computerIndex].selected = false;
//	else
//		ComputerList[computerIndex].selected = true;

	if (ComputerList[computerIndex].owner == playerIndex)
		selectedComputer = computerIndex;
	else
		if ((selectedComputer != -1) && 
			(ComputerList[selectedComputer].links.indexOf(computerIndex) != -1)) {
			var newOrder = {
				from: selectedComputer,
				to: computerIndex,
				threshold: ComputerList[selectedComputer].pop,
				strength: Math.floor(ComputerList[selectedComputer].pop / 2),
				loop: false
			}
			ComputerList[selectedComputer].orders.push(newOrder);
			selectedComputer = -1;
		}
		
	// drawComputer(computerIndex);
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
	
	var string = ""+Math.floor(ComputerList[index].pop);
	var textLen = ctxt.measureText( string ).width;
		
	ctxt.strokeStyle = "#000000";
	ctxt.strokeText(string, x + xside/2 - textLen/2, y + yside/2 + 5);
		
	graphics.mark(ComputerList[index].x * xside, ComputerList[index].y * yside, xside, yside);
}

function manageTurn() 
{
	// first: increase population
	for (var i=0; i<ComputerList.length; i++)
		if (ComputerList[i].owner != 0)
			ComputerList[i].pop += ComputerList[i].rate;
		
	// each computer executes its orders
	for (var i=0; i<ComputerList.length; i++) {
		for (var o=0; o<ComputerList[i].orders.length; o++) {
			var order = ComputerList[i].orders[o];
			if (ComputerList[i].pop >= order.threshold) {
				var newFleet = {
					pos : order.from,
					dest : order.to,
					pop : order.strength,
					owner : ComputerList[i].owner
				}
				Packets.push(newFleet)
				ComputerList[i].pop -= order.strength;
				
				if (!order.loop) {
					ComputerList[i].orders.splice(o, 1);
					o--;
				}
			}
		}
	}
	
	// the packets advance
	for (var i=0; i<Packets.length; i++) {
		var packet = Packets[i];
		// conflicts
		var destComp = ComputerList[packet.dest];
		if (destComp.owner != packet.owner) {
			if (destComp.pop > packet.pop) {
				destComp.pop -= packet.pop;
			} else {
				packet.pop -= destComp.pop;
				destComp.pop = packet.pop;
				destComp.owner = packet.owner;
				// redraw computer
				drawComputer(packet.dest);
			}
		} else {
			destComp.pop += packet.pop;
		}
	}
	
	// delete all used packets
	Packets = [];
	
	for (var i=0; i<ComputerList.length; i++)
		drawPop(i);
		
	graphics.redraw();
}
