## Heroku ExpressJS Boilerplate

Boilerplate for ExpressJS

* Routes directory
* Hogan-Express template engine (w/ layouts)
* MongoDB (coming soon)


### Getting started w/ local development server

Download and install Heroku Toolbelt <https://toolbelt.heroku.com>, this will give you Foreman and the Heroku CLI (command line interface).

1) Download this boilerplate repo and navigate into the code directory with Terminal.

2) Run **npm install** to get all required libraries.

	npm install

3) Start server with **foreman start**.

	foreman start

4) Open web browser to <http://localhost:5000> to view the web app.

5) Stop the web server press Command+C in the Terminal window.

### Auto restart development server

To auto restart your development server after you make some changes to your code. Install **Nodemon**. [Nodemon](https://github.com/remy/nodemon) will watch your files and restart the server for you.

Install Nodemon. In Terminal type,

	npm install -g nodemon

There are two possible ways to use Nodemon,

	foreman run nodemon app.js

Or with the helper script

	. devserver

The **.nodemonignore** file will ignore certain files and directories from being watched. By default and for example we're ignoring /public folder.

