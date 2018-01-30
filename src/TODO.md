# Implementing actions for get, update, insert and delete

What we have currently: (clasical way)

- onLoad entry-component loads entry from server (get)
- when action performend component entry-form through service request information to server.
- with insert / update / delete backend is updated

What we have to do now.

- Compoment entry-form dispatch actions.
- Actions are "catched" by effects() and dispatch request to server
- The service therefore is used by effects() class.
Actions are (as well) catched by reducer and update state
- Set optimistic updates (actions when request to the server fails... ROLLBACK_INSERT, ROLLBACK_UPDATE, ROLLBACK_DELETE) see https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b

questions:

- Should entry effects() be in own effects file?? Entry are not 
inside of calendar module
But entry are affecting calendar namespace state... (entry-form updates calendar state.)

- mportant need to understand properly rxjs!! (see tutorial)
