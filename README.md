# MERN Reminder Application

Here are some packages I used that may be a little different from other challenges:
* jsonwebtoken/jwt-decode - for user auth and protected routes
* axios - requests from front end
* node-schedule - scheduling of email reminders
* nodemailer - sending of email reminders
* bcryptjs - to encrypt passwords

## Functionality:
1. Allow users to sign up/sign in to the application using username or email
> Users are able to sign up and sign in with username and email on this application
2. Allow users to add reminders when they sign in to the application
> Users are able to add reminders which will show up on the reminders page
3. Notify the users about their reminders via text or email when their reminders are due
> I created the ability to schedule email reminders using the above packages mentioned (node-schedule and nodemailer)
4. Have different routes for each functionality: sign up /sign in /sign out /add reminders
> I created different routes for sign up, sign in, and add reminders. For sign out, it was a matter of deleting the JWT therefore I felt it was unnecessary to create a route. I also created a route to display all reminders for the current user and delete reminder route.

## Requirements:
1. Use NodeJS, React, Rest API, and MongoDB
> Used NodeJS, React, and MondoDB. Also created the app in a RESTful API approach.
2. Comment your code as appropriate (no need to comment every line. Only when necessary to clarify)
> Commented code to ensure understanding. Tried not to over do it.
3. Publish to GitHub including README file and provide us with the repository link via email
> Published to GitHub and included README

## Setup and Install steps:
1. Clone repo down to local machine
```
$ git clone https://github.com/kyle116/disfox-test.git
```
2. Install npm packages for the React and Express app
```
$ cd disfox-test
$ npm i
$ cd client
$ npm i
```
3. Create a .env file in the root directory
```
$ touch .env
```
4. These are the variables needed for the .env file
```
SECRET_TOKEN=kyle123
EMAIL_PASS
NODE_ENV=development
```
5. Start up the app (each on different terminal tabs)
> server
```
$ nodemon
```
> client
```
$ cd client
$ npm start
```
> mongodb
```
$ mongod
```