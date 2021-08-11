import React from 'react'
import { Card, Grid, Segment, Image, Button } from 'semantic-ui-react'
import "../mainLibrary/Books.css";

const DetailBook = () => {
    return (
        <Segment>
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Card className="BookImageCard">
                            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" className="BookImage"/>
                        </Card>
                    </Grid.Column>
                    <Grid.Column textAlign="left">
                        <h1>The fault in our stars</h1>
                        <br/>
                        <h4>Author: John Green</h4>
                        <br/>
                        <h4>Publisher: Penguin Random House US</h4>
                        <br/>
                        <h4>Department: IT</h4>
                        <br/>
                        <h4>Category: Novel, Science Fiction, Drama</h4>
                        <br/>
                        <h4>Type: Online Book</h4>
                        <br/>
                        <h4>Request day: 1-7-2021</h4>
                        <br/>
                        <h4>Expired day: 30-7-2021</h4>
                    </Grid.Column>
                    <Grid.Column>
                        <Button color="red" content="Read" size="massive"/>
                        <br/>
                        <br/>
                        <Button color="blue" content="Return" size="massive"/>
                        <br/>
                        <br/>
                        <Button color="yellow" content="Extend" size="massive"/>
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