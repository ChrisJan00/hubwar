// x,y positions refer to a 20,20 grid
ComputerList = [
	// 0
	{
		x: 10,
		y: 2,
		pop: 3,
		rate: 1,
		links: [ 1, 2 ],
		owner: 1,
		orders: [],
	},
	// 1
	{
		x: 7,
		y: 5,
		pop: 1,
		rate: 1,
		links: [ 0, 4 ],
		owner: 0,
		orders: [],
	},
	// 2
	{
		x: 13,
		y: 5,
		pop: 1,
		rate: 1,
		links: [ 0, 4, 5 ],
		owner: 0,
		orders: [],
	},
	// 3
	{
		x: 5,
		y: 10,
		pop: 1,
		rate: 1,
		links: [ 4, 6 ],
		owner: 0,
		orders: [],
	},
 	// 4
	{
		x: 10,
		y: 10,
		pop: 1,
		rate: 1,
		links: [ 1, 2, 3, 5, 6, 7 ],
		owner: 0,
		orders: [],
	},
   	// 5
	{
		x: 15,
		y: 10,
		pop: 1,
		rate: 1,
		links: [ 2, 4 ],
		owner: 0,
		orders: [],
	},
	// 6
	{
		x: 7,
		y: 15,
		pop: 1,
		rate: 1,
		links: [ 3, 4, 8 ],
		owner: 0,
		orders: [],
	},
	// 7
	{
		x: 13,
		y: 15,
		pop: 1,
		rate: 1,
		links: [ 4, 8 ],
		owner: 0,
		orders: [],
	},
	// 8
	{
		x: 10,
		y: 18,
		pop: 1,
		rate: 1,
		links: [ 6, 7 ],
		owner: 2,
		orders: [],
	}

]

