Appendable Functions:
  - info box
    - title
    - content
    - images
  - Countdown
    - Set Dates
  - RSVP(for later)
  - Add Images(for later)
    - background
    - foreground
  - slideshow

REST API for users:
  - have field in home page for registering users
  - user will click the "Create Page"
  - ID will be assigned to newly created site and ID will be appended to end of url.
  - url will also go into JSON object
  - app will create a JWT for the user (JWT will include url /w appended ID)
  - After the user closes the site and return, they will be directed by text to enter the login fiels
      then click the "Go to existing Site"(or something)

TO DO(listed by importance):
  - model for user JSON object
  - insert request functions into server.js
  - insert use of JWT's into app (use node-auth-jwt glitch for reference)
  - create test for user request functions
    - test for creating user profile(/w JWT)
    - test for posting site to site list?
    - test for updating user JWT
    - test for deleting site from site list
  - fix site features so that they work as intended
  - create templates for a preview/publish format
  - plan out boxes for element organization
  - create quick full site append buttons(for later)
  - find a way to have the app deploy user's site(for later)

Ideas for preview/publish format:
  - info-box text does not carry over to preview site
    - create submit button to store content to be inputted into a span element
      - what will happen when there are multiple info-boxes?
    - have a listener parse changes to info-box content when typed in

Test Expectations:
  - GET test expects (when user log in to their site)
    - objects to have key values for: username, password, id, JWT
    - object to be JSON
    - status to be 200
  - POST test expects (when user creates a site)
    - user input to include key values for: username, password
    - info to be posted as a JSON object
      - JSON object should include key values for: username, password, id, JWT
    - status to be (post success code)
  - Delete test expects (when user deletes their site)
    - object respective to id to exist
    - status to be 204
  - PUT test expects (when user logs back into their site)
    - object respective to id to exist
    - object to have a key value for: JWT
    - JWT key value to have been updated
    - status to be (put success code)
 
 expiration date for sites:
    - The user will be prompted to enter a date after creating their site and before editting it
    - the site will expire a month after the scheduled date
