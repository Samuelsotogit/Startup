### Github Assignment

From this GiHub assignment, I learned how to use new command line arguments to update my remote repository with my local one and vice versa. I learned how to deal with merge conflicts, how to navigate GitHub, and how to ask rubber duck lots of questions, haha. The most useful thing I learned was realizing that there existed a collaboration tool for software engineers I was unaware of. 
[Click Me to Learn More!](README.md)


### EC2 Assignment

From the EC2 Assignment I learned how to rent a server, where to rent it from, what types of servers there are (e.i t2.nano, t3.micro, etc), and how those different types of servers have distinct capacities (Depending on how big  project is, newer servers with greater capacities are needed).
I also learned how to create a host name for my web app.

### HTTPS, TLS, Certificates Assignment

From this assignment I learned that I need to create records of my route 53 to connect my hostname with my IP address. I learned that I can also create subdomains of my main domain (ei whateversubdomain.mydomainname.com). I also learned that once I have this domains records, I can use Caddy to give me secure connection to my domain (HTTPS). This happens as "Caddy", "let's encrypted", and the user request to access the website interact with each other through the user of "certificates" to make sure I am going to a secured site. I also learned that by using "curl" commands I can see the direct exchange of interactions between these three components (Caddy, Let's Encrypted, and user request on the web). 

### Start-up Login/Authentication Assignment

I learned that after creating an account on Mongodb Atlas, I need to create a cluster, then create a database, and then a collection inside the database. Each database can contain different collections. These collections are where the data used on my "database.js" file gets stored, retrieved from, and updated.

Endpoints debugging: I learned that by placing breakpoints on my frontend code inside the browswer, I can see the chronological endpoints requests/callbacks between my frontend and my backend code. This is helpful to pinpoint if bugs are occuring on the front or back ends.

Frontend/backend & database relation: I learned that whatever data is stored in the databse, the backend can retrieve after receiving a fetch request for that data from the frontend code. A key block to include as requests and responses are sent is a 'if response.ok' statement to ensure that if something goes wrong throughout the request and response process, authentication and login will not occur. 

Backend and database debugging: I learned that by putting breakpoints on the backend functions and if statements related to the database, I can examine if the right data from the database is being retrieved correctly. 

### Current issues in the code:

The transition to react has changed some of the css in the navigation bar such as the home icon and then drop down menu icon. Must fix these issues for users to log out properly.

Page is only sorted when reloaded. Perhaps websocket will fix this to sort posts and display them live. 

The profile page has been temporarily disabled. It still requires additional code to display saved posts, and self-made posts. Currently working these issues.

