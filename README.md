# UniversityBias

## Motivation
I was interested in analyzing bias in various University Ranking Systems. As part of an independent study with professor Jevin West at the University of Washington, I used various statistical analysis techniques to identify if and how University Ranking Systems are biased. I used Javascript/D3 to visualize the results.

## Data Used
For my analysis, I used multiple datasets and spent a significant amount of time cleaning the data, collating the different parts and performing statistical analysis. Since I had compiled some of this data for Assignment 2 as well, there is some continuation. The datasets I used are –

* World University Ranking dataset: I obtained this dataset from Kaggle. The data gives the university rankings compiled by 3 different institutions – Times Higher Educations (UK), Shanghai Rankings (China), Center for World University Ranking (Saudi Arabia).

* US News University Ranking data : I obtained this data from Washington Post portal and it gives the university rankings published by US News (USA)

* University information : I compiled this information from the National Centre for Education Statistics. The features obtained from this dataset include tuition and fees, undergraduate count, total headcount, location, region, master’s student count, count of faculty, faculty salary etc.
I filtered the data for a single year - 2014 and only considered the top 150 Universities. Based on future results, I plan on scaling the analysis.

## Description of visualizations
* Scatter Plot (can be found under 'Explore Universities' tab): This visualization allows the user to explore the various dimensions related to an university. The main features are -
Users can interactively select the x and y axis for the plot. Currently there are 11 options
Users can visualize 4 dimensions by setting its value to size
Users can additionally filter the data points based on regions (which has also been represented in the data via color)
Users can explore the university names by hovering mouse pointer over the circles in the scatter plot

* Force directed Plot (can be found under 'Explore Bias' tab): This is an interactive force directed graph layout with charge and gravity. Complicated multidimensional network information can be visualized using this. The main features are -
  * Blue circles represent the different ranking systems and grey circles represent the universities
  * A red color tie indicates that the ranking system biases AGAINST that university whereas a green color tie indicates that the ranking system biases TOWARDS that university.
  * Ties can only be formed between ranking systems and universities
  * Users can interactively drag each of the nodes to explore the network element and since the node has charge and gravity, it will attract or repel other nodes based on its ties
  * Users can interactively drag each of the nodes to explore the network element. Since the node has charge and gravity, it will attract or repel other nodes based on its ties so it is immediately visible how many ranking systems bias towards or against universities
  * Nodes with more ties tend ot gravitate towards the core of the network whereas the ones with fewer ties are at the peripheri
  * The feature of node clicking interactivity allows user to access information on-demand and not be overwhelmed by the information present in the plot

## Contact
**Nelson Dsouza** [Linkedin](https://www.linkedin.com/in/nelsondsouza1/) | [Email](mailto:nelsonds@uw.edu)

Please feel free to contribute to this project
