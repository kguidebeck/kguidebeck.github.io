import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { formatTime, formatTimeString } from '../util/time';

const RemoveItem = styled.button`
  position: absolute;
  top: 50%;
  left: -32px;  
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border: 0;
  background: ${props => props.theme.pink};
  color: ${props => props.theme.white};
  opacity: 0;
  transition: opacity 300ms ease;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${rem(12)};
    font-weight: 700;
  }
`;

const StyledItem = styled.div`
  position: relative;
  padding: 10px 20px;
  font-size: ${rem(14)};
  display: grid;
  grid-template-columns: 1fr 1.5fr 2.5fr 3fr;

  &:nth-of-type(odd) {
    background: ${props => props.theme.white};
  }

  span {
    font-size: ${rem(14)};
  }

  &:hover {
    ${RemoveItem} {
      opacity: 1;
    }
  }
`;

const ItemTime = styled.span`
  color: ${props => props.theme.teal};
  font-weight: 700;
`;

const TimeItem = ({ item, day, removeItem }) => {
	const timeFormat = formatTime(item.time);
  const handleRemove = () => {
    removeItem({ day, info: item });
	};

  return (
    <StyledItem>
      <ItemTime>{timeFormat.hours}H {timeFormat.minutes}M</ItemTime>
      <span>{formatTimeString(item.start)} - {formatTimeString(item.stop)}</span>
      <span>{item.project}</span>
      <span>{item.description}</span>

      <RemoveItem onClick={handleRemove}><span>X</span></RemoveItem>
    </StyledItem>
  );
};

TimeItem.propTypes = {
  item: PropTypes.object,
  day: PropTypes.string,
  removeItem: PropTypes.func,
};

export default TimeItem;
