ProgrammingWindow = function() {
	var self = this;
	
	self.init = function() {
		self.output = document.getElementById("programmingWindow");
		self.output.innerHTML = "";
	}
	
	self.update = function() {
		// Add order
		var text = "<form>"
		for (var i = 0;i<ComputerList.length;i++) {
			if (ComputerList[i].owner == 1)
			for (var j=0;j<ComputerList[i].orders.length;j++)
				text += self.printOrder(ComputerList[i].orders[j]);
		}
		
		text += "</form>"
		self.output.innerHTML = text;
	}
	
	self.printOrder = function( order ) {
		
		var withloop = order.loop? " every turn" : " once";
		var string = indexToLetter( order.from )+" : "+"when > "+order.threshold+" packets send "+
			order.strength+" to "+indexToLetter( order.to ) + withloop + "<br>";
		
		return string;
	}
	
	
	
	self.Aprint = function(_who, text) 
	{
		var paragraphStart = "<span style=\"font-family:CustomFont, sans-serif; color:"+G.display.colorForPlayerBorder(_who)+"\">";
		var paragraphEnd = "<br></span>";
		self.outputString = paragraphStart + text + paragraphEnd + self.outputString;
		
	}
	
	
	self.AregisterMove = function(_who, _stone, _fromPosition) 
	{
		var playString = playerName+" "+G.strings.playAction+" "+elementName+" "+G.strings.prePosition+" ("+_stone.ix+", "+_stone.iy+")";
		
		self.outputString = "";
		
		self.outputString = "</div>";
		self.countChanges(_stone);
		self.print(_who, playString);
		self.outputString = "<span style=\"font-family:CustomFont, sans-serif\">" + turnNumber + ". " + "</span>" + self.outputString;
		self.outputString = "<div id=\"turn" + turnNumber + "\">" + self.outputString;
		
		self.output.innerHTML = self.outputString + self.output.innerHTML;
		
		self.index++;
		
		// force end of memory here
		if (self.moves.length > self.index)
			self.moves.splice(self.index, self.moves.length - self.index + 1);
	}
	
	self.AshowResult = function(_who, stoneFrom, stoneTo, stoneCount) 
	{
	
		var playString = "<span style=\"padding-left:40px\">" 
		+ attackerName + G.strings.possessive + " " + attackerElement + " " + verb + " "
		+ stoneCount + " " + defenderName + G.strings.possessive + " " + defenderElement + (stoneCount>1?G.strings.plural:"")
		+ "</span>";
		 
		self.print(_who, playString);
	}
	
}
