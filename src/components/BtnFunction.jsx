import './BtnStyle.css'
function BtnFunction({func, addOp}) {
  
  return (
    <>
      <td>
        <button onClick={()=>addOp(func)}>
          {func}
        </button>
      </td>

    </>
  )
}

export default BtnFunction