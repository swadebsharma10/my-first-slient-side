
import { useEffect, useState } from 'react';
import './App.css';

function App() {
 const [users, setUsers] = useState([]);

 useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))

 }, []);


 const handleSubmit =(event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        
        const user ={name, email};
        console.log(user);


        fetch('http://localhost:5000/users',{
          method: "POST",
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify(user)
        }
        )
        .then(res => res.json())
        .then(data =>{
          console.log('inside post response', data)
          const newUsers = [...users, data];
          setUsers(newUsers)

          form.reset();
        })
        
 }

  return (
   <section>
   <div>
   <h1 className='text-center font-bold text-4xl text-primary my-10'>Users management system: {users.length}</h1>
    <div className='text-center mb-10'>
    <form onSubmit={handleSubmit}>
      <input className='border mb-3' type="text" name="name" id="" placeholder='Name' />
      <br />
      <input className='border mb-3' type="email" name="email" placeholder='Email' id="" />
      <br />
      
      <input className='btn btn-info' type="submit" value="Add User" />
    </form>
    </div>

   <div>
     {users.map(user => <p className='text-center font-bold' key={user.id}>{user.id} {user.name} {user.email}</p> )}
   </div>
 </div>


   </section>
  )
}

export default App
