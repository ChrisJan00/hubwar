var graphics = new GraphicsManager();
var gameControl = new GameControl();

function loaderProgress() {
	return 100;
}

function prepareGame() {
	graphics.init();
	//graphics.shapesLayer = graphics.createLayer();
	//graphics.peopleLayer = graphics.createLayer();
	
	graphics.bgLayer = graphics.createLayer();
	graphics.linksLayer = graphics.createLayer();
	graphics.computersLayer = graphics.createLayer();
	
	var ctxt = graphics.getContext( graphics.bgLayer );
	ctxt.fillStyle = "#A0A0A0";
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
	var ctxt = graphics.getContext( graphics.computersLayer );
	var ctxt2 = graphics.getContext( graphics.linksLayer );
	var xside = graphics.width / 20;
	var yside = graphics.height / 20;
	
	for (var i=0; i<ComputerList.length; i++) {
		var x = (ComputerList[i].x + 0.5) * xside;
		var y = (ComputerList[i].y + 0.5) * yside;
		var r = (yside / 2);
		
		ctxt.fillStyle = "#000000";
		ctxt.strokeStyle = "#000000";
		ctxt.linewidth = 2;
		ctxt.beginPath();
		ctxt.arc(x, y , r, 0,Math.PI*2,true);
		ctxt.closePath();
		//ctxt.stroke();
		ctxt.fill();
		
		for (var j=0; j<ComputerList[i].links.length; j++) {
			var dest = ComputerList[i].links[j];
			if (dest <= i)
				continue;
			
			var x2 = (ComputerList[dest].x + 0.5) * xside;
			var y2 = (ComputerList[dest].y + 0.5) * yside;
			
			ctxt2.beginPath();
			ctxt2.moveTo(x,y);
			ctxt2.lineTo(x2,y2);
			ctxt2.stroke();
		}
	}
	
	
}
