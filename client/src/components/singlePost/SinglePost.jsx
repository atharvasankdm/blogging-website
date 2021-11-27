import React, { useContext } from 'react'
import "./singlePost.css"
import {useLocation} from "react-router"
import axios from 'axios'
import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import {Context} from "../../context/Context"


function SinglePost() {


  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [updateMode,setUpdateMode] = useState(false);

  const PF = "http://localhost:5000/images/"
const {user} = useContext(Context);


  const location = useLocation()
 const path = location.pathname.split("/")[2]



 const [post,setPost] = useState({})

 useEffect(()=>{
const getPost = async()=>{
  const res = await axios.get("/posts/"+path)
  console.log(res)
 
  setPost(res.data);
  setTitle(res.data.title);
  setDesc(res.data.desc);

};

getPost();
 },[path]);


const handleDelete = async()=>{

  try{
    await axios.delete(`/posts/${post._id}`,{
data:{username:user.username},
    })

    window.location.replace("/");
  }
  catch(err){

  }


}


const handleUpdate = async () =>{
 try{
  await axios.put(`/posts/${post._id}`,{
    username:user.username,
    title:title,
    desc:desc
  })

 setUpdateMode(false);
 }
 catch(err){

 }
 
}



    return (
        <div className='singlePost'>
         <div className="singlePostWrapper">

           {post.photo && (
            <img 
             className='singlePostImg'
             src={PF +post.photo}
              alt="" />
           )}

           {
updateMode? <input type="text" value={title} className="singlePostTitleInput"  onChange={(e)=>{setTitle(e.target.value)}}/> : (

<h1 className="singlePostTitle">
          {title}



{post.username===user?.username && (
 <div className="singlePostEdit">

            
 <i className="singlePostIcon far fa-edit" onClick={()=>{setUpdateMode(true)}}></i>
 <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
</div>


)}

         
        </h1>

)

           }
             

        <div className="singlePostInfo">
          <span>
            Author:

            <Link to={`/?user=${post.username}`} className='link'>
            <b className="singlePostAuthor">
              
              {post.username}
           
           </b>
            </Link>
           
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {

          updateMode?<textarea className="singlePostDescInput" value={desc}  onChange={(e)=>{setDesc(e.target.value)}}/>:(
            <p className="singlePostDesc">
            {desc}
           </p>

          )}

          {updateMode &&   <button className='singlePostButton' onClick={handleUpdate}>Update</button>}
        
      
         </div>
        </div>
    )
}

export default SinglePost
