import React from 'react';

const Arrow = ({ direction = 'down', ...props }) => (
	<React.Fragment>
		{direction === 'down' ?
			<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
			</svg>
		:
			<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
			</svg>
		}
	</React.Fragment>
);

export default Arrow;
