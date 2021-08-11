import React from 'react';
import { match } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './RequestPage.less';
import PendingRequest from './pending-request/PendingRequest';
import OngoingRequest from './ongoing-request/OngoingRequest';

const RequestPage: React.FC<{ match: match }> = (props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className="table-container">
          <PendingRequest />
        </div>
      </Container>
      <Container fluid>
      <div className="table-container">
          <OngoingRequest />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default RequestPage;
