#!/bin/bash

# Make a copy from the template
cp .env.template .env

# Install node dependencies
yarn install

# Start database service
docker-compose up -d pgsqldb

# Load environment variables from .env first, then Run Migrations
env $(cat .env | xargs) yarn migration:run
