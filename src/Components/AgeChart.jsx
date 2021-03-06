import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie } from "victory";
import axios from "axios"

const createTally = data => {
  let ageTally = {"0-15": 0, "16-25":0, "26-39":0, "40-65":0};
  data.forEach(function(set) {
    if (ageTally[set.age]) {
      ageTally[set.age]++;
    } else {
      ageTally[set.age] = 1;
    }
  })
  return ageTally;
};


class Charts extends Component {
  
  
  render() {
    const {data} = this.props
    const test = createTally(data)
    let keys = Object.keys(test)
    let dataSet = keys.map(key => {
      return {x: key, y: test[key], label:key}
    })
    return (
      <div className="age-chart">
        <h2 className="age-subtitle">
          Age demographic of users in your location
        </h2>
        <h4>(Please click the bars to see pie chart)</h4>
        <svg viewBox="-50 -40 500 400">
          <VictorySharedEvents
            events={[
              {
                childName: ["pie", "bar"],
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        childName: ["pie", "bar"],
                        mutation: props => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: "tomato"
                            })
                          };
                        }
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        childName: ["pie", "bar"],
                        mutation: () => {
                          return null;
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
            <g transform={"translate(170, 50)"}>
              <VictoryBar
                name="bar"
                width={300}
                standalone={false}
                style={{
                  data: { width: 20 },
                  labels: { fontSize: 15 }
                }}
                data={dataSet}
                labelComponent={<VictoryLabel y={290} />}
              />
            </g>
            <g transform={"translate(-40, -100)"}>
              <VictoryPie
                name="pie"
                width={280}
                labelPosition="endAngle"
                standalone={false}
                style={{
                  labels: {
                    fontSize: 0
                  }
                }}
                data={dataSet}
              />
            </g>
          </VictorySharedEvents>
        </svg>
      </div>
    );
  }
}

export default Charts;