# Installation (Windows)
## Get repository
-´cd %userprofile%/git/tasks_around_university´
-´mkdir git´
-´cd git´
-´git clone https://github.com/JaliJuhola/tasks_around_university.git´
### Troubleshoot:
- install git CLI -> https://git-scm.com/downloads
## Install Python 
### Install python 3.7 globally
- [https://www.python.org/downloads/release/python-370/](https://www.python.org/downloads/release/python-370/)
- upgrade pip ´py -m pip install -U pip´
### Install virtualenv and pip requirements
- Start command prompt as adminstrator and ´py -m pip install virtualenv´
- ´cd %userprofile%/git/tasks_around_university´
- ´py -m virtualenv tasks_around_university´
- ´tasks_around_university\Scripts\activate´
- ´pip install -r requirements.txt´
###  Instal node through node.js installation page
- Instal node through [https://nodejs.org/en/](https://nodejs.org/en/)
- Restart computer
### Install react dependecies
- ´npm install´ in root directory

### Install and start postgres
- [http://www.postgresqltutorial.com/install-postgresql/](http://www.postgresqltutorial.com/install-postgresql/)
### migrate database
- run ´python manage.py migrate´ in git/´tasks_around_university/tasks-around-university
### Start dev server and rest api
- ´python manage.py runserver´
- ´npm start´ in root directory

# Testing

## Front-end jest tests

- npm test