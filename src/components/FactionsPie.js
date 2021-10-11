import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import LinearProgress from '@mui/material/LinearProgress';
import { TableTooltip, Chip } from '@nivo/tooltip'
import Typography from '@mui/material/Typography';

class FactionsPie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            factions: [],
            data: []
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://infosys3.f4.htw-berlin.de:8003/factions')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => this.setState({
                factions: data
            }))
            .then(() => {
                var data = []

                this.state.factions.forEach((faction, i) => {
                    data.push({
                        'id': faction.name,
                        'label': faction.name,
                        'value': faction.size,
                        'color': faction.color
                    })
                })

                this.setState({
                    isLoaded: true,
                    data: data.reverse()
                })
            })
    }

    render() {
        if (!this.state.isLoaded) {
            return <div style={{ margin: 20 }}>
                <LinearProgress />
            </div>
        } else {
            return <div style={{ height: '17em' }}>
                <ResponsivePie
                    data={this.state.data}
                    margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
                    startAngle={105}
                    endAngle={-105}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ datum: 'data.color' }}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor="white"
                    tooltip={({ datum: { id, value, color } }) => (
                        <TableTooltip
                            rows={[
                                [
                                    <Chip key="chip" color={color} />,
                                    <Typography>{id} {value} Sitze</Typography>
                                ]
                            ]}
                        />
                    )}
                />
            </div>
        }
    }
}

export default FactionsPie;
