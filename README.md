## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3005](http://localhost:3005)

### `yarn prod`

Runs the app in the production mode.<br />
Open [http://localhost:3005](http://localhost:3005)

# SQL

script to create the database:

CREATE TABLE IF NOT EXISTS "uploads" ("id" SERIAL , "yardCode" VARCHAR(255) NOT NULL, "employeeCode" VARCHAR(255), "clockIn" TIMESTAMP WITH TIME ZONE NOT NULL, "clockOut" TIMESTAMP WITH TIME ZONE NOT NULL, "filename" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deletedAt" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
