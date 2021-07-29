import React from 'react'
const Poruka =({poruka, promjenaVaznosti,brisiPoruku}) =>{
  const oznaka = poruka.vazno ? 'oznaci kao nevazno' : 'oznaci kao vazno'
    return(<li>{poruka.sadrzaj}
    <button onClick={promjenaVaznosti}>{oznaka}</button>
    <button onClick={brisiPoruku}>-</button>
    </li>)}

export default Poruka