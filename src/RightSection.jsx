
const RightSection = ({score, highScore}) => {

    return(
        <>
            <div className="rightSection">
                <h1>How to Play?</h1>
                <p>The goal of the game is to remember. <br/> You must click on the images without clicking on the same one twice.</p>
                <div className="listContainer">
                    <ul>
                        <li>Click a card to score a point.</li>
                        <li>Each time you click one, the others get shuffled.</li>
                        <li>If you click the same image twice, sorry your points are gone and you start over.</li>
                        <li>Try to beat your best score by clicking all the images correctly.</li>
                        <li> Refresh the page for a new set of cards</li>                       
                    </ul>
                </div>
                <div className="scoreSection">
                    <div className="scoreContainer">
                        <p className="score">Score: </p> <span className="scoreBox">{score}</span>
                    </div>
                    <div className="scoreContainer best">
                        <p>Best Score:</p> <span className="scoreBox">{highScore}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RightSection