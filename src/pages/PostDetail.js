// PostDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Comments from '../components/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostDetail = ({ match }) => {
    const { postId } = useParams();

    const [emppost, emppostchange] = useState([]);
    const [user, userchange] = useState("");
    const [isLiked, setLiked] = useState(false);
    const [likedposts, updateLikedPosts] = useState([]);

    console.log(likedposts.userId);
    useEffect(() => {
        fetch(`http://localhost:8000/post/${postId}`)
            .then((res) => res.json())
            .then((resp) => {
                emppostchange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/likedposts/${postId}`)
            .then((res) => res.json())
            .then((resp) => {
                updateLikedPosts(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/user/${sessionStorage.getItem('username')}`)
            .then((res) => res.json())
            .then((resp) => {
                userchange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handleLikeClick = () => {
        setLiked(!isLiked);

        if (!isLiked) {
            fetch(`http://localhost:8000/post/${postId}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                id: postId,
                username: emppost.username,
                text: emppost.text,
                upvotes: emppost.upvotes + 1,
                title: emppost.title,
                comments: emppost.comments,
                }),
            })
            .then((res) => res.json())
            .then((resp) => {
            // Assuming the server returns the updated post with the new comment
                emppostchange(resp);
            })
            .catch((err) => {
                console.error('Failed to add comment:', err.message);
            });
        }

        if (isLiked) {
            fetch(`http://localhost:8000/post/${postId}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                id: postId,
                username: emppost.username,
                text: emppost.text,
                upvotes: emppost.upvotes - 1,
                title: emppost.title,
                comments: emppost.comments,
                }),
            })
            .then((res) => res.json())
            .then((resp) => {
            // Assuming the server returns the updated post with the new comment
                emppostchange(resp);
            })
            .catch((err) => {
                console.error('Failed to add comment:', err.message);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row post-container'>
                    <div className='col-lg-12 post-title d-flex justify-content-between align-items-center'>
                        <h2>{emppost.title}</h2>
                        <FontAwesomeIcon
                            className={`like ${isLiked ? 'solid-heart' : ''}`}
                            icon={isLiked ? ['fas', 'heart'] : ['far', 'heart']}
                            onClick={handleLikeClick}
                        />
                    </div>
                    <hr />
                    <div className='col-lg-12 post-text'>
                        <p>{emppost.text}</p>
                    </div>
                </div>
                <Comments currentUserId={sessionStorage.getItem('username')} postId={postId} />
            </div>
        </div>
    );
};

export default PostDetail;
