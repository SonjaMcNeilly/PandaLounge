import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import Post from '../components/Post'
import Header from '../components/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/posts.css';

const Posts = () => {

    const [emppost, emppostchange] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:8000/post").then((res) => {
          return res.json()  
        }).then((resp) => {
            emppostchange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const postsPerPage = 5;
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const posts = emppost.slice(firstIndex, lastIndex);
    const npage = Math.ceil(emppost.length / postsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }
    
    function changeCPage(id) {
        setCurrentPage(id);
    }

    return (
        <div>
            <Header />
            <div className='container posts-title'>
                <h2>Posts</h2>
                {posts &&
                posts.map((item, index) => (
                    <NavLink to={`/post/${index + 1}`} key={index} className="post-detail">
                        <Post username={item.username} title={item.title} text={item.text} numLikes={item.upvotes} numComments={item.comments.length} />
                    </NavLink>
                ))}
            </div>
            <nav className='page'>
                <ul className='pagination'>
                    <li className='page-item'>
                        <NavLink to='/' className='page-link' onClick={() => prePage()}>Prev</NavLink>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <NavLink to='/' className='page-link' onClick={() => nextPage()}>Next</NavLink>
                    </li>
                </ul>
            </nav>
            <footer class="footer">
                <p class="copyright">Copyright 2023 Panda Lounge</p>
            </footer>
        </div>
    )
}

export default Posts;