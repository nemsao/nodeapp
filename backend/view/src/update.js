import {React ,useEffect,useState,useRef}from "react";
import { Formik, Form, Field } from 'formik';
import { Redirect,useParams} from 'react-router-dom';

function update(){
    const [pd, setPd] = useState('');
    const [formvalue,setFormvalue]=useState({name:"",gia:"",img:"",mota:"",ngaycapngat:"",ngaytao:""})
     const { data } = useParams();
     const form = useRef(null)
    console.log(data)
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/product/detail?id=${data}`).then(response => response.json())
          .then(
             sp=>{
                setPd(sp.map(prod=>(<div>
                <div>{prod.name}</div><br/>
                <div>{prod.gia}</div><br/>
                <img src={prod.img}></img><br/>
                <div>{prod.mota}</div><br/>
                
            
                </div> )))
             }


          )
          .catch(error => console.log(error));
      }, []);
    

      
    
    const hanleSubmit=(e )=>{
        e.preventDefault();
        
  
        fetch(`http://localhost:5000/api/v1/product/update?_id= ${data}`,{method:"POST",headers: { 'Content-Type': 'application/json' }
        ,body: JSON.stringify({
           id:data, name:formvalue.name,gia:formvalue.gia,img:formvalue.img,mota:formvalue.mota,ngaycap:formvalue.ngaycapngat,ngaytao:formvalue.ngaytao
        })})
          .then(response => {
            // Xử lý kết quả từ backend
            console.log(response);
          })
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
         
          <form ref={form} onSubmit={hanleSubmit}>
            <div>
                Thông tin cũ 
                {pd}

                Nhap thông tin mới <br/>
             Ten <br/>
             <input type="text" value={formvalue.name} onChange={ handleInput} name="name" ></input> <br/>
           Gia<br/>
             <input type="text" value={formvalue.gia} onChange={ handleInput}  name="gia" ></input><br/>
             Mo ta<br/>
             <input type="text" value={formvalue.mota} onChange={ handleInput}  name="mota"></input><br/>
            Ngay Cap<br/>
             
             <input type="text"  value={formvalue.ngaycapngat} onChange={ handleInput} name="ngaycapngat" ></input><br/>
            Ngay Tao<br/>
             <input type="text" value={formvalue.ngaytao} onChange={ handleInput} name="ngaytao" ></input><br/>
             Hinh anh<br/>
            
             <input type="file" onChange={ handleInput}  name="img" ></input><br/>
             <br/>
             <button type='submit'>Update</button><br/>
             </div>
          </form>
          
        </div>
      );
}


export default update;