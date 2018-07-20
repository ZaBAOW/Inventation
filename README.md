# Inventation

to do:
 - explain purpose of site
 - explain what the site is

Initial build:
The purpose of this web app is to be used for the creation
of website that contain event/invatation information. Like similar
web apps, this site will not only serve as a place of information for
attendees for the site's respective event, but also as an alternate method
for rsvp'ing to said event incase of standard mailing issues.  Each site
is created by the user via the used of simple button presses.  Each button press
will allow for the inclusion of different features (i.e. event info box, countdown timer, ...).
The site currently has 5 different pages including: a homepage, login page, signup page,
site creation page, and site preview page.

Update for current build:
Currently Inventation has two major functions that work with minimal bug and/or errors
occurring.  The first being the site's user profile creation and login functions
that allow for users to use either the user signup or user login pages as paths 
toward reaching the site creation page.  The second being the creation and updating(saving) 
of user sessions withing the site creation page.  There is a preview button that exists on
the site creation page that leads to a preview page, but currently the page is not ready.

## Getting Started

to do:
  - explain how to get to the site
  - explain the basic features of the site

Initial build:
The user begins with a completely blank page and a sidebar with
a list of option that the user can choose from.  Clicking an option
will append it onto the page. (will need to figure out how ordering will work)
The user can append as many or as few feature as needed for their site.
There will also be buttons that will allow for the addition of images.
One button will be used to add an image to the background of the page, while
the other will be used to add images to the foreground.



### Userflow
to do:
  - describe how the creating user will interact with the site
  - describe how the invited user will interact with the site

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

Update for current build:

The user begins on the homepage that consists of the website's title, a link
to the signup page, and a link to the login page. 

Route 1
If the user has not signed up for a user profile, they will then click on the signup
link to be sent to the signup page.  At the signup page, the user will enter in 
information into a form presented to them.  If the user is able to enter valid 
information into the form, they will be immediately redirected to the site creation page.  
Otherwise they will be presented with an error message due to either missing or 
invalid information that was input. (there is currently no code in place that presents 
this error to the user outside of the developer tools).  

Route 2
If the user has already signed up for a user profile, they will click on the login
link to be sent to the login page.  At the login page, the user will enter their
respective username and password.  If the user's login attempt is succeful, they will
be redirected to the site creation page.  Otherwise they will be presented with an error
message due to either mission or invalid information that was input.(there is currently 
no code in place that presents this error to the user outside of the developer tools).

### Prerequisites

to do:
  - what browsers are compatible with the site

So far the chrome is the primary browser in mind for this web app

### Installing

to do?:
  - assuming a user doesn't use compatible browser

## Running the tests

to do:
  -

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

to do:
  - figure out which api's will be used

## Contributing

to do:
  - will know when project is complete

## Versioning

to do:
  - will attempt to use semantic versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

Andrew Kadesky <github profile>

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
