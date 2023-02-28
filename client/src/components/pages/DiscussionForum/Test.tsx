import React, { useEffect, useState } from 'react'

function GetNameByuserid(userid:string){
    interface User {
  
      nameWithInitials:string;
  
     
    }
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      fetch(`http://localhost:8080/api/vi/users/${userid}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, []);
  
    return user?.nameWithInitials
  }
  
  
function Test() {
  return (
    <div>
      {GetNameByuserid('02')}
    </div>
  )
}

export default Test
