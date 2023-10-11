
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
        console.log(user)

      //  post data on the server side
      fetch('http://localhost:5000/users',{
        method: 'POST',
        headers:{
          'content-type' : "application/json"
        },
        body:JSON.stringify(user)
      } )
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const newUsers =[...users, data]
        setUsers(newUsers)


        form.reset()
      })
       
        
 }

  return (
   <section>
   <div>
   <h1 className='text-center font-bold text-4xl text-primary my-10'>Users management system: {users.length}</h1>
   <div>
     {users.map(user => <p className='text-center text-xl font-bold' key={user.id}>{user.id} {user.name} {user.email}</p> )}
   </div>
 </div>

 <div className='mt-10'>
 <div className="hero">
 <div className="hero-content flex-col">
   <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
     <form  onSubmit={handleSubmit} className="card-body">
       <div className="form-control">
         <label className="label">
           <span className="label-text">Name</span>
         </label>
         <input type="text" name='name' placeholder="name" className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className="label-text">Email</span>
         </label>
         <input type="email" name='email' placeholder="email" className="input input-bordered" required />
       </div>
       <div className="form-control mt-6">
         <button  type='submit' className="btn btn-primary">Submit</button>
       </div>
     </form>
   </div>
 </div>
</div>
 </div>
   </section>
  )
}

export default App
