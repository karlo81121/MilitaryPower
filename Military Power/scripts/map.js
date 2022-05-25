// The svg
var svg = d3.select("svg");
width = +svg.attr("width");
height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3
  .geoMercator()
  .scale(160)
  .center([0, 20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3
  .scaleThreshold()
  .domain([10000, 100000, 1000000, 3000000, 10000000, 50000000])
  .range(d3.schemeBuGn[7]);

// Load external data and boot
d3.queue()
  .defer(
    d3.json,
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  )
  .defer(
    d3.csv,
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv",
    function (d) {
      data.set(d.code, +d.pop);
    }
  )
  .await(ready);

function ready(error, topo) {
  let mouseOver = function (d) {
    d3.selectAll(".Country").transition().duration(200).style("opacity", 0.5);
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black");
  };

  let mouseLeave = function (d) {
    d3.selectAll(".Country").transition().duration(200).style("opacity", 0.8);
    d3.select(this).transition().duration(200).style("stroke", "black");
  };

  /*************************************************************************/
  //BRAZIL
  let displayBrazilActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("brazilActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 800000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayBrazilAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("BrazilAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayBrazilGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("brazilGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 2000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayBrazilNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("brazilNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayBrazilMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("brazilMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 30]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let brazilDisplayed = false;
  let displayBrazilData = function () {
    if (brazilDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "Brazil Military Power";
      container.append(countryTitle);

      displayBrazilActivePersonnel();
      displayBrazilAirWeapons();
      displayBrazilGroundWeapons();
      displayBrazilNavyWeapons();
      displayBrazilMoneyExpense();
      brazilDisplayed = true;
    }
  };

  /*************************************************************************/
  //China

  let displayChinaActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("chinaActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 3200000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayChinaAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("chinaAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 1400]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayChinaGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("chinaGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 15000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayChinaNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("chinaNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayChinaMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("chinaMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let ChinaDisplayed = false;
  let displayChinaData = function () {
    if (USADisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "China Military Power";
      container.append(countryTitle);

      displayChinaActivePersonnel();
      displayChinaAirWeapons();
      displayChinaGroundWeapons();
      displayChinaNavyWeapons();
      displayChinaMoneyExpense();
      ChinaDisplayed = true;
    }
  };

  /*************************************************************************/
  //USA

  let displayUSAActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("USAactivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 1600000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayUSAAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("USAairWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 1800]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayUSAGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("USAgroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 42000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayUSANavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("USAnavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayUSAMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("USAmoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 900]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let USADisplayed = false;
  let displayUSAData = function () {
    if (USADisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "USA Military Power";
      container.append(countryTitle);

      displayUSAActivePersonnel();
      displayUSAAirWeapons();
      displayUSAGroundWeapons();
      displayUSANavyWeapons();
      displayUSAMoneyExpense();
      USADisplayed = true;
    }
  };

  /*************************************************************************/
  //Germany

  let displayGermanyActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("germanyActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 260000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayGermanyAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("germanyAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayGermanyGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("germanyGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 6000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayGermanyNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("germanyNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 15]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayGermanyMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("germanyMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let germanyDisplayed = false;
  let displayGermanyData = function () {
    if (USADisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "Germany Military Power";
      container.append(countryTitle);

      displayGermanyActivePersonnel();
      displayGermanyAirWeapons();
      displayGermanyGroundWeapons();
      displayGermanyNavyWeapons();
      displayGermanyMoneyExpense();
      germanyDisplayed = true;
    }
  };

  /************************************************************************/
  //Spain

  let displaySpainActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("spainActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 240000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displaySpainAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("spainAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 160]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displaySpainGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("spainGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 3000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displaySpainNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("spainNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 26]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displaySpainMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("spainMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let spainDisplayed = false;
  let displaySpainData = function () {
    if (spainDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "Spain Military Power";
      container.append(countryTitle);

      displaySpainActivePersonnel();
      displaySpainAirWeapons();
      displaySpainGroundWeapons();
      displaySpainNavyWeapons();
      displaySpainMoneyExpense();
      spainDisplayed = true;
    }
  };

  /************************************************************************/
  //France

  let displayFranceActivePresonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("franceActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 360000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayFranceAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("franceAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayFranceGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("franceGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 7000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayFranceNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("franceNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayFranceMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("franceMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 56]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let franceDisplayed = false;
  let displayFranceData = function () {
    if (franceDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "France Military Power";
      container.append(countryTitle);

      displayFranceActivePresonnel();
      displayFranceAirWeapons();
      displayFranceGroundWeapons();
      displayFranceNavyWeapons();
      displayFranceMoneyExpense();
      franceDisplayed = true;
    }
  };

  /************************************************************************/
  //England

  let displayEnglandActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("englandActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayEnglandAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("englandAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 160]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayEnglandGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("englandGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 6000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayEnglandNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("englandNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 24]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayEnglandMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("englandMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 65]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let englandDisplayed = false;
  let displayEnglandData = function () {
    if (englandDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "England Military Power";
      container.append(countryTitle);

      displayEnglandActivePersonnel();
      displayEnglandAirWeapons();
      displayEnglandGroundWeapons();
      displayEnglandNavyWeapons();
      displayEnglandMoneyExpense();
      englandDisplayed = true;
    }
  };

  /***********************************************************************/
  //India

  let displayIndiaActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("indiaActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 3500000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayIndiaAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("indiaAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayIndiaGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("indiaGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 5000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayIndiaNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("indiaNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 160]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayIndiaMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("indiaMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 80]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let indiaDisplayed = false;
  let displayIndiaData = function () {
    if (indiaDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "India Military Power";
      container.append(countryTitle);

      displayIndiaActivePersonnel();
      displayIndiaAirWeapons();
      displayIndiaGroundWeapons();
      displayIndiaNavyWeapons();
      displayIndiaMoneyExpense();
      indiaDisplayed = true;
    }
  };

  /**********************************************************************/
  //North Korea

  let displayNorthKoreaActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("northKoreaActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 1600000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayNorthKoreaAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("northKoreaAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 650]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayNorthKoreaGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("northKoreaGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayNorthKoreaNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("northKoreaNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayNorthKoreaMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("northKoreaMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let northKoreaDisplayed = false;
  let displayNorthKoreaData = function () {
    if (northKoreaDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "North Korea Military Power";
      container.append(countryTitle);

      displayNorthKoreaActivePersonnel();
      displayNorthKoreaAirWeapons();
      displayNorthKoreaGroundWeapons();
      displayNorthKoreaNavyWeapons();
      displayNorthKoreaMoneyExpense();
      northKoreaDisplayed = true;
    }
  };

  /**********************************************************************/
  //Russia

  let displayRussiaActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("russiaActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 1600000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayRussiaAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("russiaAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayRussiaGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("russiaGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 30000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayRussiaNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("russiaNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayRussiaMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("russiaMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 90]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let russiaDisplayed = false;
  let displayRussiaData = function () {
    if (russiaDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "Russia Military Power";
      container.append(countryTitle);

      displayRussiaActivePersonnel();
      displayRussiaAirWeapons();
      displayRussiaGroundWeapons();
      displayRussiaNavyWeapons();
      displayRussiaMoneyExpense();
      russiaDisplayed = true;
    }
  };

  /**********************************************************************/
  //Sweden

  let displaySwedenActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("swedenActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 35000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displaySwedenAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("swedenAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 110]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displaySwedenGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("swedenGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 3000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displaySwedenNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("swedenNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 18]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displaySwedenMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("swedenMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 7]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let swedenDisplayed = false;
  let displaySwedenData = function () {
    if (swedenDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "Sweden Military Power";
      container.append(countryTitle);

      displaySwedenActivePersonnel();
      displaySwedenAirWeapons();
      displaySwedenGroundWeapons();
      displaySwedenNavyWeapons();
      displaySwedenMoneyExpense();
      swedenDisplayed = true;
    }
  };

  /**********************************************************************/
  //Turkey

  let displayTurkeyActivePersonnel = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("turkeyActivePersonnel.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Active Personnel");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 650000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.Year);
        })
        .attr("x2", function (d) {
          return x(d.Year);
        })
        .attr("y1", function (d) {
          return y(d.Value);
        })
        .attr("y2", y(0))
        .attr("stroke", "grey");

      // Circles
      svg
        .selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
          return y(d.Value);
        })
        .attr("r", "4")
        .style("fill", "#687864")
        .attr("stroke", "black");
    });
  };

  let displayTurkeyAirWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("turkeyAirWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Air;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Air Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Air);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayTurkeyGroundWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("turkeyGroundWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Ground;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Ground Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Ground);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayTurkeyNavyWeapons = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("turkeyNavyWeapons.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Navy;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Navy Weapons");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Navy);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let displayTurkeyMoneyExpense = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#money-expense")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Money Expense (Billions)");

    // Parse the Data
    d3.csv("turkeyMoneyExpense.csv", function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 24]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.Value);
        })
        .attr("fill", "#687864");
    });
  };

  let turkeyDisplayed = false;
  let displayTurkeyData = function () {
    if (turkeyDisplayed == false) {
      const container = document.querySelector(".histogram-container");
      const countryTitle = document.createElement("h1");
      countryTitle.classList.add("country-title");
      countryTitle.style.color = "#687864";
      countryTitle.innerText = "Turkey Military Power";
      container.append(countryTitle);

      displayTurkeyActivePersonnel();
      displayTurkeyAirWeapons();
      displayTurkeyGroundWeapons();
      displayTurkeyNavyWeapons();
      displayTurkeyMoneyExpense();
      turkeyDisplayed = true;
    }
  };

  /**********************************************************************/

  let displayCountryData = function (d, i) {
    if (i == 22) {
      //done
      console.log("Ovo je Brazil!");
      displayBrazilData();
    }
    if (i == 30) {
      //done
      console.log("Ovo je Kina!");
      displayChinaData();
    }
    if (i == 41) {
      //done
      console.log("Ovo je Njemačka!");
      displayGermanyData();
    }
    if (i == 49) {
      //done
      console.log("Ovo je Španjolska!");
      displaySpainData();
    }
    if (i == 55) {
      //done
      console.log("Ovo je Francuska!");
      displayFranceData();
    }
    if (i == 57) {
      //done
      console.log("Ovo je Engleska!");
      displayEnglandData();
    }
    if (i == 73) {
      //done
      console.log("Ovo je Indija!");
      displayIndiaData();
    }
    if (i == 129) {
      //done
      console.log("Ovo je Sjeverna Koreja!");
      displayNorthKoreaData();
    }
    if (i == 134) {
      //done
      console.log("Ovo je Rusija!");
      displayRussiaData();
    }
    if (i == 150) {
      //done
      console.log("Ovo je Švedska!");
      displaySwedenData();
    }
    if (i == 161) {
      console.log("Ovo je Turska!");
      displayTurkeyData();
    }
    if (i == 165) {
      console.log("Ovo je Ukrajina!");
      displayUkraineData();
    }
    if (i == 167) {
      //done
      console.log("Ovo je SAD!");
      displayUSAData();
    }
  };

  let resetCountry = function () {
    document.location.reload(true);
  };

  // Draw the map
  svg
    .append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    // draw each country
    .attr("d", d3.geoPath().projection(projection))
    // set the color of each country
    .attr("fill", function (d) {
      d.total = data.get(d.id) || 0;
      return colorScale(d.total);
    })
    .style("stroke", "black")
    .attr("class", function (d) {
      return "Country";
    })
    .style("opacity", 0.8)
    .on("mouseover", mouseOver)
    .on("mouseleave", mouseLeave)
    .on("click", displayCountryData);
}
