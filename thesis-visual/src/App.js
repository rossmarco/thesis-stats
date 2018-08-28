import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  Home,
  Code,
  Language,
  School,
  Work,
  Face,
  Games
} from "@material-ui/icons";
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
  LineMarkSeriesCanvas,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas,
  VerticalBarSeries
} from "react-vis";
import { Button } from "@material-ui/core";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const PI = Math.PI;
const MODE = ["noWobble", "gentle", "wobbly", "stiff"];
const NGRAMS = ["Unigrams", "Bigrams", "Trigrams", "Quadgrams"];
const NGRAM_SIZE = ["25", "50", "100", "200", "400", "800"];
const styles = {
  root: {
    width: 1000
  }
};

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

{
  /*New Scrollable stuff*/
}

class App extends Component {
  state = {
    useCanvas: false,
    /*data: generateData(),*/
    modeIndex: 3,
    data: updateData(),
    littleData: updateLittleData(),
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  scrollTo() {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { useCanvas } = this.state;
    const Line = useCanvas ? LineSeriesCanvas : LineSeries;
    const BarSeries = useCanvas
      ? HorizontalBarSeriesCanvas
      : HorizontalBarSeries;
    const { modeIndex, data } = this.state;
    const AVERAGE_NGRAMS = [
      { x: 1, y: 77.78, size: 3 },
      { x: 2, y: 83.52, size: 3 },
      { x: 3, y: 76.48, size: 3 },
      { x: 4, y: 60.93, size: 3 }
    ];
    const myTestData = [
      { x: 1, y: 10, size: 30 },
      { x: 1.7, y: 12, size: 10 },
      { x: 2, y: 5, size: 1 },
      { x: 3, y: 15, size: 12 },
      { x: 2.5, y: 7, size: 4 }
    ];

    return (
      <div className="App">
        <header className="App-header" id="home">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Marco Ross</h1>
        </header>
        <div id="body">
          <div id="thesis">
            <p className="App-intro" id="thesis">
              Marco Ross' <code>undergraduate thesis</code> 2018
            </p>
            {/*Added the nav bar here*/}

            <h4>Overall Classification Accuracy</h4>
            <p className="graph-explanations">
              Controlling for both
              <strong>
                <span style={{ color: "#12939A" }}> n-gram size </span>
              </strong>
              and the
              <strong>
                <span style={{ color: "#FF9833" }}>
                  &nbsp;number of most frequently found n-grams
                </span>
              </strong>
              , this graph depicts the varrying degrees of accuracy resulting
              from different combinations of these two variables
            </p>
            <div className="graphs">
              <XYPlot width={400} height={400}>
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
            </div>
            <div className="legends">
              <DiscreteColorLegend
                orientation="horizontal"
                width={300}
                items={NGRAMS}
              />
            </div>
            <br />
            <h4>
              Average <span style={{ color: "#12939A" }}>n-gram</span> Accuracy
            </h4>
            <p className="graph-explanations">
              Average accuracy of manipulating{" "}
              <span style={{ color: "#FF9833" }}>
                <code>n-gram size</code>
              </span>
              , without controlling for total number of n-grams
            </p>
            <div className="graphs">
              <XYPlot width={400} height={400} xType="ordinal" xDistance={100}>
                <HorizontalGridLines />
                <VerticalGridLines />
                {/*Edit this for bar graph*/}
                <VerticalBarSeries data={[{ x: "n-grams", y: 77.78 }]} />
                <VerticalBarSeries data={[{ x: "n-grams", y: 83.52 }]} />
                <VerticalBarSeries data={[{ x: "n-grams", y: 76.48 }]} />
                <VerticalBarSeries data={[{ x: "n-grams", y: 60.93 }]} />
                <XAxis position="start" />
                <YAxis title="accuracy %" />
              </XYPlot>
              {/* Put the y axis down here because React produces components based on when they're called
              and therefore, if Y is called before the lines, the axis title is covered by the lines */}
            </div>
            <div className="legends">
              <DiscreteColorLegend
                orientation="horizontal"
                width={300}
                items={NGRAMS}
              />
            </div>
            <br />
            <h4>
              Average <span style={{ color: "#12939A" }}>n-gram frequency</span>{" "}
              Accuracy
            </h4>
            <p className="graph-explanations">
              Average accuracy of manipulating{" "}
              <span style={{ color: "#FF9833" }}>
                <code>number of n-grams</code>
              </span>
              , without controlling for n-gram size
            </p>
            <div className="graphs">
              <XYPlot width={400} height={400} xType="ordinal" xDistance={100}>
                <HorizontalGridLines />
                <VerticalGridLines />
                {/*Edit this for bar graph*/}
                <VerticalBarSeries
                  data={[{ x: "number of n-grams", y: 63.33 }]}
                />
                <VerticalBarSeries
                  data={[{ x: "number of n-grams", y: 66.39 }]}
                />
                <VerticalBarSeries
                  data={[{ x: "number of n-grams", y: 73.33 }]}
                />
                <VerticalBarSeries
                  data={[{ x: "number of n-grams", y: 81.67 }]}
                />
                <VerticalBarSeries
                  data={[{ x: "number of n-grams", y: 81.94 }]}
                />
                <VerticalBarSeries
                  data={[{ x: "number of n-grams", y: 81.39 }]}
                />
                <XAxis position="start" />
                <YAxis title="accuracy %" />
              </XYPlot>
              {/* Put the y axis down here because React produces components based on when they're called
              and therefore, if Y is called before the lines, the axis title is covered by the lines */}
            </div>
            <div className="legends">
              <DiscreteColorLegend
                orientation="horizontal"
                width={300}
                items={NGRAM_SIZE}
              />
            </div>
            <p className="graph-explanations">
              Accuracy of <code>bigrams</code>
            </p>
            <XYPlot width={300} height={300}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="test2" position="start" />
              <YAxis title="test" />
              <MarkSeries
                color="#FF9833"
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.8"
                sizeRange={[5, 15]}
                animation={MODE[modeIndex]}
                data={AVERAGE_NGRAMS}
              />
              <MarkSeries
                color="#12939A"
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.8"
                sizeRange={[5, 15]}
                animation={MODE[modeIndex]}
                data={myTestData}
              />
            </XYPlot>
            <XYPlot width={300} height={300}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <MarkSeries animation={MODE[modeIndex]} data={data} />
            </XYPlot>
            <p className="graph-explanations">
              Research <code>source</code> distribution
            </p>
            <XYPlot
              xDomain={[-5, 5]}
              yDomain={[-5, 5]}
              width={300}
              height={300}
            >
              <XAxis />
              <YAxis />
              <ArcSeries
                animation
                radiusDomain={[0, 4]}
                data={this.state.data.map(row => {
                  if (
                    this.state.value &&
                    this.state.value.color === row.color
                  ) {
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
          <div className="workexperience" id="timeline">
            <h4 id="work-experience">Work Experience</h4>
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="May 2017 – Aug 2017"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<ion-icon class="icons" name="briefcase" />}
              >
                <h3 className="vertical-timeline-element-title">
                  Technical Systems Analyst (Co-op)
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Toronto, ON
                </h4>
                <br />
                <img
                  alt="rbc"
                  src="rbc.png"
                  style={{ width: 85, height: 110 }}
                />
                <p>
                  <ul>
                    <li>
                      Responsible for the utilities development, installation
                      and support for Transaction Processing and Database
                      Management software on multiple platforms (z/OS, UNIX,
                      Windows)
                    </li>
                    <li>
                      Created a client/server application in C which sends and
                      receives messages between two separate multi-threaded
                      programs. This application interacted with existing
                      message-oriented middleware through a private API
                    </li>
                    <li>
                      Developed an employee facing web application for
                      automating small tasks within the department. This
                      application was built using the ASP.NET framework
                      alongside Bootstrap
                    </li>
                  </ul>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2010 - 2011"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<ion-icon class="icons" name="briefcase" />}
              >
                <h3 className="vertical-timeline-element-title">
                  Art Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, SEO,
                  Online Marketing
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2008 - 2010"
                iconStyle={{ background: "rgb(255, 0, 0)", color: "#fff" }}
                icon={<ion-icon class="icons" name="school" />}
              >
                <h3 className="vertical-timeline-element-title">
                  Web Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Los Angeles, CA
                </h4>
                <p>User Experience, Visual Design</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
          <div id="education" />
        </div>
        <BottomNavigation
          style={{
            justifyContent: "center",
            alignContent: "center",
            bottom: 0,
            height: 56,
            margin: 0,
            position: "sticky",
            flex: 1,
            borderTop: "solid",
            borderTopStyle: "solid",
            borderTopColor: "#808080"
          }}
          showLabels
          value={value}
          onChange={this.handleChange}
          className={(classes.root, BottomNavigation)}
        >
          {/*RESUME HERE*/}
          <BottomNavigationAction label="Home" href="#home" icon={<Home />} />
          <BottomNavigationAction
            label="About Me"
            href="#text-buttons"
            icon={<Face />}
          />
          <BottomNavigationAction
            label="Thesis"
            href="#thesis"
            icon={<Code />}
          />
          <BottomNavigationAction
            label="Experience"
            href="#work-experience"
            icon={<Work />}
          />
          <BottomNavigationAction label="Education" icon={<School />} />
          <BottomNavigationAction
            label="Languages"
            href="#thesis"
            icon={<Language />}
          />
          <BottomNavigationAction label="Hobbies" icon={<Games />} />
        </BottomNavigation>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
