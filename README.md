# Introduction
Dashboard to indicate barrier health and highlight areas that need focus.

# Getting Started
1. Clone the repository
    ```
    $ git clone git@gitlab.dl.uk.centricaplc.com:iotahoe_developers/barrier.git
    ```
2. Install API dependencies:
    ```
    $ npm install -g gulp-cli
    $ cd <your project directory>/Barrier/server
    $ npm Install
    ```
3. Install Client dependencies
    ```
    $ cd <your project directory>/Barrier/client
    $ npm Install
    ```
4. Install MariaDB Server 10.6.x (choose to include optional install of Heidi SQL)

5. Connect to your local instance of MariaDB and create the following databases:
    a) barrier
    b) barrier_landing
    c) barrier_ods

6. Run each of the table, view and stored procedure scripts from the tables, views and stored procedures folder for each database
   
# Build and Test
Further work is required to tidy up the build process, at present you should follow the steps below to get started once you have cloned the repo and installed dependencies:

1. Build the server distribution:

    Edit  <your project directory>/Barrier/server/src/config/database-config so that the host is set to your local IP not localhost

    ```
    $ cd <your project directory>/Barrier/server
    $ gulp scripts
    ```
2. Run the API:
    ``` 
    $ cd <your project directory>/Barrier/server
    $ npm start
    ```

3. Populated the database with development data:
    a) Open HeidiSQL or similar MySQL GUI
    b) Choose to run the SQL script <your project directory>/database/barrier/data/insert_development_data.sql

4. Start the client application

    ```
    $ cd <your project directory>/Barrier/client
    $ ng serve
    ```
