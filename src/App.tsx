
import { useEffect, useState } from "react";
import Card from "./components/Card/Card"

function App() {
  const [ url, setUrl ] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=21')
  const [ nextPage, setNextPage ] = useState<string>('');
  const [ previousPage, setPreviousPage ] = useState<string>('');
  const [ pokemons, setPokemons ] = useState<any[] | undefined>();
  const [ isReady, setIsReady ] = useState<boolean>(false);

  let loadedImages = 0;

  function toNextPage(){
    setUrl(nextPage);
  }

  function toPreviousPage(){
    setUrl(previousPage);
  }

  function handleImageLoad(){
    loadedImages++;
    if (loadedImages === pokemons?.length)
      setIsReady(true);
      console.log(loadedImages)
  }

  useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(value => {
        setIsReady(false);
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
      
      <div className="grid" style={{visibility: isReady? 'visible': 'hidden'}}>
        {pokemons?.map(p => 
        <Card 
          key={p.name} 
          url={p.url}
          onLoad={handleImageLoad}
        />)}
      </div>
    </div>
  )
}

export default App

