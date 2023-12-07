import React, { useEffect, useState } from 'react';
import { Link ,RouterProvider} from 'react-router-dom';



function List() {
   
  const [data, setData] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/product/list') // Đổi "/api/data" thành đường dẫn đến các định tuyến bạn đã định nghĩa trong backend Express.js
      .then(response => response.json())
      .then(
        
        data => {
             
            const [Gia,setGia]=useState(data.gia)
            if(localStorage.getItem("token") ){
              setGia("Lien he")
   
  }
            setData( data.map(sp =><div><div>{sp.name}</div><br/>
               <div>{Gia||sp.gia}</div><br/>
               <img src={sp.img}></img><br/>
               <div>{sp.mota}</div><br/>
              
               <Link  to={`/update/${sp._id}`}>Upadte product </Link>
               <a  href={`http://localhost:5000/api/v1/product/delete?id=${sp._id}`}>Delete product </a>
               </div> ))  ;
            console.log(data);    }
      )
      .catch(error => console.log(error));
  }, []);

  return (
    <div>

      <h1>Data from backend:</h1>
      <p>{data}</p>
    </div>
  );
}

export default List;