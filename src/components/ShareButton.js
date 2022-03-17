import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IN_PROGRESS_CUT } from '../MAGIC_NUMBER';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const location = useLocation();
  const currentUrl = window.location.href;
  const [showLink, setShowLink] = useState(false);

  const shareClick = () => {
    if (location.pathname.includes('progress')) {
      navigator.clipboard.writeText(currentUrl.slice(0, IN_PROGRESS_CUT));
      setShowLink(true);
    } else {
      navigator.clipboard.writeText(currentUrl);
      setShowLink(true);
    }
  };

  return (
    <div>
      <input
        type="image"
        src={ shareIcon }
        data-testid="share-btn"
        alt="Share"
        onClick={ shareClick }
        width="35rem"
        height="35rem"
      />
      {showLink && <p>Link copied!</p>}
    </div>
  );
}
