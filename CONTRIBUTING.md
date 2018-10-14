# Version control
## Git pipeline by creating new pull request
- Change branch to development ```git checkout development```
- Pull latest version of development ```git checkout development```
- Create new branch ```git branch <type>_<what_is_done>``` read branch naming conventions below
- Checkout to created branch ```git branch created_branch_name```
- make your changes to code and test those
- add your changes by using ```git add -p``` and ```git add file_where_changes_are.txt```
- crete commit ```git commit -m "Here short explanation what is done."```
- Push your changes to repository  ```git push --set-upstream origin name_of_your_branch```
- find your branch and click it in [List of branches] (https://github.com/JaliJuhola/tasks_around_university/branches)
- Click create pull request and wait for approving review.
- Now you can merge your pull request!


## Branch naming conventions
- replace **<type>** with one of items in this list below and **<what_is_done>** with description of change.

**Bug**: Code changes to assigned bug
**feat**: New feature
**hotfix**: Fix without assignation.
**junk**: Experimental stuff (Should not be merged)


