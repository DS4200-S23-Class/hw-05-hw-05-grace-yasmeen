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

//SCATTER PLOT//

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

//BAR PLOT//

const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// read bar plot data
d3.csv("data/bar-data.csv").then((data) => {

	 // Build plot inside of .then 
    // find max X
	const MAX_X2 = d3.max(data, (d) => { return (d.category); });
	// find the max Y
	const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.amount); });

	//domain and range
	const X_SCALE2 = d3.scaleBand()
					.domain(data.map(function(d) {return d.category;}))
					.range([0, VIS_WIDTH]).padding(.25);
	const Y_SCALE2 = d3.scaleLinear()
					.domain([(MAX_Y2 + 10) ,0])
					.range([0, VIS_HEIGHT]);

    // Use X_SCALE to plot bars
    FRAME2.selectAll("bars")  
        .data(data) // passed from .then  
        .enter()       
        .append("rect")  
          // .attr("x", (d) => { return (X_SCALE2(d.category) + MARGINS.left); }) 
          // .attr("y", (d) => {return (Y_SCALE2(d.amount) +  MARGINS.top);})
        	.attr("x", (d) => { return X_SCALE2(d.category) + MARGINS.left; }) 
          .attr("y", (d) => {return Y_SCALE2(d.amount) +  MARGINS.top;})
          .attr("class", "bar") 
          .attr("width", X_SCALE2.bandwidth())
          .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE2(d.amount); })
          //.attr("fill", "cornflowerblue") 
          .on("mouseover", handleMouseover)
					.on("mousemove", handleMousemove)
					.on("mouseleave", handleMouseleave)


	// Add x-axis to vis2
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE2).ticks(7))
			.attr("font-size", '20px');  
		
	// Add y-axis to vis2
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE2).ticks(10))
			.attr("font-size", '20px');


	// Tooltip for bar plot

			const TOOLTIP = d3.select("#vis2")
													.append("div")
													.attr("class", "tooltip")
													.style("opacity", 0);

			// Event handler for tool tip
			function handleMouseover(event, d){
				// make opaque on mouseover
				TOOLTIP.style("opacity", 1);
			}

			function handleMousemove(event, d){
				// fill tooltip with information
				TOOLTIP.html("Category " + d.category + "<br>Value: " + d.amount)
								.style("left", (event.pageX + 10) + "px") //offset
								.style("top", (event.pageY - 50) + "px");
			}

			function handleMouseleave(event, d){
				// make transparent on mouseleave
				TOOLTIP.style("opacity", 0);
			}

			// // Add event listeners
			// FRAME2.selectALL(".bar")
			// 			.on("mouseover", handleMouseover)
			// 			.on("mousemove", handleMousemove)
			// 			.on("mouseleave", handleMouseleave); 
});  

// circle click function for border
function circleClick()
{

		// add border
		this.classList.toggle("borderitem");

		//update text
		let xcord = (this.getAttribute("cx") - 10) / 40
		let ycord = 9 - ((this.getAttribute("cy") - 30) / 40)
		let newText = "Last point clicked: (" + xcord +","+ ycord + ")";	
		document.getElementById("selected-point").innerHTML = newText;
		listeners()

}

// Scatter plot event handlers

//  add point to grid
function addPoint()
{
	// add new points
	// reverse the arithmetic
	 let xcord = (document.getElementById("x-option").value * 40) + 10
	 let ycord = ((9 - document.getElementById("y-option").value) * 40) + 30
	 let r = 8; 
	 // add point to graph
	 let g = document.getElementsByClassName("point");
	 // access the circles from the point class
	 g.innerHTML += "<circle "+" cx=" + xcord + " cy=" + ycord +  " r=" + r + "></circle>"
	 // call event listener function
	 listeners()
}

// Event listener for point
document.getElementById("addCircle").addEventListener("click",addPoint);

// event listener function
function listeners() 
{
	// get the id from the index
	let vals = document.getElementsByClassName("point");

	for (var i = 0; i < vals.length; i++) {
    vals[i].addEventListener('click', circleClick);
	}


}
//call event listener
listeners()




					