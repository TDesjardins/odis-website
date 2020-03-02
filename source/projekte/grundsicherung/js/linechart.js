document.addEventListener('DOMContentLoaded',function() {
    
    const style = window.getComputedStyle(document.getElementById("section"), null);
    const padding_total = parseFloat(style['paddingLeft'].replace('px', '')) * 2;
    const width_temp = parseFloat(style['width']);
    const width = width_temp - padding_total;
    
    // Line Chart
    const line_config  = {
        div: 'timeline',
        file: 'data/timeline.csv',
        width: width,
        xaxis: 'jahr',
        yaxis: 'ab 65 Jahre insgesamt',
        line2: '18-64 Jahre insgesamt',
        line1label: 'im Alter',
        line2label: 'bei Erwerbsminderung',
        yunit: "% ",
        ylabel: '% Grundsicherungsempfänger*innen',
    }
    
    linechart = new Linechart(line_config).init();   
})  

class Linechart {
    constructor(config) {
        this.div = config.div;
        this.file = config.file;
        this.margin = {top: 20, right: 20, bottom: 30, left: 50},
        this.width = config.width;
        this.height = this.width > 500? 400 : this.width * 0.8;
        this.ylabel = config.ylabel;
        this.yunit = config.yunit;
        this.xaxis = config.xaxis;
        this.yaxis = config.yaxis;
        this.line1label = config.line1label;
        this.line2label = config.line2label;
        this.line2 = config.line2;
        this.width_line = this.width - this.margin.left - this.margin.right;
        this.height_line = this.height- this.margin.top - this.margin.bottom;
        this.config = config;
        this.svg;
        
        this.init = this.init.bind(this);
    }
    
    init () {
        var ylabel = this.ylabel;
        var x_line = d3.scaleTime().range([0, this.width_line]);
        var y_line = d3.scaleLinear().range([this.height_line, 0]);
        
        // define the line
        var valueline = d3.line()
        .x(function(d) { return x_line(d[xaxis]); })
        .y(function(d) { return y_line(d[yaxis]); });

        var valueline2 = d3.line()
        .x(function(d) { return x_line(d[xaxis]); })
        .y(function(d) { return y_line(d[line2]); });

        var svg_linechart = d3.select(`#${this.div}`).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("class", "linechart-svg")
        .append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
        
        var height_line =  this.height_line 
        var width_line = this.width_line
        var width = this.width
        var height = this.height
        var map = this.map
        var yunit = this.yunit
        var xaxis = this.xaxis
        var yaxis = this.yaxis
        var line2 = this.line2
        var line1label = this.line1label
        var line2label = this.line2label
        
        
        // Get the data
        d3.csv(this.file)
        .then(function (data) {
            
            var bisectDate = d3.bisector(function(d) { return d[xaxis]; }).left;
            
            var parseXvalue = d3.timeParse("%Y");
            
            // format the data
            data.forEach(function(d) {
                d[xaxis] = parseXvalue(d[xaxis]);
                d[yaxis] = +d[yaxis];
            });
            
            // Scale the range of the data
            x_line.domain(d3.extent(data, function(d) { return d[xaxis]}));
            y_line.domain([0, d3.max(data, function(d) { return d[yaxis];})]);
            
            // Add the valueline path.
            svg_linechart.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

            svg_linechart.append("path")
            .data([data])
            .attr("class", "line")
            .attr("id", "line2")
            .attr("d", valueline2);
            
            // Add the X Axis
            svg_linechart.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + height_line + ")")
            .call(d3.axisBottom(x_line).ticks(width / 100).tickFormat(map));
            
            // Add the Y Axis
            svg_linechart.append("g")
            .attr("class", "yaxis")
            .call(d3.axisLeft(y_line).ticks(height/50).tickFormat(d3.format(".1f")))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("dy", ".71em")
            .text(ylabel);
            
            //add tooltip
            var focus = svg_linechart.append("g")
            .attr("class", "focus")
            .style("display", "none");
            
            focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height_line)
            .attr("stroke", "#2d91d2");
            
            focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width_line)
            .attr("x2", width_line);
            
            focus.append("circle")
            .attr("r", 7.5);   
            
            focus.append("text")
            .attr("id", "text_count")
            .attr("x", -20)
            .attr("dy", "2em")
            .attr("class", "text");

            //add tooltip for line2
            var focus2 = svg_linechart.append("g")
            .attr("class", "focus")
            .style("display", "none");
            
            focus2.append("circle")
            .attr("id", "circ2")
            .attr("r", 7.5);   
            
            focus2.append("text")
            .attr("id", "text_count")
            .attr("x", -20)
            .attr("dy", "2em")
            .attr("class", "text");
            
            svg_linechart.append("rect")
            //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height_line)
            .on("mouseover", function(){ focus.style("display", null), focus2.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"), focus2.style("display", "none"); })
            .on("mousemove", mousemove);

            
            
            function mousemove() {
                var x0 = x_line.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = isNaN(data[i])? data[i - 1] : data[i]
                
                var d = x0 - d0[yaxis] > d1[yaxis] - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x_line(d[xaxis]) + "," + y_line(d[yaxis]) + ")");
                focus.select("#text_count").html(function() { return d[yaxis] + " " + yunit + line1label; });
                focus.select(".x-hover-line").attr("y2", height_line - y_line(d[yaxis]));
                focus.select(".y-hover-line").attr("x2", width_line + width_line);

                focus2.attr("transform", "translate(" + x_line(d[xaxis]) + "," + y_line(d[line2]) + ")");
                focus2.select("#text_count").text(function() { return d[line2] + " " + yunit + line2label; });
                focus2.select(".x-hover-line").attr("y2", height_line - y_line(d[line2]));
                focus2.select(".y-hover-line").attr("x2", width_line + width_line);
            }

        })
        .catch(function (error) {
            console.log(error)
        });        
    }
    
}