# Demo Available

[DEMO](http://gnar-spa.s3-website-sa-east-1.amazonaws.com)

## Available Scripts

In the project directory, you can run:

### `yarn dev` || `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3005](http://localhost:3005)

### `yarn prod` || `npm run prod`

Runs the app in the production mode.<br />
Open [http://localhost:3005](http://localhost:3005)

# SQL

script to create the database:

CREATE TABLE IF NOT EXISTS "uploads" ("id" SERIAL , "yardCode" VARCHAR(255) NOT NULL, "employeeCode" VARCHAR(255), "clockIn" TIMESTAMP WITH TIME ZONE NOT NULL, "clockOut" TIMESTAMP WITH TIME ZONE NOT NULL, "filename" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deletedAt" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));

#### ps: You don't need to run sql script because both prod and dev are running postgres on cloud

# database connection

host: gnar-challenge.ctqt4d4deqat.sa-east-1.rds.amazonaws.com \
port: 5432 \
username: gnar \
password: rp[gB.2k
