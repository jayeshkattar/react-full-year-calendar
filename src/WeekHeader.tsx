import React from 'react';

import { WeekDetails } from './utils';

const WeekHeader: React.FC = () => {
	return (
		<>
			{WeekDetails.map((day) => {
				return (
					<th className="react-full-year-calendar-week-name" key={day.key}>
						{day.label}
					</th>
				);
			})}
		</>
	);
};

export default WeekHeader;
