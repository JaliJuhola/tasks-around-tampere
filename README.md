# Installation (Windows)
## Get repository
- ```cd %userprofile%/git/tasks_around_university```
- ```mkdir git```
- ```cd git```
- ```git clone https://github.com/JaliJuhola/tasks_around_university.git```
### Troubleshoot:
- install git CLI -> https://git-scm.com/downloads
## Install Python 
### Install python 3.7 globally
- [https://www.python.org/downloads/release/python-370/](https://www.python.org/downloads/release/python-370/)
- upgrade pip ```py -m pip install -U pip```
### Install virtualenv and pip requirements
- Start command prompt as adminstrator and ```py -m pip install virtualenv```
- ```cd %userprofile%/git/tasks_around_university```
- ```py -m virtualenv tasks_around_university```
- ```tasks_around_university\Scripts\activate```
- ```pip install -r requirements.txt```
###  Instal node through node.js installation page
- Instal node through [https://nodejs.org/en/](https://nodejs.org/en/)
- Restart computer
### Install react dependecies
- ```npm install``` in root directory

### Install and start postgres
- [http://www.postgresqltutorial.com/install-postgresql/](http://www.postgresqltutorial.com/install-postgresql/)
### migrate database
- run ```python manage.py migrate``` in git/tasks_around_university/tasks-around-university
### Start dev server and rest api
- 
- ```python manage.py runserver```
- ```npm start``` in root directory

### Testing database connection
- [http://localhost:3000/mini_games/test](http://localhost:3000/mini_games/test) 
- At the beginning database is empty clicking Post you create new database object and clicking patch you add item to it.
- You can also observe this change in Django-shell by running ```python manage.py shell``` 
Example query:
```
from rest.hello_world.models import Counter
Counter.objects.count()
for item in Counter.objects.all():
    item.__dict__
// In example you can get dictionary for item showing in testing site by
// Counter.objects.last().__dict__
// Changing it by
// c = Counter.objects.last() 
// c.count = 9999
// c.save()
// now count in ui should be updated as well
``` 
- More about django queries in [Django documentation](https://docs.djangoproject.com/en/2.1/topics/db/queries/)

# Testing

## Front-end jest tests
- ```npm test```

## Python unittests
- ```python manage.py test```