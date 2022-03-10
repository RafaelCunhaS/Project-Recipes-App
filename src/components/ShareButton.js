import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const currentUrl = window.location.href;
  const [showLink, setShowLink] = useState(false);

  const shareClick = () => {
    navigator.clipboard.writeText(currentUrl);
    setShowLink(true);
  };

  return (
    <div>
      <input
        type="image"
        src={ shareIcon }
        data-testid="share-btn"
        alt="Share"
        onClick={ shareClick }
      />
      {showLink && <p>Link copied!</p>}
    </div>
  );
}
