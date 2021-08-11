import React, {useState} from "react";
import { Container, Grid, Button, Icon, Pagination, Card, Image, Segment, Input } from 'semantic-ui-react';
import BookItem from "./BookItem";
import "./Books.css";
import DetailBook from "./DetailBooks";
import { BookType } from './MainLibrary'
import './test.css'


interface Props {
    booklist : BookType[] | undefined
}

const OnTrendingBookList:React.FC<Props> = ({booklist}) => {

    const [trigger, setTrigger] = useState<boolean>(false)
    const [book, setBook] = useState<BookType>()
    
   const handleClickItem = (clickedItem : BookType)  => {
        setTrigger(true )
         setBook(clickedItem)
        
    }
   

    return (
        <Container className="BooksContainer">
            <Segment className="BookList">
            <Button color="blue" icon content="Sort">
                Sort by
                <Icon name="sort alphabet ascending" />
            </Button>
            <br/>

            <Grid columns={5}>
                <Grid.Row className="GridRow">
                    {booklist?.map((book,key) => {
                        return (
                            <BookItem book={book}  handleClickItem={handleClickItem}/>
                        )
                    })}
                </Grid.Row>
            </Grid>
            <Container>
            <Pagination defaultActivePage={1} totalPages={5} className="Button"/> 
           
            </Container>
           

            </Segment>  
                 {trigger && <DetailBook book={book}/>}
        </Container>
    );
};

export default OnTrendingBookList;
