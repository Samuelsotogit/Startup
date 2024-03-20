# Rizzedup
### Elevator Pitch
Have you ever encountered a cute person but don't know to break the ice? Or have you ever approached that one person but then fumbled the interaction? Well, Rizzedup is here to save your game. Say goodbye to sweaty hands and shaky legs. With Rizzedup users can simply log in, see the top rated approaches, pick up lines, or jokes and try them out! Users also have the options to post their own approaches, save their favorite ones, and see other people's profiles! A notification is sent to all users when a new post has become the top rated! Discover the power of charisma by using Rizzedup today.

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

- [x] **HTML pages** - six HTML pages that represent the landing page, the ability to login/sign up, rate posts on the main feed, see selfposts/saved posts, and the "about us" page.
- [x] **Links** - The login page automatically links to the main feed page (Javascript will add the functionality). The main page has a rating system (Javascript will add functionality to the rating and websocket will keep the tally). For now, every page contains navigation links to every other page for navigation simplicity. The link "profile" switches to "username" if looked at from the main feed page and the username page itself. This is because the user's username is supposed to be displayed after log in/sign in. If the user does not log in or sign in, then they cannot access the main feed and their profile. Eventually, I will make the profile link appear only after log in/sign in. The links are there for navigation clarity.
- [x] **Text** - Each post is a textual description. Every page contains text.
- [x] **Third Party API** - The landing page calls a third party API to display a new joke everytime the page is refreshed. Hence the joke on landing page above the image.
- [x] **Images** - User can upload a profile picture/Images are rendered on the landing page and on the About us page.
- [x] **DB/Login** - Input box and submit button for login. Posts are stored in and pulled from database. This is how all posts are kept up to date on the main feed and on the profile page.
- [x] **WebSocket** - The star ratings represent the tally of realtime reviews. Additionally, notifications are pushed in real time when a new post becomes top rated. This can be seen on the main feed and profile pages.

## CSS deliverable

➡️ The following is an example of the required information for the `Startup CSS` deliverable

For this deliverable I properly styled the application into its final appearance.

- [x] **Header, footer, and main content body** - I made a flex in every page to have the headers, main, and footer sections well placed. I also styled them with serif font, soothing colors, and cool background images.
- [x] **Navigation elements** - I set up my navigation bar as a three separate divs, each with a pair of hyperlinks to each page (Note: When the Javascript is implemented, I will drop the div with the login/sign in pair from the navigation bar).
- [x] **Responsive to window resizing** - Through media queries, I made the navigation bar responsive by changing its flex-direction, made headers and text change their font-size, and drop buttons as the screens gets tiny. 
- [x] **Application elements** - I used bootstrap for login/sign-in buttons as well as icons from google font. The icons are in the login/sign-in page and profile page.
- [x] **Application text content** - I used text in the about us section to describe the app. I also used text in every other page as a placeholder for websocket stuff.
- [x] **Application images** - I used an image on my landing page, a background image for my about-us page, a background image for my section 1 of my profile page, and a background image of a single color for the rest.

## JavaScript deliverable

➡️ The following is an example of the required information for the `Startup JavaScript` deliverable

For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

- [x] **login** - I used login an authentication by requiring the user to enter in a username and a password. This is illustrated by the change of name in the 'profile' hyperlink to the display the username after login. Additionally, a drop down menu with a log out button and a notifications placeholder is created on the nav bar upon login.
- [x] **database** - I pretended to use a database by storing the username, textcontent of posts, and rating on local storage.
- [x] **WebSocket** - A notifcation pops up at the top-right in the feed page whenever a user makes a new post. The notifications goes away after 10 seconds (Just for now to not have the feed fil with notifications).
- [x] **application logic** - Users get to the landing page, they click on login or sign-in, then a script takes them to the respective page. Upon login, a script then saves their information, takes the user to the main feed, and gives them the ability to log out using the post login drop down menu on the top right. Upon clicking on posts, a pop up appears, text can be inputed, and after confirmation the post is displayed on the main feed and stays there even if the page is reloaded. If the user ever wants to go back to a previous page, the click on the 'previous' button.  

## Service deliverable

➡️ The following is an example of the required information for the `Startup Service` deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

- [x] **Node.js/Express HTTP service** - Index.js has all the routs and serves up the middleware. Web Listens on port 4000. Index.js runed by node.
- [x] **Static middleware for frontend** - Public folder contains all the front end which is served up by the middleware.
- [x] **Calls to third party endpoints** - Fetch request to generate jokes is used for thirdparty endpoints being called.
- [x] **Backend service endpoints** - POST, GET, and PUT are service endpoints are served up from the backend. Post adds a new post to the website. Put updates the ratings. Get returns all the posts made.
- [x] **Frontend calls service endpoints** - Front-end calls the backend using fetch requests.

## DB/Login deliverable

➡️ The following is an example of the required information for the `Startup DB/Login` deliverable

For this deliverable I associate the votes with the logged in user. I stored the votes in the database.

- [x] **MongoDB Atlas database created**
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
