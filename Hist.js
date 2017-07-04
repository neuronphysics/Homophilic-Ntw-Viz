http://www.ng-newsletter.com/posts/d3-on-angular.html

       console.log(Gnodes);
        var copyNodes = Gnodes.slice();
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