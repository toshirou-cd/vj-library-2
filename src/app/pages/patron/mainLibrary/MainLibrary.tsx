import React, { useEffect, useState } from 'react';
import { Container, Menu,MenuItem, Search, Segment, MenuMenu } from 'semantic-ui-react';
import OnTrendingBookList from "./OnTrendingBookList";
import NewBookList from './NewBookList';
import { useQuery } from 'react-query';
import './test.css'

    interface Categories {
        categories:string
    }
    interface Authors {
        authors:string
    }
    interface Departments {
        departments:string
    }

  export interface BookType  {
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

  const getBook = async ():Promise<BookType[]> => {
     return await (await (await fetch("http://libapi.hisoft.vn/books/getbook?productPerPage=5"))
          .json()
          .then(response => response.data));
}
  
const MainLibrary:React.FC= () => {

    const [activeName, setActiveName] = useState<string>('On trending')
    const {data,isLoading, error} = useQuery<BookType[]>('books',getBook)
   console.log("data",data)
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Something 's wrong !</div>
   
    return (
        <Container className="BooksContainier">
            <Menu secondary pointing >
                <MenuMenu>
                    <MenuItem  name='On trending'
                               active={activeName === 'On trending'}
                               onClick={()=> setActiveName("On trending")} />
                    <MenuItem  name='New'
                                 active={activeName === 'New'}
                                 onClick={() => setActiveName("New")}/>
                    
                </MenuMenu>
                <Menu.Menu position='right'>
                    <Search />
                </Menu.Menu>
            </Menu>
            
            <Segment>
                {activeName === "On trending" ? <OnTrendingBookList booklist={data}/>: <NewBookList/>}
                
            </Segment>
            
        </Container>
    )
}

export default MainLibrary
