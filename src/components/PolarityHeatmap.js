import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap'

class PolarityHeatmap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            data: {}
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://infosys3.f4.htw-berlin.de:8003/polarity_heatmap')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                var asd = []
                data.forEach((element) => {
                    Object.keys(element).forEach((key) => {
                        if (key == 'id') return;
                        element[key + 'Color'] = 'hsl(130, 50%, 50%)'
                    })

                    asd.push(element)
                })

                this.setState({
                    data: asd
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
            return <div>Loading...</div>
        } else {
            return <div style={{ height: '33em' }}>
                <ResponsiveHeatMap
                    data={this.state.data}
                    keys={this.state.data.map(e => e.id)}
                    margin={{ top: 80, right: 0, bottom: 10, left: 0 }}
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
                    tooltip={({ xKey, yKey, value, color }) => (
                        <>{xKey} zu {yKey}: {value.toFixed(6)}</>
                    )}
                />
            </div>
        }
    }
}

export default PolarityHeatmap