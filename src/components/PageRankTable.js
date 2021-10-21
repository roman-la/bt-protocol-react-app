import React from 'react';
import { useFetch } from '../hooks/useFetch'
import { CustomTable } from './CustomTable.js'
import LinearProgress from '@mui/material/LinearProgress';

export function PageRankTable() {
    const [data, isLoading] = useFetch('/pagerank_table')

    const columns = React.useMemo(
        () => [
            {
                Header: 'MdB',
                accessor: 'name'
            },
            {
                Header: 'Fraktion',
                accessor: 'faction'
            },
            {
                Header: 'PageRank',
                accessor: 'pagerank',
                disableFilters: true,
                sortType: 'basic'
            },
            {
                Header: 'Eigenvektor',
                accessor: 'eigenvector',
                disableFilters: true,
                sortType: 'basic'
            },
            {
                Header: 'Kommentare',
                accessor: 'comments',
                disableFilters: true,
                sortType: 'basic'
            },
        ],
        []
    )
    if (isLoading) {
        return <div style={{ margin: 20 }}>
            <LinearProgress />
        </div>
    } else {
        return (<CustomTable columns={columns} data={data} />)
    }
}
