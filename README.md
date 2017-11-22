# Visibility of minorities in social networks

The visualisation of a social network which is based on [Karimi et al. 2017](https://arxiv.org/pdf/1702.00150.pdf) model. In the model, it is assumed that there is an underlying **homophily** parameter due to node attributes which leads to the formation of links between members of each group in the network. The model considers the **preferential attachment** property proposed by Barabási and Albert. For the implementation of the model in **python**, you can visit [this repository](https://github.com/frbkrm/HomophilicNtwMinorities).

For users who are not familiar by how to render **html files**, here is the solution:

* Download a copy of an existing Git repository on your machine using `git clone https://github.com/neuronphysics/network.git` command.


* Download and install [brackets](http://brackets.io/) which is an editor for web developers.


* Go to the *network project* and open the *network.html* using **File> Open Folders** in your brackets editor.


* select **File > Live Preview** or click the **lightning bolt** icon on the rightside toolbar. Brackets will launch Chrome and open your file in a new tab. 


In this model, nodes have only two attributes, so they are assigned to two groups with different sizes. The homophily parameter alters between ```0``` to ```1```.  Here it was posited that group *a* is the **minority group** in the network and group *b* has the majority. The nodes in the minority group are shown in **red**.

The parameters that can be changed are:

* **Number of nodes** - The number of nodes which create the network

* **Number of edges of a new node** - The **minimum** number of edges which a node can have in this network

* **Minority fraction** - The fraction of nodes that belong to the group *a* 

* $`h_{ab}`$ - The probability of connection between group *a* and *b*

* $`h_{ba}`$ - The probability of connection between the majority group members with the minorities

* **Press button generate** - Make a new realization of the network with the modified input parameters

**The colour bars** (the top left side) illustrate the *fraction* of minority nodes (red) in the **top 10%** with the highest degree inside the generated network.


## Author of the code

* **Zahra Sheikhbahaee** - PhD in Astrophysics 

