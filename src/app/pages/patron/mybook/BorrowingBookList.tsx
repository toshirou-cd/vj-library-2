import React, {useState} from "react";
import { Container, Grid, Button, Icon, Pagination, Card, Image, Segment } from 'semantic-ui-react';
import "../mainLibrary/Books.css";
import DetailInventoryBook from "./DetailInventoryBook";
const BorrowingBookList = () => {
    const [trigger, setTrigger] = useState<boolean>(false)
    return (
        <Container className="BooksContainer">
            <Segment className="BookList">
            <Button color="blue" icon content="Sort">
                Sort by
                <Icon name="sort alphabet ascending" />
            </Button>
            <p></p>
            <Grid columns={5}>
                <Grid.Row className="GridRow">
                    <Grid.Column>
                        <Card className="InventoryBookCard" onClick={() => setTrigger(true)}>
                            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" className="Image"/>
                            <br/>
                            <Card.Meta className="BookType" textAlign="center">Online Book</Card.Meta>
                            <Card.Header textAlign="center">The fault in our stars</Card.Header>
                            <Card.Description textAlign="center">John Green</Card.Description>
                            <Card.Description textAlign="center">Expired day: 30-7-2021</Card.Description>
                            <Card.Description>
                                <Button color="red">Read</Button>
                                <Button color="blue" floated="right">Return</Button>
                            </Card.Description>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card className="InventoryBookCard">
                            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" className="Image"/>
                            <br/>
                            <Card.Meta className="BookType" textAlign="center">Offline Book</Card.Meta>
                            <Card.Header textAlign="center">Howl's moving castle</Card.Header>
                            <Card.Description textAlign="center">Diana Wynne Jones</Card.Description>
                            <Card.Description textAlign="center">Expired day: 30-7-2021</Card.Description>
                            <Card.Description>
                                <Button color="red">Read</Button>
                                <Button color="blue" floated="right">Return</Button>
                            </Card.Description>
                        </Card>
                    </Grid.Column>  
                </Grid.Row>
            </Grid>
            <Pagination defaultActivePage={1} totalPages={5} className="Button" /> 
            </Segment>  
                {trigger && <DetailInventoryBook/> } 
        </Container>
    );
};

export default BorrowingBookList;
