# Implementing actions for get, update, insert and delete

## Problem now: in Effects actionCALENDAR_ACTIONS.GET_ENTRY to update the state is not dispatched!!... the reducer takes a shit of it! Why?

What we have to do now.

- Compoment entry-form dispatch actions.
- Actions are "catched" by effects() and dispatch request to server
- The service therefore is used by effects() class.
Actions are (as well) catched by reducer and update state
- Set optimistic updates (actions when request to the server fails... ROLLBACK_INSERT, ROLLBACK_UPDATE, ROLLBACK_DELETE) see https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b


- **Important need to understand properly rxjs!! (see tutorial)


Architectural challenge:

- When listing calendar we get all items
- When asking for an element in form we get element from backend
- - if element already exists we dont do anything
- - we retrieve the element from the state
- Wnen listing calendar second time retrieve all items updating list with only missing one. 


