let currentContainer;
let currentGraph;
let currentWidth;
let currentHeight;
let simulation;
let dataPath;
let filePath;
let currentNodeSize = 40;
const labelPadding = 20;

const fileInput = document.getElementById("load-data");

const NODE_FILL = "#d9e1e7ff";
const NODE_FIXED_STROKE = "#378ccdff";
const NODE_FLOATING_STROKE = "#e0b169ff";
const NODE_STROKE_WIDTH = 3;
const IMAGE_SIZE = 75;

const iconConfig = {
  "Web Map": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/maps16.svg",
    size: 30,
    ratio: 2,
  },
  "Feature Service": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/featureshosted16.svg",
    size: 15,
  },
  Table: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/table16.svg",
    size: 15,
  },
  "Web Mapping Application": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/instantapps16.svg",
    size: 30,
    ratio: 2,
  },
  Notebook: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/notebook16.svg",
    size: 15,
  },
  "File Geodatabase": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/datafilesgray16.svg",
    size: 15,
  },
  "Web Experience": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/experiencebuilder16.svg",
    size: 30,
    ratio: 2,
  },
  "Service Definition": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/data16.svg",
    size: 15,
  },
  "Desktop Style": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/desktopstyle16.svg",
    size: 15,
  },
  Style: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/style16.svg",
    size: 15,
  },
  Form: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/survey16.svg",
    size: 15,
  },
  "Web Scene": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/webscenelocal16.svg",
    size: 15,
  },
  Application: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/apps16.svg",
    size: 15,
  },
  Dashboard: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/dashboard16.svg",
    size: 30,
    ratio: 2,
  },
  Image: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/image16.svg",
    size: 15,
  },
  Solution: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/solutions16.svg",
    size: 15,
  },
  "Image Service": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/tiledimagerylayer16.svg",
    size: 15,
  },
  "Vector Tile Service": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/vectortile16.svg",
    size: 15,
  },
  "Tiled Imagery Layer": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/tiledimagerylayer16.svg",
    size: 15,
  },
  "Tile Layer": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/maptiles16.svg",
    size: 15,
  },
  "Map Service": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/maptiles16.svg",
    size: 15,
  },
  "Geocoding Service": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/geocodeservice16.svg",
    size: 15,
  },
  "Vector Tile Package": {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/vectortilepackage16.svg",
    size: 15,
  },
  OGCFeatureServer: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/features16.svg",
    size: 15,
  },
  WFS: {
    image:
      "https://cdn-a.arcgis.com/cdn/1BE082D/js/arcgis-app-components/arcgis-app/assets/arcgis-item-type/featureshosted16.svg",
    size: 15,
  },
};

fileInput.addEventListener("click", () => {
  fileInput.value = ""; // reset so the same file can be selected again
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    readLocalFile(file);
  }
});

function triggerFileLoad() {
  fileInput.click(); // trigger the hidden input
}

const controls = [
  { name: "link-distance", force: "link", property: "distance" },
  { name: "charge-strength", force: "charge", property: "strength" },
  { name: "collision-radius", force: "collision", property: "radius" },
];

// Load graph data and initialize visualization
async function initializeGraph() {
  if (dataPath) {
    const graph = await d3.json(dataPath);
    createGraph(graph);
  }

  // Add file input handler
  document
    .getElementById("load-data")
    .addEventListener("change", handleFileSelect);

  // Add popup toggle handler
  document
    .getElementById("enable-popups")
    .addEventListener("change", handlePopupToggle);

  initializePhysicsControls();
}

function handleFileSelect(event) {
  filePath = event.target.files[0];
  readLocalFile(filePath);
}

function handlePopupToggle() {
  if (!document.getElementById("enable-popups").checked) {
    // Hide popup immediately when disabled
    popup.style("opacity", 0);
    if (popupTimer) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
  }
}

function readLocalFile(file) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const graph = JSON.parse(e.target.result);
        // Stop existing simulation if it exists
        if (simulation) simulation.stop();
        // Clear existing svg
        d3.select("svg").remove();
        // Create new graph with loaded data
        createGraph(graph);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error loading file. Please ensure it is valid JSON.");
      }
    };
    reader.readAsText(file);
  }
}

function createGraph(graph) {
  currentGraph = graph;
  currentWidth = window.innerWidth;
  currentHeight = window.innerHeight;

  if (graph.physics) {
    document.getElementById("link-distance").value = graph.physics.linkDistance;
    document.getElementById("charge-strength").value =
      graph.physics.chargeStrength;
    document.getElementById("collision-radius").value =
      graph.physics.collisionRadius;
  }

  const zoom = d3.zoom().on("zoom", zoomed);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", currentWidth)
    .attr("height", currentHeight)
    .call(zoom); // call it once here

  // Add arrowhead marker definition
  svg.append("defs")
    .append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0) // tip of arrowhead at start
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
    .attr("fill", "#999")
    .append("path")
    .attr("d", "M10,-5L0,0L10,5"); // reversed path

  // Add container group for zoom/pan
  const container = svg.append("g");
  currentContainer = container;

  // Add zoom function
  function zoomed(event) {
    {
      container.attr("transform", event.transform);
    }
  }

  if (typeof graph.popupEnabled === "boolean") {
    const popupToggle = document.getElementById("enable-popups");
    popupToggle.checked = graph.popupEnabled;
  }

  // Apply saved zoom if available
  if (graph.camera) {
    const transform = d3.zoomIdentity
      .translate(graph.camera.x, graph.camera.y)
      .scale(graph.camera.k);

    svg.call(zoom.transform, transform);
  }

  // Create new simulation
  simulation = d3
    .forceSimulation(graph.nodes)
    .force(
      "link",
      d3
        .forceLink(graph.links)
        .id((d) => d.id)
        .distance(Number(document.getElementById("link-distance").value))
    )
    .force(
      "charge",
      d3
        .forceManyBody()
        .strength(Number(document.getElementById("charge-strength").value))
    )
    .force("center", d3.forceCenter(currentWidth / 2, currentHeight / 2))
    .force(
      "collision",
      d3
        .forceCollide()
        .radius(Number(document.getElementById("collision-radius").value))
    );

  const linkLine = container
    .append("g")
    .attr("class", "link-lines")
    .selectAll("line")
    .data(graph.links)
    .join("line")
    .attr("class", "link")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 1);

  const popup = d3.select("#popup");

  // Add popup management with proper timer handling
  let popupTimer = null;
  let currentNode = null;

  function showPopup(event, d) {
    if (!document.getElementById("enable-popups").checked) return;
    if (popupTimer) {
      {
        clearTimeout(popupTimer);
        popupTimer = null;
      }

      // Update current node and show its popup
      currentNode = d;
      const [x, y] = [event.pageX, event.pageY];
      popup
        .style("left", x + 10 + "px")
        .style("top", y + 10 + "px")
        .style("opacity", 1)
        .html(d.title);
    }
  }

  function hidePopupWithDelay() {
    // Clear any existing timer first
    if (popupTimer) {
      {
        clearTimeout(popupTimer);
      }
    }

    if (!document.getElementById("enable-popups").checked) {
      popup.style("opacity", 0);
      return;
    }

    // Create new timer for current node
    popupTimer = setTimeout(() => {
      if (currentNode) {
        popup.transition().duration(500).style("opacity", 0);
        //currentNode = null;
        popupTimer = null;
      }
    }, 2000);
  }

  const nodeGroup = container
    .append("g")
    .selectAll("g")
    .data(graph.nodes)
    .join("g")
    .attr("class", "node-group")
    .call(drag(simulation))
    .on("mouseover", showPopup)
    .on("mouseout", hidePopupWithDelay)
    .on("contextmenu", function (event, d) {
      event.preventDefault(); // prevent browser context menu

      const node = d3.select(this);

      // Toggle fixed state
      if (d.fx != null || d.fy != null) {
        // Currently fixed -> release
        d.fx = null;
        d.fy = null;
      } else {
        // Currently floating -> fix at current position
        d.fx = d.x;
        d.fy = d.y;
      }
      updateHaloColor(node, d);
    });

  const linkArrow = container
    .append("g")
    .attr("class", "link-arrows")
    .selectAll("line")
    .data(graph.links)
    .join("line")
    .attr("class", "link-arrow")
    .attr("stroke", "#999")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0) // <--- Hide the shaft
    .attr("marker-end", "url(#arrowhead)");

  const scaleInput = document.querySelector('input[type="range"][oninput*="setNodeSize"]');
  const scale_percentage = scaleInput ? scaleInput.value / 100 : 1;

  nodeGroup
    .append("circle")
    .attr("class", "halo")
    .attr("r", (d) => getNodeSizes(d, scale_percentage).haloRadius)
    .attr("fill", NODE_FILL)
    .attr("stroke", (d) =>
      d.fx != null || d.fy != null ? NODE_FIXED_STROKE : NODE_FLOATING_STROKE
    )
    .attr("stroke-width", NODE_STROKE_WIDTH);

  nodeGroup
    .append("image")
    .attr("xlink:href", (d) => iconConfig[d.type]?.image || "")
    .attr("width", (d) => getNodeSizes(d, scale_percentage).imageSize)
    .attr("height", (d) => getNodeSizes(d, scale_percentage).imageSize)
    .attr("x", (d) => -getNodeSizes(d, scale_percentage).imageSize / 2)
    .attr("y", (d) => -getNodeSizes(d, scale_percentage).imageSize / 2)
    .attr("display", (d) => (iconConfig[d.type] ? "block" : "none"));

  nodeGroup
    .append("circle")
    .attr("class", "fallback")
    .attr("r", (d) => getNodeSizes(d, scale_percentage).fallbackRadius)
    .attr("fill", (d) => {
      if (iconConfig[d.type]) return "none";
      if (d.fx != null || d.fy != null) return "#ff7f0e";
      if (d.selected) return "#1f77b4";
      return "#69b3a2";
    });

  nodeGroup
    .append("text")
    .attr("class", "node-label")
    .attr("dx", (d) => getNodeSizes(d, scale_percentage).haloRadius + labelPadding)
    .attr("dy", 4)
    .text((d) => d.name);

  d3.select("body").on("click", null);
  popup.on("click", null);

  simulation.on("tick", () => {
    const scaleInput = document.querySelector('input[type="range"][oninput*="setNodeSize"]');
    const scale_percentage = scaleInput ? scaleInput.value / 100 : 1;
    const arrowLength = 5;

    linkLine
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    linkArrow
      .attr("x1", (d) => {
        // Arrow shaft starts just before the tip
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sizes = getNodeSizes(d.target, scale_percentage);
        const r = Math.max(0, sizes.haloRadius - arrowLength);
        if (dist === 0) return d.target.x;
        return d.target.x - (dx / dist) * r;
      })
      .attr("y1", (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sizes = getNodeSizes(d.target, scale_percentage);
        const r = Math.max(0, sizes.haloRadius - arrowLength);
        if (dist === 0) return d.target.y;
        return d.target.y - (dy / dist) * r;
      })
      .attr("x2", (d) => {
        // Arrow tip
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sizes = getNodeSizes(d.target, scale_percentage);
        const r = Math.max(0, sizes.haloRadius);
        if (dist === 0) return d.target.x;
        return d.target.x - (dx / dist) * r;
      })
      .attr("y2", (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sizes = getNodeSizes(d.target, scale_percentage);
        const r = Math.max(0, sizes.haloRadius);
        if (dist === 0) return d.target.y;
        return d.target.y - (dy / dist) * r;
      });

    nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    nodeGroup.select(".node-label").attr("x", 0).attr("y", 0);
  });

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      updateHaloColor(d3.select(this), d);
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
      updateHaloColor(d3.select(this), d);
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = event.x;
      d.fy = event.y;
      updateHaloColor(d3.select(this), d);
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}

function initializePhysicsControls() {
  controls.forEach((control) => {
    const slider = document.getElementById(control.name);
    const value = document.getElementById(`${control.name}-value`);

    // Sync the inputs
    slider.addEventListener("input", () => {
      value.value = slider.value;
      updatePhysics(control.force, control.property, Number(slider.value));
    });

    value.addEventListener("input", () => {
      if (value.value === "") return;
      const numValue = Number(value.value);
      if (numValue >= Number(value.min) && numValue <= Number(value.max)) {
        slider.value = numValue;
        updatePhysics(control.force, control.property, numValue);
      }
    });
  });
}

function updatePhysics(forceName, property, value) {
  if (!simulation) return;

  if (forceName === "link") {
    simulation.force("link").distance(value);
  } else if (forceName === "charge") {
    simulation.force("charge").strength(value);
  } else if (forceName === "collision") {
    simulation.force("collision").radius(value);
  }

  simulation.alpha(0.3).restart();
}

function resetPhysics() {
  // Default values
  const defaults = {
    "link-distance": 100,
    "charge-strength": -20,
    "collision-radius": 75,
  };

  // Update all controls
  Object.entries(defaults).forEach(([id, value]) => {
    const slider = document.getElementById(id);
    const numberInput = document.getElementById(`${id}-value`);

    slider.value = value;
    numberInput.value = value;

    // Get force name and property from the control ID
    const control = controls.find((c) => c.name === id);
    if (control) {
      updatePhysics(control.force, control.property, value);
    }
  });
}

function saveAsSVG() {
  if (!currentContainer || !currentGraph) {
    alert("No graph data to save");
    return;
  }

  const svgCopy = d3
    .create("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", currentWidth)
    .attr("height", currentHeight);

  // Create container with current transform
  const containerCopy = svgCopy
    .append("g")
    .attr("transform", currentContainer.attr("transform"));

  // Add edges (links) first so they appear behind nodes
  containerCopy
    .selectAll(".link")
    .data(currentGraph.links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 1)
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  // Add nodes
  containerCopy
    .selectAll(".node")
    .data(currentGraph.nodes)
    .join("circle")
    .attr("r", 10)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("fill", (d) => (d.fx ? "#ff7f0e" : "#69b3a2"))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5);

  // Add labels
  containerCopy
    .selectAll(".label")
    .data(currentGraph.nodes)
    .join("text")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("dx", 15)
    .attr("dy", 4)
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "#333")
    .text((d) => d.name);

  // Create blob and trigger download
  const svgString = svgCopy.node().outerHTML;
  const blob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const filename =
    filePath && filePath.name
      ? filePath.name.replace(/\.[^/.]+$/, "") // remove extension
      : "graph";
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function saveGraphToFile() {
  if (!currentGraph || !simulation) {
    alert("No graph to save.");
    return;
  }

  // Clone nodes with position and fixed state
  const graphCopy = {
    nodes: currentGraph.nodes.map((node) => ({
      ...node,
      x: node.x,
      y: node.y,
      fx: node.fx,
      fy: node.fy,
      selected: node.selected || false,
    })),
    links: currentGraph.links.map((link) => ({
      source: typeof link.source === "object" ? link.source.id : link.source,
      target: typeof link.target === "object" ? link.target.id : link.target,
    })),
    physics: {
      linkDistance: Number(document.getElementById("link-distance").value),
      chargeStrength: Number(document.getElementById("charge-strength").value),
      collisionRadius: Number(
        document.getElementById("collision-radius").value
      ),
    },
    camera: (() => {
      const transform = d3.zoomTransform(d3.select("svg").node());
      return {
        x: transform.x,
        y: transform.y,
        k: transform.k,
      };
    })(),
    popupEnabled: document.getElementById("enable-popups").checked,
  };

  const blob = new Blob([JSON.stringify(graphCopy, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  // use the filePath name if it exists, otherwise default to "graph"
  const filename =
    filePath && filePath.name
      ? filePath.name.replace(/\.[^/.]+$/, "") // remove extension
      : "graph";
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function updateHaloColor(selection, nodeData) {
  const isFixed = nodeData.fx != null || nodeData.fy != null;
  selection
    .select("circle.halo")
    .attr("stroke", isFixed ? NODE_FIXED_STROKE : NODE_FLOATING_STROKE);
}

function resetAllNodesToFloating() {
  currentGraph.nodes.forEach((node) => {
    delete node.fx;
    delete node.fy;
  });
  simulation.alpha(1).restart();

  d3.selectAll("g.node-group").each(function () {
    const node = d3.select(this);
    updateHaloColor(node, node.datum());
  });
}

function setNodeSize(scale) {
  const scale_percentage = scale / 100;

  d3.selectAll("g.node-group").each(function (d) {
    const group = d3.select(this);
    const sizes = getNodeSizes(d, scale_percentage);

    group.select("circle.halo").attr("r", sizes.haloRadius);
    group.select("image")
      .attr("width", sizes.imageSize)
      .attr("height", sizes.imageSize)
      .attr("x", -sizes.imageSize / 2)
      .attr("y", -sizes.imageSize / 2);
    group.select("circle.fallback").attr("r", sizes.fallbackRadius);
    group.select(".node-label").attr("dx", sizes.haloRadius + labelPadding);
  });

  // Force simulation to update node positions
  if (simulation) {
    simulation.alpha(0.3).restart();
  }

  // // Update link endpoints so arrowheads stay at the edge of the halo
  // d3.selectAll("line.link").each(function (d) {
  //   const dx = d.target.x - d.source.x;
  //   const dy = d.target.y - d.source.y;
  //   const dist = Math.sqrt(dx * dx + dy * dy);
  //   const sizes = getNodeSizes(d.target, scale_percentage);
  //   const r = sizes.haloRadius;
  //   const x2 = dist === 0 ? d.target.x : d.target.x - (dx / dist) * r;
  //   const y2 = dist === 0 ? d.target.y : d.target.y - (dy / dist) * r;
  //   d3.select(this)
  //     .attr("x2", x2)
  //     .attr("y2", y2);
  // });
}

function getNodeSizes(d, scale_percentage = 1) {
  const config = iconConfig[d.type];
  const ratio = config && typeof config.ratio === "number" ? config.ratio : 1;
  const haloRadius = ((IMAGE_SIZE * scale_percentage) * ratio) / 2 + 5 + NODE_STROKE_WIDTH;
  const imageRatio = 0.65;
  const imageSize = haloRadius * 2 * imageRatio;
  const fallbackRadius = 10 * scale_percentage;
  return { haloRadius, imageSize, fallbackRadius };
}

// Start visualization once DOM is loaded
document.addEventListener("DOMContentLoaded", initializeGraph);
