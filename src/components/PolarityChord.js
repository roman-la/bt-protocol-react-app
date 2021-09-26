import React from 'react';
import { ResponsiveChord } from '@nivo/chord'

class PolarityChord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            factions: [],
            matrix: {}
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://' + window.location.hostname + ':8003/factions'),
            fetch('http://' + window.location.hostname + ':8003/polarity_chord')
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => this.setState({
                factions: data1,
                matrix: data2
            }))
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
            return <div style={{ height: '40em' }}>
                <ResponsiveChord
                    matrix={this.state.matrix}
                    keys={this.state.factions.map((f) => f.name)}
                    margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                    valueFormat=".6f"
                    padAngle={0.02}
                    innerRadiusRatio={0.96}
                    innerRadiusOffset={0.02}
                    arcOpacity={1}
                    arcBorderWidth={1}
                    arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
                    ribbonOpacity={0.5}
                    ribbonBorderWidth={1}
                    ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
                    enableLabel={true}
                    label="id"
                    labelOffset={12}
                    labelRotation={0}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
                    colors={this.state.factions.map((f) => f.color)}
                    isInteractive={true}
                    arcHoverOpacity={1}
                    arcHoverOthersOpacity={0.25}
                    ribbonHoverOpacity={0.75}
                    ribbonHoverOthersOpacity={0.25}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={7}
                    layers={['ribbons', 'arcs', 'labels', 'legends']}
                />
            </div>
        }
    }
}

export default PolarityChord;
