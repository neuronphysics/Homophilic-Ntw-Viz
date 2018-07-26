function barPlot(nodes,visual){
        //http://www.ng-newsletter.com/posts/d3-on-angular.html
        //http://www.recursion.org/d3-for-mere-mortals/
        var padding = 10;
        var copyNodes = nodes.slice();
        //Determine the number of top 10% of nodes in terms of their degree values
        var topTenPer=Math.floor(0.1*copyNodes.length);
        //sort the array based on that
        copyNodes.sort(function (a, b) {
          return a.count - b.count;
        });  
        //Choose top 10% nodes
        var slicedNodes = copyNodes.slice(copyNodes.length-topTenPer, copyNodes.length);
        console.log(slicedNodes);
        var redNodes=slicedNodes.filter(function(k){
           return (k.color=="red"); 
        });
        var blueNodes=slicedNodes.filter(function(k){
           return (k.color=="blue");
        });         
        
        console.log(redNodes); 
        console.log(blueNodes);  
        var stats=[];
        stats.push({status:"minority", values:(redNodes.length/copyNodes.length)*100, color:"red"})
        stats.push({status:"majority", values:(blueNodes.length/copyNodes.length)*100,
        color:"blue"})
        console.log(stats[0].values);
        console.log(stats[1].values);
        var barWidth = 50;
        var width = (barWidth + 15) * stats.length;
        var height = 250;

        var x = d3.scale.linear().domain([0, stats.length]).range([20, width+20]);
        var y = d3.scale.linear().domain([0, d3.max(stats, function(datum) { return datum.values; })]).rangeRound([0, height]);



        visual.selectAll("rect").
        data(stats).
        enter().
        append("g").
        append("rect").
        attr("x", function(datum, index) { return x(index); }).
        attr("y", function(datum) { return height - y(datum.values); }).
        attr("height", function(datum) { return y(datum.values); }).
        attr("width", barWidth).
        style("opacity", 0.5).
        attr("fill", function (datum) {return datum.color});
        //Adding text
        visual.selectAll("text.xAxis").
        data(stats).
        enter().append("text").
        attr("x", "20px").
        attr("y", function(datum) { return height - y(datum.values); }).
        attr("dy", "0px").
        attr("text-anchor", "middle").
        attr("style", "font-size: 20; font-family: Georgia, sans-serif; font-weight: Bold").
        text(function(datum) { return (datum.values).toFixed(1)+"%";}).
        attr("transform", "translate("+( width+padding) +",20)").
        attr("class", "xAxis");
        
        
        visual.selectAll("text.yAxis").
        data(stats).
        enter().append("text").
        attr("x", function(datum, index) { return x(index) + barWidth; }).
        attr("y", height).
        attr("dx", -barWidth/2).
        attr("text-anchor", "middle").
        attr("style", "font-size: 16; font-family: Georgia, sans-serif; font-weight: Bold").
        text(function(datum) { return datum.status;}).
        attr("transform", "translate(0, 20)").
        attr("class", "yAxis");
    }