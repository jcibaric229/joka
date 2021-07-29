import React, { useEffect, useState } from 'react';
import Poruka from './components/Poruka';
import porukeServer from './services/poruke'

const App = () => {
    const[poruke, postaviPoruke] =useState([])
    const novaPoruka=(e)=>{ //eventhandler poruke kao ulazni argument primaju objekt koji sadrži sve informacije o događaju
        e.preventDefault() //kako nam se ne bi onsite pozvao
       // console.log("KLik",e.target)
        const noviObjekt = {
            sadrzaj: unosPoruke,
            datum: new Date().toUTCString(),
            vazno: Math.random >0.5
        }
        //Umjesto update-anja stanja želim poslati zahtjev serveru da spremi taj moj podatak
       // postaviPoruke(poruke.concat(noviObjekt))
        //postaviUnos("") //da maknemo iz kucice inputa tekst
       porukeServer.stvori(noviObjekt).then(response=>{postaviPoruke(poruke.concat(noviObjekt))
        postaviUnos("")})
    }
    const[unosPoruke,postaviUnos]=useState("Unesi poruku...")
    const promjenaUnosa =(e) =>{
        console.log(e.target.value)
        postaviUnos(e.target.value)
    }
    const [ispisSve, postaviIspis]=useState(true)
    const porukeZaIspis =ispisSve ? poruke : poruke.filter(el=>el.vazno===true)
    useEffect(()=>{
      console.log("Effect hook")
      porukeServer.dohvatiSve().then(response=> {postaviPoruke(response.data)
      })
    },[])
    const brisanjePoruke = (id) => {
      porukeServer
        .brisi(id)
        .then( response => {
          console.log(response);
          postaviPoruke(poruke.filter(p => p.id !== id))
        })
    }   	
const promjenaVaznostiPoruke = (id) => {
  //const url = `http://localhost:3001/poruke/${id}` //slash id ide dodatak
  const poruka = poruke.find(p => p.id === id)
  const modPoruka = {
    ...poruka,
    vazno: !poruka.vazno
  }
  	

 porukeServer.osvjezi(id,modPoruka).then(response => {
      postaviPoruke(poruke.map(p => p.id !== id ? p : response.data))
    })
}
    return (
        
      <div>
        <h1>Poruke</h1>
        <button onClick={()=>postaviIspis(!ispisSve)}>Prikaži {ispisSve ? "samo važne": "sve" }</button>
        <ul>
          {porukeZaIspis.map(p=><Poruka key={p.id} poruka={p} promjenaVaznosti={()=>promjenaVaznostiPoruke(p.id)} brisiPoruku={()=>brisanjePoruke(p.id)}/>)}
        </ul>
        <form onSubmit={novaPoruka}>
            <input value={unosPoruke}  onChange={promjenaUnosa}/>
            <button type='submit'>Spremi</button>

        </form>
      </div>
    )
  }

  export default App