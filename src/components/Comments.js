import React, {useEffect, useState} from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm'

const Comments = ({currentUserId, postId}) => {
    const [backendComments, setBackendComments] = useState({ comments: [] });
    const rootComments = backendComments.comments ? backendComments.comments.filter(
        (backendComment) => backendComment.parentId === null
    ) : [];
    
    const getReplies = commendId => {
        return backendComments.comments.filter(backendComment => backendComment.parentId === commendId)
    }

    const addComment = (text, parentId) => {
        // Assuming `currentUserId` is the user posting the comment
        const newComment = {
          userId: sessionStorage.getItem('username'),
          body: text,
          parentId: null,
          id: Math.floor(Math.random() * 20) * 3 * 5 * 1000
        };
    
        const updatedComments = backendComments.comments.length !== 0
    ? [newComment, ...backendComments.comments]
    : [newComment];

    fetch(`http://localhost:8000/post/${postId}/`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
        id: postId,
        username: currentUserId,
        text: backendComments.text,
        upvotes: backendComments.upvotes,
        title: backendComments.title,
        comments: updatedComments,
        }),
    })
        .then((res) => res.json())
        .then((resp) => {
        // Assuming the server returns the updated post with the new comment
        setBackendComments(resp);
        })
        .catch((err) => {
        console.error('Failed to add comment:', err.message);
        });
    };
    

    useEffect(() => {
        fetch(`http://localhost:8000/post/${postId}`).then((res) => {
            return res.json()  
        }).then((resp) => {
            setBackendComments(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    return (
        <div className='comments'>
            <h3 className='comments-title'>Comments</h3>
            <div className='comment-form-title'>Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <div className='comments-container'>
                {rootComments.map(rootComment => (
                    <Comment key={rootComment.id} comment={rootComment} replies={getReplies(rootComment.id)}/>
                ))}
            </div>
        </div>
    );
}

export default Comments;