import { useState } from 'react'
import BtnAdd from './components/BtnAdd.jsx'
import BtnFunction from './components/BtnFunction.jsx'
import reactImage from './assets/react.svg'
import Historial from './components/Historial.jsx'
import './App.css'

// Cambios por realizar ---
// Hacer click en un resultado del historial para agregar a la calculadora
//Agregar modo oscuro
//-----------------------------------------------------------


function App() {
  const [entrada, setEntrada] = useState("")
  const [OpCount, setOpCount] = useState('')
  const [OperacionesList, setOperacionesList] = useState([])
  const [IsVisibleHis,setIsVisibleHis] = useState(false)
  const opList = "+-*/^"
  const funcList = "Cc<="
  const valoresPermitidos = '0123456789'
  const LastChar = (entrada!=undefined && entrada.slice(entrada.length-1,entrada.length))
  const maxDecDigits = 20




  const TeclaPresionada = (e) => {
    const keyPressedValue = e.key
    //console.log(keyPressedValue)
    if (valoresPermitidos.includes(keyPressedValue)){
      //console.log(`'tecla presionada: '${keyPressedValue}`)
      addSymbol(keyPressedValue)

    }else if(opList.includes(keyPressedValue) || 'Xx'.includes(keyPressedValue) || 'Pp'.includes(keyPressedValue)){
      //console.log(`Tecla de operacion: ${keyPressedValue}`)
      if ('Xx'.includes(keyPressedValue)){
        addProcess('*')
      }else if('Pp'.includes(keyPressedValue)){
        addProcess('^')
      }else{
        addProcess(keyPressedValue)
      }

    }else if(funcList.includes(keyPressedValue) || keyPressedValue == 'Backspace' || keyPressedValue == 'Enter' || keyPressedValue == 'Delete'){
      //console.log(`Tecla de funcion: ${keyPressedValue}`)
      if(keyPressedValue == 'Backspace'){
        addProcess('<=')
      }else if('Cc'.includes(keyPressedValue) || keyPressedValue == 'Delete'){
        addProcess('C')
      }else if(keyPressedValue == '=' || keyPressedValue == 'Enter'){
        addProcess('=')
      }
    }else if('Hh'.includes(keyPressedValue)){
      setIsVisibleHis(!IsVisibleHis)
    }else if(keyPressedValue == '.'){
      addSymbol('.')
    }
  }

  const calcular = (opCurrent,val1,val2) => {
    const opToHis = (opAddHisList) => {setOperacionesList([...OperacionesList,opAddHisList])}
    if (val1 != '' && opCurrent != '' &&val2 == '.' ){
      val2='0.0'
      
    }else if (val1 == '0' && opCurrent == '/' && val2 == '0'){
      return '0'
    }else if(entrada.slice(entrada.length-2,entrada.length == '0' && LastChar == '.')){
      setEntrada('')
      addProcess('C')
    }
    //let prepararValores = []
    let rsCalculo = 0;
    if(val1.includes('.') || val2.includes('.')){
      val1 = parseFloat(val1)
      val2 = parseFloat(val2)
      switch(opCurrent){
        //prepararValores = entrada.split(opCurrent)
        case('+'):
          rsCalculo = val1+val2
          opToHis(`${val1.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} ${opCurrent} ${val2.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} = ${rsCalculo.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })}`)
          return rsCalculo
        case('-'):
          rsCalculo = val1-val2
          opToHis(`${val1.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} ${opCurrent} ${val2.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} = ${rsCalculo.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })}`)
          return rsCalculo
        case('*'):
          rsCalculo = val1*val2
          opToHis(`${val1.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} ${opCurrent} ${val2.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} = ${rsCalculo.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })}`)
          return rsCalculo
        case('/'):
          rsCalculo = val1/val2
          opToHis(`${val1.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} ${opCurrent} ${val2.toLocaleString()} = ${rsCalculo.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })}`)
          return rsCalculo
        case('^'):
          rsCalculo = Math.pow(val1,val2)
          opToHis(`${val1.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} ${opCurrent} ${val2.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })} = ${rsCalculo.toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })}`)
          return rsCalculo

      }
    }else{
      val1 = parseInt(val1)
      val2 = parseInt(val2)
      switch(opCurrent){
        //prepararValores = entrada.split(opCurrent)
        case('+'):
          rsCalculo = val1+val2
          opToHis(`${val1.toLocaleString()} ${opCurrent} ${val2.toLocaleString()} = ${rsCalculo.toLocaleString()}`)
          return rsCalculo
        case('-'):
          rsCalculo = val1-val2
          opToHis(`${val1.toLocaleString()} ${opCurrent} ${val2.toLocaleString()} = ${rsCalculo.toLocaleString()}`)
          return rsCalculo
        case('*'):
          rsCalculo = val1*val2
          opToHis(`${val1.toLocaleString()} ${opCurrent} ${val2.toLocaleString()} = ${rsCalculo.toLocaleString()}`)
          return rsCalculo
        case('/'):
          rsCalculo = val1/val2
          opToHis(`${val1.toLocaleString()} ${opCurrent} ${val2.toLocaleString()} = ${rsCalculo.toLocaleString()}`)
          return rsCalculo
        case('^'):
          rsCalculo = Math.pow(val1,val2)
          opToHis(`${val1.toLocaleString()} ${opCurrent} ${val2.toLocaleString()} = ${rsCalculo.toLocaleString()}`)
          return rsCalculo
      }
    }
    
  }

  const addProcess = (number) => {
    if (number == 'C' || number == 'c'){// Limpiar el input
      setEntrada('')
      setOpCount('');
      ((entrada=='') && setOperacionesList([]))

    }else if(number == '<='){// al borrar 
      setEntrada(entrada.slice(0,entrada.length-1))
      if (opList.includes(LastChar)){setOpCount('')}

    }else if(number == "="){//Al presionar signo de igual =
      //console.log(entrada)
      if(entrada.length == 0){
        //console.log("No hay datos a calcular")
      
      }else if(OpCount != '' && entrada.split(OpCount)[0] != '' && entrada.split(OpCount)[1] != ''){
        if(number != '='){
          setEntrada(`${calcular(OpCount,entrada.split(OpCount)[0],entrada.split(OpCount)[1])}${number}`)
          setOpCount(number)
        }else{
          setEntrada(`${calcular(OpCount,entrada.split(OpCount)[0],entrada.split(OpCount)[1])}`)
          setOpCount('')
        }
      }
    
    }else if(number == "H"){
      setIsVisibleHis(!IsVisibleHis)

    }else if(opList.includes(LastChar) && entrada.length == 0 && !funcList.includes(number)){
      setEntrada(`0${entrada.slice(0,entrada.length-1)}${number}`)
      setOpCount(number)
      //console.log(`sustituyendo simbolo... 0{symb}... y actualizando OpCount: ${OpCount}`)
    
    }else if(opList.includes(LastChar)){
      setEntrada(`${entrada.slice(0,entrada.length-1)}${number}`)
      setOpCount(number)
      //console.log(`sustituyendo simbolo... y actualizando OpCount: ${OpCount}`)
    
    }else if(OpCount != '' && entrada.split(OpCount)[0].trim() != '' && entrada.split(OpCount)[1].trim() != ''){
        //console.log('esta listo para calcular')
        if(number != '='){
          setEntrada(`${calcular(OpCount,entrada.split(OpCount)[0],entrada.split(OpCount)[1])}${number}`)
          setOpCount(number)
        }else{
          setEntrada(`${calcular(OpCount,entrada.split(OpCount)[0],entrada.split(OpCount)[1])}`)
          setOpCount('')
        }

    }
    else if(number != 'C' && OpCount == ''){
      //console.log("Boton de accion distinto de 'C'")
      if(entrada.includes('+') && number == '+'){
        //console.log('Ya existe un operador +')
        if (OpCount == '+'){
          //console.log('se debe realizar un calculo y verificacion de valores')
        }


      }else if(entrada.includes('-') && number == '-'){
        //console.log('Ya existe un operador -')
        if (OpCount != ''){
          //console.log('se debe realizar un calculo y verificacion de valores')
        }


      }else if(entrada.includes('*') && number == '*'){
        //console.log('Ya existe un operador *')
        if (OpCount != ''){
          //console.log('se debe realizar un calculo y verificacion de valores')
        }


      }else if(entrada.includes('/') && number == '/'){
        //console.log('Ya existe un operador /')
        if (OpCount != ''){
          //console.log('se debe realizar un calculo y verificacion de valores')
        }

      }
      else{
        setEntrada(entrada+`${number}`)
        setOpCount(number)
        //console.log(`Actualizando estado del operador a: ${OpCount}`)
      }

      
    }

  }
  const addSymbol = (number) => {
    //const entViewVal = [OpCount,entrada.split(OpCount)[0],entrada.split(OpCount)[1]]

    if(LastChar == '.' && number == '.'){
      setEntrada(`${entrada}`)

    }else if (LastChar == '.' && number != '.'){
      setEntrada(`${entrada}`+`${number}`)

    }else if(LastChar == '' && number == '.' && entrada == ''){
      setEntrada(`0.`)

    }else if(LastChar == '' && number != '.' && entrada == ''){
      setEntrada(`${entrada}`+`${number}`)

    }else if(number != '.' && entrada != ''){
      setEntrada(`${entrada}`+`${number}`)

    }else if(number == '.' && entrada != '' && opList.includes(LastChar)){
      setEntrada(`${entrada}0.`)
    }
    else if(number == '.' && entrada != '' && !opList.includes(LastChar) && OpCount == ''){
      if (entrada.includes('.')){
        setEntrada(`${entrada}`)
        
      }else if(!entrada.includes('.')){
        setEntrada(`${entrada}${number}`)
      }
    }else if(number == '.' && entrada != '' && !opList.includes(LastChar) && OpCount != ''){
      if(entrada.split(OpCount)[1].includes('.')){
        setEntrada(`${entrada}`)
      }else{
        setEntrada(`${entrada}${number}`)
      }
    }

  }

  const entradaView = () => {
    //const entViewVal = [OpCount,entrada.split(OpCount)[0],entrada.split(OpCount)[1]]
    //console.log(entViewVal)
    if(entrada.toLowerCase().includes('infinity')){
      addProcess('C')
    }

    if (OpCount == ''){//No hay un operador
      if(!entrada.includes('.') && entrada != ''){
        //console.log('Se agrego un numero y no hay puntos')
        return `${parseInt(entrada).toLocaleString()}`

      }else if (entrada.includes('.') && LastChar == '.'){
        //console.log('Se acaba de agregar un punto')
        return `${parseFloat(entrada).toLocaleString()}.`

      }else if(entrada.includes('.') && LastChar != '.'){
        //console.log('Se agrego un numero despues del punto')
        return `${parseFloat(entrada).toLocaleString(undefined, { maximumFractionDigits: maxDecDigits })}`
      
      }else{
        return entrada
      }
    }else{
      //entrada.split(OpCount)[0] != '' && OpCount =! '' && opList.includes(OpCount)
      if ((entrada.split(OpCount)[0]) != '' && OpCount != '' && opList.includes(OpCount)){
        if (entrada.split(OpCount)[0].includes('.')){
          if (entrada.split(OpCount)[1] == ''){
            return `${parseFloat(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}`
          }else{
            if(entrada.split(OpCount)[1].includes('.') && LastChar == '.'){
              return `${parseFloat(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}${parseFloat(entrada.split(OpCount)[1]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}.`
            }else if(entrada.split(OpCount)[1].includes('.') && LastChar != '.'){
              return `${parseFloat(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}${parseFloat(entrada.split(OpCount)[1]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}`

            }else if (!entrada.split(OpCount)[1].includes('.')){
              return `${parseFloat(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}${parseInt(entrada.split(OpCount)[1]).toLocaleString()}`
            }else{
              return entrada
            }
          }
          
        }else if(!entrada.split(OpCount)[0].includes('.')){
          if(entrada.split(OpCount)[1] != ''){
            if(entrada.split(OpCount)[1].includes('.') && LastChar == '.'){
              return `${parseInt(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}${parseFloat(entrada.split(OpCount)[1]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}.`
            }else if(entrada.split(OpCount)[1].includes('.') && LastChar != '.'){
              return `${parseInt(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}${parseFloat(entrada.split(OpCount)[1]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}`
            }else if(!entrada.split(OpCount)[1].includes('.')){
              return `${parseInt(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}${parseInt(entrada.split(OpCount)[1]).toLocaleString()}`
            }
          }else{
            return `${parseInt(entrada.split(OpCount)[0]).toLocaleString(undefined,{maximumFractionDigits:maxDecDigits})}${OpCount}`
          }
        
        }else{
          return entrada
        }
        
      }
      else{
        return entrada
      }
    }
  }

  return (
    <>
      <div className='main'>
        <table border="0" className='mainTable' onKeyUp={TeclaPresionada}>
          <thead>
            <tr><th colSpan='4'><img src={reactImage} alt='react image'/><h1>Calculadora</h1></th></tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='4'><input type='text' id='entrada' defaultValue={entradaView()} readOnly/></td>
            </tr>
            <tr>
              <BtnFunction func='^' addOp={addProcess}/>
              <BtnFunction func='C' addOp={addProcess}/>
              <BtnFunction func='<=' addOp={addProcess}/>
              <BtnFunction func='+' addOp={addProcess}/>
            </tr>
            
            <tr>
              <BtnAdd symb='1' addSymb={addSymbol}/>
              <BtnAdd symb='2' addSymb={addSymbol}/>
              <BtnAdd symb='3' addSymb={addSymbol}/>
              <BtnFunction func='-' addOp={addProcess}/>
            </tr>
            <tr>
              <BtnAdd symb='4' addSymb={addSymbol}/>
              <BtnAdd symb='5' addSymb={addSymbol}/>
              <BtnAdd symb='6' addSymb={addSymbol}/>
              <BtnFunction func='*' addOp={addProcess}/>
            </tr>
            <tr>
              <BtnAdd symb='7' addSymb={addSymbol}/>
              <BtnAdd symb='8' addSymb={addSymbol}/>
              <BtnAdd symb='9' addSymb={addSymbol}/>
              <BtnFunction func='/' addOp={addProcess}/>
            </tr>
            <tr>
              <BtnFunction func='H' addOp={addProcess}/>
              <BtnAdd symb='0' addSymb={addSymbol}/>
              <BtnAdd symb='.' addSymb={addSymbol}/>
              <BtnFunction func='=' addOp={addProcess}/>
            </tr>

          </tbody>
        </table>
        {(IsVisibleHis) && <Historial operaciones={OperacionesList}/>}
      </div>
    </>
  )
}

export default App
