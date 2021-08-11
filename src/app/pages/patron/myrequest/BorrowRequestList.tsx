import React from "react";
import {
  Button,
  Container,
  Icon,
  Input,
  Item,
  ItemDescription,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import '../mainLibrary/test.css';
const BorrowRequestList = () => {
  return (
    <Container className="BorrowReqList">
      <Button color="blue" icon content="Sort">
        Sort by
        <Icon name="sort alphabet ascending" />
      </Button>
      <Item.Group divided>
        <Item>
          <Item.Image
            size="small"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content verticalAlign="top">
            <Item.Header as="a">The fault in our stars</Item.Header>
            <Item.Meta>
              <span>John Green</span>
            </Item.Meta>
            <ItemDescription>
              <Input fluid size="big" focus placeholder="Your Message..." />
            </ItemDescription>
            <Item.Extra>
              <Label icon="laptop" content="Online Book" />
              <Label content="Novel" />
              <Label content="Fiction Book" />
              <Button color="red" floated="right" icon labelPosition="right">
                Remove
                <Icon name="remove" />
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        
        <Item>
          <Item.Image
            size="small"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />
          <Item.Content verticalAlign="top">
            <Item.Header as="a">Human evlolution</Item.Header>
            <Item.Meta>
              <span>Mac Momotivsky</span>
            </Item.Meta>
            <ItemDescription>
              <Input fluid size="big" focus placeholder="Your Message..." />
            </ItemDescription>
            <Item.Extra>
              <Label>
                <Icon.Group>
                  <Icon name="laptop" />
                  <Icon corner name="remove" />
                </Icon.Group>
                Offline boook
              </Label>
              <Label content="Novel" />
              <Label content="Fiction Book" />
              <Button color="red" floated="right" icon labelPosition="right">
                Remove
                <Icon name="remove" />
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      <Button
        className="Button"
        content="Send Request"
        primary
        floated="right"
        size="big"
      />
    </Container>
  );
};

export default BorrowRequestList;
