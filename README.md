[![Build Status](https://travis-ci.org/datracka/sleepdiary.io.svg?branch=develop)](https://travis-ci.org/datracka/sleepdiary.io)
   
# Sleepdiary.io - track your sleep
### For install & running application 

* Install global dependencies
    - node /  npm (>= 6.2.1)

* Get project
 `git clone git@github.com:datracka/sleepdiary.io.git`
 
* Install dependencies
 `$ yarn global add typings && yarn`

* Run the app
 `$ yarn start`

* configure fireBase keys
https://firebase.google.com/docs/web/setup

*  browse http://localhost:3000

~~(You need the REST backend API running. By default the front-end app 
is looking for localhost:8080. This can be change in .env.dev file)~~
 


### Production (WIP)


### To develop and contribute into the project. 

Due we use subtree git philosophy there are some steps to take care once you modify the source code.

##### get updates / contribute in main container (sleepdiary.io) 

it is pretty straight forward. Proceed as known.

##### get updates from shared and bring them to local 

`$ git fetch shared/<branch>`
`$ git merge -s subtree --squash \ shared/<branch>` where `<branch` is the given branch to update
usually `develop`

##### commit changes made in shared folder 

Commits touching only the subtree, intended for backport (e.g. fixes); (below)

- create a branch `$ git checkout -b backport-shared \ shared/<branch>`

- cherry-pick the changes: `$ git cherry-pick -x <SHA1>`
   The picked changes should apply only to `shared` and not to `origin`. Therefore, when you commit in the repository
   you should carefully split the commits for `origin` and `shared`

- push `$ git push shared HEAD:<branch>` usually develop. 
For example id you are deloping in a branch in `shared` named `feature-branch` you should run
`$ git push shared HEAD:feature-branch`

- Return to the working branch ` git checkout <your-development-branch>`

- Remember to remove the porting branch after use it.


## Last.. It is a WIP!

So don't complaint and ask if you don't understand something.







