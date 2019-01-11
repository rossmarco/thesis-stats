import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Marco from "./images/marco2.jpg";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Home, Code, Language, School, Work, Face } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import "../node_modules/react-vis/dist/style.css";
import { curveCatmullRom } from "d3-shape";
import { EXTENDED_DISCRETE_COLOR_RANGE as COLORS } from "./components/theme";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  DiscreteColorLegend,
  LineMarkSeries,
  VerticalBarSeries,
  CircularGridLines,
  RadialChart,
  RadarChart
} from "react-vis";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import firebase from "firebase";

{
  /* 
CONSTANTS
*/
}
const PI = Math.PI;
const NGRAMS = ["Unigrams", "Bigrams", "Trigrams", "Quadgrams"];
const NGRAM_SIZE = ["25", "50", "100", "200", "400", "800"];
const styles = {
  root: {
    width: "100%"
    /**used to be 1000 */
  }
};
const RESEARCH_DIST_DATA = [
  {
    angle: 1,
    subLabel: "AMA",
    id: 1,
    radius: 10
  },
  {
    angle: 4,
    subLabel: "Scholars Portal",
    id: 2,
    radius: 35
  },
  {
    angle: 3,
    label: "OLWW",
    id: 3,
    radius: 5
  },
  {
    angle: 4,
    label: "HighWire Press",
    id: 4,
    radius: 17
  },
  {
    angle: 3,
    subLabel: "Other",
    id: 5,
    radius: 18
  },
  {
    angle: 5,
    subLabel: "ProQuest",
    id: 5,
    radius: 12
  }
];
const RADAR_PROPS = [
  {
    diabetes: 704068,
    CVD: 612992,
    cancer: 489643
  }
];
const DOMAIN = [
  { name: "diabetes", domain: [0, 710000], tickFormat: t => t },
  { name: "CVD", domain: [0, 710000] },
  { name: "cancer", domain: [0, 1000000] }
];

{
  /* 
  FUNCTIONS
*/
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
function mapData(hoveredSection) {
  return RESEARCH_DIST_DATA.map((row, index) => {
    return {
      ...row,
      innerRadius: hoveredSection === index + 1 ? row.radius - 1 : null,
      opacity: !hoveredSection || hoveredSection === index + 1 ? 1 : 0.6
    };
  });
}

class App extends Component {
  state = {
    modeIndex: 3,
    data: updateData(),
    littleData: updateLittleData(),
    value: false,
    hoveredSection: false
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  constructor() {
    super();
    this.state = { index: null };
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });
    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });
  }

  scrollTo() {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }
  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart"
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo("scroll-container-second-element", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container"
      })
    );
  }

  render() {
    const { hoveredSection } = this.state;
    const { value } = this.state;

    return (
      <div className="App" id="home">
        <header className="App-header">
          <div className="headline">
            <h1>MARCO ROSS</h1>
            <h5>Computer Science New Grad</h5>
            <p className="headline-icons">
              <span>
                <IconButton href="https://www.linkedin.com/in/marco-ross/">
                  <ion-icon name="logo-linkedin" id="home-icons" />
                </IconButton>
                <IconButton href="https://github.com/rossmarco" id="home-icons">
                  <ion-icon name="logo-github" />
                </IconButton>
                <IconButton href="mailto:rossnmarco@gmail.com">
                  <ion-icon name="mail" id="home-icons" />
                </IconButton>
              </span>
            </p>
          </div>
        </header>
        <div id="body">
          <div className="screenblock">
            <div id="about-me" name="about-me">
              <br />
              <br />
              <h1>About Me</h1>
              <p className="descriptions">
                <span style={{ color: "#1A3177" }}>
                  A small introduction about myself
                </span>
              </p>
              <h2 className="about-me-subheaders">Marco Ross</h2>
              <h3 className="about-me-subheaders">
                Software Developer from Toronto, Canada
              </h3>
              <div className="row">
                <div className="columns">
                  <p>
                    <span>
                      I'm a new computer science grad from the Greater Toronto
                      Area. I have just under one year of work experience at RBC
                      Royal Bank designing enterprise web applications as well
                      as research experience through Sheridan College.
                    </span>
                    <br />
                    <br />
                    <span>
                      Adept at designing and developing full stack web and
                      mobile applications, with a special focus on Python, Java,
                      ASP.NET, and ReactJS.
                    </span>
                    <br />
                    <br />
                    <span>
                      I have a particular passion for machine learning research,
                      with a specific focus on natural language processing
                      within the healthcare domain.
                      <br />
                      <br />I have completed and published my undergraduate
                      thesis in the domain of natural language processing. My
                      research involved using NLP to classify medical texts
                      which are specifically related to food and health. I was
                      able to achieve a&nbsp;
                      <span style={{ color: "#1A3177" }}>
                        <b>90.00%</b>
                      </span>
                      &nbsp;accuracy using bigrams to classify texts through the
                      Python Natural Language Toolkit (NLTK), utilizing a corpus
                      of over&nbsp;
                      <span style={{ color: "#1A3177" }}>1.8 million</span>
                      &nbsp;words for training. More information on my thesis
                      can be found on my&nbsp;
                      <a
                        href="https://github.com/rossmarco/thesis"
                        target={"_blank"}
                        style={{ color: "#1A3177" }}
                      >
                        GitHub
                      </a>
                      &nbsp; and by reading my paper published&nbsp;
                      <a
                        href="http://thesai.org/Downloads/Volume9No11/Paper_1-Exploring_Identifiers_of_Research_Articles.pdf"
                        target={"_blank"}
                        style={{ color: "#1A3177" }}
                      >
                        here.
                      </a>
                    </span>
                    <br />
                    <br />
                    <span>
                      If you're interested in contacting me about career
                      opportunities, you can&nbsp;
                      <a
                        href="https://drive.google.com/file/d/1UUDuL6BVg6tEQjBxvyi--weKYHRofeU8/view?usp=sharing"
                        target={"_blank"}
                        style={{ color: "#1A3177" }}
                      >
                        <strong>download</strong>
                      </a>
                      &nbsp;my resume here.
                    </span>
                  </p>
                </div>
                <img id="profile-pic" src={Marco} alt="marco" />
              </div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          <div className="screenblock">
            <div id="work-experience">
              <br />
              <br />
              <h1>Work Experience & Education</h1>
              <p>
                <span>Previous jobs and qualifications</span>
              </p>
              <VerticalTimeline>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="May 2018 – Aug 2018"
                  iconStyle={{ background: "#12939A", color: "#fff" }}
                  icon={<ion-icon class="icons" name="briefcase" />}
                >
                  <div id="work-experience-details">
                    <h3 className="vertical-timeline-element-title">
                      Junior Research Assistant
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                      Sheridan College
                    </h4>
                    <h5>Oakville, ON</h5>
                    <p>
                      <span>
                        Python/React/HTML5/CSS
                        <br />
                        Python NLTK | NPM | GitHub
                      </span>
                    </p>
                  </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="May 2017 – Aug 2017"
                  iconStyle={{ background: "#12939A", color: "#fff" }}
                  icon={<ion-icon class="icons" name="briefcase" />}
                >
                  <div id="work-experience-details">
                    <h3 className="vertical-timeline-element-title">
                      Technical Systems Analyst (Co-op)
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                      RBC Royal Bank
                    </h4>
                    <h5>Toronto, ON</h5>

                    <p>
                      <span>
                        ASP.NET/Java/C Development
                        <br />
                        z/OS | UNIX | Windows | EJB's
                      </span>
                      <br />
                    </p>
                  </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="Jan 2017 - Apr 2017"
                  iconStyle={{ background: "#12939A", color: "#fff" }}
                  icon={<ion-icon class="icons" name="briefcase" />}
                >
                  <div id="work-experience-details">
                    <h3 className="vertical-timeline-element-title">
                      Quality Assurance Analyst (Co-op)
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                      RBC Royal Bank
                    </h4>
                    <h5>Toronto, ON</h5>
                    <p>
                      <span>
                        ASP.NET/Windows Forms (C#) Development
                        <br />
                        Entity Framework Core | Microsoft SQL | TFS | z/OS
                      </span>
                    </p>
                  </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  id="education"
                  date="2014 - 2018"
                  iconStyle={{ background: "#FF9833", color: "#fff" }}
                  icon={<ion-icon class="icons" name="school" />}
                >
                  <div id="work-experience-details">
                    <h3 className="vertical-timeline-element-title">
                      Bachelor of Computer Science, Mobile Computing
                    </h3>
                    <br />
                    <h4 className="vertical-timeline-element-subtitle">
                      Sheridan College
                    </h4>
                  </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="2009 - 2012"
                  iconStyle={{ background: "#FF9833", color: "#fff" }}
                  icon={<ion-icon class="icons" name="school" />}
                >
                  <div id="work-experience-details">
                    <h3 className="vertical-timeline-element-title">
                      Bachelor of Health Sciences
                    </h3>
                    <br />
                    <h4 className="vertical-timeline-element-subtitle">
                      University of Western Ontario
                    </h4>
                  </div>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
          </div>

          <div className="screenblock">
            <div id="thesis">
              <br />
              <br />
              <h1>Undergraduate Thesis</h1>
              <h3>Overall Classification Accuracy</h3>
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
                <span>
                  , <br />
                  this graph depicts the varying degrees of accuracy resulting
                  from different combinations of these two variables
                </span>
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
                  <YAxis title="classification accuracy %" orientation="left" />
                </XYPlot>
              </div>
              <div className="legends">
                <DiscreteColorLegend
                  orientation="horizontal"
                  width={350}
                  items={NGRAMS}
                />
              </div>
              <br />
              <h3>
                Average <span style={{ color: "#12939A" }}> n-gram </span>
                Accuracy
              </h3>
              <p className="graph-explanations">
                Average accuracy of manipulating
                <span style={{ color: "#FF9833" }}> n-gram size</span>, without
                controlling for total number of n-grams
              </p>
              <div className="graphs">
                <XYPlot
                  width={400}
                  height={400}
                  xType="ordinal"
                  xDistance={100}
                >
                  <HorizontalGridLines />
                  <VerticalGridLines />
                  <VerticalBarSeries data={[{ x: "n-grams", y: 77.78 }]} />
                  <VerticalBarSeries data={[{ x: "n-grams", y: 83.52 }]} />
                  <VerticalBarSeries data={[{ x: "n-grams", y: 76.48 }]} />
                  <VerticalBarSeries data={[{ x: "n-grams", y: 60.93 }]} />
                  <XAxis position="start" />
                  <YAxis title="accuracy %" />
                </XYPlot>
              </div>
              <div className="legends">
                <DiscreteColorLegend
                  orientation="horizontal"
                  width={350}
                  items={NGRAMS}
                />
              </div>
              <br />
              <h3>
                Average
                <span style={{ color: "#12939A" }}> n-gram frequency </span>
                Accuracy
              </h3>
              <p className="graph-explanations">
                Average accuracy of manipulating
                <span style={{ color: "#FF9833" }}> number of n-grams</span>,
                without controlling for n-gram size
              </p>
              <div className="graphs">
                <XYPlot
                  width={400}
                  height={400}
                  xType="ordinal"
                  xDistance={100}
                >
                  <HorizontalGridLines />
                  <VerticalGridLines />
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
              </div>
              <div className="legends">
                <DiscreteColorLegend
                  orientation="horizontal"
                  width={350}
                  items={NGRAM_SIZE}
                />
              </div>
              <h3>Training/Test Data Sources</h3>
              <p>
                The medical journal distribution of the 300 research articles
                used in this research
              </p>
              <div className="graphs">
                <RadialChart
                  animation
                  showLabels
                  radiusDomain={[0, 20]}
                  data={mapData(hoveredSection)}
                  labelsAboveChildren
                  width={600}
                  height={300}
                >
                  <CircularGridLines tickTotal={20} rRange={[0, 150]} />
                </RadialChart>
              </div>

              <h3>Training Word Corpus Distribution</h3>
              <p className="graph-explanations">
                Breaking down the corpus of words used for training the
                classification algorithm. <br /> Number of words used for each
                disease type <br /> Diabetes:&nbsp;
                <span style={{ color: "#12939A" }}>704,068</span>, CVD:&nbsp;
                <span style={{ color: "#FF9833" }}>612,992</span>, Cancer:&nbsp;
                <span style={{ color: "#79C7E3" }}>489,643</span>
                <br />
                <strong>Total:&nbsp;</strong>
                <span style={{ color: "#EF5D28" }}>1,806,703</span>
                &nbsp;words
              </p>
              <div className="graphs">
                <RadarChart
                  animation
                  data={RADAR_PROPS}
                  domains={DOMAIN}
                  style={{
                    polygons: {
                      fillOpacity: 0,
                      strokeWidth: 3
                    },
                    axes: {
                      text: {
                        opacity: 1
                      }
                    },
                    labels: {
                      textAnchor: "middle"
                    }
                  }}
                  margin={{
                    left: 50,
                    top: 50,
                    bottom: 50,
                    right: 50
                  }}
                  tickFormat={t => ""}
                  width={400}
                  height={300}
                >
                  <CircularGridLines
                    tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}
                  />
                </RadarChart>
              </div>

              <br />
              <br />
            </div>
          </div>
          <div className="screenblock">
            <div id="languages">
              <br />
              <br />
              <h1 className="subtitles">Languages</h1>
              <p>
                <span>I speak and understand</span>
              </p>
              <br />
              <div className="languages-table">
                <div className="languages-row">
                  <div className="languages-subtitle">
                    <span className="languages-title">English</span>
                    <br />
                    <span className="languages-proficiency">Native</span>
                  </div>
                  <div className="dots-progress">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                  </div>
                </div>
                <div className="languages-row">
                  <div className="languages-subtitle">
                    <span className="languages-title">العربية</span>
                    <br />
                    <span className="languages-proficiency">Native</span>
                  </div>
                  <div className="dots-progress">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                  </div>
                </div>
                <div className="languages-row">
                  <div className="languages-subtitle">
                    <span className="languages-title">Español</span>
                    <br />
                    <span className="languages-proficiency">
                      Limited working proficiency
                    </span>
                  </div>
                  <div className="dots-progress">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot-empty" />
                    <div className="dot-empty" />
                    <div className="dot-empty" />
                    <div className="dot-empty" />
                    <div className="dot-empty" />
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>

          <BottomNavigation
            id="bot-nav"
            value={value}
            onChange={this.handleChange}
            showLabels
            /*className={classes.root}*/
          >
            <BottomNavigationAction
              label="Home" //href="#home"
              showLabel={true}
              href="#home"
              icon={<Home />}
            />
            <BottomNavigationAction
              label="About Me"
              showLabel={true}
              href="#about-me"
              icon={<Face />}
            />
            <BottomNavigationAction
              label="Experience"
              showLabel={true}
              href="#work-experience"
              icon={<Work />}
            />
            <BottomNavigationAction
              label="Education"
              href="#education"
              icon={<School />}
            />

            <BottomNavigationAction
              label="Thesis"
              href="#thesis"
              icon={<Code />}
            />

            <BottomNavigationAction
              label="Languages"
              href="#languages"
              icon={<Language />}
            />
          </BottomNavigation>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
