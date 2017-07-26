function SIModel(beta, links, nodes, infectedNode, N){
    /* list of input parameters
    links: list of all edges between nodes
    nodes: list of information about each node
    infectedNode: is an object contains information about the node that has been clicked on and got infected
    N: total number of vertices in the network
    */
    var source = Object.assign({}, infectedNode);
    //remove the infected node from susceptible ones
    var susceptible= nodes.filter(function(el) {
        return el.index !== source.index;
    });
    console.log(susceptible);
    var Infected= new Array();
    //referred to as I
    Infected.push(source);
    var SpreadingNodes= new Array();
    SpreadingNodes.push(source);
    var timeStamp=0;
    while (Infected.length<N){
         var indexes= new Array();
         var numbers= new Array(); 
         for (var i=0;i<SpreadingNodes.length;i++){
             //https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
             numbers = links.map(function(obj, index) {
                if (obj.source.index == SpreadingNodes[i].index ||obj.target.index ==  SpreadingNodes[i].index) {
                   return index;
                 }
             }).filter(isFinite);
             indexes=indexes.concat(numbers); 
             //https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
             for(var k=0; k<indexes.length; ++k) {
                for(var j=k+1; j<indexes.length; ++j) { 
                   if(indexes[k] === indexes[j])
                     indexes.splice(j--, 1);
                   }
               }
         }
         console.log(indexes);
         var SpreadingNodes= new Array();
         for (var j = 0; j < indexes.length; j++) {
             var winner = Math.random();
             var found=false;
             if (Infected.filter(function(e) e.index == indexes[j]).length > 0) {
                found =true;
             }
             if ( winner<beta && found==false) {
                Infected.push(nodes[indexes[j]]);
                
                SpreadingNodes.push(nodes[indexes[j]]);
                if (nodes[indexes[j]].color=="red"){
                    nodes[indexes[j]].color=="yellow";
                }else{
                    nodes[indexes[j]].color=="green";
                }                
                susceptible= susceptible.filter(function(el) {
                  return el.index !== indexes[j];
                });
             }
         }
         timeStamp+=1;
     }
    console.log(Infected);
}
