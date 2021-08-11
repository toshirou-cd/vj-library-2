import React from 'react'
import { Grid, Icon, Input, Item, ItemDescription, ItemGroup, ItemHeader, Label, Segment } from 'semantic-ui-react'

const DetailReqHis = () => {
    return (
        <Segment className="BorrowReqList">
        <h2>Request 01 :</h2>
        <br />
        <Grid columns="3" verticalAlign="top">
          <Grid.Column>
            <h5>Send date : 1/7/2021</h5>
          </Grid.Column>
          <Grid.Column>
            <h5>Process date : 1/7/2021</h5>
          </Grid.Column>
          <Grid.Column>
            <h5>Process by : AnhNH</h5>
          </Grid.Column>
        </Grid>
        <br />

        <Item>
          <ItemHeader>
            <Label content="Note from processor : " />
          </ItemHeader>
          <ItemDescription>
            Dear HA, Mấy cuốn này hay lắm, đọc nhanh nhanh trả nhá !
          </ItemDescription>
        </Item>
        <br />
        <br />
        <ItemGroup>
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
                <Grid columns="3">
                  <Grid.Column>
                    <span>Expired day : 30/07/2021</span>
                  </Grid.Column>
                  <Grid.Column>
                    <Input disabled focus placeholder="Your Message..." />
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Label
                      floated="right"
                      size="large"
                      color="green"
                      icon="check"
                      labelPosition="left"
                      content="Accept"
                    />
                  </Grid.Column>
                </Grid>
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
              </Item.Extra>
            </Item.Content>
          </Item>


          <Item>
            <Item.Image
              size="small"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            />
            <Item.Content verticalAlign="top">
              <Item.Header as="a">The fault in our star</Item.Header>
              <Item.Meta>
                <span>John Green</span>
              </Item.Meta>
              <ItemDescription>
                <Grid columns="3">
                  <Grid.Column>
                    <span>Expired day : 30/07/2021</span>
                  </Grid.Column>
                  <Grid.Column>
                    <Input disabled focus placeholder="Your Message..." />
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Label
                      floated="right"
                      size="large"
                      color="green"
                      icon="check"
                      labelPosition="left"
                      content="Accept"
                    />
                  </Grid.Column>
                </Grid>
              </ItemDescription>

              <Item.Extra>
                <Label>
                  <Icon.Group>
                    <Icon name="laptop" />
                  </Icon.Group>
                  Online boook
                </Label>
                <Label content="Novel" />
                <Label content="Fiction Book" />
              </Item.Extra>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
    )
}

export default DetailReqHis
