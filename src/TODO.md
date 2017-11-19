# Branch refactor-calendar

What I am doing:

- CalendarForm still repaints after scrolling. The problem is in the year selected section! why?

What I have to do: 

- 1. Move Calendar to component approach (DONE)
- 2. Refactor Render. Render renders Day components inside Week Components and inside Month components. (DONE)
- 3. Encapsulate Form and avoid repanting. 
- 4. Move methods to proper place

> in Calendar Component

<Month [monthData]="monthData" ngFor="monthData in yearData"> 

monthData has all render information for rendering a complete month. That is array of Weeks containing array of Days. (Similar what we have right now, but improved and refactored). 
monthData has an array on weekData 

> In Month Component

Using monthData for the current month iterates on array of weeks for rendering weeks component. 
weekData has an array on dayData

<Week [weekData]="weekData ngFor="weekData in monthData>

> In Week Component

Using WeekData for the current Week iterats on array ow weeks for rendering the day component

<Day [dayData]="dayData" nfFor="dayData in WeekData>

dayData contains strictly calendar information:

date: moment
isToday: boolean
isCurrentMonth: boolean

> In Day Component

Once a day component is rendered it has properties and state

Recomended read: 

https://medium.com/@charliegreenman/redux-vs-rxjs-ngrx-store-db6066058719

https://www.typescriptlang.org/docs/handbook/basic-types.html

https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02#.5s50qv6y1

https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b
