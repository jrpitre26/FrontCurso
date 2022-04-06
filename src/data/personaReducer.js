export const personaReducer = (state, action) => {
    switch (action.type) {
      case 'getRows':
        return {
          ...state,
          rows: action.payload
        }  
      case 'getCiudades':
        return {
          ...state,
          ciudades: action.payload
        };
      case 'onShow':
        return {
          ...state,
          selectedRow: action.payload
        };
      case 'unSelect':
        return {
          ...state,
          selectedRow: null
        };
      default:
        return state;
    }
  }