import { ResponsiveBar } from '@nivo/bar'
import LinearProgress from '@mui/material/LinearProgress'
import { useFetch } from '../hooks/useFetch'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export function PolarityBar() {
    const [selected, setSelected] = React.useState({ mdb_id: "11004097", name: "Lindner, Christian", faction: "FDP" })
    const [data, isLoadingData] = useFetch('/polarity_bar?id=' + selected.mdb_id)
    const [mdbData, isLoadingMdbData] = useFetch('/mdbs')

    if (isLoadingData || isLoadingMdbData) {
        return <div style={{ margin: 20 }}>
            <LinearProgress />
        </div>
    } else {
        return <>
            <Autocomplete
                options={mdbData}
                getOptionLabel={option => `${option.name} (${option.faction})`}
                value={selected}
                onChange={(event, value) => setSelected(value)}
                renderInput={(params) => <TextField {...params} label="Mdb" />}
                disableClearable
                isOptionEqualToValue={(option, value) => option.mdb_id === value.mdb_id}
                sx={{ width: 400, marginTop: 2 }}
            />
            <div style={{ height: '12em' }}>
                <ResponsiveBar
                    data={data.slice(0, 5).reverse()}
                    keys={['polarity']}
                    layout="horizontal"
                    margin={{ top: 20, right: 200, bottom: 20, left: 200 }}
                    colors={{ 'scheme': 'greens' }}
                    colorBy={'indexValue'}
                    enableLabel={false}
                    enableGridY={false}
                    tooltip={(e) => (
                        <Paper>
                            <Typography sx={{ margin: '10px 10px 10px 10px' }}>Durchschnittliche Polarität von {e.indexValue} {e.formattedValue}</Typography>
                        </Paper>
                    )} />
            </div >
            <div style={{ height: '12em' }}>
                <ResponsiveBar
                    data={data.slice(5).reverse()}
                    keys={['polarity']}
                    layout="horizontal"
                    margin={{ top: 20, right: 200, bottom: 20, left: 200 }}
                    colors={{ 'scheme': 'reds' }}
                    colorBy={'indexValue'}
                    reverse={true}
                    enableLabel={false}
                    enableGridY={false}
                    tooltip={(e) => (
                        <Paper>
                            <Typography sx={{ margin: '10px 10px 10px 10px' }}>Durchschnittliche Polarität von {e.indexValue} {e.formattedValue}</Typography>
                        </Paper>
                    )} />
            </div >
        </>
    }
}
