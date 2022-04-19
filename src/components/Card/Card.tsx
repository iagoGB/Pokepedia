import { useEffect, useState } from "react";
import  './Card.css';

interface Pokemon{
    name?: string;
    weigth: number;
    height: number;
    sprites?: any;
}

interface Resource {
    url: string;
}

const Card = (props: Resource) => {

    const [ pokemon, setPokemon ] = useState<Pokemon | undefined>();

    useEffect(() => {
        fetch(props.url)
        .then(resp => resp.json())
        .then(value => {
            setPokemon(value); 
        });
    },[])
    

    return (
        <div className="Card">
            <div className="Card-Header">
                <img src={pokemon?.sprites.other.home.front_default} alt="" /> 
            </div>
            <div className="Card-Body">
                <div className="Card-Avatar">
                </div>
                <div className="Card-Information">
                    <h1>{pokemon?.name}</h1>
                    <div>
                        <p>{pokemon?.weigth}</p>
                        <p>{pokemon?.height}</p>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Card;

