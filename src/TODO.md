# Implementing actions for get, update, insert and delete

## working on: Make INSERT NEW DAY TO WORK

- Error in entry-form.componnent.ts (ngAfterViewInit). The response from GET server was bad handled. Now we retrieve an array. In this method (ngAfterViewInit) os still handled as an object. We have to understand what in Entry and Date and what the function does. 

- Check that GET all and GET only one requests work properly

- implement reducer for INSERT_STORE taking an account we want to add a new day to the array (no object!!!)

- Check that we navigate properly backwards programatically and everything works properly

Is so... you can move to implement the same to update and delete....

### Next steps:

- Add update entry, dispatch action, set effect and implement reducer.
- Add delete entry, dispatch action, set effect and implemeent reducer.

Optional: implement optimistic updated. So for example for add new entry
ACTION: NEW_ENTRY -> UI sets back to calendar but in the meanwhile is triggered the  EFFECT (POST) and if it fails, it triggers another action REMOVE_NEW_ENTRY that says the user it was a problem adding the entry.

#### GUIDE:

- Compoment entry-form dispatch actions.
- Actions are "catched" by effects() and dispatch request to server
- The service therefore is used by effects() class.
Actions are (as well) catched by reducer and update state
- Set optimistic updates (actions when request to the server fails... ROLLBACK_INSERT, ROLLBACK_UPDATE, ROLLBACK_DELETE) see https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b

Architectural challenge:

- When listing calendar we get all items
- When asking for an element in form we get element from backend
- - if element already exists we dont do anything
- - else we retrieve the element from the state
- Wnen listing calendar second time retrieve all items updating list with only missing one. 


