import React from 'react';

const Comment = ({ comment, replies = [] }) => {
    return (
        <div className='comment'>
            <div className='comment-content'>
                <div className='comment-author'>{comment.userId}</div>
                <div className='comment-body'>{comment.body}</div>
                {
                    replies.length > 0 && (
                        <div className='replies'>
                            {replies.map(reply => (
                                <Comment comment={reply} key={reply.id} replies={[]}/>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Comment;
