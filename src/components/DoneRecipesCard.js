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
    <div className="recipes-cards-container">
      {doneRecipes.map(
        ({ image, id, category, name, nationality, tags, type, doneDate }, index) => (
          <div key={ id } className="done-recipes-card">
            <Link
              to={ `/${type}s/${id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt="card"
              />
            </Link>
            <div className="done-recipes-card-column">
              {type === 'drink'
                ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="done-recipes-category"
                  >
                    {`${doneRecipes[index].alcoholicOrNot} - ${category}`}
                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="done-recipes-category"
                  >
                    {`${nationality} - ${category}`}
                  </p>
                )}
              <Link
                to={ `/${type}s/${id}` }
              >
                <h2 className="h2" data-testid={ `${index}-horizontal-name` }>{name}</h2>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {`Done in: ${doneDate}`}
              </p>
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
                  <div className="tags-container">
                    <DoneRecipesCardTag tags={ tags } index={ index } />
                  </div>
                ) : null }
              {showLink && <p>Link copied!</p>}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

DoneRecipesCard.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default DoneRecipesCard;
