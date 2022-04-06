
import React from 'react'
import { Home } from './components/Home';
import { Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import { PersonaProvider } from './data/PersonaContext';
import { Crear } from './components/Crear';
import { ActualizarOVer } from './components/ActualizarOVer'

export const App = () => {
  return (
    <AppState>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: "100%"
        }}
      >
        <Contenedor>
          <Routes>
            <Route exact={true} path='/' element={<Home/>}/>
            <Route path="/:accion/:id" element={<ActualizarOVer/>}/>
            <Route exact={true} path='/crear' element={<Crear/>}/>
          </Routes>
        </Contenedor>
      </div>
    </AppState>
  )
}

const AppState = ({children}) => {
  return (
    <PersonaProvider>
      {children}
    </PersonaProvider>
  )
}


export default App;

const Contenedor = styled.div`
    max-width: 1200px;
    padding: 40px;
    width: 90%;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
