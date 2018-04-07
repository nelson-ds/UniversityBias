
function exploreBias(){

	d3.select("svg").remove()

	var w = 960,
		h = 550;

	var circleWidth = 5;

	var color = d3.scale.category20();

	var palette = {
		"lightgray": "#819090",
		"gray": "#708284",
		"mediumgray": "#536870",
		"darkgray": "#475B62",
		"darkblue": "#0A2933",
		"darkerblue": "#042029",
		"paleryellow": "#FCF4DC",
		"paleyellow": "#EAE3CB",
		"yellow": "#A57706",
		"orange": "#BD3613",
		"red": "#D11C24",
		"pink": "#C61C6F",
		"purple": "#595AB7",
		"blue": "#2176C7",
		"green": "#259286",
		"yellowgreen": "#738A05"
	}

	var tooltip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('padding', '0 10px')
		.style('background', 'white')
		.style('opacity', 0)

	var nodes=[],
		links = [],
		clickType = "";
		clickName = "";


	/*
	var nodes1 = [
		{name: "US News Ranking", type: "Ranking System"},
		{name: "Times Ranking", type: "Ranking System"},
		{name: "Shanghai Ranking", type: "Ranking System"},
		{name: "CWUR Ranking", type: "Ranking System"},
		{name: "Stanford", type: "University", target: [0], bias_type: ["Towards"]},
		{name: "Harvard", type: "University", target: [1], bias_type: ["Towards"]},
		{name: "MIT", type: "University", target: [0], bias_type: ["Against"]},
		{name: "UDub", type: "University", target: [0,3], bias_type: ["Against", "Towards"]},
		{name: "Yale", type: "University", target: [0,1,2,3], bias_type: ["Towards", "Against", "Towards", "Against"]},
		{name: "Princeton", type: "University", target: [1,2], bias_type: ["Towards", "Against"]}
		]
	*/

	d3.csv("dataBias.csv", function(error, data) {
		data.forEach(function(d) {
			nodes.push({
				name: d.name, 
				type:d.type, 
				target:d.target.split("#"), 
				bias_type:d.bias_type.split("#")
			})
		});

		for (var i = 0; i<nodes.length; i++){
			nodes[i]["clicked"] = "No"
			nodes[i]["displayName"] = "No"
			if (nodes[i].type == "Ranking System") {nodes[i].displayName = "Yes"}
			if (nodes[i].target[0] !== "N/A"){
				for (var x = 0; x<nodes[i].target.length; x++){
					nodes[i].target[x] = +nodes[i].target[x];
					links.push({
						source: nodes[i],
						target: nodes[nodes[i].target[x]],
						bias_type: nodes[i].bias_type[x]
					})
				}
			}
		}


		var myChart = d3.select('#bias #exploreSVG')
			.append('svg')
			.attr('width', w)
			.attr('height', h)

		var force = d3.layout.force()
			.nodes(nodes)
			.links([])
			.gravity(0.55)
			.charge(-1000)
			.size([w,h])
			//.center(w / 2, h / 2);

		var link = myChart.selectAll('line')
			.data(links).enter().append('line')
			.attr('stroke', function(d){
				if (d.bias_type == "Towards") {return palette.green}
				else {return palette.red}
			})
			.attr('stroke-width', .25)

		var node = myChart.selectAll('circle')
			.data(nodes).enter()
			.append('g')
			.call(force.drag);

		node.append('circle')
			.attr('cx', function(d){return d.x;})
			.attr('cy', function(d){return d.y;})
			.attr('r', function(d){
				if (d.type == "University") {return circleWidth}
				else { return circleWidth+3}
			})
			.attr('fill', function(d){
				if (d.type == "University") {return palette.mediumgray}
				else { return palette.blue}
			})
			.attr('fill-opacity', 0.6)

		node.append('text')
			.text(function(d){
				if (d.displayName == "Yes") {return d.name}
				else { return ''}
			})
			.attr('font-family', 'Roboto Slab')
			.attr('fill', palette.blue)
			.attr('fill-opacity', 0.9)
			.attr('x', circleWidth-15)
			.attr('y', circleWidth+3)
			.attr('text-anchor', 'end')
			.attr('font-size', '1.2em')

		node.on('mouseover', function(d){
			d3.select(this).style("cursor", "pointer")
			if(d.displayName == "No"){
				if (d.type == "University") {
					tooltip.transition()
						.style('opacity', .9)
					tooltip.html(d.name)
						.style('left', (d3.event.pageX-35) + 'px')
						.style('top', (d3.event.pageY-25) + 'px')
					tempColor = this.style.fill;
					d3.select(this)
						.style('opacity', .4)
				}
			}
		})


		node.on('mouseout', function(d){
		tooltip.transition()
		//.delay(200)
			.style('opacity', 0)
		d3.select(this)
			//.transition().delay(500).duration(800)
			.style('opacity', 1)
		});


		node.on('click', function(d){
			//console.log(d)
			if (d.clicked == "Yes") {
				d.clicked = "No"
				d.displayName = "No"
			}
			else {
				d.clicked = "Yes"
				d.displayName = "Yes"
			}
			clickType = d.type
			clickName = d.name

			myChart.selectAll('line')
				.attr('stroke-width', function(d){
					//console.log(d)
					if (d.source.clicked == "Yes" || d.target.clicked == "Yes") {return 1.5}
					else {return 0.1}
				})


			myChart.selectAll('circle')
				.attr('fill-opacity', function(d){
					if (d.clicked == "Yes") {return 1}
					else {return .6}
				})

			d3.selectAll("text").remove()

			node.append('text')
				.text(function(d){
					if (d.displayName == "Yes" || d.type == "Ranking System") {return d.name}
					else { return ''}
				})
				.attr('font-family', 'Roboto Slab')
				.attr('fill', function(d){
					if (d.type == "University") {return palette.mediumgray}
					else { return palette.blue}
				})
				.attr('fill-opacity', 0.9)
				.attr('x', function(d){
					if (d.type == "University") {return circleWidth+4}
					else { return circleWidth-15}
				})
				.attr('y', function(d){
					if (d.type == "University") {return circleWidth}
					else { return circleWidth+3}
				})
				.attr('text-anchor', function(d){
					if (d.type == "University") {return 'beginning'}
					else { return 'end'}
				})
				.attr('font-size', function(d){
					if (d.type == "University") {return '1em'}
					else { return '1.2em'}
				})
		})


		force.on('tick', function(e){
			node.attr('transform', function(d,i){
				return 'translate(' + d.x + ', ' + d.y +')';
			})
			link
				.attr('x1', function(d){return d.source.x})
				.attr('y1', function(d){return d.source.y})
				.attr('x2', function(d){return d.target.x})
				.attr('y2', function(d){return d.target.y})
		})

		force.start()
	});
}