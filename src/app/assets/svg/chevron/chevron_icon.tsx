import React from 'react';
import { ReactComponent as ChevronDownIcon } from './chevron_down.svg';

export enum ChevronDirection {
  'up',
  'down',
  'left',
  'right',
}
interface ChevronProps {
  direction: ChevronDirection;
}
const ChevronIcon: React.FC<ChevronProps> = (props) => {
  switch (props.direction) {
    case ChevronDirection.down:
      return <ChevronDownIcon />;
    case ChevronDirection.up:
      return <ChevronDownIcon style={{ transform: 'rotate(180deg)' }} />;
    case ChevronDirection.left:
      return <ChevronDownIcon style={{ transform: 'rotate(90deg)' }} />;
    case ChevronDirection.right:
      return <ChevronDownIcon style={{ transform: 'rotate(-90deg)' }} />;
    default:
      return <ChevronDownIcon />;
  }
};

export default ChevronIcon;
