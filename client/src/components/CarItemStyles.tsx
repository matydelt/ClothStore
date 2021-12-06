import styled from '@mui/material/styles/styled'
import { TableRow, TableCell } from '@mui/material';


export const StyledTableRow = styled(TableRow)({
    width: '77px'
})

export const StyledTableCell = styled(TableCell)({
    backgroundColor: '#ccc',
    color: '#ccc',
    width: '300px'
})


// const StyledTableCell = withStyles((theme: Theme) =>
//   createStyles({
//     head: {
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.common.white,
//       width: '300px'
//     },
//     body: {
//       fontSize: 14,
//     },
//   }),
// )(TableCell);

// =>
// createStyles({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     width: '77px',
//   },
// }),
// )(TableRow);