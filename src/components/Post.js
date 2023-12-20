import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = ({ title, text, username, numLikes, numComments }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '15px',
        background: 'white',
      }}
    >
      <div className="row">
        <div className="col-md-6" style={{ marginBottom: '5px', fontWeight: 500, fontSize: '14px' }}>
          {username}
          <div style={{ marginBottom: '5px', fontWeight: 800, fontSize: '18px' }}>
            {title}
          </div>
          <div>{text}</div>
        </div>
        <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
                <p className='like-info'>
                    {numLikes}
                    <FontAwesomeIcon className="heart" icon="fa-solid fa-heart" />
                </p>
                <p className='like-info'>
                    {numComments}
                    <FontAwesomeIcon className="heart" icon="fa-solid fa-comment" />
                </p>
            </div>
        </div>
      </div>
      </div>
  );
};

export default Post;
