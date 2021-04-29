import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { formatTime } from '../util/time';

const StyledSidebar = styled.aside`
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0px;
  width: 465px;
  padding-bottom: 75px;
  background: ${props => props.theme.white};
`;

const SidebarContainer = styled.div`
  padding: 75px 50px;
  overflow-y: scroll;
`;

const SidebarHeader = styled.h2``;

const TimeTotals = styled.ul`
  list-style: none;
  padding: 0;
`;

const TimeDay = styled.li`
  &:not(:last-of-type) {
    margin-bottom: 25px;
  }
`;

const DayHeading = styled.h3`
  margin-bottom: 10px;
`;

const TimeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TimeItem = styled.li`
  display: flex;
  justify-content: space-between;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const ItemProject = styled.span`
  font-size: ${rem(14)};
`;

const ItemTime = styled.span`
  color: ${props => props.theme.teal};
  font-weight: 700;
`;

const EmptyItem = styled.span`
  display: block;
  margin: 15px 0;
  padding: 0 15px;
`;

const Sidebar = ({ items }) => (
  <StyledSidebar>
    <SidebarContainer>
      <SidebarHeader>Time Totals</SidebarHeader>
      <TimeTotals>
        {items.map(day => {
					const dayTotal = formatTime(day.timeTotal);

					return (
						<TimeDay key={day.name}>
							<DayHeading>{day.name}<span> | {dayTotal.hours}H {dayTotal.minutes}M</span></DayHeading>
							{day.items.length > 0 &&
								<TimeList>
									{day.projects.map(proj => {
										const projTotal = formatTime(proj.time);

										return (
											<TimeItem key={proj.name}>
												<ItemProject>{proj.name}</ItemProject>
												<ItemTime>{projTotal.hours}H {projTotal.minutes}M</ItemTime>
											</TimeItem>
										);
								})}
								</TimeList>
							}
							{day.items.length === 0 &&
								<EmptyItem>Currently no time added.</EmptyItem>
							}
						</TimeDay>
					);
				})}
      </TimeTotals>
    </SidebarContainer>
  </StyledSidebar>
);

Sidebar.propTypes = {
	items: PropTypes.array,
};

export default Sidebar;
