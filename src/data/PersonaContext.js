import React, { createContext, useReducer } from "react";
import apiCurso from "../api/api";
import { personaReducer } from "./personaReducer";

const initialState = {
  rows: [],
  selectedRow: null,
  ciudades: []
};

export const PersonaContext = createContext({});

export const PersonaProvider = ({children}) => {
  const [state, dispatch] = useReducer(personaReducer, initialState);

  const getPersonas = async () => {
    try {
      const resp = await apiCurso.get('/personas');
      if(resp.status===200){
        dispatch({type: 'getRows', payload: resp.data});
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const onCreate = async (data) => {
    try {
      const resp = await apiCurso.post('/personas', data);
      if(resp.status===201){
        getPersonas();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const onShow = async (id) => {
    try {
      const resp = await apiCurso.get('/personas/'+id);
      if(resp.status===200){
        dispatch({type: 'onShow', payload: resp.data});
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const unSelect = () => {
    dispatch({type: 'unSelect'})
  }

  const onUpdate = async (data) => {
    try {
      const resp = await apiCurso.put('/personas/'+data.id, data);
      if(resp.status===200){
        getPersonas();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const onDelete = async (id) => {
    try {
      const resp = await apiCurso.delete('/personas/'+id);
      if(resp.status===200){
        getPersonas();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const getCiudades = async () => {
    try {
      const resp = await apiCurso.get('/ciudades');
      if(resp.status===200){
        dispatch({type: 'getCiudades', payload: resp.data});
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <PersonaContext.Provider value={{
      ...state,
      getPersonas,
      onCreate,
      onShow,
      unSelect,
      onUpdate,
      onDelete,
      getCiudades
    }}>
      {children}
    </PersonaContext.Provider>
  );
}