# Sleep diary source code

### For Running application 

- Install dependencies 
  `$ npm install`
- Run json-server (only in the meanwhile proper login is not implemented)
  `$ npm run json-server`
- Run the app
  `$ npm start`
- 
  browse http://localhost:3000/app/
  
## Github management. 
  
Intended for `sleepdiary.io-shared` repo management. For `sleepdiary.io` repo proceed as usual. 
(take in account that `shared` folder is attach to a shared remote repo) `
following: https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec#.rhx54pb4e

# Standart proceed to get shared updates from github repository

`$ git fetch shared`
`$ git merge -s subtree --squash \ shared/<branch>` where `<branch` is the given branch to update
usually `master`

# Updating the share code / backporting shared` code for `sleepdiary.io-shared` remote repo :
Commits touching only the subtree, intended for backport (e.g. fixes); (below)

- create a branch `$ git checkout -b backport-shared \ shared/master`
- cherry-pick the changes: `$ git cherry-pick -x <SHA1>`
- push `$ git push shared HEAD:master`
- Return to the working branch (usually master) ` git checkout master`
- Remove unused branch used for porting back.
  
 
  
## TODO 

- Environment variables in a common (Mobile / Wweb) way.
- Login
- Implement Authentication: https://auth0.com/blog/2015/05/14/creating-your-first-real-world-angular-2-app-from-authentication-to-calling-an-api-and-everything-in-between/
-- 
-- login Service
- Implement ENV parameters following angular-bible
- Modify python
- Set class for calendar entries. GET 
- Drop down selection SQ (Sleep Quality) and TF (tiredness Feeling)
- Form New Item (uuid empty) POST 
- Form Update Item (uuid) PUT
- Delete Item by UUID DELETE


