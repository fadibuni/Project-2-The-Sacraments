import { useState } from "react";
import FlashCard from "./components/FlashCard";
import cardPairs from "./assets/cardPairs";
import "./App.css";

const cleanString = (str) => str.trim().toLowerCase();

const App = () => {
  const congratsCard = {
    question: "Congratulations!",
    answer: "You have mastered all the cards.",
  };

  const firstCard = {
    question: "Start!",
    answer: "Press the next arrow to start the flashcards :)",
  };

  const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return [firstCard, ...shuffled];
  };

  const [state, setState] = useState({
    currentIndex: 0,
    isFlipped: false,
    userGuess: "",
    feedback: null,
    currentStreak: 0,
    longestStreak: 0,
    cards: shuffleArray(cardPairs)
  });

  const [masteredCards, setMasteredCards] = useState([]);

  const checkAnswer = () => {
    let newState = { ...state, isFlipped: true };

    if (cleanString(state.userGuess) === cleanString(state.cards[state.currentIndex].answer)) {
      newState.currentStreak = state.currentStreak + 1;
      newState.longestStreak = Math.max(state.longestStreak, newState.currentStreak);
      newState.feedback = true;
    } else {
      newState.currentStreak = 0;
      newState.feedback = false;
    }

    setState(newState);
  };

  const nextCard = () => {
    setState({
      ...state,
      currentIndex: (state.currentIndex + 1) % state.cards.length,
      isFlipped: false,
      feedback: null,
      userGuess: ""
    });
  };

  const prevCard = () => {
    setState({
      ...state,
      currentIndex: state.currentIndex === 0 ? state.cards.length - 1 : state.currentIndex - 1,
      isFlipped: false,
      feedback: null,
      userGuess: ""
    });
  };

  const shuffleCards = () => {
    setState({
      ...state,
      cards: shuffleArray(cardPairs),
      currentIndex: 0
    });
  };

  const markAsMastered = () => {
    if (state.currentIndex === 0) {
      nextCard();
      return;
    }

    const masteredCard = state.cards[state.currentIndex];
    setMasteredCards([...masteredCards, masteredCard]);

    const newCards = state.cards.filter((card, index) => index !== state.currentIndex);
    
    if (newCards.length === 1) {
      newCards.push(congratsCard);
    }

    setState({
      ...state,
      cards: newCards,
      currentIndex: 0
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>The Ultimate Sacrament Scholar!</h1>
        <h2>How well do you know the sacraments of the Catholic Church?</h2>
        <h4>Test your sacrament knowledge here!</h4>
        <h5>Number of cards: {state.cards.length}</h5>
        <h5>Current Streak: {state.currentStreak}, Longest Streak: {state.longestStreak}</h5>
      </div>
      <br />
      <FlashCard
        card={state.cards[state.currentIndex]}
        isFlipped={state.isFlipped}
        setIsFlipped={isFlipped => setState({ ...state, isFlipped })}
      />
      <input
        type="text"
        value={state.userGuess}
        onChange={(e) => setState({ ...state, userGuess: e.target.value })}
        placeholder="Enter your guess"
      />
      <button onClick={checkAnswer} type="button">Submit</button>
      {state.feedback !== null && <div>{state.feedback ? "Correct!" : "Incorrect!"}</div>}
      <br />
      <button onClick={prevCard} type="button">⭠</button>
      <button onClick={nextCard} type="button">⭢</button>
      <button onClick={shuffleCards} type="button">Shuffle</button>
      <button onClick={markAsMastered} type="button" >Mark as Mastered</button>
      <div style={{ color: 'white' }}>Mastered Cards: {masteredCards.length}</div>
      {masteredCards.map((card, index) => <div style={{ color: 'white' }} key={index}>{card.question}</div>)}
    </div>
  );
};

export default App;
