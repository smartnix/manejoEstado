import React, { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) 
{
    const [state, setState] = useState({
        value:'',
        error:false,
        loading:false,
        deleted:false,
        confirmed:false
    });
    //-------------------------------------------------------------------
    const onConfirm = () => {
        setState({...state,loading:false,error:false, confirmed:true})
    }

    const onError =  () => {
        setState({...state,error:true, loading:false})
    }

    const onChangeHandler = event => {
        setState({...state,value:event.target.value})
    };

    const onCheck = () =>{
        setState({...state,loading:true})
    }

    const onDelelte = () =>{
        setState({
            ...state,
            deleted:true
        })
    }

    const onReset = () =>{
        setState({
            ...state,
            confirmed:false,
            deleted:false,
            value:''
        })
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
                <h2>Eliminar UseState</h2>
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
                    value={state.value} 
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

export {UseState};