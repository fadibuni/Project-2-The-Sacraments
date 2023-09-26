import { useState } from "react";
import FlashCard from "./components/FlashCard";
import cardPairs from "./assets/cardPairs";
import "./App.css";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFlipped, setIsFlipped] = useState(false);

  const firstCard = {
    question: "Start!",
    answer: "Press the next arrow to start the flashcards :)",
  }
  const nextCard = () => {
    let nextIndex = Math.floor(Math.random() * cardPairs.length);
    while (nextIndex === currentIndex && cardPairs.length > 1) {
      nextIndex = Math.floor(Math.random() * cardPairs.length);
    }
    setCurrentIndex(nextIndex);
    setIsFlipped(false);
  };

  return (
    <div className="App">
      <h2>The Seven Sacraments Quiz!</h2>
      <h4>
        Do you know what is the matter of each of the sacraments of the Catholic
        church? Test your knowledge here!
      </h4>
      <h5>Number of cards: {cardPairs.length}</h5>
      <br />
      {currentIndex === -1 ? (
        <FlashCard
          card={firstCard}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      ) : (
        <FlashCard
          card={cardPairs[currentIndex]}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      )}
      <br />
      <button onClick={nextCard} type="button">
        ⭢
      </button>
    </div>
  );
};

export default App;
