# ITIS-4166-Project-4

How to run:

*Make sure you have nodeJS installed, these instructions are intended for VScode*

1) Command to install dependencies: 

    `npm install`
  
2) Install MongoDB: https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-windows/

    *You can also use mongoDB Atlas*

    For Windows:
     -  run MongoDB as a Windows service by typing the following line at the command interpreter (cmd) with admin previlege:
     
        `C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe`
     -  If that does not work then run the using the following command in your cmd:
      
        `mongosh`
     
     For macOS:
      - Run the following commands:
      
        `brew tap mongodb/brew`
        
        `brew install mongodb-community@4.4`
        
        `brew services start mongodb-community@4.4`
        
3) Change line 16 of app.js to your MongoDB connection string
        

4) Command to run application:

    `nodemon app`

5) *Now go to any browser and type in*

   `http://localhost:3000/`
