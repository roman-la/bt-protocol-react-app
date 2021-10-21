import React from 'react'
import { useTable, useSortBy, usePagination, useFilters } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Container from '@material-ui/core/Container'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TableSortLabel from '@mui/material/TableSortLabel'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export function CustomTable(props) {
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            ...props,
            defaultColumn: { Filter: DefaultFilter },
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useFilters,
        useSortBy,
        usePagination
    )

    return (
        <>
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup =>
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell key={column.id}>
                                    <Grid container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <Grid item xs={10}>
                                            <div {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</div>
                                        </Grid>
                                        <Grid item xs>
                                            <Grid container
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                                spacing={1}>
                                                <Grid item xs={column.canSort ? 6 : 0}>
                                                    <TableSortLabel
                                                        hideSortIcon={column.canSort}
                                                        active={column.isSorted}
                                                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                        IconComponent={KeyboardArrowDownIcon} />
                                                </Grid>
                                                <Grid item xs={column.canFilter ? 6 : 0}>
                                                    {column.canFilter ? column.render('Filter') : null}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell =>
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
            <TablePagination
                component={Container}
                count={rows.length}
                page={pageIndex}
                onPageChange={(event, page) => gotoPage(page)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={event => setPageSize(Number(event.target.value))}
            />
        </>
    )
}

const DefaultFilter = ({ column: { filterValue, setFilter } }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <IconButton onClick={handleClick}>
                {filterValue
                    ? <FilterAltIcon sx={{ fontSize: 15, color: 'royalblue' }} />
                    : <FilterAltIcon sx={{ fontSize: 15, color: 'gray' }} />}
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <TextField
                    value={filterValue || ''}
                    onChange={e => setFilter(e.target.value || undefined)}
                    label={'Suchen'}
                    variant="filled"
                />
            </Popover>
        </>
    )
}
