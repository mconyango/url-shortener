### Introduction
URL Shortener App is a simple web application for shortening a long URL. The back-end API is using Python (FastAPI) and the front-end is using React Js

### Installation Instructions
#### Dependencies
The dependencies for building and running this app are:
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - for retrieving the source code from a source code versioning repository.
* [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) - for building and deploying the URL Shortener instance.
* [Docker-compose](https://docs.docker.com/compose/install/) - also for building and deploying the app.
 
#### Obtaining the Source Code
After installing git, you will be able to clone the current version of this app from this repo, using:

```
git clone https://github.com/mconyango/url-shortener.git
```
#### Build and Run on your local machine
After obtaining the source code, to build and start the application, simply run (from within the main project folder):
```
sudo docker-compose up -d --build
```
It might take a few minutes to build the app. When it's done building, enter your container with:
```
sudo docker-compose up -d
```

That's it. If everything works then you can now access the app on your favorite browser:

#### To access the app, go to http://localhost:3000
#### To access the api docs, go to http://localhost:8000/docs
### Running Tests
#### Back-end tests
Run this command from the project root directory:
   ```
   sudo docker-compose exec backend pytest -v
   ```
#### Front-end tests
Run this command from the project root directory:
  ```
  sudo docker-compose exec frontend npm test
  ```