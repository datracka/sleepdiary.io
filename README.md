# Sleepdiary.io - track your sleep

### For install & running application 

* Get project
 `git clone git@github.com:datracka/sleepdiary.io.git`

* Get shared repository (we use https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec#.rhx54pb4e)

    * checkout develop as main branch
        `$ git checkout develop`

    * Add remote
        `$ git remote add shared git@github.com:datracka/sleepdiary.io-shared.git`
        `$ git fetch shared`

    * Set remote files in chosen location  
        `$ git read-tree \` (press enter)
        `> --prefix=app/src/shared -u shared/<branch>` default develop       
        
        **NOTICE**: for any reason after create the SUB-REPO, the directory `app/src/shared` is tracked by GIT 
        although it is ignored in .gitignore!! Until I understand what it is happening to fix it do the following:  
        
        `$ git rm -r --cached src/app/shared ` 

* Install dependencies
    `$ npm install`

* Run the app
    `$ npm start`

*  browse http://localhost:3000

## Development & git management

Following it is described the steps needed to develop and contribute into the project.

- Due we use subtree git philosophy (again https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec#.rhx54pb4e)
there are some steps to take care once you modify the source code.

- The main branch for CI is `develop`. `Master` remains as backup branch
- We are following to the feature branch approach for development

#### How to get updates / contribute in main container (sleepdiary.io) 

it is pretty straight forward. Proceed as known.

#### How to get updates from shared and bring them to local 

`$ git fetch shared/<branch>`
`$ git merge -s subtree --squash \ shared/<branch>` where `<branch` is the given branch to update
usually `develop`

#### How to commit changes made in shared folder 

Commits touching only the subtree, intended for backport (e.g. fixes); (below)

- create a branch `$ git checkout -b backport-shared \ shared/<branch>`

- cherry-pick the changes: `$ git cherry-pick -x <SHA1>`
   The picked changes should apply only to `shared` and not to `origin`. Therefore, when you commit in the repository
   you should carefully split the commits for `origin` and `shared`

- push `$ git push shared HEAD:<branch>` usually develop

- Return to the working branch ` git checkout <your-development-branch>`

- Remove unused branch used for porting back.


## Last.. It is a WIP!

So don't complaint and ask if you don't understand something.

- Implement Authentication: https://auth0.com/blog/2015/05/14/creating-your-first-real-world-angular-2-app-from-authentication-to-calling-an-api-and-everything-in-between/
- Implement ENV parameters following angular-bible
- Modify python
- Set class for calendar entries. GET
- Drop down selection SQ (Sleep Quality) and TF (tiredness Feeling)
- Form New Item (uuid empty) POST
- Form Update Item (uuid) PUT
- Delete Item by UUID DELETE
