# Branch refactor-calendar

## What I am doing:

Following https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b 
I implement Effect() and all ngrx philosophy to make sleepdiary.io to follow the redux pattern. 

-> Next steps: State is updated! Now the component Day should react to the state change. 

Every day component should look into the state retrieved and if the payload contains the day it should be
rerender with the proper color. 

so every day.component.ts: is getting the store, selecting days array and checking if the day is inside the array. If so, it will rerender himself (pending to do).... the question is... it is OK that every day check the whole array looking for himself??????? 

## What I have to do: 

- 1. - 4. Move methods to proper place

ää What it pending: 

- 1. Encapsulate Form and avoid repanting. 
- 2. Renable Calendar Form: Notice: CalendarForm still repaints after scrolling. The problem is in the year selected section! why? it is a performance issue and has to be solved together with renabling the calendar
- 3. replace gith 4ub @ngrx dependencies for npm

## Architecture notes: 

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

dayData contains strictly calendar information for rendetind:

date: moment
isToday: boolean
isCurrentMonth: boolean

> In Day Component

Once a day component is rendered it has properties and state.

** Dont' mix render objects with state containers in model **

Recomended read: 

https://medium.com/@charliegreenman/redux-vs-rxjs-ngrx-store-db6066058719

https://www.typescriptlang.org/docs/handbook/basic-types.html

https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02#.5s50qv6y1

https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b

https://blog.nrwl.io/managing-state-in-angular-applications-22b75ef5625f
