import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard(props) {
  const [showLink, setShowLink] = useState(false);
  const { favorites, favorite, favoriteClick } = props;

  const shareClick = ({ target: { value, name } }) => {
    const currentUrl = `http://localhost:3000/${name}s/${value}`;
    navigator.clipboard.writeText(currentUrl);
    setShowLink(true);
  };

  return (
    favorites.map(
      ({ image, id, category, name, nationality, alcoholicOrNot, type }, index) => (
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
                {`${alcoholicOrNot} - ${category}`}
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
          <input
            name={ type }
            value={ id }
            type="image"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            alt="Share"
            onClick={ shareClick }
          />
          {showLink && <p>Link copied!</p>}
          <input
            value={ id }
            type="image"
            src={ favorite ? blackHeart : whiteHeart }
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="Favorite"
            onClick={ favoriteClick }
          />
        </div>
      ),
    )
  );
}

FavoriteRecipesCard.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FavoriteRecipesCard;
