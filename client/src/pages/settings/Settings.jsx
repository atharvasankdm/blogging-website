import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"
import { Context } from "../../context/Context"
import axios from "axios"


function Settings() {

    const [file, setFile] = useState(null);
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [update,setUpdate] = useState(false)
    const { user,dispatch } = useContext(Context);

    const PF = "http://localhost:5000/images/"


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({TYPE:"UPDATE_START"})

        const updatedUser = {
            userId:user._id,
            username,
            email,
            password,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;

            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;

            try {
                await axios.post("/upload", data);
            } catch (err) {

            }
        }


        try {
            setUpdate(true);
           const res =  await axios.put("/users/"+user._id, updatedUser)
            dispatch({TYPE:"UPDATE_START",payload:res.data})
           
        }
        catch (err) {
            dispatch({TYPE:"UPDATE_FAILURE"})
        }



    };

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>

                <form className='settingsForm' onSubmit={handleSubmit}> 

                    <label className='PPText' >Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file): PF+user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                            onChange = {(e)=>{setFile(e.target.files[0])}}
                        />
                    </div>

                    <label>Username</label>
                    <input type="text" placeholder="enter username" name='name' onChange = {e=>setUsername(e.target.value)} />

                    <label>Email</label>
                    <input type="email" placeholder="example@gmail.com" name='email' onChange = {e=>setEmail(e.target.value)}  />

                    <label>Password</label>
                    <input type="password" placeholder='Password' name='password' onChange = {e=>setPassword(e.target.value)}  />

                    <button className='settingsSubmitButton' type='submit'>Update</button>

                    {update && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}> Successfully updated. Please relogin to view changes</span>}
                </form>
            </div>
            <Sidebar />

        </div>
    )
}

export default Settings
