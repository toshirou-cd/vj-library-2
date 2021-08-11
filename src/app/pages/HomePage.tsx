import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { Button, Tab, Container } from 'semantic-ui-react';
import { FiRefreshCw, FiUnlock, FiLock, FiX } from 'react-icons/fi';
import styled from 'styled-components';

import { useSelector, useDispatch } from '../hooks';
import {
  closeComponentTab,
  toggleLockComponentTab,
  openComponentTab,
} from '../slices/global';
import { getComponent } from '../utils/component-tree';
import { match } from 'react-router-dom';

const HomePage: React.FC<{ match: match }> = (props) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '5px dashed teal',
        width: '100%',
        height: '100vh',
      }}
    ></div>
  );
};

export default HomePage;
