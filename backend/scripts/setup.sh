#!/bin/bash

cp .env.template .env
yarn install
docker-compose up -d postgresdb
