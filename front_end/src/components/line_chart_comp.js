import React, {Component} from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

var style = null;

class LineChartComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          series: props.series,
          timerange: props.series.range(),
		  color: props.color
         };
		 style = styler([{ key: "num_in_hour", color: this.state.color, selected: this.state.color }])
    }


    render() {
        console.log('rendering LineChartComp')
        // console.log(this.props.series)
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
                        <Resizable>
                            <ChartContainer
                            maxTime={this.props.series.end()}
                            minTime={this.props.series.begin()}
                            timeRange={range}
                            enablePanZoom={true}
                            onTimeRangeChanged={handleTimeRangeChange}
                            >
                                <ChartRow height="200">
                                    <YAxis
                                        id="messages"
                                        label="Messages"
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
                                            columns={["num_in_hour"]}
                                            series={this.props.series}
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

export default LineChartComp;
