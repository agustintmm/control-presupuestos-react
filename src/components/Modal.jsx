import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal,
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect( () => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])

    const handleSubmit = e =>{
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            setTimeout( () => {
                setMensaje('')
            }, 3000)
            return
        }
        guardarGasto({
            nombre,
            cantidad,
            categoria,
            id,
            fecha
            })
    }   

    const ocultarModal = () => { 
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout( () => {
            setModal(false)
        }, 500)
    }


    
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="cerrar modal" 
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            >
                <legend>{gastoEditar.nombre ? 'Editar gasto': 'Nuevo gasto'}</legend>
                {mensaje && 
                    <Mensaje
                        tipo={'error'}
                    >
                        {mensaje}
                    </Mensaje>
                }
                
                <div className="campo">
                    <label htmlFor='nombre'>Nombre del gasto</label>
                    <input 
                        id='nombre'
                        type="text" 
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor='cantidad'>Cantidad del gasto</label>
                    <input 
                        id='cantidad'
                        type="number" 
                        placeholder='Añade la cantidad del gasto'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor='categoria'>Categoria del gasto</label>
                    <select 
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        id="categoria">
                            <option value="">-- Seleccionar --</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos varios">Gastos Varios</option>
                            <option value="salidas">Salidas</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? 'Actualizar' : 'Agregar'}/>
            </form>
        </div>
    )
}

export default Modal