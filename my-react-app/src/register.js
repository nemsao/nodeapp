import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';

function Register() {

  const [formvalue,setFormvalue]=useState({username:"",password:""})
  const form = useRef(null)
  
  const hanleSubmit=(e)=>{
    e.preventDefault();
    

    fetch(`http://localhost:5000/api/v1/user/register`,{method:"POST",headers: { 'Content-Type': 'application/json' }
    ,body: JSON.stringify({
      username:formvalue.name,password:formvalue.password
    })})
      .then(
        res=>{
            const {token}=res.token
            localStorage.setItem('token',token)
            use_nav('/')}
      )
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
      });
}
const handleInput =(e)=>{
    const { name, value}= e.target;
    setFormvalue({...formvalue, [name]:value});
    //console.log(formvalue);
  }

  return (
    <div>
 <h1>From đăng ký</h1> 
<form ref={form} onSubmit={hanleSubmit}>
            <div>
             Ten <br/>
             <input type="text" value={formvalue.username} onChange={ handleInput} name="username" ></input> <br/>
           Mat khau <br/>
           <input type="text" value={formvalue.password} onChange={ handleInput} name="password" ></input> <br/>
             </div>

             <button type='submit'>Register</button><br/>
          </form>
    </div>
  );
}

export default Register;