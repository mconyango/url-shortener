# pull the official docker image
FROM python:3.9.4-slim

# set work directory
WORKDIR /code

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
#COPY requirements.txt .
COPY ./requirements.txt /code/requirements.txt
RUN pip install --upgrade pip
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
#RUN pip install -r requirements.txt
# copy project
#COPY . .
COPY ./app /code/app
