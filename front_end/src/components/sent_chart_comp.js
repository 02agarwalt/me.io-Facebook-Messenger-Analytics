import React, {Component} from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler, Legend} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

const style = styler([{ key: "user", color: "#AE72E4", selected: "#AE72E4", width: 2 },
                      { key: "sender", color: "#5FD56E", selected: "#5FD56E", width: 2}]);

const legend = [
            {
                key: "user",
                label: "You",
            },
            {
                key: "sender",
                label: "Your friend",
            }
        ];

class SentChartComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          series: props.series,
          timerange: props.series.user.range(),
		      color: props.color
         };
    }


    render() {
        console.log('rendering SentChartComp')
        if (!this.props.series) return null;
        var that = this;
        const range = this.state.timerange;
        function handleTimeRangeChange(timerange) {
          that.setState({timerange})
        };
        return (
            <div>
                <p/>
                <div className="row">
                    <div className="col-md-12">
                      <center>
                      <Legend
                          type="line"
                          style={style}
                          categories={legend}
                          align="right"
                      />
                      </center>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
                            maxTime={this.props.series.user.end()}
                            minTime={this.props.series.user.begin()}
                            timeRange={range}
                            enablePanZoom={true}
                            onTimeRangeChanged={handleTimeRangeChange}
                            >
                                <ChartRow height="200">
                                    <YAxis
                                        id="messages"
                                        label="Sentiment"
                                        min={-1}
                                        max={1}
                                        format=".2f"
                                        width="60"
                                        type="linear"
                                    />
                                    <Charts>
                                        <LineChart
                                            axis="messages"
                                            style={style}
                                            spacing={1}
                                            columns={["user"]}
                                            series={this.props.series.user}
                                        />
                                        <LineChart
                                            axis="messages"
                                            style={style}
                                            spacing={1}
                                            columns={["sender"]}
                                            series={this.props.series.sender}
                                        />
                                    </Charts>
									<vr/>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
            </div>
        );
    }
}

export default SentChartComp;
