// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/datasource/TabInfo'
import TabAccount from 'src/views/datasource/TabAccount'
import TabSecurity from 'src/views/datasource/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 67
    }
}))

const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

const CreateDatasource = () => {
    // ** State
    const [value, setValue] = useState<string>('info')

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Card>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    aria-label='info-settings tabs'
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                    <Tab
                        value='info'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <InformationOutline />
                                <TabName>Info</TabName>
                            </Box>
                        }
                    />

                    <Tab
                        value='account'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountOutline />
                                <TabName>Info</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='security'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>Security</TabName>
                            </Box>
                        }
                    />

                </TabList>

                <TabPanel sx={{ p: 0 }} value='info'>
                    <TabInfo />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='account'>
                    <TabAccount />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='security'>
                    <TabSecurity />
                </TabPanel>
            </TabContext>
        </Card>
    )
}

export default CreateDatasource
