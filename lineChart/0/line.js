$(function() {
    //在 body 里添加一个 SVG 画布
    var svg = d3.select(props.el)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height);

    //x轴的比例尺
    var xScale = d3.scale.ordinal()
        .domain(props.data.map(d => {
            return d.xValue;
        }))
        .rangeRoundBands([0, props.width - props.margin.left - props.margin.right]);
    //y轴的比例尺
    var yScale = d3.scale.linear()
        .domain([0, d3.max(props.data, d => {
            return d.yValue;
        })])
        .range([props.height - props.margin.top - props.margin.bottom, 0]);
    //定义y轴网格线
    var yInner = d3.svg.axis()
        .scale(yScale)
        .tickSize(-(props.width - props.margin.left - props.margin.right), 0);
    //添加y轴网格线
    svg.append("g")
        .attr("class", "inner_line")
        .attr("transform",
            'rotate(90 ' + (props.margin.left) + ' ' + (props.height - props.margin.bottom) + ')' + " " +
            "translate(" + (props.margin.left - (props.height - props.margin.top - props.margin.bottom)) + "," + (props.height - props.margin.bottom) + ")"
        )
        .call(yInner)
        .selectAll("text")
        .text("");
    //定义x轴
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    //定义y轴
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    //添加x轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + props.margin.left + "," + (props.height - props.margin.bottom) + ")")
        .call(xAxis)
        .append("text") //添加坐标轴说明  
        .text("天数")
        .attr("transform", "translate(" + (props.width - props.margin.left - props.margin.right) + "," + 15 + ")"); //指定坐标轴说明的坐标 
    //添加y轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .call(yAxis)
        .append("text") //添加坐标轴说明  
        .text("天数")
        .attr("transform", "translate(" + -25 + "," + -4 + ")"); //指定坐标轴说明的坐标

    //添加工具提示
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    tooltip.append("div")
        .attr("class", "yValue");
    tooltip.append("div")
        .attr("class", "xValue");

    //添加折线
    var line = d3.svg.line()
        .x(function(d) {
            return (xScale(d.xValue) + xScale.rangeBand() / 2);
        })
        .y(function(d) {
            return yScale(d.yValue);
        })
        .interpolate("linear");

    svg.append("g")
        .append("path")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .attr("class", "line")
        .attr("d", line(props.data));

    //添加点
    svg.append("g")
        .selectAll("circle")
        .data(props.data)
        .enter()
        .append("circle")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .attr("cx", function(d) {
            return (xScale(d.xValue) + xScale.rangeBand() / 2);
        })
        .attr("cy", function(d) {
            return yScale(d.yValue);
        })
        .attr("r", 4)
        .attr("fill", "#fff")
        .attr("stroke", "#E95757")
        .attr("stroke-width", 1)
        .on("mouseover", function(d) {
            // d3.select(this).attr("fill", "yellow"); 
            if (!d.yValue) return null;

            tooltip.select(".yValue").html("<b>" + d.yValue + "</b>");
            tooltip.select(".xValue").html(d.xValue);

            tooltip.style("opacity", 1);
        })
        .on("mousemove", function(d) {
            if (!d.yValue) return null;

            tooltip.style("top", (d3.event.layerY + 10) + 'px')
                .style("left", (d3.event.layerX - 25) + 'px');
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        })

    //添加副标题  
    if (props.subTitle !== "") {
        svg.append("g")
            .append("text")
            .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
            .text(props.subTitle)
            .attr("x", 35)
            .attr("y", -10)
            .attr("class", "subTitle")
    }
})