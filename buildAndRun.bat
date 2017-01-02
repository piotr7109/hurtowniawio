cd static
call npm install --g gulp-cli
call npm install
call gulp compile
cd ..
call mvn clean install
call mvn exec:java -Dexec.mainClass="com.beef.core.bootstrap.DatabaseCreation"
call mvn spring-boot:run

