$(function() {
    //在 body 里添加一个 SVG 画布
    var svg = d3.select(props.el)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height);

    //x轴的比例尺
    var space = 0.2; //数据条间隔
    if (props.data.length <= 5) {
        space = 0.4;
    }
    var xScale = d3.scale.ordinal()
        .domain(props.data.map(d => {
            return d.xValue;
        }))
        .rangeRoundBands([0, props.width - props.margin.left - props.margin.right], space);

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

    //添加矩形元素
    var rects = svg.selectAll(".MyRect")
        .data(props.data)
        .enter()
        .append("rect")
        .attr("class", "MyRect")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .attr("x", function(d, i) {
            return xScale(d.xValue);
        })
        .attr("y", function(d, i) {
            return yScale(d.yValue);
        })
        .attr("width", function(d) {
            return xScale.rangeBand();
        })
        .attr("height", function(d) {
            return (props.height - props.margin.top - props.margin.bottom - yScale(d.yValue));
        })
        .attr("fill", "#E95757")
        .on("mouseover", function(d) {
            d3.select(this).attr("fill", "yellow");
            if (!d.yValue) return null;

            tooltip.select(".yValue").html("<b>" + d.yValue + "</b>");
            tooltip.select(".xValue").html(d.xValue);

            tooltip.style("opacity", 2);
        })
        .on("mousemove", function(d) {
            if (!d.yValue) return null;

            tooltip.style("top", (d3.event.layerY + 10) + 'px')
                .style("left", (d3.event.layerX - 25) + 'px');
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "#E95757");

            tooltip.style("opacity", 0);
        })

    //添加文字元素
    var texts = svg.selectAll(".MyText")
        .data(props.data)
        .enter()
        .append("text")
        .attr("class", "MyText")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .attr("x", function(d, i) {
            return xScale(d.xValue);
        })
        .attr("y", function(d) {
            return 0;
        })
        .attr("dx", function(d) {
            return xScale.rangeBand() / 2;
        })
        .attr("dy", function(d) {
            return yScale(d.yValue) + 20;
        })
        .text(function(d) {
            return d.yValue;
        });
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