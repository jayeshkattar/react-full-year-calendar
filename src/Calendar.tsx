import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import WeekHeader from './WeekHeader';

import { Months } from './utils';

import './Calendar.scss';

const Calendar: React.FC<{
	year: number;
	onSelection?: any;
	numberOfMonths?: number;
	showYearHeading?: boolean;
	isWeekDay?: any;
	selectedDates?: string[];
}> = ({ year, onSelection, numberOfMonths, showYearHeading = false, isWeekDay, selectedDates }) => {
	const [calendarData, setCalendarData] = useState([]);

	useEffect(() => {
		displayCalendar(year);
	}, []);

	const displayCalendar = (year: number) => {
		let calendarArr = [] as any;
		let startIndex = 0;
		let endIndex = 12;

		if (numberOfMonths) {
			const currentMonth = new Date().getMonth();
			startIndex = currentMonth;
			endIndex = currentMonth + numberOfMonths;
		}

		for (let i = startIndex; i < endIndex; i++) {
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

			calendarArr.push({
				label: i < 12 ? Months[i] : Months[endIndex - 13],
				year: i < 12 ? year : year + 1,
				days: dateArr,
				startDay: getWeek.getDay(),
			});
		}
		setCalendarData(calendarArr);
	};

	const handleSelection = (day, dayVal) => {
		onSelection && onSelection(day);
		isWeekDay && isWeekDay(![0, 6].includes(dayVal % 7));
	};

	return (
		<>
			{showYearHeading && <h3>Year: {year}</h3>}
			<div className="react-full-year-calendar-container">
				{calendarData.map((month: any) => {
					return (
						<table className="react-full-year-calendar-month" key={month.label}>
							<thead key={`${month.label}-head`}>
								<tr>
									<th colSpan={7}>{`${month['label']} - ${month.year}`}</th>
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
															className={classnames(
																`${[0, 6].includes(dayVal % 7) && 'grey'}`,
																{ blue: selectedDates && selectedDates.includes(day) }
															)}
															onClick={() => day && handleSelection(day, dayVal)}
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
