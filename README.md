# Rizzedup
## Elevator Pitch
Have you ever encountered a cute person but don't know to break the ice? Or have you ever approached that one person but then fumbled the interaction? Well, with Rizzedup users can simply log in, see the top rated pick up lines, approaches, or jokes and try them out! Users also have the options to post their own approaches and/or images of their success!
## Design
![UI Design of the Rizzedup web application]()
### Sequence Diagram between user and backend server

## Key Features
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
- **HTML:** Build application structure. Six HTML pages for:
  1. Landing Page with hyperlinks to "login/sign up" pages, "profile" page, and "about us" page.
  2. Login page with hyperlink to the previous page
  3. Sign up page hyperlink to the previous page
  4. Main feed page for rating and posting with hyperlinks to "profile" page, and "about us" page.
  5. Profile page with self-posts and saved posts with a notification tab
  6. About us page with a description of the app 
- **CSS:** Application asthetics, proper contrast of colors, well organized navigation tabs.
- **Javascript:** Functionality of:
  1. Log in/sign up
  2. Navigation
  3. Rating, posting, and saving posts
  4. Uploading profile picture
  5. Backend endpoint calls
- **Web Service:** Backend service with endpoints for:
  Log in/Sign up
  Updating "top rated" status
  retrieving ratings
  Making posts
- **Authentication/Database Persistance:**
  Store user credentials, ratings, posts, and notifications. Users can only rate, posts, and save posts if authenticated.
- **Web Socket:** As each user makes a post, or a post obtains the highest rating, notifications are sent to each user.
- **React:** Application ported to use the React web framework.
