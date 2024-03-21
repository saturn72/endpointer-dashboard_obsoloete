// ** React Imports
import { ChangeEvent, ElementType, useReducer, useRef } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button, { ButtonProps } from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { Box, Divider, Typography, styled } from '@mui/material'
import { DatasourceFileInfo, SupportedDatasourceFileInfos } from 'src/domain/datasource'

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const defaultFileInfo: DatasourceFileInfo = { type: 'json', accept: 'application/json' }
function reducer(state: any, fi: { action: 'set-file-type' | 'set-file-content', data: string | ArrayBuffer | null | undefined }) {
  if (fi.action == 'set-file-type')
    return SupportedDatasourceFileInfos.find(x => x.type == fi.data) || defaultFileInfo;

  if (fi.action == 'set-file-content')
    return {
      ...state,
      content: fi.data
    };
}


const TabInfo = () => {
  const fileInput = useRef<HTMLInputElement | null>();

  const [fileInfo, dispatch] = useReducer(reducer, { type: 'json', accept: 'application/json' });
  const onCancelClicked = () => console.log("cancel datasource creation");

  function handleFileInfoReset() {
    fileInput?.current && (fileInput.current.value = '');
    dispatch({ action: 'set-file-content', data: null });
  }

  const handleFileUpload = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = changeEvent.target.files;
    if (files && files.length !== 0) {
      console.log("this is hrer");
      reader.onload = (ev) => dispatch({ action: 'set-file-content', data: reader.result });
      reader.readAsDataURL(files[0])
      fileInput.current && (fileInput.current.value = '');
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} >
            <TextField
              fullWidth
              label='Name'
              placeholder="Datasource's name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Alias'
              placeholder="Datasource's alias"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select label='Type' defaultValue={defaultFileInfo.type}
                onChange={(e) => {
                  handleFileInfoReset();
                  dispatch({ action: "set-file-type", data: e.target.value });
                }
                }>
                <MenuItem value='json'>json</MenuItem>
                <MenuItem value='csv'>csv</MenuItem>
                <MenuItem value='xml'>xml</MenuItem>
                <MenuItem value='xlsx'>xlsx</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='datasource-file'>
                    Upload Datasource File
                    <input
                      hidden
                      type="file"
                      onChange={handleFileUpload}
                      accept={fileInfo.accept}
                      id='datasource-file'
                      ref={fileInput}
                    />
                  </ButtonStyled>
                  <h2>{fileInfo.content}</h2>
                  <ResetButtonStyled color='error' variant='outlined' onClick={handleFileInfoReset}>
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Allowed *.{fileInfo.type} file. Max size of 10MB.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => onCancelClicked()}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent >
  )
}

export default TabInfo
