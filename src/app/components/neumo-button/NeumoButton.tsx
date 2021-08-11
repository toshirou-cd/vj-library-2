import React from 'react';
import './NeumoButton.less';
import cn from 'classnames';
import ChevronIcon, {
  ChevronDirection,
} from '@assets/svg/chevron/chevron_icon';
import { NavLink } from 'react-router-dom';

interface NeumoButtonProps {
  shape?: 'circular' | 'rectangular';
  Icon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  spaced?: boolean;
  raised?: boolean;
  highlighted?: boolean;
  label?: string;
  shade?: 'light' | 'dark';
  onClick?: () => void;
  navLink?: string;
  chevron?: {
    position: 'left' | 'right';
    direction: ChevronDirection;
  };
}

const NeumoButton: React.FC<NeumoButtonProps> = (props) => {
  const {
    shape = 'circular',
    Icon = null,
    RightIcon = null,
    spaced = false,
    highlighted = false,
    raised = false,
    shade = 'light',
    label = null,
    chevron = null,
    onClick,
    navLink,
  } = props;
  const classNames = cn(
    'neumo-button',
    shape,
    shade,
    { highlighted: highlighted },
    {
      'with-left-icon': Icon && !RightIcon,
    },
    {
      'with-right-icon': !Icon && RightIcon,
    },
    { 'with-label': label },
    { spaced: spaced },
    { raised: raised },
  );
  if (navLink) {
    return (
      <NavLink
        to={navLink}
        activeClassName="highlighted"
        className={classNames}
      >
        {chevron && chevron.position === 'left' && (
          <div className={`image-wrapper chevron left`}>
            <ChevronIcon direction={chevron.direction} />
          </div>
        )}
        {Icon && <div className="image-wrapper">{Icon}</div>}
        {label && <p className="label">{label}</p>}
        {label && RightIcon && <div className="image-wrapper">{RightIcon}</div>}
        {chevron && chevron.position === 'right' && (
          <div className={`image-wrapper chevron right`}>
            <ChevronIcon direction={chevron.direction} />
          </div>
        )}
      </NavLink>
    );
  }
  return (
    <button onClick={onClick} className={classNames}>
      {chevron && chevron.position === 'left' && (
        <div className={`image-wrapper chevron left`}>
          <ChevronIcon direction={chevron.direction} />
        </div>
      )}
      {Icon && <div className="image-wrapper">{Icon}</div>}
      {label && <p className="label">{label}</p>}
      {label && RightIcon && <div className="image-wrapper">{RightIcon}</div>}
      {chevron && chevron.position === 'right' && (
        <div className={`image-wrapper chevron right`}>
          <ChevronIcon direction={chevron.direction} />
        </div>
      )}
    </button>
  );
};

export default NeumoButton;
