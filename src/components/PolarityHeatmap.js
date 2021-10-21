import React from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import LinearProgress from '@mui/material/LinearProgress'
import { Chip } from '@nivo/tooltip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useFetch } from '../hooks/useFetch'

export function PolarityHeatmap() {
    const [factions, isLoadingFactions] = useFetch('/factions')
    const [data, isLoadingData] = useFetch('/polarity_heatmap')

    if (isLoadingData || isLoadingFactions) {
        return <div style={{ margin: 20 }}>
            <LinearProgress />
        </div>
    } else {
        const keys = data.map(e => e.id)
        const colors = data.map((item) => keys.map((key) => item[`${key}Color`])).flat()

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
                    data={data}
                    keys={keys}
                    margin={{ top: 60, right: 1, bottom: 1, left: 1 }}
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
                        if (xKey !== yKey)
                            return <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip color={factions.find(x => x.name === xKey).color} />
                                <Typography>{xKey}</Typography>
                                <Typography>zu</Typography>
                                <Chip color={factions.find(x => x.name === yKey).color} />
                                <Typography>{yKey}</Typography>
                                <Chip color={color} />
                                <Typography>{value.toFixed(6)}</Typography>
                            </Stack>
                        else
                            return '-'
                    }}
                    colors={scale}
                />
            </div>
        </>
    }
}
