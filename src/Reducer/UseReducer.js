import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({name}) 
{
    const [state, dispatch] = useReducer(reducer, intialState);

    
    //-------------------------------------------------------------------
    const onConfirm = () => {
        dispatch({type:'CONFIRM'});
    }

    const onError =  () => {
        dispatch({type:'ERROR'});
    }

    const onChangeHandler = event => {
      
        dispatch({type:'WRITE', payload:event.target.value})
    };

    const onCheck = () =>{
        dispatch({type:'CHECK'})
    }

    const onDelelte = () =>{
        dispatch({type:'DELETE'})
    }

    const onReset = () =>{
        dispatch({type:'RESET'})
    }

    //-------------------------------------------------------------------

    useEffect(() => {
     
        if(!!state.loading)
        {
            setTimeout(() => {

                if(state.value !== SECURITY_CODE)
                {
                    onError();
                } 
                else
                {
                    onConfirm();
                }
                }, 2000);
        }
    }, [state.loading])
    
    if(!state.deleted && !state.confirmed)
    {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el codigo de seguridad</p>
    
                {
                    (state.error && !state.loading) && 
                    (
                        <p>Error: el codigo es incorrecto</p>
                    )
                }
    
                {   
                    state.loading  &&
                    (
                        <p>Cargando...</p>
                    )
                }
    
                <input placeholder="Código de seguridad" 
                    onChange={onChangeHandler}
                />
                <button
                    onClick={onCheck}  
                >Comprobar</button>
            </div>
        );
    }
    else if(state.confirmed && !state.deleted)
    {
        return (
            <React.Fragment>
                <p>Confirmación, ¿Estas seguro?</p>
                <button
                    onClick={onDelelte}
                >Si, Elimnar</button>
                <button
                    onClick={onReset}
                >No, Elimnar</button>
            </React.Fragment>
        );
    }
    else
    {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                     onClick={onReset}
                >
                    Resetear, volver
                </button>
            </React.Fragment>
        );
    }

}

const intialState = {
    value:'',
    error:false,
    loading:false,
    deleted:false,
    confirmed:false
};

// const reducer = (state, action) => {

// }
//-------Primera forma de crear un reducer
// const reducer = (state, action) => {
//     if(action.type === 'ERROR')
//     {
//         return {
//             ...state,
//             error:true,
//             loading:false
//         };
//     }
//     else if(action.type === 'CHECK')
//     {
//         return {
//             ...state,
//             loading:true
//         };
//     }
//     else
//     {
//         return {
//             ...intialState
//         };
//     }
// }
//-------Segunda forma de crear un reducer
// const reducer = (state, action) => {
//     switch (action.type) 
//     {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error:true,
//                 loading:false
//             };
//         case 'CHECK':
//             return {
//                 ...state,
//                 error:true,
//                 loading:false
//             };   
    
//         default:
//             return {
//                 ...state
//             };
//     }
// }
//-------tercera forma de crear un reducer
const reducerObject = (state, payload) => ({

    
    'COMFIRM':{...state,loading:false,error:false, confirmed:true},
    'ERROR':{...state,error:true,loading:false},
    'WRITE':{...state,value:payload},
    'DELETE':{...state,deleted:true},
    'CHECK':{...state,loading:true},
    'RESET':{...state,confirmed:false,deleted:false,value:''}
});

const reducer = (state, action) => {
   
    if(reducerObject(state)[action.type])
    {
        console.log(action);
        return reducerObject(state, action.payload)[action.type];
    }
    else
    {
        return state;
    }
}

export {UseReducer};