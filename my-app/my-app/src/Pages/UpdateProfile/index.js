import { useEffect, useState } from 'react'
import './index.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import AfterLogNavibar from '../../Components/Navbar/AfterLogNavibar'

const UpdateProfile = () => {

  const [User_id, setUser_Id] = useState(sessionStorage.getItem('id'));
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [publishedCourses, setPublishedCourses] = useState("");
  const [contact, setContact] = useState("");
  const[adharNo,setAdharNo]=useState("");
  const [data, setData] = useState([]);


   const [errors, setErrors] = useState('')

  const navigate = useNavigate()

  const updateprofile = (event) => {
    event.preventDefault();
    {
      const body = {
        fName,
        lName,
        email,
        qualification,
        publishedCourses,
        contact,
        adharNo,
        role,
            }

      // url to make updateprofile api call
      const url = `${URL}/user/updateprofile`

      // make api call using axios
      axios.put(url, body).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)
        if (result['status'] == 'success') {
          toast.success('Profile Updated')
          // navigate to profile component
          navigate('/profile')
        } else {
          toast.error('Data not get updated')
        }
      })
    }
  }
  const getData =()=>{
    axios.get(`${URL}/user/find/${User_id}`).then((response) => {
      const result = response.data;
      setData(response.data);
      setFirstName(result.data.fName);
      setLastName(result.data.lName);
      setEmail(result.data.email);
      setRole(result.data.role);
      setQualification(result.data.qualification);
      setPublishedCourses(result.data.publishedCourses);
      setContact(result.data.contact);
      setAdharNo(result.data.adharNo);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (

    <>
      <AfterLogNavibar />
      {/* {dataAdded && <h3 class="alert alartbox alert-primary" role="alert">{dataAdded}</h3>} */}

      <div className="wrapper">
        <div className="app-wrapper">
          <div>
            <h2 className="title">Register Your Details</h2>
          </div>
          <br />
          <form className="form-wrapper">
            <div className="row">
              <div className="col">
                <div className="name">
                  <label className="label">First Name</label>
                  <input
                    className="input"
                    type="text"
                    name='fname'
                    value={fName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                  {errors.fName &&  <p className="error">{errors.fName}</p>}
                </div>
              </div>
              <div className="col">
                <div className="name">
                  <label className="label">Last Name</label>
                  <input
                    className="input"
                    type="text"
                    name='lname'
                    value={lName}
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                  {errors.lName && <p className="error">{errors.lName}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="name">
                  <label className="label">Contact Number</label>
                  <input
                    className="input"
                    type="number"
                    min='7000000000'
                    max='9999999999'
                    name='contact'
                    value={contact}
                    onChange={(e)=>setContact(e.target.value)}
                  />
                   {errors.contact && ( 
                   <p className="error">{errors.contact}</p> 
                   )} 
                </div>
              </div>
              <div className="col">
                <div className="name">
                  <label className="label">Email</label>
                  <input
                    className="input"
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              
              <div className="col">
                <div className="name">
                  <label className="label">Qualification</label>
                  <input
                    className="input"
                    type="text"
                    name='qualification'
                    value={qualification}
                    onChange={(e)=>setQualification(e.target.value)}
                  />
                  {errors.qualification && <p className="error">{errors.qualification}</p>}
                </div>
              </div>
              <div className="col">
                <div className="name">
                  <label className="label">Published Course</label>
                  <input
                  readOnly
                    className="input"
                    type="text"
                    name='publishedCourses'
                    value={publishedCourses}
                    onChange={(e)=>setPublishedCourses(e.target.value)}
                  />
                  {errors.qualification && <p className="error">{errors.qualification}</p>}
                </div>
              </div>
            </div>

            <div>
              <button className='submit' onClick={updateprofile}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
   
  )
}

export default UpdateProfile

{/* <div>
<AfterLogNavibar/>
  <br></br>
  <br></br>
  <br></br>
  <h1>Update Profile</h1>
  <br></br>
 
  <div className="row">
    <div className="col"></div>
    <div className="col">
      <div className="form">
        <div className="mb-3">
          <label htmlFor="" className="label-control">
            Email address
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text"
            className="form-control"
            required = {true} 
            readOnly = {true}
          />
        </div>

                  <div className="mb-3">
          <label htmlFor="" className="label-control">
         Mobile Number
          </label>
          <input
            onChange={(e) => {
                setMobileNumber(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>

                    
        <div className="mb-3">
          <button onClick={updateprofile} className="btn btn-primary">
            Update Profile  
          </button>
          <br></br>
          <br></br>
          <div>
           Back To Profile  <Link to="/profile">click here</Link>
          </div>
          <br></br>
        </div>
      </div>
    </div>
    <div className="col"></div>
  </div>
</div> */}