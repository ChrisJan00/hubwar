var graphics = new GraphicsManager();
var gameControl = new GameControl();

function loaderProgress() {
	return 100;
}

function prepareGame() {
	graphics.init();
	//graphics.shapesLayer = graphics.createLayer();
	//graphics.peopleLayer = graphics.createLayer();
	
	graphics.connectionsLayer = graphics.createLayer();
	graphics.computersLayer = graphics.createLayer();
	
	var ctxt = graphics.getContext( graphics.connectionsLayer );
	ctxt.fillStyle = "#A0A0A0";
	ctxt.fillRect(0,0,graphics.width, graphics.height);
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
