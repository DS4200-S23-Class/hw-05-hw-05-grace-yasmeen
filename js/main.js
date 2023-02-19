// js file for hw-05

//create frame
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 450;
const MARGINS = {left:50, right:50, top:50, bottom:50};

//scale
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select("#vis1")
				  .append("svg")
				  .attr("height", FRAME_HEIGHT)
				  .attr("width", FRAME_WIDTH)
				  .attr("class", "frame");

// read scatter plot data
d3.csv("data/scatter-data.csv").then((data) => {

	// find the max X
	const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
	// find the max Y
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });

	//domain and range
	const X_SCALE = d3.scaleLinear()
					.domain([0, (MAX_X + 1)])
					.range([0, VIS_WIDTH]);
	const Y_SCALE = d3.scaleLinear()
					.domain([(MAX_Y + 1) ,0])
					.range([0, VIS_HEIGHT]);

	// X_SCALE to plot
	FRAME1.selectAll("points")
		  .data(data)
		  .enter()
		  .append("circle")
		  .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); })
		  .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.top) ; })
		  .attr("r", 10)
		  .attr("class", "point");

	// Add x-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE).ticks(10))
			.attr("font-size", '20px')
		
	// Add y-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(10))
			.attr("font-size", '20px');
});
					