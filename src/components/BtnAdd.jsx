function BtnAdd({symb, addSymb}) {
  return (
    <>
      <td>
        <button onClick={()=>addSymb(symb)}>
          {symb}
        </button>
      </td>

    </>
  )
}

export default BtnAdd