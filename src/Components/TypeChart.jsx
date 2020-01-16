import React, { Component } from "react";
import ReactDOM from "react-dom";
import { VictoryPie, VictoryLegend } from "victory";
import axios from "axios";

const createTally = data => {
  let typeTally = {};
  data.forEach(function(set) {
    if (typeTally[set.event_type]) {
      typeTally[set.event_type]++;
    } else {
      typeTally[set.event_type] = 1;
    }
  });
  return typeTally;
};

class TimeChart extends Component {
  state = {
    zoomDomain: {}
  };

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const { data } = this.props;
    let test = createTally(data);
    let chartData = Object.keys(test).map(type => {
      return { y: test[type]};
    });
    return (
      <div className="age-chart">
        <VictoryLegend
          className="legend"
          x={1}
          y={200}
          width={650}
          title="Event Types"
          centerTitle
          orientation="horizontal"
          gutter={10}
          style={{ border: { stroke: "black" }, title: { fontSize: 12 }, fontSize: 12 }}
          data={[
            { name: "Sport", symbol: { fill: "navy" } },
            { name: "Live", symbol: { fill: "green" } },
            { name: "Date", symbol: { fill: "gold" } },
            { name: "Comedy", symbol: { fill: "orange" } },
            { name: "Film", symbol: { fill: "pink" } },
            { name: "Theatre", symbol: { fill: "red" } },
            { name: "Bar/Pub", symbol: { fill: "cyan" } },
            { name: "Club", symbol: { fill: "grey" } },
            { name: "The Arts", symbol: { fill: "purple" } }
          ]}
        />
        <VictoryPie
          colorScale={[
            "green",
            "orange",
            "gold",
            "cyan",
            "navy",
            "pink",
            "red",
            "purple",
            "grey",
            "maroon",
            "brown",
            "violet"
          ]}
          width={500}
          data={chartData}
        />
      </div>
    );
  }
}

export default TimeChart;
