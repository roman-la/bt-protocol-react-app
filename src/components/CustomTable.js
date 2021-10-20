import React from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@mui/material/TablePagination';
import { Container } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';

export function CustomTable(props) {
    const DefaultFilter = ({ column: { filterValue, setFilter } }) => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <>
                <IconButton onClick={handleClick}>
                    <SearchIcon sx={{ fontSize: 15 }} />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <TextField
                        value={filterValue || ''}
                        onChange={e => {
                            setFilter(e.target.value || undefined)
                        }}
                        label={'Suchen'}
                        variant="filled"
                    />
                </Popover>
            </>
        )
    }

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
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useSortBy,
        usePagination
    )

    return (
        <>
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell key={column.id}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={10}>
                                            <div {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</div>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {column.canSort
                                                ? column.isSorted
                                                    ? column.isSortedDesc
                                                        ? '▼'
                                                        : '▲'
                                                    : ''
                                                : null}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
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
