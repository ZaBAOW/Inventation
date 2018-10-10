# Inventation

## Screenshots

Home Page View | Login Page View
:-------------------------------:|:----------------------:
![Home Page](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/home_page.png) | ![Login Page](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/login_page.png)
Signup Page View
![Signup Page](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/sign_up_page.png)
Site Create Page View
![Open Menu Icon](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/open_menu_icon.png)
Info Box View | Countdown View
![Info Box View](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/Info_box.png) | ![Countdown View](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/count_down.png)
Slideshow View
![Slideshow View](https://github.com/ZaBAOW/Inventation/blob/master/screen_shots/slide_show.png)

**Known Issues:**

**Some issues stated below are recent, and therefore eleborations of them will be submitted
to the Issues tab at a later date after they have been investigated**

**There are no messages in place that are shown in response to an invalid user request
at the moment.**(SOLVED)

**JWT are currently not stored securly in cookies and are instead stored in
localStorage().  Once the ability to retrieve JWT from cookies is found
this security risk will not be present.**

**Save session function is either not correctly saving(updating) when the user clicks
the save session button, or, retrieving and loading the session onto the website-conainer
element.**(SOLVED)

**There are no buttons located on the signup and login page that allow for the user to
easily return to the homepage, given they need to switch from the signup
page to the login page, and vise versa.**(SOLVED)

**Some parts of this version of Inventation will not work on gh-pages or Heroku.  This will
be attended to in the future.**(SOLVED)

## About Inventation
**Initial build:**
The purpose of this web app is to be used for the creation
of website that contain event/invatation information. Like similar
web apps, this site will not only serve as a place of information for
attendees for the site's respective event, but also as an alternate method
for rsvp'ing to said event incase of standard mailing issues.  Each site
is created by the user via the used of simple button presses.  Each button press
will allow for the inclusion of different features (i.e. event info box, countdown timer, ...).
The site currently has 5 different pages including: a homepage, login page, signup page,
site creation page, and site preview page.

**July 2018 update:**
Currently Inventation has two major functions that work with minimal bug and/or errors
occurring.  The first being the site's user profile creation and login functions
that allow for users to use either the user signup or user login pages as paths
toward reaching the site creation page.  The second being the creation and updating(saving)
of user sessions withing the site creation page.  There is a preview button that exists on
the site creation page that leads to a preview page, but currently the page is not ready.

**September 2018 update:**
Inventation shows no signs of bugs and/or errors.  The users' ability to signup and login
function as intended and issues with user deletion via the chai unit tests has been resolved.
Users are now able to save their session and have it load for them when they return to the
site creation page.  The preview button has been removed from the site-creation page.  Due
to time constraints a preview page for the site and the ability to publish the site will
be put on hold.

## Getting Started

to do:
  - explain how to get to the site
  - explain the basic features of the site

**Initial build:**
The user begins with a completely blank page and a sidebar with
a list of option that the user can choose from.  Clicking an option
will append it onto the page. (will need to figure out how ordering will work)
The user can append as many or as few feature as needed for their site.
There will also be buttons that will allow for the addition of images.
One button will be used to add an image to the background of the page, while
the other will be used to add images to the foreground.

**July 2018 update:**
The user will begin on the homepage with the option to go to either the login
page or the signup page.  Once the user is on their page of choice, they will
enter the required information given to them.  If the information is valid they will
be redirected to the site creation page.  On the site creation page the user will
have access to a blank slate and a few features to append to said slate.  The user
can append and remove these feature as many times and in any order they may choose.
When the user is done the save button can be used to save the user's site creation
session.  When they log in to their site again they will be able to return to
the version of the site they last left on.

**September 2018 update:**
Users will begin on the homepage with the option to go to either the login
page or th signup page. If the user does not have a profile, they will go
to the signup page to create one.  After creating their profile the user will be
redirected to the login page where they will input the username and password of their
newly created account.  If the user has a profile or beleives to have one, they will
go to the login page.  The user will then enter their username and password.  If valid
the user will be redirected to the site-creation page.  Otherwise the user will be presented
with an alert telling them that their input was invalid.  In the case that the user
does not have a profile, there is a link under the login input fields that will redirect
the user to the signup page where they will create a profile and return to the login page.

In the instance of a returning user, when the site-creation page is loaded, the user's last
saved session will be loaded.  If the user is new an alert will ask the user if they want
to create a new session.  Clicking yes will create the new session and append an info box
for the user by default.  The user can remove the info box if they wish.  After, the user
can append and remove features from the side navigation bar, which is accessed by via the
menu icon in the upper left corner of the page.  The current features are: InfoBox, Count Down
timer, and slideshow.  Info box allows for the addition of text to the page.  Count Down allows
for the addition of a timer that count down to the user's selected date.  Slideshow allows
the user to upload images to a slideshow.  When the user is finished they can use the save
function also found in the side navigation bar.  An alert will appear if the session is
saved successfully.


## Userflow
to do:
  - describe how the creating user will interact with the site
  - describe how the invited user will interact with the site

**Initial build:**
The creating user will enter Inventations homepage where they will
be presented with a form (username, password, first name, last name
to fill out.  After filling out the form they will then click on the
"Create" button to finalize their user profile. **They will be redirected to a website creation page
that will appear blank, or, they will need to click on a "Go to Page" button to
get to their site.**(create a test for this)  The creation sidebar will appear automatically.  The user
will then begin choosing the features for their site.  They will be able to experiment
with the order of features to fit their look. When the website is finished, the user
will be able to see a preview version of the site before publishing it (via herokuapp).  When publishing
the site, the user will be prompted to create a master username and password in order
to access the page.  There will be a note shown that tells the user that these two inputs
will be required for their guest to also access the site, and should be conveyed to them
via the invitations that are sent out (as well as the site url).

The invited users will visit the url found in their invitations and use the username and password
to gain access to the site.  They will find browse the page and select their decision into the RSVP
section.

If the user has the desire to remove themselves from Inventation, they have the ability to do so via
the "Delete Profile" button on the homepage.  **This in turn will also delete their site.**(create test for this)

**July 2018 update:**

The user begins on the homepage that consists of the website's title, a link
to the signup page, and a link to the login page.

Route 1
If the user has not signed up for a user profile, they will then click on the signup
link to be sent to the signup page.  At the signup page, the user will enter in
information into a form presented to them.  If the user is able to enter valid
information into the form, they will be immediately redirected to the site creation page.
Otherwise they will be presented with an error message due to either missing or
invalid information that was input. **(there is currently no code in place that presents
this error to the user outside of the developer tools) (users can delete user profiles, but
there is currently no practical use for this function at the moment)

Route 2
If the user has already signed up for a user profile, they will click on the login
link to be sent to the login page.  At the login page, the user will enter their
respective username and password.  If the user's login attempt is succeful, they will
be redirected to the site creation page.  Otherwise they will be presented with an error
message due to either mission or invalid information that was input.**(there is currently
no code in place that presents this error to the user outside of the developer tools)

Site Creation page
Despite which ever route is chosen by the user, if they are able to give the application
valid information, they will redirect to the site creation page.  On the site creation
page they user will have access to a side menu, which is opened by pressing on the menu
icon in the top left corner of the site creation page.  Currently there are five buttons
available for the user to interact with.  The first three buttons are what the user will
click in order to append one of the three features respective to the button they clicked.
If the user wishes to remove the feature, they will be able to click on the "remove" button
represented by an "x", which will be located to the right of its respective feature.
The fourth button in the side menu will allow for the user to return to the homepage.
They fifth button will allow the user to save their current session in the site creation page
for when they are done or need to return to the session another time.**(there is a preview button
that does redirect to a preview page that does not work as intended at the moment)**

**September 2018 update:**

The user begins on the homepage that consists of the website's title, a link
to the signup page, and a link to the login page.

Route 1
If the user has not signed up for a user profile, they will then click on the signup
link to be sent to the signup page.  At the signup page, the user will enter in
information into a form presented to them.  If the user is able to enter valid
information into the form, they will be immediately redirected to the site creation page.
Otherwise they will be presented with an error message due to either missing or
invalid information that was input.  The user will then use the link on the page to
visit the signup page to create a valid profile and after will be returned to the
login page.

Route 2
If the user has already signed up for a user profile, they will click on the login
link to be sent to the login page.  At the login page, the user will enter their
respective username and password.  If the user's login attempt is succeful, they will
be redirected to the site creation page.  Otherwise they will be presented with an error
message due to either mission or invalid information that was input

Site Creation page
Despite which ever route is chosen by the user, if they are able to give the application
valid information, they will redirect to the site creation page.  On the site creation
page they user will have access to a side menu, which is opened by pressing on the menu
icon in the top left corner of the site creation page.  Currently there are five buttons
available for the user to interact with.  The first three buttons are what the user will
click in order to append one of the three features respective to the button they clicked.
If the user wishes to remove the feature, they will be able to click on the "remove" button
represented by an "x", which will be located to the right of its respective feature.
The fourth button in the side menu will allow for the user to return to the homepage.
They fifth button will allow the user to save their current session in the site creation page
for when they are done or need to return to the session another time.  The previe button that
existed in the previous update has been removed.

### Prerequisites
So far the chrome is the primary browser in mind for this web app

**July 2018 update:**
Chrome is the only browser that the web app has been tested on.
Therefore, users must have Chrome in order to properly use it.

**September 2018 update:**
nothing has been changed as far as accessibility outside of
Chrome.

### Installing

**July 2018 update:**
Clone or download the files from the Inventation master branch into a folder
on your device. Open gitbash and and move to the directory with the files.
type ``npm start`` to start the local server.  Open chrome and type in the
url ``http://localhost:8080/homePage.html``.  This will take you to Inventation's
homepage where you will be able to interact with the site.

### Break down into end to end tests

**July 2018 update:**
navigation from homepage -> signup page/login page:
this test includes checking that each link found on
the homepage directs the user to the appropriate page.

user profile creation:
this test includes checking that if valid information is
inputted into the signup form, then the user is redirected
to the site creation page when the create button is clicked.
On the other hand this test also checks that if the user enters
invalid information into the form, the user does not get redirected
to the site creation page and an error appears in the browser
console.

user login:
This test checks that if valid information is entered into the
login form, then the user is redirected to the site creation page
when the login button is clicked.  On the other hand this test
also checks that if the user enters invalid information into
the form, the user does not get redirected to the site creation
page and an erro appears in the browser console.

site creation page:
This test checks that the buttons found in the side menu of the
site creation page append features.

## Deployment

Add additional notes about how to deploy this on a live system

**July 2018 update**

Inventation is deployed via Heroku

## Built With

**July 2018 update:**
Inventation utilizes libraries from:
- express.js: framework used
- mongoose.js: used for user and session object modeling
- chai: used for unit testing
- chai-http: used for unit testing
- mocha: used for integrated testing


## Authors

Andrew Kadesky (https://github.com/ZaBAOW)

## RoadMap for the future of Inventation
The ultimate purspose of Inventation was to allow for users to publish their own
site for upcoming events with ease.  Such functionality has yet to be implemented
so this will be one of the primary focuses for future updates.

Along with that, the inclusion of a preview page for the user to check the look and
feel of their site before publishing will be a part of the site publishing updates.

At the moment the home, signup, and login pages are all somewhat bland in style.
Future updates will see that the look and feel of these pages will be more stylish
and better to look at for the user.

New site features and added interactions to already existing features will be include
to allow for more variety when creating your site.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
