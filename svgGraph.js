function makeSVG(graph){
       //SVG size
       var width = 1800,
            height = 1100;

        // We only need to specify the dimensions for this container.

        var svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);
        var force = d3.layout.force()
                      .gravity(.05)
                      .distance(100)
                      .charge(-100)
                      .size([width, height]);
        // Extract the nodes and links from the data.
        var Glinks = [];
        var W=graph.degree()._numberValues;
        graph.edges().forEach(function(item){
           Glinks.push({"source": item[0],"target":item[1]})
        });
        var Gnodes = [];
        var obj=graph.node._numberValues;
        Object.keys(obj).forEach(function(key) {
           Gnodes.push({"name":key, "color":obj[key]["color"], "count":W[key]});
        });
        
        //Creates the graph data structure 
        force.nodes(Gnodes)
             .links(Glinks)
             .linkDistance(function(d) { 
              return(0.1*Glinks.length); 
             })//link length
             .start();
         //Create all the line svgs but without locations yet
        var link = svg.selectAll(".link")
           .data(Glinks)
           .enter().append("line")
           .attr("class", "link")
           .style("stroke-width","0.3px");
        
        //Do the same with the circles for the nodes - no 
        var node = svg.selectAll(".node")
            .data(Gnodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);
        node.append("circle")
             .attr("r", function(d){
              return d.count*0.5;   
            })
            .style("opacity", .3)
            .style("fill", function (d) {
              return d.color;
            });
        //add degree of node as text 
        node.append("text")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.count })
            .attr("font-family",'Raleway',"Tangerine");
        //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
        force.on("tick", function () {
             link.attr("x1", function (d) {
                 return d.source.x;
                 })
                 .attr("y1", function (d) {
                 return d.source.y;
                 })
                 .attr("x2", function (d) {
                 return d.target.x;
                 })
                 .attr("y2", function (d) {
                 return d.target.y;
                 });

              node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });      
    
    }