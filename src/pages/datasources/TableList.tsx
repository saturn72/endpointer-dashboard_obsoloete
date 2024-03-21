// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { DatasourceType, DatasourceUserRole } from 'src/domain/datasource'
import { AlphaXCircleOutline, CheckCircleOutline, ContentCopy, Pencil, ShareVariantOutline } from 'mdi-material-ui'
import { Button, ButtonGroup, Divider } from '@mui/material'

const createData = (
  active: boolean,
  alias: string,
  comment: string,
  createdOnUtc: Date,
  name: string,
  role: DatasourceUserRole,
  type: DatasourceType,
  version: string
) => {
  return {
    active,
    alias,
    comment,
    createdOnUtc,
    name,
    role,
    type,
    version,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

const Row = (props: { row: ReturnType<typeof createData> }) => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>{row.name}</TableCell>
        <TableCell align='right'>{row.alias}</TableCell>
        <TableCell align='right'>{row.role}</TableCell>
        <TableCell align='right'>{row.type}</TableCell>
        <TableCell align='right'>{row.version}</TableCell>
        <TableCell align='right'>{
          row.active ?
            <CheckCircleOutline /> :
            <AlphaXCircleOutline />
        }</TableCell>
        <TableCell align='right'>
          <ButtonGroup>
            <Button variant="outlined" startIcon={<Pencil />}>Edit</Button>
            <Button variant="outlined" startIcon={<ShareVariantOutline />}>Share</Button>
            <Button variant="outlined" startIcon={<ContentCopy />}>Clone</Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      {/* <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell> */}
                      <TableCell align='right'>{row.createdOnUtc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment >
  )
}

const rows = [
  createData(true, 'ds-alias-1', 'comment-1', new Date(), 'ds-1', 'admin', 'csv', '1.0.0'),
  createData(true, 'ds-alias-1', 'comment-1', new Date(), 'ds-2', 'maintainer', 'json', '1.2.0'),
  createData(false, 'ds-alias-1', 'comment-1', new Date(), 'ds-3', 'reviewer', 'nosql', '1.1.0'),
  createData(true, 'ds-alias-1', 'comment-1', new Date(), 'ds-4', 'admin', 'sql', '1.0.1'),
  createData(false, 'ds-alias-1', 'comment-1', new Date(), 'ds-5', 'reviewer', 'xlsx', '1.1.3'),
  createData(false, 'ds-alias-1', 'comment-1', new Date(), 'ds-6', 'maintainer', 'xml', '1.2.1'),
]

const TableList = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align='right'>Alias</TableCell>
            <TableCell align='right'>Role</TableCell>
            <TableCell align='right'>Type</TableCell>
            <TableCell align='right'>Version</TableCell>
            <TableCell align='right'>Active</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableList
