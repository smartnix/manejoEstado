import React, { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) 
{
    const [state, setState] = useState({
        value:'',
        error:false,
        loading:false
    });

    useEffect(() => {
     
        if(!!state.loading)
        {
            setTimeout(() => {

                if(state.value !== SECURITY_CODE)
                {
                    setState({...state,error:true, loading:false})
                }
                else
                {
                    setState({...state,loading:false,error:false})
                }
                }, 2000);
        }
    }, [state.loading])

    const onChangeHandler = event => {
        setState({...state,value:event.target.value})
     };
    
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
                onClick={() =>  setState({...state,loading:true}) }  
            >Comprobar</button>
        </div>
    );

}

export {UseState};