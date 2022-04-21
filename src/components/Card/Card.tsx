import { useEffect, useState } from "react";
import  './Card.css';

interface Pokemon{
    name?: string;
    weight: number;
    height: number;
    base_experience: number;
    sprites?: any;
    types: Types[]
}

interface Types {
    slot: number;
    type: Type;
}

interface Type {
    name: string;
    url: string;
}

interface Resource {
    url: string;
    onLoad: Function
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
            <div className={`Card-Header ${pokemon?.types[0]?.type.name}`}>
                <img 
                    src={pokemon?.sprites.other.home.front_default} 
                    onLoad={() => props.onLoad()}
                    alt="" 
                    /> 
            </div>
            <div className="Card-Body">
                <div className="Card-Avatar">
                </div>
                <div className="Card-Information">
                    <div>
                        <h1>{pokemon?.name}</h1>
                        <div className="Card-Types">
                        {pokemon?.types.map(t => <div className={t.type.name}>{t.type.name}</div>)}
                        </div>
                    </div>
                    <div className="Card-Detail">
                        <div className="Card-Description">
                            <span>{ pokemon?.weight! /10 } kg</span> 
                            <span>weight</span>
                            
                        </div>
                        <div className="Card-Description">
                            <span>{ pokemon?.height! / 10 } m</span> 
                            <span>heigth</span>
                        </div>
                        <div className="Card-Description">
                            <span>{ pokemon?.base_experience }</span> 
                            <span>exp</span>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Card;

