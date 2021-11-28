[![npm version](https://badge.fury.io/js/react-full-year-calendar.svg)](https://badge.fury.io/js/react-full-year-calendar)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/jayeshkattar/react-full-year-calendar.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/jayeshkattar/react-full-year-calendar/context:javascript)
[![Downloads](https://img.shields.io/npm/dm/react-full-year-calendar.svg)](https://npmjs.org/package/react-full-year-calendar)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/jayeshkattar/react-full-year-calendar.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/jayeshkattar/react-full-year-calendar/alerts)

# react-full-year-calendar

Twelve months calendar component in React JS

# Demo

Visit this [link](https://react-full-year-calendar.vercel.app/)

## Documentation

### Installation

**npm**

```bash
npm install react-full-year-calendar --save
```

**yarn**

```bash
yarn add react-full-year-calendar
```

### Props

react-full-year-calendar component accepts the below as props

-   `year (Mandatory)` - Number - Accepts the Year to be displayed
-   `onSelection (Optional)` - Callback Function - returns the selected Date in String Format (YYYY-MM-DD)
-   `numberOfMonths (Optional)` - Number - Accepts the number of months to be displayed from the current Month
-   `showYearHeading (Optional)` - Boolean - Flag to display the year by default it's false
-   `isWeekDay (Optional)` - Callback Function - returns a boolean value
-   `selectedDates (Optional)` - string Array - accepts strings in YYYY-MM-DD format

### Example 1

```js
import Calendar from 'react-full-year-calendar';

export default function SimpleCalendar() {
	return <Calendar year={2021} />;
}
```

### Example 2

```js
import Calendar from 'react-full-year-calendar';

export default function SimpleCalendar() {
	const [current, setCurrent] = useState('');
	return <Calendar year={2021} onSelection={setCurrent} />;
}
```

### Example 3

```js
import Calendar from 'react-full-year-calendar';

export default function SimpleCalendar() {
	const [weekDay, setWeekDay] = useState(false);
	return <Calendar year={2021} isWeekDay={setWeekDay} />;
}
```
