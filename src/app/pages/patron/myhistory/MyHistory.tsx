import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Icon,
  Input,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  Label,
  Menu,
  MenuHeader,
  MenuItem,
  Pagination,
  Search,
  Segment,
  TextArea,
} from "semantic-ui-react";
import DetailReqHis from "./DetailReqHis";
import "../mainLibrary/test.css";
import Axios from "axios";
import { getRequestForUser } from "@app/services/request/getRequest";
import { BookReservationDetailS } from "@app/models/book-reservation";



const MyHistory: React.FC = () => {
  const [trigger, setTrigger] = useState<boolean>(false)
   const [reservationDetail, setReservationDetail] = useState<BookReservationDetailS[]>([])

  const getRequest= () => {
    getRequestForUser().then(async (data) => {
    await setReservationDetail(data.data)
    console.log("reservation detail:",data.data)
  })
  }

  useEffect(() => {
    getRequest()
  }, [])

    
  return (
    <Container className="RequestContainer">
      <Menu>
        <MenuItem>
          <MenuHeader>
            <h3>Sent Request</h3>
          </MenuHeader>
        </MenuItem>
        <Menu.Menu position="right">
          <Input icon="search" placeholder="Search..." />
        </Menu.Menu>
      </Menu>
      <Segment className="BorrowReqList">
        <Button color="blue" icon content="Sort">
          Sort by
          <Icon name="sort alphabet ascending" />
        </Button>
        <Item.Group divided>
          {reservationDetail.map((val,id) => {
            return (

              <Item key={id}>
              <Item.Content>
                <Item.Header as="a" >
                  <h3 onClick={() => setTrigger(true)}># REQUEST : 01</h3>
                </Item.Header>
                <Item.Meta>
                  <span>Send date : {val.date_borrow}</span> <br />
                  <span>Send date : {val.date_return}</span>
                </Item.Meta>
                <Item.Extra>
                  <Label icon="calendar alternate" content={val.action} />
                </Item.Extra>
              </Item.Content>
              <Item.Content>
                <ItemDescription>
                  <h4>Number of books : {reservationDetail.length}</h4>
                </ItemDescription>
              </Item.Content>
              <Item.Description>
                <Label
                  size="large"
                  color="grey"
                  floated="right"
                  icon="info"
                  labelPosition="left"
                  content="Accept"
                  />
              </Item.Description>
            </Item>
            
            )
          })}
          

         
        </Item.Group>
        <Pagination defaultActivePage={1} totalPages={5} className="Button" />
      </Segment>
        {trigger && <DetailReqHis/> }
     
    </Container>
  );
};

export default MyHistory;
