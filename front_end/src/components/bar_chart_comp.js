import React, {Component} from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

//var myStyle = styler([{ key: "num_in_hour", color: "#2196f3", selected: "#2CB1CF" }]);
class BarChartComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          series: props.series,
		  yaxis : props.yaxis,
		  color : props.color,
		  scrollable : props.scrollable,
          timerange: props.series.range()
         };

		 this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this)
    }

	handleTimeRangeChange(timerange) {
	  this.setState({timerange})
	};

    render() {
		var style = styler([{ key: "num_in_hour", color: this.props.color, selected: this.props.color }]);

        if(!this.props.series) return null;
        //var that = this;
        const range = this.state.timerange;

        // //console.log('this.props.series')
        // //console.log(this.props.series)
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
                            enablePanZoom={this.props.scrollable}
                            onTimeRangeChanged={this.handleTimeRangeChange}
                            >
                                <ChartRow height="200">
                                    <YAxis
                                        id="messages"
                                        label= {this.props.yaxis}
                                        min={0}
                                        max={this.props.series.crop(range).max("num_in_hour")}
                                        format="d"
                                        width="60"
                                        type="linear"
                                    />
                                    <Charts>
                                        <BarChart
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

export default BarChartComp;
