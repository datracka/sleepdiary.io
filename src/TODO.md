# Branch refactor-calendar

## What I am doing:

- CalendarEffects returns null... why? I get some answer from server???
- logger and freeze I think are not working ;)
- just investigation... why my EffectsModule in root is not needed? and yes in the example app?

## What I have to do:

* Following https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b
I implement Effect() and all ngrx philosophy to make sleepdiary.io to follow the redux pattern.

* translate the exampple-app to our needs.
* * for app.module inspire in his app.module
* * for calendar module inspire in books

Basically is takind advantage of featureState stuff and get rid of layout state as long we don't have it

* 1. * 4. Move methods to proper place
* 
* 1. Encapsulate Form and avoid repanting.

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
