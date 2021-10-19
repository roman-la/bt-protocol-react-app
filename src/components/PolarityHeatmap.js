import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap'
import LinearProgress from '@mui/material/LinearProgress';
import { Chip } from '@nivo/tooltip'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useFetch } from './APIUtils'

export function PolarityHeatmap() {
    const [factions, isLoadingFactions] = useFetch('/factions')
    const [data, isLoadingData] = useFetch('/polarity_heatmap')

    // TODO: Add to rest api
    var mappedData = []
    data.forEach((element) => {
        Object.keys(element).forEach((key) => {
            if (key === 'id') return;

            var hue = 0;
            var lightness = 100;
            if (element[key] > 0) {
                hue = 125;
                lightness = 50 * (2 - element[key]);
            } else if (element[key] < 0) {
                hue = 0;
                lightness = (50 * (2 - Math.abs(element[key])));
            }

            element[key + 'Color'] = `hsl(${hue}, 50%, ${lightness}%)`
        })
        mappedData.push(element)
    })

    if (isLoadingData || isLoadingFactions || data.length === 0) {
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
                    keys={data.map(e => e.id)}
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
                                <Chip key="chip" color={factions.find(x => x.name === xKey).color} />
                                <Typography>{xKey}</Typography>
                                <Typography>zu</Typography>
                                <Chip key="chip" color={factions.find(x => x.name === yKey).color} />
                                <Typography>{yKey}</Typography>
                                <Chip key="chip" color={color} />
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
