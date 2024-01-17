# Rizzedup
### Elevator Pitch
Have you ever encountered a cute person but don't know to break the ice? Or have you ever approached that one person but then fumbled the interaction? Well, Rizzedup is here to save your game. Say goodbye to sweaty hands and shaky legs. With Rizzedup users can simply log in, see the top rated approaches, pick up lines, or jokes and try them out! Users also have the options to post their own approaches, save their favorite ones, and see other people's profiles! A notification is sent to all users when a new post has become the top rated!

### UI Design of Application

![landing](https://github.com/Samuelsotogit/Startup/assets/156238134/9641298d-840b-4463-8516-07e176fbb846)
![login](https://github.com/Samuelsotogit/Startup/assets/156238134/8c7ca908-b45a-4ac4-b7a7-438da85f1005)
![signup](https://github.com/Samuelsotogit/Startup/assets/156238134/c74e4d91-3ea0-44a6-b376-894570da07ef)
![mainfeed](https://github.com/Samuelsotogit/Startup/assets/156238134/c133e193-9c09-47a1-a64e-1f08d3955dd1)
![profile](https://github.com/Samuelsotogit/Startup/assets/156238134/d3f06347-c7af-45c0-816d-fa41f8bacc03)
![aboutus](https://github.com/Samuelsotogit/Startup/assets/156238134/6651a153-cac2-409f-96bc-505735127a9c)

### Sequence Diagram between user and backend server

### Key Features
- Secure log in over HTTPS
- User credentials are stored
- Ability to have a profile picture
- Display of most popular approches
- Ability to rate posts
- Ability to save favorite posts
- Ability for users to post their own approaches
- Ability for admin to delete posts

### Technologies

I will use the required technologies in the following ways:

- **HTML:** - Build application structure. Six HTML pages for:
  - Landing Page with hyperlinks to "login/sign up" pages, "profile" page, and "about us" page.
  - Login page with hyperlink to the previous page
  - Sign up page hyperlink to the previous page
  - Main feed page for rating and posting with hyperlinks to "profile" page, and "about us" page.
  - Profile page with self-posts and saved posts with a notification tab
  - About us page with a description of the app 
- **CSS:** - Application asthetics, proper contrast of colors, well organized navigation tabs.
- **Javascript:** - Functionality of:
  - Log in/sign up
  - Navigation
  - Rating, posting, and saving posts
  - Uploading profile picture
  - Backend endpoint calls
- **Web Service:** - Backend service with endpoints for:
  - Log in/Sign up
  - Updating "top rated" status
  - retrieving ratings
  - Making posts
- **Authentication/Database Persistance:**
  - Store user credentials, ratings, posts, and notifications. Users can only rate, posts, and save posts if authenticated.
- **Web Socket:** - As each user makes a post, or a post obtains the highest rating, notifications are sent to each user.
- **React:** - Application ported to use the React web framework.

## HTML Deliverable

➡️ The following is an example of the required information for the `Startup HTML` deliverable

For this deliverable I built out the structure of my application using HTML.

- [ ] **HTML pages** - six HTML pages that represent the landing page, the ability to login/sign up, rate posts on the main feed, see selfposts/saved posts, and the "about us" page.
- [ ] **Links** - The login page automatically links to the main feed page. The main page contains links for to rate every post. Every page contains navigation links to main feed, profile, and "about us".
- [ ] **Text** - Each post is a textual description.
- [ ] **Images** - User can upload a profile picture.
- [ ] **DB/Login** - Input box and submit button for login. Posts are stored in and pulled from database.
- [ ] **WebSocket** - The star ratings represent the tally of realtime reviews. Notifications are pushed in real time when a new post becomes top rated.

## CSS deliverable

➡️ The following is an example of the required information for the `Startup CSS` deliverable

For this deliverable I properly styled the application into its final appearance.

- [ ] **Header, footer, and main content body**
- [ ] **Navigation elements**
- [ ] **Responsive to window resizing** -
- [ ] **Application elements** -  
- [ ] **Application text content** - 
- [ ] **Application images** - 
## JavaScript deliverable

➡️ The following is an example of the required information for the `Startup JavaScript` deliverable

For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

- [ ] **login**
- [ ] **database**
- [ ] **WebSocket**
- [ ] **application logic**

## Service deliverable

➡️ The following is an example of the required information for the `Startup Service` deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

- [ ] **Node.js/Express HTTP service**
- [ ] **Static middleware for frontend**
- [ ] **Calls to third party endpoints**
- [ ] **Backend service endpoints**
- [ ] **Frontend calls service endpoints**

## DB/Login deliverable

➡️ The following is an example of the required information for the `Startup DB/Login` deliverable

For this deliverable I associate the votes with the logged in user. I stored the votes in the database.

- [ ] **MongoDB Atlas database created**
- [ ] **Stores data in MongoDB**
- [ ] **User registration**
- [ ] **existing user**
- [ ] **Use MongoDB to store credentials**
- [ ] **Restricts functionality**

## WebSocket deliverable

➡️ The following is an example of the required information for the `Startup WebSocket` deliverable

For this deliverable I used webSocket to update the votes on the frontend in realtime.

- [ ] **Backend listens for WebSocket connection**
- [ ] **Frontend makes WebSocket connection**
- [ ] **Data sent over WebSocket connection**
- [ ] **WebSocket data displayed** 

## React deliverable

➡️ The following is an example of the required information for the `Startup React` deliverable

For this deliverable I converted the application over to use Vue. I know it is supposed to use React, but the instructor said I could use Vue because I already have extensive experience with React.

- [ ] **Bundled and transpiled**
- [ ] **Components**
- [ ] **Router**
- [ ] **Hooks**
