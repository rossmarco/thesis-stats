import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import { curveCatmullRom } from "d3-shape";
import { EXTENDED_DISCRETE_COLOR_RANGE as COLORS } from "./theme";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  MarkSeries,
  LineSeriesCanvas,
  ArcSeries,
  DiscreteColorLegend,
  LineMarkSeries,
  LineMarkSeriesCanvas
} from "react-vis";

const PI = Math.PI;
const MODE = ["noWobble", "gentle", "wobbly", "stiff"];
const ITEMS = ["Unigrams", "Bigrams", "Trigrams", "Quadgrams"];

function generateData() {
  return [...new Array(10)].map(row => ({
    x: Math.random() * 5,
    y: Math.random() * 10
  }));
}

function updateData() {
  const divider = Math.floor(Math.random() * 8 + 3);
  const newData = [...new Array(5)].map((row, index) => {
    return {
      color: index,
      radius0: Math.random() > 0.8 ? Math.random() + 1 : 0,
      radius: Math.random() * 3 + 1,
      angle: ((index + 1) * PI) / divider,
      angle0: (index * PI) / divider
    };
  });
  return newData.concat([
    { angle0: 0, angle: PI * 2 * Math.random(), radius: 1.1, radius0: 0.8 }
  ]);
}

function updateLittleData() {
  const portion = Math.random();
  return [
    {
      angle0: 0,
      angle: portion * PI * 2,
      radius0: 0,
      radius: 10,
      color: COLORS[13]
    },
    {
      angle0: portion * PI * 2,
      angle: 2 * PI,
      radius0: 0,
      radius: 10,
      color: COLORS[12]
    }
  ];
}

class App extends Component {
  state = {
    useCanvas: false,
    /*data: generateData(),*/
    modeIndex: 2,
    data: updateData(),
    littleData: updateLittleData()
  };
  render() {
    const { useCanvas } = this.state;
    const Line = useCanvas ? LineSeriesCanvas : LineSeries;
    const { modeIndex, data } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Marco Ross' Undergraduate Thesis</h1>
        </header>
        <p className="App-intro">
          Welcome to Marco Ross' <code>2018 undergrad thesis</code> presented in
          React
        </p>
        <p>Overall Classification Accuracy</p>
        <XYPlot width={500} height={500}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="num of n-grams" position="start" />

          <LineMarkSeries
            className="first-series"
            data={[
              { x: 25, y: 80 },
              { x: 50, y: 81.11 },
              { x: 100, y: 78.89 },
              { x: 200, y: 84.44 },
              { x: 400, y: 73.33 },
              { x: 800, y: 68.89 }
            ]}
          />
          <LineMarkSeries
            className="second-series"
            curve={curveCatmullRom.alpha(0.5)}
            style={{
              // note that this can not be translated to the canvas version
              strokeDasharray: "2 2"
            }}
            data={[
              { x: 25, y: 78.89 },
              { x: 50, y: 76.67 },
              { x: 100, y: 78.89 },
              { x: 200, y: 88.89 },
              { x: 400, y: 87.78 },
              { x: 800, y: 90.0 }
            ]}
          />
          <LineMarkSeries
            className="third-series"
            curve={"curveMonotoneX"}
            data={[
              { x: 25, y: 60 },
              { x: 50, y: 68.89 },
              { x: 100, y: 71.11 },
              { x: 200, y: 83.33 },
              { x: 400, y: 86.67 },
              { x: 800, y: 88.89 }
            ]}
          />
          <LineMarkSeries
            className="fourth-series"
            curve={"curveMonotoneX"}
            data={[
              { x: 25, y: 34.33 },
              { x: 50, y: 38.89 },
              { x: 100, y: 64.44 },
              { x: 200, y: 70.0 },
              { x: 400, y: 80.0 },
              { x: 800, y: 77.78 }
            ]}
          />
          {/* Put the y axis down here because React produces components based on when they're called
              and therefore, if Y is called before the lines, the axis title is covered by the lines */}
          <YAxis title="classification accuracy %" orientation="left" />
        </XYPlot>
        <DiscreteColorLegend
          orientation="horizontal"
          width={300}
          items={ITEMS}
        />
        <p>
          Accuracy of <code>bigrams</code>
        </p>
        <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries animation={MODE[modeIndex]} data={data} />
        </XYPlot>
        <p>
          Research <code>source</code> distribution
        </p>
        <XYPlot xDomain={[-5, 5]} yDomain={[-5, 5]} width={300} height={300}>
          <XAxis />
          <YAxis />
          <ArcSeries
            animation
            radiusDomain={[0, 4]}
            data={this.state.data.map(row => {
              if (this.state.value && this.state.value.color === row.color) {
                return {
                  ...row,
                  style: { stroke: "black", strokeWidth: "5px" }
                };
              }
              return row;
            })}
            colorRange={COLORS}
            onValueMouseOver={row => this.setState({ value: row })}
            onSeriesMouseOut={() => this.setState({ value: false })}
            colorType={"category"}
          />
          <ArcSeries
            animation
            radiusType={"literal"}
            center={{ x: -2, y: 2 }}
            data={this.state.littleData}
            colorType={"literal"}
          />
        </XYPlot>
      </div>
    );
  }
}

export default App;
