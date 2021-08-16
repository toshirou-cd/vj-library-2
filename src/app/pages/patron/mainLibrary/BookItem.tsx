import { IBOOK } from '@app/models/book'
import React, { useState } from 'react'
import { Card, CardProps, Grid, Image} from 'semantic-ui-react'

interface Props{
    handleClickItem : (clickedItem: IBOOK) => void;
    book: IBOOK
    
}

const BookItem:React.FC<Props> = ({book,handleClickItem}) => {
    
    
    return (
                   <Grid.Column>
                        <Card className="Card" onClick={() =>handleClickItem(book)} >
                            <Image src={book.book_avatar} className="Image"/>
                            <br/>
                            <Card.Header textAlign="center">{book.book_title}</Card.Header>
                            <Card.Description textAlign="center">{book.authors}</Card.Description>
                        </Card>
                    </Grid.Column>
    )
}

export default BookItem
