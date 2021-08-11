import React from 'react'
import { Card, Grid, Segment, Image, Button } from 'semantic-ui-react'
import "./Books.css";
import { BookType } from './MainLibrary';

interface Props {
    book : BookType | undefined
}


const DetailBook:React.FC<Props> = ({book}) => {
    return (
        <Segment>
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Card className="BookImageCard">
                            <Image src={book?.book_avatar} className="BookImage"/>
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
                        <Button floated="right" color="yellow" icon="plus square" content="Borrow this book"/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <h4>Description : The Fault In Our Stars is a fabulous book about a young teenage girl who has been diagnosed with lung cancer and attends a cancer</h4>
                        <h4> support group. ... Hazel and Augustus embark on a roller coaster ride of emotions, including love, sadness and romance, while searching for the</h4>
                        <h4>author of their favourite book</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default DetailBook