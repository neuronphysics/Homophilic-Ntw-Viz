import sys
import networkx as nx
sys.path.insert(0, "/home/zahra/GESIS/HomophilicNtwMinorities-master")
from generate_homophilic_graph_asymmetric import *
import matplotlib.pyplot as plt
graph = homophilic_barabasi_albert_graph_assym(N = 100, m = 2 , minority_fraction = 0.1, h_ab=0.5 , h_ba = 0.5)
nx.draw(graph)
plt.savefig("/home/zahra/GESIS/GenerateNetworks/plots/graph_N_100_m_2_MinorityFraction_0.1_hab_0.5_hba_0.5.png")
nx.write_gexf(graph, "/home/zahra/GESIS/GenerateNetworks/plots/graph_N_100_m_2_MinorityFraction_0.1_hab_0.5_hba_0.5.gexf")


