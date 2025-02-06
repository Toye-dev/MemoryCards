import { useState, useEffect } from "react";
import axios from "axios";


function LeftSection({score, highScore, setScore, setHighScore, pickedCard, setPickedCard, clickedCards, setClickedCards, gameStarted, setGameStarted}) {
    const [eightImgCards, setEightImgCards] = useState([]);
   
    const [loading, setLoading] = useState(true);
    const [texts, setTexts ] = useState([]);

    const allTexts = [
        'We have burned for eons, whispering secrets to you across time.', 
        'Your atoms were forged in our fire; you are one of us.', 
        'We were here before you, and we will wait for you after.', 
        'Light travels lifetimes to reach your eyes—do you see us?', 
        'Do you ever wonder if we watch you, too?', 
        'Look up, look around. We are waiting for you.', 
        'And the cosmos remembers you, even when the world forgets.', 
        'Even in the darkest sky, we find a way to glow.'
    ];

    const extractDescr = (texts) => {
        let randomTexts = [...texts].sort(() => (0.5 - Math.random())) 
        return randomTexts;
    }

    useEffect(() => {
        setTexts(extractDescr(allTexts));

        const allDates = [ '2018-12-24', '2015-10-15', '2007-12-10', '2002-01-04', '2018-09-21', '2005-12-25', '2019-02-23', '2020-12-26', 
            '2022-11-03', '2008-07-16', '2024-08-23', '2024-08-19', '2021-04-26', '2007-12-15', '2019-05-08', '2019-07-22', '2023-09-20', '2009-05-10'
        ]

        const extractDates = (dates) => {
            let randomDates = [...dates].sort(() => (0.5 - Math.random())) //math.random gets a number between 0 and 1, while subtracting 0.5 shifts it to a range of -0.5 to 0.5. Positive or negative results determine the sort order.. a and b is not needed in the parameter because there's no required order - ascending or descending
            return randomDates.slice(0, 8);
        }

        const requiredEightDates = extractDates(allDates);
        const fetchingNasaImages = async() => {
            const apiKey = 'DFHvOkjZdxAegffdsXu9vmm3jUnvrWL5ZDpKMkxg';

            setLoading(true);
            try {
                const nasaFullInfo = await Promise.all (
                    requiredEightDates.map(async (date) => {
                        const NasaResponse = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
                        return NasaResponse.data;
                    })
                ); // this is an array, not a function

                setEightImgCards(nasaFullInfo);      
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchingNasaImages();
       
    }, []);

    useEffect(() => {
        console.log(eightImgCards); 
    }, [eightImgCards]); 

    const shuffleTheEightCards = () => {
        setEightImgCards((prevCards) => {
            return [...prevCards].sort(() => (0.5 - Math.random()))
        });
    }
   
    const handleCardClick = (cardId) => {
       
        if (!gameStarted) {
            setGameStarted(true);
        }

        setTimeout(() => {
            shuffleTheEightCards();
            setTexts(extractDescr(texts));
        }, 1000);
        
        if(!clickedCards.includes(cardId)) {
            setClickedCards((prevClickedIds) => [...prevClickedIds, cardId]);
            setScore((prevScore) => prevScore + 1);
            setPickedCard(cardId);
        } else { 
            setScore(0);
            setClickedCards([]);
            setPickedCard(null); 
        }

        if(clickedCards.includes(cardId)) {
            if(score === 8 && score > highScore) {
                setHighScore(score);
            }
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setPickedCard(null);
        }, 500);

        return () => clearTimeout(timer);
    }, [score]);

    return (
        <>
            <div className="leftSection">
                {loading && 
                    <p className="loading">Loading 
                    <span className="loadingSpan">+ + +</span>
                    </p>
                }

                { 
                    eightImgCards.map((item, index) => {
                        return(
                        <div key={index} 
                            className={`pictDiv ${pickedCard === item.date ? "good-score-border" : ""}`} 
                            onClick = {() => handleCardClick(item.date)}
                        >
                            <div className="imgDiv">
                                <img src={item.url} className="imgCard" alt="Image Card"/>
                                <div className="imgText">
                                    <p className="imgTitle">{item.title}</p>
                                   <p className="imgDescr">{texts[index]}</p>
                    
                            
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </>
    );
   
    
};

export default LeftSection;

/*

For each date in the requiredDates array, you're calling axios.get(...) to fetch data for that specific date.
This creates a promise for each date's request.
Promise.all Collects the Promises

Promise.all takes the array of promises, one for each date, and runs them in parallel.
It waits for all of them to finish before continuing.


When all the promises resolve, Promise.all returns an array of results.
Each item in the array corresponds to the data for one of the dates
Without await promise.all, I would get an array of unresolved promises. Map would run through the array and finsih without allowing any waiting time for promises to get resolved

*/

/*

    useEffect(() => {
            
        const fetchingPokemons = async() => {
            try {
                const pokemonResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=8&offset=10')
                const pokemonObjects = pokemonResponse.data.results;

                const pokemonDataArray = await Promise.all(
                    pokemonObjects.map(async(pokemon) => {
                        const newInfo = await axios.get(pokemon.url);
                        return newInfo.data;
                    })
                ); 
                
                setImgCards(pokemonDataArray);
            } catch(error) { 

            }
        };

        fetchingPokemons(); 
    }, []);

    useEffect(() => {
        console.log(imgCards); 
    }, [imgCards]); 

    return (
        <>
            <div className="leftSection">
            { 
                    imgCards.map((pokemon, index) => {
                        return(
                        <div  key={pokemon.name} className="pictDiv">
                            <div className="imgDiv">
                                <img src={pokemon.sprites.front_default} className="imgCard" alt="Image Card"/>
                                <div className="imgText">
                                    <p className="imgTitle">{pokemon.name}</p>
                                    <p className="imgDescr">I'm sure you like me most!</p>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </>
    );

*/