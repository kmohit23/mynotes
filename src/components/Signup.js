import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",confirmpassword:"",})
    // used to navigate particular endpoint
    let navigate = useNavigate()

    const handleSubmit = async (e)=>{
        // prevents from reload of page while click
        e.preventDefault();
        const response= await fetch("http://localhost:8000/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const json= await response.json()
        console.log(json);

        if(json.success){
            // Save the authToken and redirect 
            localStorage.setItem('token',json.authToken)
            navigate("/")
        }
    }

    const onInput=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
    <form className="contanier row g-3" onSubmit={handleSubmit}>
        <div className="row-auto">
            <label htmlFor="name" ><strong>Name</strong></label>
            <input type="text" className="form-control" placeholder='Enter Your Name ' name='name' id="name"  onChange={onInput} minLength={4} required />
        </div>
        <div className="row-auto">
            <label htmlFor="email" ><strong>Email</strong></label>
            <input type="text" className="form-control" placeholder='Enter Your Mail Id ' name='email' id="email"  onChange={onInput}  />
        </div>
        <div className="row-auto">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onInput}  minLength={5} required/>
        </div>
        <div className="row-auto">
            <label htmlFor="confirmpassword"><strong>ConfirmPassword</strong></label>
            <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' placeholder="ConfirmPassword"  onChange={onInput} minLength={5} required />
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-dark mb-3">Sign Up</button>
        </div>
    </form>
</div>
  )
}

export default Signup
