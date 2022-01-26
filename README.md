##Dependencies:
1. Docker
2. Docker-compose

##INSTALLATION

####To build the appropriate Docker container, run the following from your terminal:
```sudo docker-compose up -d --build```

####When it's done building, enter your container with:
```sudo docker-compose up```

####Open up your favorite browser and go to localhost:8000

#### run this command to see the list of running Docker processes
```sudo docker ps```

####Interacting with the database
```sudo docker-compose exec db psql -h localhost -U postgres --dbname=postgres```

