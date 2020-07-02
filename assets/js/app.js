// @TODO: YOUR CODE HERE!

var svgWidth = 950;
var svgHeight = 500;

//Define the margins for the chart
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};
//Create the dimensions of the chart
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

//Create svg group and append

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function (healthData) {
    console.log(healthData)

    healthData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });

    //Create linear scale functions

    var xLinearScale = d3.scaleLinear().domain([6, d3.max(healthData, d => d.poverty)]).range([0, chartWidth]);
    var yLinearScale = d3.scaleLinear().domain([3, d3.max(healthData, d => d.poverty)]).range([chartHeight, 0]);

    var yAxis = d3.axisLeft(yLinearScale);
    var xAxis = d3.axisBottom(xLinearScale).ticks();

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // Add circle
    chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 8)
        .style("fill", "#FF9900")
        .attr("opacity", '.7');

    // Add state to each circle
    chartGroup.selectAll("#scatter")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("font-size", "8px")
        .attr("text-anchor", "middle")
        .style("fill", "white");

    chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    chartGroup.append("text")
        .attr("y", chartHeight + 1.5 * margin.bottom / 2)
        .attr("x", chartWidth / 2)
        .classed("axis-text", true)
        .text("In Poverty (%)");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Lacks Healthcare (%)");
});




