import React, { Component } from "react";
const SECURITY_CODE = 'paradigma';

class ClassState extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            error:false,
            loading:false,
            value:''
        };
    }

    componentWillUnmount()
    {
        console.log('componentWillUnmount')
    }
    // }
    // componentDidMount()
    // {
    //     console.log('componentDidMount')

    // }
    UNSAFE_componentWillMount()
    {
        console.log('componentWillMount')
    }

    componentDidUpdate()
    {
        console.log('componentDidUpdate');
        if(!!this.state.loading)
        {
            setTimeout(() => {
                
                this.setState({loading:false})

                if(SECURITY_CODE === this.state.value)
                {
                    this.setState({loading: false,error:false})
                }
                else
                {
                    this.setState({loading: false, error:true})
                }
            }, 2000);
        }
    }

    render()
    {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el codigo de seguridad</p>
                {
                    (this.state.error && !this.state.loading) && 
                    (
                        <p>Error: el codigo es incorrecto</p>
                    )
                }
                {
                    this.state.loading && 
                    (
                        <p>Cargando...</p>
                    )
                }
                <input 
                placeholder="Código de seguridad" 
                value={this.state.value}
                onChange={(e) => {
                    this.setState({value:e.target.value})
                }}
                />
                <button
                    onClick={()=>this.setState({loading:true})}
                >Comprobar</button>
            </div>
        );
    }
}

export {ClassState};