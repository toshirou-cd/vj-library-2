import React, { useState } from "react";
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


const MyHistory: React.FC = () => {

    const [trigger, setTrigger] = useState<boolean>(false)
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
          <Item>
            <Item.Content>
              <Item.Header as="a" >
                <h3 onClick={() => setTrigger(true)}># REQUEST : 01</h3>
              </Item.Header>
              <Item.Meta>
                <span>Send date : 1/07/2021</span> <br />
              </Item.Meta>
              <Item.Extra>
                <Label icon="calendar alternate" content="Extend Request" />
              </Item.Extra>
            </Item.Content>
            <Item.Content>
              <ItemDescription>
                <h4>Number of books : 2</h4>
              </ItemDescription>
            </Item.Content>
            <Item.Description>
              <Label
                size="large"
                color="grey"
                floated="right"
                icon="info"
                labelPosition="left"
                content="Processing"
              />
            </Item.Description>
          </Item>

          <Item>
            <Item.Content>
              <Item.Header as="a">
                <h3># REQUEST : 02</h3>
              </Item.Header>
              <Item.Meta>
                <span>Send date : 1/07/2021</span> <br />
              </Item.Meta>
              <Item.Extra>
                <Label icon="book" content="Borrow Request" />
              </Item.Extra>
            </Item.Content>
            <Item.Content>
              <ItemDescription>
                <h4>Number of books : 2</h4>
              </ItemDescription>
            </Item.Content>
            <Item.Description>
              <Label
                size="large"
                color="grey"
                floated="right"
                icon="info"
                labelPosition="left"
                content="Processing"
              />
            </Item.Description>
          </Item>

          <Item>
            <Item.Content>
              <Item.Header as="a">
                <h3># REQUEST : 03</h3>
              </Item.Header>
              <Item.Meta>
                <span>Send date : 4/07/2021</span> <br />
              </Item.Meta>
              <Item.Extra>
                <Label icon="book" content="Borrow Request" />
              </Item.Extra>
            </Item.Content>
            <Item.Content>
              <ItemDescription>
                <h4>Number of books : 3</h4>
              </ItemDescription>
            </Item.Content>
            <Item.Description>
              <Label
                size="large"
                color="green"
                floated="right"
                icon="check"
                labelPosition="left"
                content="Processed"
              />
            </Item.Description>
          </Item>
        </Item.Group>
        <Pagination defaultActivePage={1} totalPages={5} className="Button" />
      </Segment>
        {trigger && <DetailReqHis/> }
     
    </Container>
  );
};

export default MyHistory;
