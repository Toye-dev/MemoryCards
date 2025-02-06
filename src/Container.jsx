import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useState, useEffect } from "react";

const Container = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [badScore, setBadScore] = useState(null);
    const [pickedCard, setPickedCard] = useState(null);
    const [clickedCards, setClickedCards] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    
    const startNewGame = () => {
        window.location.reload();
        setScore(0); 
        setClickedCards([]);  
        setGameStarted(true); 
    };

    useEffect(() => {
        if (gameStarted && score === 0 && !gameWon) {
            setBadScore(true);    
        }

        const badTimer = setTimeout(() => {
            setBadScore(false);
        }, 2500);

        let goodTimer;
        if (score === 8 && !gameWon) {
            setGameWon(true); 

            
            goodTimer = setTimeout(() => {
                setGameWon(false);  
                setClickedCards([]); 
            }, 4000); 
        }

        return () => {
            clearTimeout(badTimer);
            clearTimeout(goodTimer);
        };
    }, [score, gameStarted, gameWon]);

    return (
        <>
           <div className="div">
           <p className="title">
                R <br />
                E <br />
                M <br />
                E <br />
                M <br />
                B <br />
                E <br />
                R <br />
                <br />
                Y <br />
                O <br />
                U <br />
                R <br />
                <br />
                S <br />
                T <br />
                A <br />
                R <br />
                S 
            </p>
            <div className={`background ${badScore === true ? "bad-score-border" : ""}`}>
                {badScore && !gameWon && (
                    <div className="popUp">
                        <p>Oops! You forgot your stars. It's Over!</p> 
                    </div>
                )}

                {gameWon === true && <>
                <div className="popUpTwo"><p>
                    Hurray!!! You're set for stellar achievements! 
                    <span className="button" onClick={startNewGame}>Restart</span>
                    </p>
                </div>
                </>}


                <div className={`container ${badScore === true ? "noDisplay" : ""}`}>
                    <LeftSection 
                        score={score}
                        setScore={setScore}
                        highScore={highScore}
                        setHighScore={setHighScore}
                        pickedCard={pickedCard}
                        setPickedCard={setPickedCard}
                        clickedCards={clickedCards}
                        setClickedCards={setClickedCards}
                        gameStarted={gameStarted}
                        setGameStarted={setGameStarted}
                    />

                    <RightSection  
                        score={score}
                        highScore={highScore}
                    />
                </div>
            </div>
           </div>
        </>
    );
}

export default Container;

