# ArcGIS Item Dependency Graphs

This is a fork of [phaakma/arcgis_item_graph](https://github.com/phaakma/arcgis_item_graph) that has been customised for my own use. Credit and thanks to [phaakma](https://github.com/phaakma) for the original tool. The core dependency graph visualisation is their work. This fork replaces the local python script files and workflow with an ArcGIS Notebook that can be run as a web tool within ArcGIS Online. I have also adjusted the visualisation UI based on my own preferences.


## Notebook
The `notebook/` folder contains a notebook that creates a dependency graph json file for an item in ArcGIS Online, including upstream and downstream dependencies both inside and outside the organisation. The json file is output to the notebook files and then published as an item into ArcGIS Online. The json file can be downloaded from the item page and uploaded into the item graph visualisation tool. This notebook can be run in the notebook editor directly, or published and run as a web tool.

- Accepts an item ID as an input parameter
- Builds an item dependency graph for that item, including upstream and downstream dependencies both inside and outside the organisation
- Converts the result to a D3.js-compatible json file the static website uses
- Publishes the json file as an item in ArcGIS Online


## Static website  
In the `docs/` folder is a static website that provides the UI for uploading the json file and visualising the item dependency graph using D3.js.

- **Load Data** to select and load in a local json file.
- The nodes can be manually moved and will lock in place. Right click a node to toggle the lock position on and off.
- **Reset node positions** to set all nodes back to the original floating positions.
- Popups are enabled by default. Hover over a node for more information, such as the item id and url links for certain item types.
- **Show Labels** displays each node's title and item type.
- The **Adjust physics options** panel provides sliders to adjust how the floating nodes position themselves.