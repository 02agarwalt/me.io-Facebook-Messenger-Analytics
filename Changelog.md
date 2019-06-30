# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
* Extension to include group chats in filtering
* Add view for seeing usage of specific word over time

## [4.0.0] - 2017-12-19
### Added
- New view for crud stats
- New view for top friends (pie chart)
- Removed warnings from all time series charts
- New view for wordle
- Added functional filtering for all graphs that can use it
- Meaningful default values for graphs
- Computation complete for new statistics (pie chart and crud stats)
- Added delete account, logout, and reupload data front end views and backend endpoints
- Added loading bar for data upload/processing
- About page populated with information about the team
- Used redux to keep track of state for front end
- Deployed final application to AWS
- Resizing the application makes it behave better now
- Tests updated to reflect new back-end changes

## [3.0.0] - 2017-12-08
### Added
- Data upload fully functional
- Views added for all graphs
- Computation complete for all statistics
- Chatbot fully functional with real data
- Facebook login fully functional 


## [2.0.0] - 2017-11-19
### Added
- Completely refactored front-end (reactify'd all components). No more HTML files! We're working on improving the styling on this and will be focusing on this next iteration
- Statistic: User chat frequency graph pan and zoom-in functionality. To test this-try zooming in with your scrollwheel on the bar chart and then clicking and moving your mouse. Now try zooming out. 
- Full working implementation of meBot on back-end
- Chatbot front-end messaging interface complete and connected to back-end endpoints. Should be fully operational with a test dataset.
- Persistent data storage: users and their stats are saved in database (on MongoDB cluster)
- Views for Facebook login and data upload
- Testing suite with dockerized deployment
- TravisCI incorporation into GitHub repository
- REST endpoint descriptive responses (errors, etc.)

## [1.0.0] - 2017-10-30
### Added
- Statistic: User chat frequency computation
- Tests for user chat frequency computation
- Endpoint to create a new user
- Endpoint to upload data
- Enpoint to process user data
- Enpoint to retrieve statistic for user
- Endpoint documentation 
- Boilerplate front end (HTML/CSS/JS)
- React Containers in boilerplate front end
- Connection between Flask endpoints (user sign up/ data upload/ compute stats / get stats) and demo React Container
- Model graph tile using endpoints with test data
- Updated UML diagram for Iteration 2
