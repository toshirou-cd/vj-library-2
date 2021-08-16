import react from 'react'
interface Categories {
    categories:string
}
interface Authors {
    authors:string
}
interface Departments {
    departments:string
}
export interface IBOOK {
    id: string,
      book_title: string,
      book_type: number,
      book_language: string,
      isbn: null | string,
      total_page: number,
      url: null | string,
      book_avatar: null,
      position:string | null,
      publisher: string,
      categorys: Categories[],
      authors: Authors[],
      departments: Departments[],
      status: number,
      book_description:string|null
}