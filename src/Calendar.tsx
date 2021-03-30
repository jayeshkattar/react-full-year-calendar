import React, { useState, useEffect } from 'react';
import WeekHeader from './WeekHeader';

import { Months } from './utils';

import './Calendar.scss';

const Calendar: React.FC<{ year: number }> = ({ year }) => {
	const [calendarData, setCalendarData] = useState([]);

	useEffect(() => {
		displayCalendar(year);
	}, [year]);

	const displayCalendar = (year: number) => {
		let calendarArr = [] as any;

		for (let i = 0; i < 12; i++) {
			let startDate = new Date(year, i, 1);
			let endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
			const dateArr = [] as any;
			let getWeek = '' as any;

			while (startDate <= endDate) {
				let date = new Date(startDate);
				!getWeek && (getWeek = date);
				dateArr.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
				startDate = new Date(date.setDate(date.getDate() + 1));
			}
			
			let tempArr =
				getWeek.getDay() !== 0
					? getWeek.getDay() - 1 === 0
						? []
						: Array(getWeek.getDay() - 1)
								.join('.')
								.split('.')
					: Array(6).join('.').split('.');

			dateArr.splice(0, 0, ...tempArr);

			let addNElementsToEnd =
				dateArr.length % 7 !== 0
					? Array(7 - (dateArr.length % 7))
							.join('.')
							.split('.')
					: [];
			dateArr.splice(dateArr.length, 0, ...addNElementsToEnd);

			calendarArr.push({ label: Months[i], days: dateArr, startDay: getWeek.getDay() });
		}
		setCalendarData(calendarArr);
	};

	return (
		<>
			<h3>Year: {year}</h3>
			<div className="react-full-year-calendar-container">
				{calendarData.map((month: any) => {
					return (
						<table className="react-full-year-calendar-month" key={month.label}>
							<thead key={`${month.label}-head`}>
								<tr>
									<th colSpan={7}>{month['label']}</th>
								</tr>
								<tr>
									<WeekHeader />
								</tr>
							</thead>
							<tbody key={`${month.label}`}>
								{month.days
									.reduce(
										(acc, e, i) => (i % 7 ? acc[acc.length - 1].push(e) : acc.push([e]), acc),
										[]
									)
									.map((set: any, monthVal: number) => {
										return (
											<tr key={`${month.label}-${monthVal}`}>
												{set.map((day: string, dayVal: number) => {
													return (
														<td
															key={dayVal}
															className={[0, 6].includes(dayVal % 7) ? 'grey' : ''}
														>
															{day.split('-')[2]}
														</td>
													);
												})}
											</tr>
										);
									})}
							</tbody>
						</table>
					);
				})}
			</div>
		</>
	);
};

export default Calendar;
