# react-fullstack-capstone.
The purpose of this app is to view a video from Youtube and take notes.

# MVP workflow
* Intro screen.
* -> Explains app
* --> Click New project.
* ---> Search screen, user searches fora video.
* ----> Select a video.
* -----> View video and take notes.
* ------>Save notes
* -->Click previous project
* --->View previuous projects
* --->Delete a previous project
* ----> Select a previous project.
* -----> Edit Note .
* ------> Save notes


# User Stories
* As a user I want to quickly understand the purpose of the site in order to use it to view and take notes.
![Landing page screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/home-page.png)
* As a user I want to search for YouTube videos from which I can learn.
![Landing page screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/search-page.png)
* As a user I want to be view a video and take notes in order to retain knowledge.
![Landing page screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/new-project-page.png)
* As a user I want to select a previous project and edit or delete it.
![Landing page screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/previous-note-index-page.png)



## Screenshots
![Landing page screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/landingpage.png)
![New Project screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/search.png)
![Screen for watching and taking notes](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/take-notes.png)
![Selecting old project screen shot](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/oldproj.png)
![Editing a previous note.](https://github.com/terrylthompsonintx/youtube-notes-full-stack-capstone/blob/master/github-images/editnote.png)
## Working Prototype
Find a working prototype with Node at https://youtube-notes-capstone.herokuapp.com/ and a working prototype with React at ??? .

## Functionality
* When the user brings up the landing page and it explains the pupose of the app.
* The user can create a new project or view old ones.
* The user can search for videos.
* The user can watch the video and take notes.
* The user can save notes.
* The user can view previous notes and edit them.
* The user can delete previous notes.


## Technical

#### Front End
* HTML5
* CSS3
* JavaScript
* jQuery
* React

#### Back End
* Node.js with Heroku implementation
* Express.js
* MongoDB on mLab
* Mongoose
* Mocha and Chai
* YouTube API

#### Responsive

* The app is responsive and optimized for both desktop and mobile viewing and use.


## API Documentation
API endpoints for the back end include:
* GET to /getyoutubedata/' to search for videos.
* GET to '/getyounote/id' to retrieve a previous oroject.
* PUT to ''/younote/:id' to update a note.
* POST to '/younote/' to create a new note.
* DELETE to '/deletenote/:id' to delete a note.

## Development Roadmap
Planned additional features and improvements will allow users to:
* Add user login.
* Currently only one user at a time can use the app, scale it up to multiple users.

