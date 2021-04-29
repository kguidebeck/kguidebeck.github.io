import React, { useReducer, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import GlobalStyle from './styles/global-style';
import theme from './styles/theme';
import { compareTime } from './util/time';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const setUpState = () => {
  const now = new Date();
  const days = eachDayOfInterval({ start: startOfWeek(now), end: endOfWeek(now) });
  days.shift();
  days.forEach((d, i) => {
    days[i] = {
      name: format(d, 'iiii'),
	  	timeTotal: 0,
	  	projects: [],
      items: [],
    };
  });

  const initalState = {
    today: format(now, 'iiii') === 'Sunday' ? 'Saturday' : format(now, 'iiii'),
		timeTotal: 0,
    days: [...days],
		projects: [],
  }

  return initalState;
}

function reducer(state, action) {
	const { timeTotal, days, projects } = state
	const { type, item } = action;

  switch (type) {
    case 'setup': {
      const now = new Date();
      const today = format(now, 'iiii') === 'Sunday' ? 'Saturday' : format(now, 'iiii');
		  if (item.today !== today) {
        item.today = today;
      }
      return {...item};
		} case 'add': {
			const day = days.find(d => d.name === item.day);
			const dayIndex = days.findIndex(d => d.name === item.day);
			const tempProjects = projects ? [...projects] : [];
			let tempDays = [...days];
			let tempTimeTotal = timeTotal;

      if (day) {
				const { project, time } = item.info;

				// Add item to day + sort them by start time
				const dayItems = [...day.items, {...item.info}];
				dayItems.sort(compareTime);

				// Add project to global project list if doesn't exist
				if (tempProjects.findIndex(proj => proj === project) === -1) {
					if (project && project !== '') {
						tempProjects.push(project);
					}
				}

				tempProjects.sort((projA, projB) => ( projA > projB ? 1 : -1 ));

				// Add project/time to projectTotals based on day
				const projectIndex = day.projects.findIndex(proj => proj.name === project);
				const foundProject = day.projects.find(proj => proj.name === project);
				let dayProjects = [...day.projects];
				
				if (foundProject) {
					const tempProject = { ...foundProject, time: foundProject.time + time };

					dayProjects[projectIndex] = {...tempProject};
				} else {
					dayProjects = [
						...day.projects,
						{
							name: project,
							time: time
						}
					];
				}

				// Update/add to day Total
				const dayTimeTotal = day.timeTotal + time;

				const tempDay = {
					...day,
					items: [...dayItems],
					projects: [...dayProjects],
					timeTotal: dayTimeTotal,
				};

				tempDays[dayIndex] = tempDay;

				// Update week total
				tempTimeTotal = timeTotal + time;
			}
      
      return {
        ...state,
        timeTotal: tempTimeTotal,
        days: [...tempDays],
				projects: [...tempProjects],
      };
    } case 'remove': {
			const day = days.find(d => d.name === item.day);
			const dayIndex = days.findIndex(d => d.name === item.day);
			let tempDays = [...days];
			let tempTimeTotal = timeTotal;

      if (day) {
				const { id, project, time } = item.info;

				// Remove item from day
				const dayItems = day.items.filter(i => i.id !== id);

				// Add project/time to projectTotals based on day
				const projectIndex = day.projects.findIndex(proj => proj.name === project);
				const foundProject = day.projects.find(proj => proj.name === project);
				let dayProjects = [...day.projects];
				
				if (foundProject) {
					if (foundProject.time === time) {
						dayProjects = day.projects.filter(proj => proj.name !== project);
					} else {
						const tempProject = { ...foundProject, time: foundProject.time - time };

						dayProjects[projectIndex] = {...tempProject};
					}
				}	

				// Update day Total
				const dayTimeTotal = day.timeTotal - time;
				
				const tempDay = {
					...day,
					items: [...dayItems],
					projects: [...dayProjects],
					timeTotal: dayTimeTotal,
				};

				tempDays[dayIndex] = tempDay;

				// Update week total
				tempTimeTotal = timeTotal - time;
			}
      
      return {
        ...state,
        timeTotal: tempTimeTotal,
        days: [...tempDays],
      };
    } case 'clearDay': {
			const day = days.find(d => d.name === item);
			const dayIndex = days.findIndex(d => d.name === item);
			let tempDays = [...days];
			let tempTimeTotal = timeTotal;

			if (day) {
				tempTimeTotal = timeTotal - day.timeTotal;

				const tempDay = {
					...day,
					timeTotal: 0,
					projects: [],
					items: [],
				};

				tempDays[dayIndex] = tempDay;
			}

			return {
        ...state,
        timeTotal: tempTimeTotal,
        days: [...tempDays],
      };
		} case 'clearAll': {
			const resetState = setUpState();
      return {...resetState};
		} default:
      throw new Error();
  }
}

const App = () => {
  const initialState = setUpState();;
  const [state, dispatch] = useReducer(reducer, initialState);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (state) localStorage.setItem('TimeData', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem('TimeData'));

		if (localItems) {
			dispatch({ type: 'setup', item: localItems });
		}

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header
        today={state.today}
        addItem={(item) => { dispatch({ type: 'add', item }); }}
        clearAll={() => { dispatch({ type: 'clearAll' }); }}
				projects={state.projects}
      />
      <Main
        today={state.today}
        items={state.days}
        removeItem={(item) => { dispatch({ type: 'remove', item }); }}
				clearDay={(item) => { dispatch({ type: 'clearDay', item }); }}
      />
      <Sidebar items={state.days} />
      <Footer
        weekTotal={state.timeTotal}
        day={state.today}
        dayTotal={state.days.find(d => d.name === state.today).timeTotal}
      />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
