import React, { useContext, useEffect } from 'react'
// import { PersonaContext } from '../data/PersonaContext'
import Typography from '@mui/material/Typography';
import { TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table } from '@mui/material';
import { Visibility, Edit, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PersonaContext } from '../data/PersonaContext';

export const Home = () => {
  const navigate = useNavigate();
  const {rows, getPersonas, onDelete} = useContext(PersonaContext);
  
  useEffect(() => {
    getPersonas();
  },[]);
  console.log(rows);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <Typography variant='h4'>Personas</Typography>
        <AddCircle
          color='success'
          onClick={() => navigate('/crear')}
          fontSize='large'
          sx={{
            cursor: 'pointer'
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 800}}>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{fontWeight: 'bold'}}>Acciones</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Id</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Nombre</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Identificacion</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Fecha Nacimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                  >
                    <TableCell>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}
                      >
                        <Visibility
                          color='action'
                          onClick={() => {
                            navigate(`/ver/${row.id}`)
                          }}
                          sx={{
                          cursor: 'pointer'
                        }}/>
                        <Edit
                          color='primary'
                          onClick={() => {
                            navigate(`/actualizar/${row.id}`);
                          }}
                          sx={{
                            cursor: 'pointer'
                          }}
                        />
                        <Delete
                          color='error'
                          sx={{
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            onDelete(row.id);
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.identificacion}</TableCell>
                    <TableCell>{row.fecha_nacimiento}</TableCell>
                  </TableRow>
                );
              })} 
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}