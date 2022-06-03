var svg = d3.select("svg");
width = +svg.attr("width");
height = +svg.attr("height");

var path = d3.geoPath();
var projection = d3
  .geoMercator()
  .scale(165)
  .center([0, 20])
  .translate([width / 2, height / 1.5]);

var data = d3.map();
var colorScale = d3
  .scaleThreshold()
  .domain([10000, 100000, 1000000, 3000000, 10000000, 30000000])
  .range(d3.schemeBuGn[7]);

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

  let mouseClick = function(){
    d3.select(".Country")
      .transition()
      .duration(200)
      .style("opacity", 0.5)
      .style("stroke", "black");
  }

  let mouseLeave = function (d) {
    d3.selectAll(".Country").transition().duration(200).style("opacity", 0.8);
    d3.select(this).transition().duration(200).style("stroke", "black");
  };

  let countryClicked = 0;

  let addRefreshButton = function () {
    const refreshButton = document.createElement("button");
    refreshButton.classList.add("refresh-btn");
    refreshButton.innerText = "Choose another country";
    refreshButton.style.backgroundColor = "#687864";
    refreshButton.style.color = "#FFFFFF";
    refreshButton.style.width = "150px";
    refreshButton.style.height = "40px";
    refreshButton.style.borderRadius = "5px";
    refreshButton.onmouseover = function () {
      refreshButton.style.cursor = "pointer";
      refreshButton.style.backgroundColor = "#FFFFFF";
      refreshButton.style.color = "#000000";
    };
    refreshButton.onmouseleave = function () {
      refreshButton.style.backgroundColor = "#687864";
      refreshButton.style.color = "#FFFFFF";
    };
    refreshButton.style.position = "absolute";
    refreshButton.style.top = '35px';
    refreshButton.style.left = '550px';
    const buttonContainer = document.querySelector("#refresh-button");
    buttonContainer.append(refreshButton);
  };

  const refreshButton = document.querySelector("#refresh-button");
  refreshButton.addEventListener("click", function() {
    countryClicked = 0;
    window.location.reload();
  });

  /*************************************************************************/
  //BRAZIL

  let displayBrazilActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("brazilActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 800000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("BrazilAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("brazilGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 2000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("brazilNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("brazilMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 30]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayBrazilData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "Brazil Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayBrazilActivePersonnel();
    displayBrazilAirWeapons();
    displayBrazilGroundWeapons();
    displayBrazilNavyWeapons();
    displayBrazilMoneyExpense();
    addRefreshButton();
  };

  /*************************************************************************/
  //China

  let displayChinaActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("chinaActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 3200000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("chinaAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 1300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("chinaGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("chinaNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("chinaMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayChinaData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "China Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayChinaActivePersonnel();
    displayChinaAirWeapons();
    displayChinaGroundWeapons();
    displayChinaNavyWeapons();
    displayChinaMoneyExpense();
    addRefreshButton();
  };

  /*************************************************************************/
  //USA

  let displayUSAActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("USAactivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 1600000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("USAairWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 1800]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("USAgroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 42000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("USAnavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("USAmoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 900]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayUSAData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "USA Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayUSAActivePersonnel();
    displayUSAAirWeapons();
    displayUSAGroundWeapons();
    displayUSANavyWeapons();
    displayUSAMoneyExpense();
    addRefreshButton();
  };

  /*************************************************************************/
  //Germany

  let displayGermanyActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("germanyActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 260000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("germanyAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("germanyGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 6000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("germanyNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 15]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("germanyMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayGermanyData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "Germany Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayGermanyActivePersonnel();
    displayGermanyAirWeapons();
    displayGermanyGroundWeapons();
    displayGermanyNavyWeapons();
    displayGermanyMoneyExpense();
    addRefreshButton();
  };

  /************************************************************************/
  //Spain

  let displaySpainActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("spainActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 230000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("spainAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 160]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("spainGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 3000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("spainNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 26]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("spainMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displaySpainData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "Spain Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displaySpainActivePersonnel();
    displaySpainAirWeapons();
    displaySpainGroundWeapons();
    displaySpainNavyWeapons();
    displaySpainMoneyExpense();
    addRefreshButton();
  };

  /************************************************************************/
  //France

  let displayFranceActivePresonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("franceActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 360000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("franceAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("franceGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 7000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("franceNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("franceMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 56]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayFranceData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "France Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayFranceActivePresonnel();
    displayFranceAirWeapons();
    displayFranceGroundWeapons();
    displayFranceNavyWeapons();
    displayFranceMoneyExpense();
    addRefreshButton();
  };

  /************************************************************************/
  //England

  let displayEnglandActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("englandActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("englandAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 160]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("englandGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 6000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("englandNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 24]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("englandMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 65]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayEnglandData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "England Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayEnglandActivePersonnel();
    displayEnglandAirWeapons();
    displayEnglandGroundWeapons();
    displayEnglandNavyWeapons();
    displayEnglandMoneyExpense();
    addRefreshButton();
  };

  /***********************************************************************/
  //India

  let displayIndiaActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("indiaActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 3300000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("indiaAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("indiaGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 5000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("indiaNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 160]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("indiaMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 80]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayIndiaData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "India Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayIndiaActivePersonnel();
    displayIndiaAirWeapons();
    displayIndiaGroundWeapons();
    displayIndiaNavyWeapons();
    displayIndiaMoneyExpense();
    addRefreshButton();
  };

  /**********************************************************************/
  //North Korea

  let displayNorthKoreaActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("northKoreaActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 1600000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("northKoreaAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 650]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("northKoreaGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("northKoreaNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("northKoreaMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayNorthKoreaData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "North Korea Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayNorthKoreaActivePersonnel();
    displayNorthKoreaAirWeapons();
    displayNorthKoreaGroundWeapons();
    displayNorthKoreaNavyWeapons();
    displayNorthKoreaMoneyExpense();
    addRefreshButton();
  };

  /**********************************************************************/
  //Russia

  let displayRussiaActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("russiaActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 1600000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("russiaAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("russiaGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 30000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("russiaNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("russiaMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 90]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayRussiaData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "Russia Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayRussiaActivePersonnel();
    displayRussiaAirWeapons();
    displayRussiaGroundWeapons();
    displayRussiaNavyWeapons();
    displayRussiaMoneyExpense();
    addRefreshButton();
  };

  /**********************************************************************/
  //Sweden

  let displaySwedenActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("swedenActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 33000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("swedenAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 110]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("swedenGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 3000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("swedenNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 18]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("swedenMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 7]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displaySwedenData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "Sweden Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displaySwedenActivePersonnel();
    displaySwedenAirWeapons();
    displaySwedenGroundWeapons();
    displaySwedenNavyWeapons();
    displaySwedenMoneyExpense();
    addRefreshButton();
  };

  /**********************************************************************/
  //Turkey

  let displayTurkeyActivePersonnel = function () {
    var margin = { top: 20, right: 30, bottom: 90, left: 100 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#active-personnel")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("turkeyActivePersonnel.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 630000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#air-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("turkeyAirWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#ground-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("turkeyGroundWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg = d3
      .select("#navy-weapons")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("turkeyNavyWeapons.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 360 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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

    d3.csv("turkeyMoneyExpense.csv", function (data) {

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

      var y = d3.scaleLinear().domain([0, 24]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

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

  let displayTurkeyData = function () {
    const container = document.querySelector(".histogram-container");
    const countryTitle = document.createElement("h1");
    countryTitle.classList.add("country-title");
    countryTitle.style.color = "#687864";
    countryTitle.innerText = "Turkey Military Power";
    countryTitle.style.position = "absolute";
    countryTitle.style.top = '15px';
    countryTitle.style.left = "1120px";
    container.append(countryTitle);

    displayTurkeyActivePersonnel();
    displayTurkeyAirWeapons();
    displayTurkeyGroundWeapons();
    displayTurkeyNavyWeapons();
    displayTurkeyMoneyExpense();
    addRefreshButton();
  };

  /**********************************************************************/

  let displayCountryData = function (d, i) {
    if (i == 22 && countryClicked == 0) {
      mouseClick();
      displayBrazilData();
      countryClicked = 1;
    }
    if (i == 30 && countryClicked == 0) {
      displayChinaData();
      countryClicked = 1;
    }
    if (i == 41 && countryClicked == 0) {
      displayGermanyData();
      countryClicked = 1;
    }
    if (i == 49 && countryClicked == 0) {
      displaySpainData();
      countryClicked = 1;
    }
    if (i == 55 && countryClicked == 0) {
      displayFranceData();
      countryClicked = 1;
    }
    if (i == 57 && countryClicked == 0) {
      displayEnglandData();
      countryClicked = 1;
    }
    if (i == 73 && countryClicked == 0) {
      displayIndiaData();
      countryClicked = 1;
    }
    if (i == 129 && countryClicked == 0) {
      displayNorthKoreaData();
      countryClicked = 1;
    }
    if (i == 134 && countryClicked == 0) {
      displayRussiaData();
      countryClicked = 1;
    }
    if (i == 150 && countryClicked == 0) {
      displaySwedenData();
      countryClicked = 1;
    }
    if (i == 161 && countryClicked == 0) {
      displayTurkeyData();
      countryClicked = 1;
    }
    if (i == 167 && countryClicked == 0) {
      displayUSAData();
      countryClicked = 1;
    }
  };

  svg
    .append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(projection))
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
