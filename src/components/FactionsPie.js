import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import LinearProgress from '@mui/material/LinearProgress'
import { TableTooltip, Chip } from '@nivo/tooltip'
import Typography from '@mui/material/Typography'
import { useFetch } from '../hooks/useFetch'

export function FactionsPie() {
    const [data, isLoading] = useFetch('/factions')

    if (isLoading) {
        return <div style={{ margin: 20 }}>
            <LinearProgress />
        </div>
    } else {
        return <div style={{ height: '17em' }}>
            <ResponsivePie
                data={data}
                margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
                startAngle={-105}
                endAngle={105}
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
                arcLinkLabel="id"
                id="name"
                value="size"
                tooltip={({ datum: { id, value, color } }) =>
                    <TableTooltip
                        rows={[
                            [
                                <Chip color={color} />,
                                <Typography>{id} {value} Sitze</Typography>
                            ]
                        ]}
                    />
                }
            />
        </div>
    }
}
