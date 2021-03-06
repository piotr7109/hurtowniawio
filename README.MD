#####################################################################
# hurtowniawio

## Requirements:

* Node.js 6.9.2+ (possibility to run on 5.2, tested on 6.9.2)
* npm  3.10+
* Maven 3.3.9+
* Java 1.8+
* MySQL 5.5+

## To configure project:

1. Edit \src\main\resources\META-INF\persistence.xml file
2. Set user, password and url for all persitence units
3. Create schema named `wholesale` and user `vegetable` with password given in persistence file; grant all privilages to him in created schema

## For Windows users:

For first run launch `buildAndRun.bat` from project root directory. 

For demo content please see section `DEMO CONTENT`

Page wil be available under `localhost:8080`. Default user is `admin` with password `admin`.

No further steps are needed.

For another launches see section `To run project`

## DEMO CONTENT

Additionally you can import sql file to database (`sqlDemoContent/hurtowniawio.sql`) for demo content. 

## To install and build npm dependencies:

1. Move to `static` in root directory
2. Type `npm install`
3. Type `gulp compile`

## To build project:

1. Move to root directory
2. Type `mvn clean install`
3. `mvn exec:java -Dexec.mainClass="com.beef.core.bootstrap.DatabaseCreation"`

## To run project:

1. Move to root directory
2. Type `mvn spring-boot:run`
3. Go to http://localhost:8080/
4. Default user is `admin` with password `admin`
5. Enjoy!

#########################################################################

#####################################################################

# Demo markup

Requirements:
Node 4.0 or newer,
npm  2.0 or newer

To build demoMarkup (from demoMarkup directory):

npm install

npm install --global gulp-cli

gulp watch

Website will automatically run in default user browser.


#########################################################################
