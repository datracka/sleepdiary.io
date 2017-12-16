# Branch refactor-calendar

## What I am doing:

Following https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b
I implement Effect() and all ngrx philosophy to make sleepdiary.io to follow the redux pattern.

- apply some refactor to the components and the state. (see below in extras) Calendar State arch has reducer, selectors, constants, effects on calendar Module (aka home)
- Check how guards are working and clean up our bind navigation and action. 


## What I have to do:

* 1. * 4. Move methods to proper place

* Remeber:

* 1. Encapsulate Form and avoid repanting.
* 2. Renable Calendar Form: Notice: CalendarForm still repaints after scrolling. The problem is in the year selected section! why? it is a performance issue and has to be solved together with renabling the calendar


* Extras:
 
* * Rename Calendar to CalendarRenderMonthly, 
* * extract to one level up calendarForm, 
* * rename Home to Calendar, 
* * extract all business logic from calendar.component to container component Monthly. CalendarRender[yearly | monthly].component only should be responsible of render the calendar itself. The containers components Monthly / yearly contains the logic
* * extract entryForm to his own module 
* * maye rename monthly / yearly to monthly.page or monthy.container to show clearer that they are containers?

## Architecture notes:

### State Management

```
App {
  user: {},
  calendar: {
    days: [{JsonResponse}}],
    filter: 'sleepingQuality' | 'tirednessFeeling'
  },
  layout: {}
}
```

### Basic component structure:

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
