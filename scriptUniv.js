function exploreUniv(){

	d3.select("svg").remove()

	var margin = {top: 20, right: 30, bottom: 30, left: 60},
		width = 960 - margin.left - margin.right,
		height = 390 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var color = d3.scale.category10();

	var axisNames = { 
		Rank: 'Rank', 
		Tuition: 'Tuition', 
		UndergradEnrollment: 'Undergrad Enrollment', 
		TotalHeadCount: 'Total HeadCount',
	};

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");


	var svg = d3.select("#universities #exploreSVG").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	var tooltip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('padding', '0 10px')
		.style('background', 'white')
		.style('opacity', 0)


	d3.csv("dataUniv.csv", function(error, data) {
		data.forEach(function(d) {
			d.Tuition = +d.Tuition;
			d.Rank = +d.Rank;
			d.TotalHeadCount = +d.TotalHeadCount;
			d.UndergradEnrollment = +d.UndergradEnrollment;
		});


		x.domain(d3.extent(data, function(d) { return d.Rank; })).nice();
		y.domain(d3.extent(data, function(d) { return d.Tuition; })).nice();

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text("Rank");

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Tuition")

		var circles = svg.selectAll(".dot")
			.data(data)
			.enter().append("circle")
				.attr("class", "dot")
			.attr("r", 3.5)
			.attr("cx", function(d) { return x(d.Rank); })
			.attr("cy", function(d) { return y(d.Tuition); })
			.style("fill", function(d) { return color(d.Region); })

			.on('mouseover', function(d){
				tooltip.transition()
					.style('opacity', .9)
				tooltip.html(d.Name)
					.style('left', (d3.event.pageX-35) + 'px')
					.style('top', (d3.event.pageY-25) + 'px')
				tempColor = this.style.fill;
				d3.select(this)
					.style('opacity', .4)
			})

			.on('mouseout', function(d){
			tooltip.transition().delay(400)
				.style('opacity', 0)
			d3.select(this)
				//.transition().delay(500).duration(800)
				.style('opacity', 1)
			});


		var legend = svg.selectAll(".legend")
			.data(color.domain())
			.enter().append("g")
				.attr("class", "legend")
				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		legend.append("rect")
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d; });


		d3.selectAll("[name=v]").on("change", function() {
			var selected = this.value;
			display = this.checked ? "inline" : "none";

			svg.selectAll(".dot")
				.filter(function(d) {return selected == d.Region;})
				.attr("display", display);
		});


		d3.selectAll("[name=rad]").on("change", function(d) {
			radius = this.value;
			svg.selectAll(".dot")
			//console.log(radius);

			var sd
			if (radius == "Rank") {sd=43.76}
			if (radius == "Tuition") {sd=10142}
			if (radius == "UndergradEnrollment") {sd=11047}
			if (radius == "TotalHeadCount") {sd=15312}

			circles.attr("r", function(d) {
				return d[radius]/sd*3; 
			});
		});


		d3.select("[name=xAX]").on("change", function(){
			xAxy = this.value;
			//console.log(xAxy)
			x.domain(d3.extent(data, function(d) { return d[xAxy]; })).nice();
			svg.select(".x.axis").transition().call(xAxis);
			svg.selectAll(".dot").transition().duration(1500).ease('elastic').attr("cx", function(d) { 
				return x(d[xAxy]);
			});
		svg.selectAll(".x.axis").selectAll("text.label").text(axisNames[xAxy]);
		});


		d3.select("[name=yAX]").on("change", function(){
			yAxy = this.value;
			//console.log(yAxy)
			y.domain(d3.extent(data, function(d) { return d[yAxy]; })).nice();
			svg.select(".y.axis").transition().call(yAxis);
			svg.selectAll(".dot").transition().duration(1500).ease('elastic').attr("cy", function(d) { 
				return y(d[yAxy]);
			});
		svg.selectAll(".y.axis").selectAll("text.label").text(axisNames[yAxy]);
		});
	});
}