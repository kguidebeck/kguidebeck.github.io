import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import TimeItem from './TimeItem';

const StyledMain = styled.main`
  width: calc(100vw - 465px);
  margin-top: 76px;
`;

const MainContainer = styled.div`
  max-width: 75vw;
  padding: 75px 50px;
`;

const TimeTable = styled.div`
  ${'' /* margin-top: 50px; */}
`;

const DayItem = styled.div`
  padding-bottom: 20px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${props => props.theme.melon};
    margin-bottom: 20px;
  }
`;

const DayHeading = styled.h2`
	position: relative;
  margin-bottom: 20px;
`;

const EmptyItem = styled.span`
  display: block;
  margin: 15px 0;
  padding: 0 15px;
`;

const ResetDay = styled.button`
	font-size: ${rem(14)};
	background: transparent;
	border: 1px solid ${props => props.theme.pink};
	color: ${props => props.theme.pink};
	font-weight: 700;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
`;


const Main = ({ items, removeItem, clearDay }) => {
  return (
    <StyledMain>
      <MainContainer>
        <TimeTable>
          {items.map(day => (
            <DayItem key={day.name}>
              <DayHeading>{day.name}
								{day.items.length > 0 &&
									<ResetDay
										onClick={() => {
											clearDay(day.name);
										}}
									>
										Clear
									</ResetDay>
								}
							</DayHeading>
              {day.items.map(item => (
                <TimeItem key={`${day.name}_${item.start}`} day={day.name} item={item} removeItem={removeItem} />
              ))}
              {day.items.length < 1 &&
                <EmptyItem>Currently no time added.</EmptyItem>
              }
              
            </DayItem>
          ))}
        </TimeTable>
      </MainContainer>
    </StyledMain>
  );
};

Main.propTypes = {
	items: PropTypes.array,
	removeItem: PropTypes.func,
	clearDay: PropTypes.func,
};

export default Main;
