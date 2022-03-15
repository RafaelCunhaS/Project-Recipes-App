import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import DoneRecipesCardTag from './DoneRecipesCardTag';

function DoneRecipesCard(props) {
  const [showLink, setShowLink] = useState(false);
  const { doneRecipes } = props;
  const shareClick = ({ target: { value, name } }) => {
    const currentUrl = `http://localhost:3000/${name}s/${value}`;
    navigator.clipboard.writeText(currentUrl);
    setShowLink(true);
  };

  return (
    doneRecipes.map(
      ({ image, id, category, name, nationality, tags, type, doneDate }, index) => (
        <div key={ id }>
          <Link
            to={ `/${type}s/${id}` }
          >
            <img
              className="favoriteRecipesImg"
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="card"
            />
          </Link>
          {type === 'drink'
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${doneRecipes[index].alcoholicOrNot} - ${category}`}
              </p>
            ) : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${nationality} - ${category}`}
              </p>
            )}
          <Link
            to={ `/${type}s/${id}` }
          >
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
          <input
            name={ type }
            value={ id }
            type="image"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            alt="Share"
            onClick={ shareClick }
          />
          {doneRecipes[0] !== undefined
            ? (
              <DoneRecipesCardTag tags={ tags } index={ index } />
            ) : null }
          {showLink && <p>Link copied!</p>}
        </div>
      ),
    )
  );
}

DoneRecipesCard.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default DoneRecipesCard;
