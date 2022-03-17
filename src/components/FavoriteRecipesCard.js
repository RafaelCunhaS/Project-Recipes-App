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
    <div className="recipes-cards-container">
      {favorites.map(
        ({ image, id, category, name, nationality, alcoholicOrNot, type }, index) => (
          <div key={ id } className="favorites-cards">
            <Link
              to={ `/${type}s/${id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt="card"
              />
            </Link>
            <div className="favorites-cards-column">
              <div className="text">
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
                  <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
                </Link>
              </div>
              <div className="share-fav-btns">
                <input
                  name={ type }
                  value={ id }
                  type="image"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Share"
                  onClick={ shareClick }
                  width="35rem"
                  height="35rem"
                />
                {showLink && <p>Link copied!</p>}
                <input
                  value={ id }
                  type="image"
                  src={ favorite ? blackHeart : whiteHeart }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  className={ favorite ? 'heart' : undefined }
                  alt="Favorite"
                  onClick={ favoriteClick }
                  width="35rem"
                  height="35rem"
                />
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorite: PropTypes.bool.isRequired,
  favoriteClick: PropTypes.func.isRequired,
};

export default FavoriteRecipesCard;
