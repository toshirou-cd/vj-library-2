import React from "react";
import {
  Card,
  Container,
  Grid,
  GridColumn,
  GridRow,
  Statistic,
} from "semantic-ui-react";

const DashBoard = () => {
  return (
    <Container>
      <br />
      <h2 style={{ color: "red", marginLeft: "30px" }}>Dash Board</h2>
      <br />
      <Grid
        textAlign="center"
        verticalAlign="middle"
        columns="3"
        divided
        stretched
      >
        <GridRow>
          <GridColumn>
            <Card.Header>
              <Statistic label="Pending Request from User" value="5" />
            </Card.Header>
          </GridColumn>

          <GridColumn>
            <Card.Header>
              <Statistic label="Your pending Request" value="2" />
            </Card.Header>
          </GridColumn>

          <GridColumn>
            <Statistic label="Your Processed Request" value="4" />
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
};

export default DashBoard;
