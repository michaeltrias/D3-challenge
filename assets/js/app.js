// @TODO: YOUR CODE HERE!
// step 1: set up chart

var svgWidth =960;
var svgHeight = 500;

var margin ={
    top:20,
    right:40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// step 2: Create an svg wrapper,

var svg = d3
//or can try selecting body
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//step 3:
//import data

d3.csv("assets/data/data.csv").then (function(trendData){
console.log(trendData)

  //format data
    trendData.forEach(function(data){
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe= +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow; 
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = + data.smokesHigh;

    })
    // step 5: create scales for the chart
    //console.log(trendData)
    var xScale = d3.scaleLinear()
       .domain([4,d3.max(trendData, d => d.poverty)])
        // .domain([0,d3.max(trendData, d => d.poverty)])
        .range([0,width]);
    

    console.log(xScale);
    //console.log(d3.max(trendData, d => d.poverty))

    var yScale = d3.scaleLinear()
       .domain([0,d3.max(trendData, d => d.healthcare)])
        // .domain([d3.max(trendData, d => d.healthcare)])
        .range([height,0]);
    //console.log(yScale);
    //create axis functions

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    //append axes to chart

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    //Create circles

    var circlesGroup = chartGroup.selectAll("circle")
        .data(trendData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r","15")
        .attr("fill", "blue")
        .attr("opacity", ".5");

    var text = chartGroup.selectAll(".label")
        .data(trendData)
        .enter()
        .append("text")
        .text(function(d){
            return d.abbr;
        
        })
        .attr("x", (d => xScale(d.poverty)-10))
        .attr("y", (d => yScale(d.healthcare)+2))
        //.attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");

        //create axes labels
        //y axes label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",0- margin.left+40)
        .attr("x", 0- (height/2))
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)")

        //x axis label
  
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

    //bonus: add tooltip

    var toolTip = d3.select("body")
        .append("div")
        // .classed("d3-tip", true);
    //   .data(trendData)
    //   .enter()
        .attr("class","d3-tip");
    // svg.call(toolTip);

    
    //add onmouseover event to display a tooltop
    
    circlesGroup.on("mouseover", function (d){
        toolTip.style("display", "block");
        toolTip.html(`<strong>${(d.state)}<strong>`)
        .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })


        
    // })
        .on("mouseout", function(){
            toolTip.style("display", "none");

    //     });

    

}).catch(function(error) {
    console.log(error);
});
});
