$.extend({
    qunee: function(id, root) {
        //定义一个画布
        var width = $(id).width();
        var height = $(id).height();
        var img_w = 40;
        var img_h = 40;
        var rect_w = 50;
        var rect_h = 50;
        /*  var nofree = false;
         var zoom = d3.behavior.zoom()
             .scaleExtent([0.5, 10])
             .on("zoom", zoomed);

         function zoomed() {
             container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
         } */
        var svg = d3.select(id).append("svg")
            .attr("width", width)
            .attr("height", height)
            /* .call(zoom) */
        ;
        var container = svg.append("g");
        //箭头
        var defs = svg.append("defs");
        var marker =
            defs.append("marker")
            .attr("id", "resolved")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 32) //箭头坐标
            .attr("refY", 0)
            .attr("markerWidth", 12) //标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 0.7) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr('stroke', '#555555')
            .attr("fill", "none"); //箭头颜色
        var marker1 =
            defs.append("marker")
            .attr("id", "resolved1")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 32) //箭头坐标
            .attr("refY", 0)
            .attr("markerWidth", 12) //标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr('stroke', '#0099CC')
            .attr("fill", "none"); //箭头颜色
        var marker2 =
            defs.append("marker")
            .attr("id", "resolved2")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 32) //箭头坐标
            .attr("refY", 0)
            .attr("markerWidth", 12) //标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr('stroke', '#CC0000')
            .attr("fill", "none"); //箭头颜色
        var marker3 =
            defs.append("marker")
            .attr("id", "resolved3")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 20) //箭头坐标
            .attr("refY", -43)
            .attr("markerWidth", 12) //标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 0.7) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr('stroke', '#555555')
            .attr("fill", "none") //箭头颜色
            .attr("transform", "rotate(30)");
        var marker4 =
            defs.append("marker")
            .attr("id", "resolved4")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 20) //箭头坐标
            .attr("refY", -43)
            .attr("markerWidth", 12) //标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr('stroke', '#0099CC')
            .attr("fill", "none") //箭头颜色
            .attr("transform", "rotate(30)");
        var marker5 =
            defs.append("marker")
            .attr("id", "resolved5")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 20) //箭头坐标
            .attr("refY", -43)
            .attr("markerWidth", 12) //标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr('stroke', '#CC0000')
            .attr("fill", "none") //箭头颜色
            .attr("transform", "rotate(30)");
        console.log(root);
        //使用力导向图布局获取数据
        var force = d3.layout.force()
            .nodes(root.nodes)
            .links(root.edges)
            .size([width, height])
            .linkDistance(170)
            .charge(-7000)
            .on("tick", forceTick)
            .start();
        //设置连接线
        var edges_path1 = [];
        var edges_path = container.append("g").selectAll(".edgepath")
            .data(force.links())
            .enter()
            .append("path")
            .attr({
                /*"stroke-dasharray":"80 20 1000",*/
                "class": "edgepath",
                "id": function(d, i) { return "edgepath" + i; },
                "stroke": "#555555",
                "stroke-width": 0.7,
                "fill": "none",
                "marker-end": function(d) {
                    if (d.source.name !== d.target.name) {
                        return "url(#resolved)";
                    } else {
                        return "url(#resolved3)";
                    }
                },
                "": function(d, i) {
                    edges_path1.push(d);
                }
            });
        //设置相互依赖曲线
        curve();
        //设置连接线上的文字
        var edges_text = container.append("g").selectAll(".edgetext")
            .data(force.links())
            .enter()
            .append("text")
            .attr({
                "xml:space": "preserve",
                "class": "edgetext",
                "id": function(d, i) { return "edgepath" + i; },
                "fill": "#555555"
            });
        edges_text.append("textPath")
            .attr({
                "xlink:href": function(d, i) { return "#edgepath" + i },
                "method": "stretch"
            })
            .text(function(d, i) { return d.relation + "" });

        //设置图片外边框
        var nodes_rect = container.append("g").selectAll(".nodesrect")
            .data(force.nodes())
            .enter()
            .append("rect")
            .attr({
                "class": "nodesrect",
                "rx": 7,
                "width": 50,
                "height": 50,
                "strokeWidth": 10,
                "fill": "white",
                "stroke": function(d, i) {
                    if (d.status == 1) {
                        return "#CC0000";
                    } else {
                        return "#555555";
                    }
                }
            });

        //拖拽定点固定
        var drag = force.drag()
            .on("dragstart", function(d, i) {
                //d3.event.sourceEvent.stopPropagation();
                d.fixed = true;
                /*  nofree = true; */
            });

        //设置图片节点
        var nodes_img = container.append("g").selectAll("image")
            .data(force.nodes())
            .enter()
            .append("image")
            .attr({
                "width": 40,
                "height": 40,
                "xlink:href": function(d, i) { return d.image; }
            })
            .on({
                "dblclick": function(d, i) { return d.fixed = false; },
                "mouseover": function(image, i) {
                    imageMouseover(image);
                },
                "mouseout": function(image, i) {
                    imageMouseout(image);
                },
                "click": function(image, i) {
                    imageClick(image);
                }
            })
            .call(drag);

        //设置节点文字
        var nodes_text = container.append("g").selectAll(".nodetext")
            .data(force.nodes())
            .enter()
            .append("text")
            .attr({
                "class": "nodetext",
                "font-size": "14px"
            })
            .attr(
                " ",
                function(d) {
                    var re_en = /[a-zA-Z]+/g;
                    //如果是全英文，不换行
                    if (d.name.match(re_en)) {
                        d3.select(this).append('tspan')
                            .attr('dx', -rect_w / 2)
                            .attr('dy', img_h / 2)
                            .text(function() { return d.name; });
                    }
                    //如果小于四个字符，不换行
                    else if (d.name.length <= 4) {
                        d3.select(this).append('tspan')
                            .attr('dx', -rect_w / 2)
                            .attr('dy', img_h / 2)
                            .text(function() { return d.name; });
                    } else {
                        var top = d.name.substring(0, 4);
                        var bot = d.name.substring(4, d.name.length);

                        d3.select(this).append('tspan')
                            .attr('dx', -rect_w / 2)
                            .attr('dy', img_h / 2)
                            .text(function() { return top; });

                        d3.select(this).append('tspan')
                            .attr('dx', -rect_w - 8)
                            .attr('dy', 15)
                            .text(function() { return bot; });
                    }
                }
            );
        //设置相互依赖曲线
        function curve() {
            var curve = [];
            for (var i = 0; i < edges_path1.length; i++) {
                if (curve.indexOf(i) !== -1) {
                    continue;
                }
                for (var j = i; j < edges_path1.length; j++) {
                    if (j == i) {
                        continue;
                    }
                    if (curve.indexOf(j) !== -1) {
                        continue;
                    }
                    if ((edges_path1[i].source.index == edges_path1[j].target.index) && (edges_path1[i].target.index == edges_path1[j].source.index)) {
                        edges_path1[i].curve = 100;
                        edges_path1[j].curve = -100;
                        curve.push(j);
                        break;
                    } else {
                        edges_path1[i].curve = 0;
                        edges_path1[j].curve = 0;
                    }
                }
            }
        }
        //计算力学图布局位置
        function forceTick() {
            //限制结点的边界
            /* if (!nofree) { */
            root.nodes.forEach(function(d, i) {
                d.x = d.x - rect_w / 2 - 2 < 0 ? rect_w / 2 + 2 : d.x;
                d.x = d.x + rect_w / 2 + 50 > width ? width - rect_w / 2 - 50 : d.x;
                d.y = d.y - rect_h / 2 - 7 < 0 ? rect_h / 2 + 7 : d.y;
                d.y = d.y + rect_h / 2 + img_h > height ? height - rect_h / 2 - img_h : d.y;
            });
            /* } */
            //跟新连接线的位置
            edges_path.attr({
                "d": function(d, i) {
                    var d = edges_path1[i];
                    if (d.source.name !== d.target.name) {
                        return "M" + d.source.x + " " + d.source.y + "Q" + (d.target.x + d.source.x + d.curve) / 2 + " " + (d.target.y + d.source.y + d.curve) / 2 + " " + d.target.x + " " + d.target.y;
                    } else {
                        return "M" + d.source.x + "," + d.source.y + "C" + d.source.x + "," + (d.source.y - 40) + " " + (d.source.x + 60) + "," + (d.source.y - 40) + " " + (d.source.x + 60) + "," + d.source.y + "S" + d.source.x + "," + (d.source.y + 40) + " " + d.source.x + "," + d.source.y;
                    }

                },
                "stroke-dasharray": function(d) {
                    if (d.source.name !== d.target.name) {
                        return Math.sqrt(Math.pow(Math.abs(d.source.x - d.target.x), 2) + Math.pow(Math.abs(d.source.y - d.target.y), 2)) / 2 + " " + 25 + " " + 1000;
                    } else {
                        return "90 20";
                    }
                }
            });
            //跟新节点图片和文字的位置
            nodes_img.attr({
                "x": function(d) {
                    return d.x - img_w / 2;
                },
                "y": function(d) {
                    return d.y - img_h / 2;
                }
            });
            nodes_text.attr({
                "x": function(d) {
                    return d.x;
                },
                "y": function(d) {
                    return d.y + img_h / 2;
                }
            });
            nodes_rect.attr({
                "x": function(d) {
                    return d.x - rect_w / 2;
                },
                "y": function(d) {
                    return d.y - rect_h / 2;
                }
            });
            edges_text.attr({
                    "dx": function(d, i) {
                        if (d.source.name !== d.target.name) {
                            return Math.sqrt(Math.pow(Math.abs(d.source.x - d.target.x), 2) + Math.pow(Math.abs(d.source.y - d.target.y), 2)) / 2;
                        } else {
                            return 90;
                        }
                    },
                    "dy": 5,
                    "transform": function(d, i) {
                        if (d.source.name !== d.target.name) {
                            if (d.target.x < d.source.x) {
                                bbox = this.getBBox();
                                rx = bbox.x + bbox.width / 2;
                                ry = bbox.y + bbox.height / 2;
                                return 'rotate(180 ' + rx + ' ' + ry + ')';
                            } else {
                                return 'rotate(0)';
                            }
                        } else {
                            bbox = this.getBBox();
                            rx = bbox.x + bbox.width - 14;
                            ry = bbox.y + bbox.height / 2 - 2;
                            return 'rotate(-90 ' + rx + ' ' + ry + ')';
                        }
                    }
                })
                /*.on("end",function(){
                    nodes_img.attr("",function (d,i) {d.fixed=true;});
                })*/
            ;
        }
        //节点图片点击事件
        function imageClick(image) {
            nodes_rect.attr("clickStatus", 0)
                .filter(function(d) {
                    return d.name == image.name;
                }).attr("clickStatus", 1);
            nodes_rect.filter(function(d) {
                return (d.name == image.name) && (image.status == 1);
            }).attr("status", 1);

            nodes_rect.style("stroke", function(d, i) {
                if (d3.select(this).attr("clickStatus") == 1) {
                    if (image.status == 1) {
                        d3.select(this).attr("stroke", "#CC0000").attr("stroke-width", 2);
                    } else {
                        d3.select(this).attr("stroke", "#0099CC").attr("stroke-width", 2);
                    }
                } else {
                    if (d.status == 1) {
                        d3.select(this).attr("stroke", "#CC0000").attr("stroke-width", 0.7);
                    } else {
                        d3.select(this).attr("stroke", "#555555").attr("stroke-width", 0.7);
                    }
                }
            });
            edges_path.style("stroke", function(d, i) {
                edges_text.attr("font-weight", 100);
                if (d.source.name !== d.target.name) {
                    d3.select(this).attr("marker-end", "url(#resolved)");
                    d3.select(this).attr("stroke-width", 0.7);
                } else {
                    d3.select(this).attr("marker-end", "url(#resolved3)");
                    d3.select(this).attr("stroke-width", 0.7);
                }
                if (image.name == d.source.name || image.name == d.target.name) {
                    if (d.source.name !== d.target.name) {
                        d3.select(this).attr("marker-end", "url(#resolved1)");
                        d3.select(this).attr("stroke-width", 2);
                    } else {
                        d3.select(this).attr("marker-end", "url(#resolved4)");
                        d3.select(this).attr("stroke-width", 2);
                    }
                    if (d.target.status == 1) {
                        if (d.source.name !== d.target.name) {
                            d3.select(this).attr("marker-end", "url(#resolved2)");
                        } else {
                            d3.select(this).attr("marker-end", "url(#resolved5)");
                        }
                        return "#CC0000";
                    } else {
                        return "#0099CC";
                    }
                }
            });
            edges_text.style("fill", function(d, i) {
                if (image.name == d.source.name || image.name == d.target.name) {
                    d3.select(this).attr("font-weight", 700);
                    if (d.target.status == 1) {
                        return "#CC0000";
                    } else {
                        return "#0099CC";
                    }
                }
            });
        }
        //鼠标划出事件
        function imageMouseout(image) {
            nodes_rect.style("stroke", function(d, i) {
                if (image.name == d.name) {
                    if (d3.select(this).attr("clickStatus") != 1) {
                        d3.select(this).attr("stroke-width", 0.7);
                    }
                    if (d3.select(this).attr("clickStatus") == 1) {
                        if (image.status == 1) {
                            d3.select(this).attr("stroke", "#CC0000");
                        } else {
                            d3.select(this).attr("stroke", "#0099CC");
                        }
                    } else {
                        if (image.status == 1) {
                            d3.select(this).attr("stroke", "#CC0000");
                        } else {
                            d3.select(this).attr("stroke", "#555555");
                        }
                    }
                }
            })
        }
        //鼠标划入事件
        function imageMouseover(image) {
            nodes_rect.style("stroke", function(d, i) {
                if (image.name == d.name) {
                    d3.select(this).attr("stroke-width", 2);
                    if (image.status == 1) {
                        return "#CC0000";
                    } else {
                        return "#0099CC";
                    }
                }
            })
        }
    }
});