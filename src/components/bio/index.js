import React from 'react';
import IconButtonBar from '../icon-button-bar';
import TypingText from './typingText';
import Image from '../image';
import './style.scss';

function Bio({ author }) {
  const { bio, social } = author;

  if (!author) return null;

  return (
    <div className="bio">
      <Image className="thumbnail" src={bio.thumbnail} alt="thumbnail" />
      <div className="introduction korean">
        <TypingText author={author} />
        <div className="social-links">
          <IconButtonBar links={social} />
        </div>
      </div>
    </div>
  );
}

export default Bio;
