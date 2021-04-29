import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputForm from './InputForm';

const StyledHeader = styled.header`
  padding: 20px 50px;
  min-height: 75px;
  background: ${props => props.theme.sand};
  color: ${props => props.theme.white};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;

const ResetPage = styled.button`
  border: 0;
  background: ${props => props.theme.teal};
  color: ${props => props.theme.white};
  padding: 10px 15px;
  font-family: ${props => props.theme.sansSerif};
`;

const Header = ({ today, addItem, clearAll, projects }) => (
  <StyledHeader>
    <InputForm today={today} addItem={addItem} projects={projects} />
    <ResetPage onClick={clearAll}>Reset Page</ResetPage>
  </StyledHeader>
);

Header.propTypes = {
	today: PropTypes.string,
	addItem: PropTypes.func,
	clearAll: PropTypes.func,
};

export default Header;
