//functions to generate a network contains minorities 
function getRandomSubarray(arr, size) {
                // based on this answer https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
                var shuffled = arr.slice(0), i = arr.length, temp, index;
                while (i--) {
                      index = Math.floor((i + 1) * Math.random());
                      temp = shuffled[index];
                      shuffled[index] = shuffled[i];
                      shuffled[i] = temp;
                }
                return shuffled.slice(0, size);
}

function defaultDict() {
               //https://stackoverflow.com/questions/19127650/defaultdict-equivalent-in-javascript
               this.get = function (key) {
                   if (this.hasOwnProperty(key)) {
                      return key;
                   } else {
                      return 0;
                   }
               }
}

 function fillArray(value, len) {
                //https://stackoverflow.com/questions/12503146/create-an-array-with-same-element-repeated-multiple-times-in-javascript
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr.push(value);
                }            
                return arr;
}

function zip() {
                //https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
                var args = [].slice.call(arguments);
                var shortest = args.length==0 ? [] : args.reduce(function(a,b){
                    return a.length<b.length ? a : b
                });
                return shortest.map(function(_,i){
                       return args.map(function(array){return array[i]})
                });
}

function pickTargets(G,source,targetList,dist,m){
                var targetProbDict = new Object();
                for (var t=0; t<targetList.length; t++){
                   var targetProb = (dist['('+source.toString()+','+targetList[t].toString()+')'])* (G.degree(targetList[t])+0.00001);
                   targetProbDict[targetList[t]] = targetProb;
                }    
                var probSum=0;
                Object.getOwnPropertyNames(targetProbDict).forEach(function (val, idx, array) {probSum+= targetProbDict[val]; });
                var targets = new Array();
                var targetListCopy = targetList.slice();
                var countLooking = 0;
                if (probSum == 0){
                   return targets;
                }
                while (targets.length < m){
                      countLooking++;
                      if (countLooking > G.numberOfNodes()){
                         break;
                      }
                      var randNum = Math.random();
                      var cumsum = 0.0;
                      for (var k=0; k<targetListCopy.length; k++){
                          cumsum += targetProbDict[targetListCopy[k]]/ probSum;
                         if (randNum < cumsum){
                            targets.push(targetListCopy[k]);
                            targetListCopy.splice(k,1);
                            break;
                         }
                      }
                }
                return targets;
}

function  homophilic_barabasi_albert_graph_assym(N, m , minorityFraction, hAB , hBA){
                var hAA=1-hAB;
                var hBB=1-hBA;
                var G = new jsnx.Graph();
                var minority =Math.floor(minorityFraction*N );
                var l=Array.apply(null, {length: N}).map(Number.call, Number); //https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
                var minorityNodes=getRandomSubarray(l,minority);
                var nodeAttribute=new Object();
                G.addNodesFrom(minorityNodes,{color:'red'})  
                //exclude majority from minority items        
                var majorityNodes = l.filter(function (item) {return minorityNodes.indexOf(item) === -1;});
                G.addNodesFrom(majorityNodes,{color:'blue'})
                for (var i=0; i<N; i++){
                   if (minorityNodes.indexOf(i) >= 0){
                      nodeAttribute[i]='minority';
                   }else{
                      nodeAttribute[i]='majority';
                   }
                }
                var dist = new defaultDict();
                for (var i=0; i<N; i++){
                    var n1Attr=nodeAttribute[i];
                    for (var j=0;j<N;j++){
                        var n2Attr=nodeAttribute[j];
                        if (n1Attr == n2Attr){
                           if (n1Attr=='minority'){
                              dist['('+i.toString()+','+j.toString()+')']=hAA;
                           }else{
                              dist['('+i.toString()+','+j.toString()+')']=hBB; 
                           }
                        }else{
                           if (n1Attr=='minority'){
                              dist['('+i.toString()+','+j.toString()+')']=hAB;
                           }else{
                              dist['('+i.toString()+','+j.toString()+')']=hBA; 
                           }
                        }
                    }
                }
                var targetList=Array.apply(null, {length: m}).map(Number.call, Number);
                var source=m;
                while (source <N){
                      var targets=pickTargets(G,source,targetList,dist,m);
                      if (targets.length>0){
                         var newArr=fillArray(source,m);
                         G.addEdgesFrom(zip(newArr,targets));
                      }
                      targetList.push(source);
                      source++;
                }
                return G;
}