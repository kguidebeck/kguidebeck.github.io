import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import generateID from '../util/generateID';
import { generateTime } from '../util/time';
import Arrow from './Arrow';

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 110px repeat(2, 115px) 2fr 3fr 46px;
  grid-gap: 20px;
  max-width: 815px;
	width: calc(100% - 100px);

	div {
		position: relative;
	}
`;

const StyledLabel = styled.label`
  color: ${props => props.theme.pink};
  font-size: ${rem(12)};
  font-weight: 700;
  display: block;
`;

const inputStyles = css`
  background: ${props => props.theme.white};
  width: 100%;
  height: 35px;
  padding: 0 10px;
  border: 1px solid ${props => props.theme.melon};
  font-family: ${props => props.theme.sansSerif};

  &:focus {
    outline: 1px dashed ${props => props.theme.teal};
    outline-offset: -1px;
  }
`;

const selectStyles = css`
	${'' /* appearance: none; */}
	position: relative;
	font-size: ${rem(11)};
`;

const StyledInput = styled.input`
  ${inputStyles};
`;

const StyledSelect = styled.select`
  ${inputStyles};
	${selectStyles}
`;

const CustomSelect = styled.div`
	&& {
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
	}
`;

const CustomInput = styled.button`
	${inputStyles};
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;

	span {
		color: ${props => props.theme.teal};
		font-size: ${rem(11)};
	}
`;

const StyledArrow = styled(Arrow)`
	display: block;
	position: absolute;
	top: 50%;
	right: 20px;
	transform: translateY(-50%);
	width: 12px;
	fill: ${props => props.theme.teal};
`;

const CustomDropdown = styled.div`
	top: 34px;
	left: 0;
	right: 0;
	background: ${props => props.theme.white};
	border: 1px solid ${props => props.theme.melon};

	display: ${props => props.isOpen ? 'block' : 'none'};

	&& {
		position: absolute;
	}	
`;

const StyledOption = styled.button`
	border: 0;
	display: block;
	width: 100%;
	outline: 0;
	background: transparent;
	padding: 8px 10px;
	text-align: left;
	transition: color 350ms ease, background 350ms ease;

	&:not(:first-of-type) {
		border-top: 1px solid ${props => props.theme.melon};
	}

	&:hover,
	&:focus {
		background: ${props => props.theme.pink};
		color: ${props => props.theme.white};
	}
`;

const StyledSubmit = styled.input`
  align-self: flex-end;
  height: 35px;
  padding: 0 10px;
  background: ${props => props.theme.pink};
  color: ${props => props.theme.white};
  border: 0;
  font-weight: 700;
`;

// const StyledError = styled.span`
//   display: block;
//   position: absolute;
//   left: 0;
//   bottom: -20px;
//   font-size: ${rem(12)};
// `;


const InputForm = ({ today, addItem, projects }) => {
  const initialState = {
    weekday: today,
    start: '',
    stop: '',
    project: '',
		projects: '',
    description: '',
  };

  const [formValues, setFormValues] = useState({...initialState});
  const [formErrors, setFormErrors] = useState(null);
	const [currentDay, setCurrentDay] = useState(today);
	const [dayOpen, setDayOpen] = useState(false);
	const [projectsOpen, setProjectsOpen] = useState(false);
  const weekday = useRef();

  const updateField = e => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = () => {
	  if (!formValues.start || formValues.start === "") {
		setFormErrors('Please enter in a start time');
	  } else if (!formValues.stop || formValues.stop === "") {
		setFormErrors('Please enter in a stop time');
	  } else if (generateTime(formValues.start, formValues.stop) <= 0) {
		setFormErrors('Please enter in a stop time later than the start time');
	  } else if (!formValues.project) {
		setFormErrors('Please enter in a project name');
	  } else {
			setFormErrors(null);
		}
  }
 
  const handleSubmit = (e) => {
		e.preventDefault();
		errorCheck();

		if (formErrors !== null) return;

		const time = generateTime(formValues.start, formValues.stop);

		if (!time || time === null) return;

		addItem({
			day: formValues.weekday,
			info: {
				id: generateID(),
				time, 
				start: formValues.start,
				stop: formValues.stop,
				project: formValues.project,
				description: formValues.description,
			}
		});
		e.target.reset();
		setFormValues({...initialState});
		weekday.current.focus();
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <StyledLabel htmlFor="weekday">Day</StyledLabel>
        <StyledSelect
          name="weekday"
          id="weekday"
          value={formValues['weekday']}
          onChange={updateField}
		  		ref={weekday}
        >
          {days.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
					<StyledArrow direction={dayOpen ? 'up' : 'down'} />
          
        </StyledSelect>
				{/* <CustomSelect aria-hidden="true">
						<CustomInput
							onClick={() => {
								setDayOpen(prevState => !prevState);
							}}
						>
							<span>{currentDay}</span>
							<StyledArrow direction={dayOpen ? 'up' : 'down'} />
						</CustomInput>
						<CustomDropdown isOpen={dayOpen}>
							{days.map(day => (
								<StyledOption
									key={day}
									onClick={() => {
										setCurrentDay(day);
										setFormValues((prevState) => ({
											...prevState,
											weekday: day,
										}));
										setDayOpen(false);
									}}
								>{day}</StyledOption>
							))}
						</CustomDropdown>
				</CustomSelect> */}
      </div>

      <div>
        <StyledLabel htmlFor="start">Start Time</StyledLabel>
        <StyledInput
          type="time"
          name="start"
          id="start"
          value={formValues['start']}
          onChange={updateField}
        />
      </div>

      <div>
        <StyledLabel htmlFor="stop">Stop Time</StyledLabel>
        <StyledInput
          type="time"
          name="stop"
          id="stop"
          value={formValues['stop']}
          onChange={updateField}
        />
      </div>

      <div>
        <StyledLabel htmlFor="project">Project</StyledLabel>
        <StyledInput
          type="text"
          name="project"
          id="project"
          value={formValues['project']}
          onChange={updateField}
					onClick={() => {
						setProjectsOpen(prevState => !prevState);
					}}
        />
				{/* <StyledArrow direction={projectsOpen ? 'up' : 'down'} style={{ top: 'calc(50% + 7px)' }} />
				{projects && projects.length > 0 ?
					<CustomSelect aria-hidden="true" style={{ zIndex: '-1' }}>
						<CustomInput tabIndex="-1" />
						<CustomDropdown isOpen={projectsOpen}>
							{projects.map(project => (
								<StyledOption
									key={project}
									onClick={() => {
										setFormValues((prevState) => ({
											...prevState,
											project: project,
										}));
										setProjectsOpen(false);
									}}
								>{project}</StyledOption>
							))}
						</CustomDropdown>
				</CustomSelect>
					: null
				} */}
      </div>

      <div>
        <StyledLabel htmlFor="description">Description</StyledLabel>
        <StyledInput
          type="text"
          name="description"
          id="description"
          value={formValues['description']}
          onChange={updateField}
        />
      </div>
      <StyledSubmit type="submit" value="Add" />
	  
	  {/* {formErrors &&
	  	<StyledError>{formErrors}</StyledError>
	  } */}
    </StyledForm>
  );
};

InputForm.propTypes = {
	today: PropTypes.string,
	addItem: PropTypes.func,
};

export default InputForm;
