import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

class PolarityHeatmap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        Promise.all([fetch('http://infosys3.f4.htw-berlin.de:8003/polarity_heatmap')])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                var mappedData = []

                data.forEach((element) => {
                    Object.keys(element).forEach((key) => {
                        if (key === 'id') return;

                        if (element[key] > 0) {
                            var hue = 125;
                            var lightness = 50 * (2 - element[key]);
                        } else if (element[key] < 0) {
                            var hue = 0;
                            var lightness = (50 * (2 - Math.abs(element[key])));
                        } else {
                            var hue = 0;
                            var lightness = 100;
                        }

                        element[key + 'Color'] = `hsl(${hue}, 50%, ${lightness}%)`
                    })

                    mappedData.push(element)
                })

                this.setState({
                    data: mappedData
                })
            })
            .then(() => {
                this.setState({
                    isLoaded: true
                })
            })
    }

    render() {
        if (!this.state.isLoaded) {
            return <div style={{ margin: 20 }}>
                <LinearProgress />
            </div>
        } else {
            const keys = this.state.data.map(e => e.id)

            const colors = this.state.data.map((item) => keys.map((key) => item[`${key}Color`])).flat()

            // See https://github.com/plouc/nivo/issues/1381
            function scale() { }
            scale.domain = () => {
                const _colors = colors.slice(0)
                return () => {
                    return _colors.shift()
                }
            }

            return <>
                <div style={{ height: '30em' }}>
                    <ResponsiveHeatMap
                        data={this.state.data}
                        keys={keys}
                        margin={{ top: 60, right: 0, bottom: 0, left: 0 }}
                        forceSquare={true}
                        cellOpacity={1}
                        animate={true}
                        motionConfig="slow"
                        motionStiffness={80}
                        motionDamping={9}
                        hoverTarget="cell"
                        cellHoverOthersOpacity={0.5}
                        enableLabels={true}
                        label={(datum, key) => parseFloat(datum[key]).toFixed(3)}
                        axisTop={{ orient: 'top', tickRotation: -20 }}
                        padding={2}
                        labelTextColor={'black'}
                        tooltip={({ xKey, yKey, value, color }) => {
                            if (xKey != yKey)
                                return <Typography>{xKey} zu {yKey} {value.toFixed(6)}</Typography>
                            return '-'
                        }}
                        colors={scale}
                    />
                </div>
            </>
        }
    }
}

export default PolarityHeatmap