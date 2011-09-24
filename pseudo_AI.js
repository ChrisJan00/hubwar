//This is the pseudo AI logic

var ControledNodes[];
var PossibleHostileTargets[];
var PossibleNeutralTargets[];
var AttackTarget;
var DefenceTarget;

function main(){

// check through each node for neighbour hostile node
	for ( var node in ControledNodes ) {
		
		if ( node.haveHostileNeighbor() ) {
			
			//calculate all the hostile node combined power for a node
			//save the combined power to node.defenceNeed
			node.defenceNeed = node.HostileNodes.CombinedPower();
			for ( var node in mineNode.HostileNodes )
			{
				//check through all hostile node, find the one with the weakest power
				if ( node.isWeakest() )
				{
					//add the weakest node into the array PossibleTargets
					PossibleHostileTargets.Add(node);
				}
			}
			//if it only has neutral neighbors
		} else if ( node.haveNeutralNeighbor() ) {
				var neutralTarget = node.FindWeakestNeighbor();
				PossibleNeutralTargets.Add(neutralTarget);
			}
		
		
		//update the DefenceTarget to the one that have most combined hostile neighbour power
		if (node.defenceNeed > DefenceTarget.defenceNeed)
		{
			DefenceTarget = node;
		}
		
	}
	
	//sort all power of PossibleTargets, find the weakest to be the AttackTarget of the turn.
	AttackTarget = FindWeakestIn(PossibleTargets);
	
	//if only has AttackTarget
	If ( AttackTarget && !DefenceTarget )
	{
		for (var node in AttackTarget.ConnectedNodesOfMine)
		{
			node.Attack(AttackTarget, node.AllPower);
		}
	} else If ( !AttackTarget && DefenceTarget )
	//if only has DefenceTarget
	{
		for (var node in DefenceTarget.ConnectedNodesOfMine)
		{
			node.Attack(DefenceTarget, node.AllPower);
		}
	} else	If ( AttackTarget && DefenceTarget ) {
		//if has both AttackTarget and DefenceTarget
		//50/50 percent on attack or defense
		If ( Random(0,1) > 0.5 ) //attack
		{
			for (var node in AttackTarget.ConnectedNodesOfMine)
			{
				node.Attack(AttackTarget, node.AllPower);
			}
		} else {
			for (var node in DefenceTarget.ConnectedNodesOfMine)
			{
				node.Attack(DefenceTarget, node.AllPower);
			}
		}
	} else {
	// when we have finished attack or defence task, we can make expansion with neutral ones
		for ( var node in PossibleNeutralTargets )
		{
			if ( node.Power < node.ConnectedNodesOfMine.CombinedPower )
			{
				for ( var node in targetNode.ConnectedNodesOfMine)
				{
					//attack the target node with all power or the least power needed for conquering
					node.Attack(targetNode, min( node.AllPower, (targetNode.AllPower+1) );
					if (node.AllPower > targetNode.AllPower)
					{
						break;
					}
				}
				
			}
		}
	}
	
	
	
	
	

}