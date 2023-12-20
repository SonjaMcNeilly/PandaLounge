import React, { useState } from 'react';
import Header from '../components/Header.js';
import { Link, useNavigate, NavLink } from 'react-router-dom';

const CreatePost = () => {

    const [title, changeTitle] = useState("");
    const [text, changeText] = useState("");
    const upvotes = 0;
    const comments = [];
    

    const username = sessionStorage.getItem('username');

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const postdata = {username, title, text, upvotes, comments};

        fetch('http://localhost:8000/post', {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(postdata)
        }).then((res) => {
            navigate('/');
        }).catch((err) => {
            console.log(err.message);
        })

    }

    return (
        <div>
            <Header />
            <div className="container container-create d-flex justify-content-center">     
                <form onSubmit={handlesubmit}>
                    <div>
                        <h1>Create Post</h1>
                            <div>
                                <div className="form-group ">
                                    <label>Title</label>
                                    <input className='title' value={title} onChange={e => changeTitle(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Text</label>
                                    <textarea value={text} onChange={e => changeText(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="">Submit</button>
                                <NavLink className="regular-btn" to="/">Back</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default CreatePost;
