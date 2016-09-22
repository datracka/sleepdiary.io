# Sleepdiary.io - track your sleep
### For install & running application 

* Get project
 `git clone git@github.com:datracka/sleepdiary.io.git`
 
* Install dependencies
 `$ npm install`

* Run the app
 `$ npm start`
 
*  browse http://localhost:3000

(You need the REST backend API running. By default the front-end app 
is looking for localhost:8080. This can be change in .env.dev file)
 
## Development & git management

We are using develop branch for development. It has a stable and all the time deployable versión. For development we are stick to feature
branch philosophy 

More info: 

// link to git flow
// link to feature branch

Besides that wee use a git tree philosophy https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec#.rhx54pb4e
so you need to do the following steps:

* Get shared repository (we use)

    * Add remote
        `$ git remote add shared git@github.com:datracka/sleepdiary.io-shared.git`
        `$ git fetch shared`

    * Set remote files in chosen location  
        `$ git read-tree \` (press enter)
        `> --prefix=app/src/shared -u shared/<branch>` default develop 
        
        **NOTICE** if shared already exists this command will raise an error: `Can't not do binding`. To override
        this remove the `-u` flag to only set the binding in cache and not write the files themself

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







