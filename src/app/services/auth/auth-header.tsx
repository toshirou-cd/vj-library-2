import React from 'react'

const token = localStorage.getItem('token');
 const authHeader = () =>{
     return {
         Authorization: `Bearer ${token}`
        }
    } 
        


export default authHeader