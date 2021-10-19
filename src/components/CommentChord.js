import React from 'react';
import { ResponsiveChord } from '@nivo/chord'
import { TableTooltip, Chip } from '@nivo/tooltip'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useFetch } from '../hooks/useFetch'

export function CommentChord() {
    const [factions, isLoadingFactions] = useFetch('/factions')
    const [matrix, isLoadingMatrix] = useFetch('/comments_chord')

    if (isLoadingFactions || isLoadingMatrix) {
        return <div style={{ margin: 20 }}>
            <LinearProgress />
        </div>
    } else {
        return <div style={{ height: '28em' }}>
            <ResponsiveChord
                matrix={matrix}
                keys={factions.map((f) => f.name)}
                margin={{ top: 20, right: 0, bottom: 30, left: 0 }}
                valueFormat=".0f"
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
                colors={factions.map((f) => f.color)}
                isInteractive={true}
                arcHoverOpacity={1}
                arcHoverOthersOpacity={0.25}
                ribbonHoverOpacity={0.75}
                ribbonHoverOthersOpacity={0.25}
                animate={true}
                motionStiffness={90}
                motionDamping={7}
                arcTooltip={({ arc }) => (
                    <TableTooltip
                        rows={[
                            [
                                <Typography>Kommentare von</Typography>,
                                <Chip color={arc.color} />,
                                <Typography>{arc.label}</Typography>,
                                <Typography>{arc.formattedValue}</Typography>
                            ]
                        ]}
                    />
                )}
                ribbonTooltip={({ ribbon }) => (
                    <TableTooltip
                        rows={[
                            [
                                <Chip color={ribbon.source.color} />,
                                <Typography>{ribbon.source.id}</Typography>,
                                <Typography>zu</Typography>,
                                <Chip color={ribbon.target.color} />,
                                <Typography>{ribbon.target.id}</Typography>,
                                <Typography>{ribbon.source.value}</Typography>,
                            ],
                            [
                                <Chip color={ribbon.target.color} />,
                                <Typography>{ribbon.target.id}</Typography>,
                                <Typography>zu</Typography>,
                                <Chip color={ribbon.source.color} />,
                                <Typography>{ribbon.source.id}</Typography>,
                                <Typography>{ribbon.target.value}</Typography>,
                            ],
                        ]}
                    />
                )}
            />
        </div>
    }
}
