
import { useEffect, useState } from "react";
import Card from "./components/Card/Card"

function App() {
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=21')
  const [nextPage, setNextPage] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<string>('');
  const [ pokemons, setPokemons ] = useState<any[] | undefined>();

  function toNextPage(){
    setUrl(nextPage);
  }

  function toPreviousPage(){
    setUrl(previousPage);
  }

  useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(value => {
        setNextPage(value.next);
        setPreviousPage(value.next);
        setPokemons(value.results); 
    });
  },[url])
  
  
  return (
    <div>
      <div className="fixed">
        <button onClick={toPreviousPage}>Previous Page</button>
        <button onClick={toNextPage}>Next Page</button>
      </div>
      
      <div className="grid">
        {pokemons?.map(p => 
        <Card 
          key={p.name} 
          url={p.url}
        />)}
      </div>
    </div>
  )
}

export default App

