// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import TableList from './TableList'
import { Button, ButtonGroup, Stack } from '@mui/material'
import { PlusOutline } from 'mdi-material-ui'

const Datasources = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent='space-between'>
          <Typography variant='h5'>
            Datasources
          </Typography>
          <ButtonGroup>
            <Button variant="outlined"
              startIcon={<PlusOutline />}
              href='/datasources/create'>Create New Datasource</Button>
          </ButtonGroup>
        </Stack>

      </Grid>


      <Grid item xs={12}>
        <Card>
          <CardHeader title='Datasources' titleTypographyProps={{ variant: 'h6' }} />
          <TableList />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Basic Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableBasic />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableDense />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Datasources
