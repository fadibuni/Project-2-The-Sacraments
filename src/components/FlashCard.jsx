import PropTypes from 'prop-types';
import './FlashCard.css';

const FlashCard = ({ card, isFlipped, setIsFlipped }) => {
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard} >
      <div className="card-inner">
        <div className="card-front" style={{ backgroundColor: card.color }}>
          <p>{card.question}</p>
        </div>
        <div className="card-back" style={{ backgroundColor: card.color }}>
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

FlashCard.propTypes = {
  card: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  setIsFlipped: PropTypes.func.isRequired,
};

export default FlashCard;
