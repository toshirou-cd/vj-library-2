import { IBOOK } from "@app/models/book";
import { RootStore } from "@app/store/myStore";
import { UserState } from "@app/store/types";
import React, {useState} from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Container, Grid, Button, Icon, Pagination, Card, Image, Segment, Input } from 'semantic-ui-react';
import BookItem from "./BookItem";
import "./Books.css";
import DetailBook from "./DetailBooks";
import './test.css'


interface Props {
    booklist : IBOOK[] 
}

const OnTrendingBookList:React.FC<Props> = ({booklist}) => {

    const [trigger, setTrigger] = useState<boolean>(false)
    
    const [book, setBook] = useState<any>()

    const userState = useSelector((state:RootStore) => state.CartReducer)


   const handleClickItem = (clickedItem )  => {
        setTrigger(true )
         setBook(clickedItem)
        console.log("cart State :" , userState.books)
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
                            <BookItem key={key} book={book}  handleClickItem={handleClickItem}/>
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
