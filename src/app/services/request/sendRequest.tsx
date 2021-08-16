import { BookReservationType } from '@app/models/book-reservation'
import { apiLinks } from '@app/utils'
import axios from 'axios'
import React from 'react'
import authHeader from '../auth/auth-header'


const token = localStorage.getItem('token');

export const sendBoorowRequestOnline =  (book : BookReservationType) => {
    return axios.post(`${apiLinks.request.borrowBookOnline}`,book,{
        
        // headers : {
            // Authorization: `Bearer  ${token} `
            // Authorization :axios.defaults.headers.common['Authorization']
            // axios.defaults.headers.common['Authorization'] 
    })
        .then((res) => {
            return res.data.statusCode
    }).catch((err) => {
        return ("Net work error"+ err)
    })
}



