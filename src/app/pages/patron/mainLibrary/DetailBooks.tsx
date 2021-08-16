import { IBOOK } from '@app/models/book';
import { addBookToCart } from '@app/store/actions/cartActions';
import { RootStore } from '@app/store/myStore';
import { CartState } from '@app/store/types';
import React, { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Segment, Image, Button, TextArea, Label } from 'semantic-ui-react'
import "./Books.css";

type BookProps = {
    book : IBOOK 
}


const DetailBook:React.FC<BookProps>= ({book}) => {
     const dispatch:Dispatch<any> = useDispatch()
     const carte = useSelector((state:RootStore) => state)
    const handleOnClick = () => {
        dispatch(addBookToCart(book))
    }
    return (
        <Segment>
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Card className="BookImageCard">
                            {/* <Image src={book?.book_avatar} className="BookImage"/> */}
                            <Image src={book?.book_avatar} />
                        </Card>
                    </Grid.Column>
                    <Grid.Column textAlign="left">
                        <h1>Title : {book?.book_title}</h1>
                        <br/>
                        <h4>Author : {book?.authors}</h4>
                        <br/>
                        <h4>Publisher :{book?.publisher}</h4>
                        <br/>
                        <h4>Department :{book?.departments}</h4>
                        <br/>
                        <h4>Category: {book?.categorys}</h4>
                        <br/>
                        <h4>Type: {book?.book_type}</h4>
                    </Grid.Column>
                    <Grid.Column>
                        <Button onClick={handleOnClick} floated="right" color="yellow" icon="plus square" content="Borrow this book"/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <TextArea fluid>{book.book_description}</TextArea>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default DetailBook