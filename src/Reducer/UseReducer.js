import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({name}) 
{
    const [state, dispatch] = useReducer(reducer, intialState);

    //-------------------------------------------------------------------
    const onConfirm = () => {
        dispatch({type:actionTypes.confirm});
    }

    const onError =  () => {
        dispatch({type:actionTypes.error});
    }

    const onChangeHandler = event => {
      
        dispatch({type:actionTypes.write, payload:event.target.value})
    };

    const onCheck = () =>{
        dispatch({type:actionTypes.check})
    }

    const onDelelte = () =>{
        dispatch({type:actionTypes.delete})
    }

    const onReset = () =>{
        dispatch({type:actionTypes.reset})
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
    
                <input placeholder="Código de seguridad" onChange={onChangeHandler}/>
                <button onClick={onCheck}>Comprobar</button>
            </div>
        );
    }
    else if(state.confirmed && !state.deleted)
    {
        return (
            <React.Fragment>
                <p>Confirmación, ¿Estas seguro?</p>
                <button onClick={onDelelte}>Si, Elimnar</button>
                <button onClick={onReset}>No, Elimnar</button>
            </React.Fragment>
        );
    }
    else
    {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button onClick={onReset}> Resetear, volver</button>
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

const actionTypes = {
    confirm:'COMFIRM',
    error:'ERROR',
    write:'WRITE',
    delete:'DELETE',
    check:'CHECK',
    reset:'RESET',
}

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
    
    [actionTypes.confirm]:{...state,loading:false,error:false, confirmed:true},
    [actionTypes.error]:{...state,error:true,loading:false},
    [actionTypes.write]:{...state,value:payload},
    [actionTypes.delete]:{...state,deleted:true},
    [actionTypes.check]:{...state,loading:true},
    [actionTypes.reset]:{...state,confirmed:false,deleted:false,value:''}
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