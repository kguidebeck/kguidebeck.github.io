import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { formatTime } from '../util/time';
import Container from './Container';

const StyledFooter = styled.footer`
  background: ${props => props.theme.teal};
  color: ${props => props.theme.white};
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: 75px;
  padding: 20px 0;
  display: flex;
  align-items: center;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const TimeInfo = styled.span`
  display: block;
  color: ${props => props.theme.white};
  font-size: ${rem(18)};

  span {
    font-weight: 700;
  }
`;

const Footer = ({ weekTotal, day, dayTotal }) => {
	const weekFormat = formatTime(weekTotal);
	const dayFormat = formatTime(dayTotal);
	
	return (
		<StyledFooter>
			<Container>
				<TimeInfo><span>{day}:</span> {dayFormat.hours}H {dayFormat.minutes}M</TimeInfo>
				<TimeInfo><span>Week:</span> {weekFormat.hours}H {weekFormat.minutes}M</TimeInfo>
			</Container>
		</StyledFooter>
	);
};

Footer.propTypes = {
	weekTotal: PropTypes.number,
	day: PropTypes.string,
	dayTotal: PropTypes.number,
};

export default Footer;
