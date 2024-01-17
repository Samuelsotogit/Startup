# Rizzedup
### Elevator Pitch
Have you ever encountered a cute person but don't know to break the ice? Or have you ever approached that one person but then fumbled the interaction? Well, with Rizzedup users can simply log in, see the top rated pick up lines, approaches, or jokes and try them out! Users also have the options to post their own approaches and/or images of their success!

### Design

![UI Design of the Rizzedup web application]()

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

- **HTML pages** - six HTML pages that represent the landing page, the ability to login/sign up, rate posts on the main feed, see selfposts/saved posts, and the "about us" page.
- **Links** - The login page automatically links to the main feed page. The main page contains links for to rate every post. Every page contains navigation links to main feed, profile, and "about us".
- **Text** - Each post is a textual description.
- **Images** - User can upload a profile picture.
- **DB/Login** - Input box and submit button for login. The voting choices represent data pulled from the database.
- **WebSocket** - The count of voting results represent the tally of realtime votes.

## CSS deliverable

➡️ The following is an example of the required information for the `Startup CSS` deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I dropped the underlines and changed the color for anchor elements.
- **Responsive to window resizing** - My app looks great on all window sizes and devices
- **Application elements** - Used good contrast and whitespace
- **Application text content** - Consistent fonts
- **Application images** - Still don't have images and so no styling here. 😔

## JavaScript deliverable

➡️ The following is an example of the required information for the `Startup JavaScript` deliverable

For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

- **login** - When you press enter or the login button it takes you to the voting page.
- **database** - Displayed the voting counts. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
- **WebSocket** - I used the setInterval function to periodically increase a random vote count. This will be replaced with WebSocket messages later.
- **application logic** - The highlight and ranking number change based up the user's selections.

## Service deliverable

➡️ The following is an example of the required information for the `Startup Service` deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **Calls to third party endpoints** - I didn't have time to implement this. 😔
- **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for voting.
- **Frontend calls service endpoints** - I did this using the fetch function.

## DB/Login deliverable

➡️ The following is an example of the required information for the `Startup DB/Login` deliverable

For this deliverable I associate the votes with the logged in user. I stored the votes in the database.

- **MongoDB Atlas database created** - done!
- **Stores data in MongoDB** - done!
- **User registration** - Creates a new account in the database.
- **existing user** - Stores the votes under the same user if the user already exists.
- **Use MongoDB to store credentials** - Stores both user and their votes.
- **Restricts functionality** - You cannot vote until you have logged in. This is restricted on the frontend only. 😔

## WebSocket deliverable

➡️ The following is an example of the required information for the `Startup WebSocket` deliverable

For this deliverable I used webSocket to update the votes on the frontend in realtime.

- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - done!
- **Data sent over WebSocket connection** - done!
- **WebSocket data displayed** - All user votes display in realtime. I'm really proud that this is working. Way cool!

## React deliverable

➡️ The following is an example of the required information for the `Startup React` deliverable

For this deliverable I converted the application over to use Vue. I know it is supposed to use React, but the instructor said I could use Vue because I already have extensive experience with React.

- **Bundled and transpiled** - done!
- **Components** - Login, voting list, vote are all components.
- **Router** - Routing between login and voting components.
- **Hooks** - Vue uses class properties instead of `UseState` to track changes in vote state.
