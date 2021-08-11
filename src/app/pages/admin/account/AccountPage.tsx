import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { Button, Tab, Container } from 'semantic-ui-react';
import { FiRefreshCw, FiUnlock, FiLock, FiX } from 'react-icons/fi';
import styled from 'styled-components';

import { match } from 'react-router-dom';

const DashboardPage: React.FC<{ match: match }> = (props) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '5px dashed darkred',
        width: '100%',
        height: '100vh',
        borderRadius: '10px',
      }}
    >
      <h1>Account Page</h1>
    </div>
  );
};

export default DashboardPage;
