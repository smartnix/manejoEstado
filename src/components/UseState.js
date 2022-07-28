import React, { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) 
{
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(value);
    useEffect(() => {
     
        if(!!loading)
        {
           
            setTimeout(() => {

                if(value !== SECURITY_CODE)
                {
                    setError(true);
                }
                setLoading(false);
                
                }, 2000);
        }
    }, [loading])

    const onChangeHandler = event => {
        setValue(event.target.value);
        
     };
    
    return (
        <div>
            <h2>Eliminar UseState</h2>
            <p>Por favor, escribe el codigo de seguridad</p>

            {
                (error && !loading) && 
                (
                    <p>Error: el codigo es incorrecto</p>
                )
            }

            {   
                loading  &&
                (
                    <p>Cargando...</p>
                )
            }

            <input placeholder="Código de seguridad" 
                value={value} 
                onChange={onChangeHandler}
            />
            <button
                onClick={() => setLoading(true) }  
            >Comprobar</button>
        </div>
    );

}

export {UseState};