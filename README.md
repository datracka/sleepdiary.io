# Sleep diary source code

### For Running application 

1- run (**npm run json-server only in the meanwhile proper login is not implemented)
  `$ npm install && npm run build && npm start && npm run json-server`
2- 
  browse http://localhost:3000/app/
  
## Github management. 
  
Intended for shared management. For repo proceed as usual. 
take in account that `shared` folder is attach to a shared remote repo. 

# Standart proceed to get shared updates from github repository

`$ git fetch shared`
`$ git merge -s subtree --squash \ shared/<branch>` where `<branch` is the given branch to update
usually `master`

# Updating the code:

Commits touching only the subtree, intended for backport (e.g. fixes); (below)

# Backporting to the subtree’s remote

- create a branch `$ git checkout -b backport-shared \ shared/master`
- cherry-pick the changes to commit to shared: `$ git cherry-pick -x <SHA1>`
- `$ git push`
- Return to the working branch (master)
- Remove unused branch used for porting back.
  
  
  
## TODO 

- Implement Authentication: https://auth0.com/blog/2015/05/14/creating-your-first-real-world-angular-2-app-from-authentication-to-calling-an-api-and-everything-in-between/
-- ENV
-- login Service
- Implement ENV parameters following angular-bible
- Modify python
- Set class for calendar entries. GET 
- Drop down selection SQ (Sleep Quality) and TF (tiredness Feeling)
- Form New Item (uuid empty) POST 
- Form Update Item (uuid) PUT
- Delete Item by UUID DELETE


