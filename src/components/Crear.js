import React, { useContext, useEffect } from 'react'
import { Typography, TextField, Box, Grid, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, MenuItem } from '@mui/material'
import { Formik, Form, useField, Field } from 'formik';
import { ArrowBackIos } from '@mui/icons-material';
import * as yup from 'yup';
import { PersonaContext } from '../data/PersonaContext';
import { useNavigate } from 'react-router-dom';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const MyRadioField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText} component='fieldset'>
      <FormLabel {...props} {...field}>
        {props.label}
      </FormLabel>
      <Field {...props} {...field} type='radio' as={RadioGroup} row>
        {props.options.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color='primary' />}
              label={option.label}
              labelPlacement='end'
              disabled={props.disabled}
            />
          );
        })}
      </Field>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

const MySelect = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      select
    >
        {props.options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.id}>
              {option.nombre}
            </MenuItem>
          )
        })}
    </TextField>
  );
}

const options = [
  {value: '1', label: 'Si'},
  {value: '0', label: 'No'},
];

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  identificacion: yup.number().required('Requerido'),
  fecha_nacimiento: yup.date().required('Requerido').max(new Date(), 'Debe ser igual o anterior a hoy'),
  salario: yup.number().nullable().max(99999, 'El salario no puede ser mayor a 99999'),
  ciudad_id: yup.number().required('requerido'),
  nacionalizado: yup.string().required('Requerido')
});

export const Crear = () => {  
  const {onCreate, getCiudades, ciudades} = useContext(PersonaContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCiudades();
  }, []) // eslint-disable-line
 
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <ArrowBackIos
          sx={{
            cursor: 'pointer',
            marginRight: 2,
            backgroundColor: 'gray',
            borderRadius: '50%',
            padding: '10px'
          }}
          onClick={() => navigate('/')}
        />
        <Typography variant='h5'>Crear Nueva Persona</Typography>
      </div>
      <Formik
        validationSchema={validationSchema}
        validateOnBlur={false}
        enableReinitialize
        initialStatus
        initialValues={{
          nombre: '',
          identificacion: '',
          fecha_nacimiento: '',
          salario: '',
          nacionalizado: '',
          ciudad_id: '',
        }}
        onSubmit={(values) => {
          onCreate(values);
          navigate('/');
          // console.log(values);
        }}
      >
        {({handleSubmit}) => (
          <Form>
            <Box sx={{flexGrow: 1}}>
              <Grid container spacing={5} sx={{marginBottom: 2, marginTop: 1}}>
                <Grid item xs={3} style={{paddingTop: 0}}>
                  <MyTextField
                    fullWidth
                    label='Nombre'
                    required
                    name='nombre'
                    variant='standard'
                  />  
                </Grid>
                <Grid item xs={3} style={{paddingTop: 0}}>
                  <MyTextField
                    fullWidth
                    label='Identificacion'
                    required
                    name='identificacion'
                    variant='standard'
                  />  
                </Grid>
              </Grid>
              <Grid container spacing={5} sx={{marginBottom: 2}}>
                <Grid item xs={3}>
                  <MyTextField
                    fullWidth
                    label='Fecha Nacimiento'
                    type='date'
                    required
                    name='fecha_nacimiento'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='standard'
                  />  
                </Grid>
                <Grid item xs={3}>
                  <MyTextField
                    fullWidth
                    label='Salario'
                    required
                    name='salario'
                    variant='standard'
                  />  
                </Grid>
              </Grid>
              <Grid container spacing={5} sx={{marginBottom: 2}}>
                <Grid item xs={3}>
                  <MyRadioField
                    label='Nacionalizado'
                    name='nacionalizado'
                    required
                    options={options}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MySelect
                    fullWidth
                    label='Ciudad'
                    required
                    name='ciudad_id'
                    options={ciudades}
                    variant='standard'
                  />
                </Grid>
              </Grid>
              <Button variant='contained' onClick={handleSubmit}>Crear Persona</Button>
            </Box>
          </Form>
        )}

      </Formik>
    </div>
  )
}