import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Logout } from '../../context/Actions';
import { Context } from '../../context/Context';
import './topbar.css'


function Topbar() {

const [search,setSearch] = useState(false);
    const PF = "http://localhost:5000/images/"
    const {user,dispatch} = useContext(Context);

const handleLogout= ()=>{
    dispatch(Logout());
}

    return (
        <div className="top">
            <div className="topLeft">
<a href="https://in.pinterest.com/"><i className="topIcon fab fa-pinterest"></i></a>
<a href="https://www.facebook.com/"> <i className="topIcon fab fa-facebook-square"></i></a>
<a href="https://www.instagram.com/"><i className="topIcon fab fa-instagram-square"></i></a>
<a href="https://twitter.com/"> <i className="topIcon fab fa-twitter-square"></i></a>
                
               
                
                
               
            </div>

            <div className="topCenter">
                
                    <ul className="topList">
                        <li className="topListItem">

                            <Link to="/" className="link"> HOME</Link>
                        </li>
                        <li className="topListItem">
                        <Link to="/" className="link"> ABOUT</Link>
                            
                            </li>
                        <li className="topListItem">
                        <Link to="/" className="link"> CONTACT</Link>
                        
                            </li>
                        <li className="topListItem">
                            
                        <Link to="/write" className="link"> WRITE</Link>
                            </li>
                        <li className="topListItem" onClick={handleLogout}>
                            
                        <Link to="/" className="link"> 
                        {user && "LOGOUT"}
                        </Link>
                            </li>

                    </ul>

               

            </div>

            <div className="topRight">

{user?(

    <Link className='link' to="/settings">
        
        <img className='topImage' 
         src={PF+user.profilePic}
         alt="" /></Link>
    

)
:
(

    <ul className="topList">
        <li className="topListItem">
<Link className="link" to="/register">REGISTER</Link>
        </li>

        <li className="topListItem">
<Link className="link" to="/login">LOGIN</Link>
        </li>
    </ul>


)
}

{
search ? <input type="text" placeholder='search posts' className='topListSearch'/> :<i class="SearchIcon fas fa-search" onClick = {e=>setSearch(true)} ></i>

}



            </div>

        </div>
    )
}

export default Topbar;
