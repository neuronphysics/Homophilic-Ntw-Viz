# Visibility of minorities in social networks

The visualisation of a social network with taking into account the following mechanisms which influence on the generation of the social ties in networks:

[Karimi et al. 2017](https://arxiv.org/pdf/1702.00150.pdf) assume that there is an underlying **homophily** parameter due to node attributes which leads to the formation of links between members of each group in the network. The model also considers the **preferential attachment** property proposed by Barabási and Albert. The **degree of nodes** can change the probability of an edge between nodes, since this behaviour has been observed in many real-world social networks.  

In this model, nodes have only two attributes. Therefore, nodes are assigned to two groups with different sizes. The main goal of this work is to show how much the visibility of **minority groups** will change as a function of their *group size*, the *degree of homophily* between group members and *heterophily* between nodes in different groups in the network structure. 

The homophily parameter alters between ```0``` to ```1```.  Here it was posited that group *a* is the minority in the network and group *b* has the majority, so that we have ![equation](http://www.sciweavers.org/download/Tex2Img_1508943226.jpg).

The parameters that can be changed are:

* **Number of nodes** - The number of nodes which create the network

* **Number of edges of a new node** - The **minimum** number of edges which a node can have in this network

* **Minority fraction** - The fraction of nodes that belong to group *a* (![equation](http://www.sciweavers.org/download/Tex2Img_1508942344.jpg))