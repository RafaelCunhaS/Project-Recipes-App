import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipesCardTag(props) {
  const { tags, index } = props;
  return (
    <div>
      {tags.length > 0
        ? (
          tags.map((value, indice) => (
            <p
              data-testid={ `${index}-${value}-horizontal-tag` }
              key={ indice }
            >
              {value}
            </p>
          ))
        ) : null }
    </div>
  );
}

DoneRecipesCardTag.propTypes = {
  tag: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DoneRecipesCardTag;
