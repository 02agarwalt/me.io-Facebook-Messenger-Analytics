## me.io ##
[![Build Status](https://travis-ci.com/jhu-oose/2017-group-1.svg?token=d6W74LqWY6pVgZreWqRg&branch=master)](https://travis-ci.com/jhu-oose/2017-group-1)
### Front-End: Nirmal Krishnan, Jon Liu, Manyu Sharma
### Back-End/Data-Engineering: Tanay Agarwal, Emily Brahma

Updates for iteration 6 can be found in the [Changelog](https://github.com/jhu-oose/2017-group-1/blob/master/Changelog.md) version [4.0.0]. 

The wiki page is no longer updated past iteration 3--all future updates can be found here. 

## Running Instructions

### 1. Setting up docker:
The build assumes you have Docker installed on your computer and have an active account. If you do not, refer to the [Docker installation page](https://docs.docker.com/engine/installation/). If you are using Mac OSX, do NOT use homebrew to install Docker- use the dmg from the website.  

### 2. Commands to run:
```bash
docker login
git clone https://github.com/jhu-oose/2017-group-1.git
cd 2017-group-1
chmod +x run.sh
```

To run the app, use the following command:

```bash
source run.sh app
```

To run tests, use the following command:

```bash
source run.sh tests
```

Note: ports 8080 and 5000 must be open in order for the Docker build to execute properly. 

### 3. Running site: 
Once the Docker has finished executing and your terminal reads "webpack: Compiled successfully" navigate to your browser and enter the URL: [http://localhost:8080/](http://localhost:8080/)

This has only been tested on the Chrome browser (and does not currently support Safari).

## Overview of Deployment and Travis

We use Docker for deployment. The testing suite is contained inside our primary Docker image, and can be run as per the instructions in the section above. Travis-CI is set up such that it automatically builds the Docker image, runs tests, and pushes the image to DockerHub upon successful completion of all tests.

Note: Travis-CI sometimes fails to build due to network connectivity issues on their end ("npm install" is problematic for them). These failed builds are not the result of bugs in our code.

## Screenshots
The below screenshot shows the splash screen users are presented with when they visit our base url. They can login with Facebook in order to proceed to the Data Upload tab. Currently, this button will only work with member on our team and Jordan Peykar (our tester) since the app is currently in developmental mode in the Facebook API (doesn't have a public domain).

![figure_1]

Once you have authenticated with Facebook, the app automatically should direct you to the data uploading splash screen, seen below. Here it shows you how to download your data from Facebook. Once you have downloaded your data from facebook, you can upload the zip file directly here. All of the raw data will remain locally wherever the server is being run (in this case, your computer) so there is no need to worry about privacy issues. 

![figure_2]

Once your data has been uploaded (~5-10 minutes), a button will show that allows you to go to the next screen. There, you will be greeted with your dashboard with all your calculated statistics. 

![figure_3]
![figure_4]

Below are screenshots of different visualizations constructed from the facebook data:

![figure_5]
![figure_6]
![figure_7]
![figure 8]
![figure 9]

The below screenshot shows the meBot. Keep in mind that when the first message is sent to meBot, it will take about 10-15 seconds to receive its response. After the first message, however, the responses will be very prompt.

![figure 10]

The last screenshot below shows the about page and also our dropdown menu for user controls. At any point in time a user can reupload their data and also delete their entire history from our application if they so choose.

![figure 11]


[figure_1]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig1.png
[figure_2]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig2.png
[figure_3]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig3.png
[figure_4]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig4.png
[figure_5]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig5.png
[figure_6]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig6.png
[figure_7]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig7.png
[figure 8]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig8.png
[figure 9]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig9.png
[figure 10]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig10.png
[figure 11]: https://github.com/jhu-oose/2017-group-1/blob/master/img/iteration_6/fig11.png

DISCLAIMER: There is a memory cap in Docker on Mac OSX that may cause our program to crash unexpectedly. To ensure this doesn't happen, go to "Preferences..." in the Docker GUI and click "Advanced." Then, set the "Memory" slider to the maximum supported by your computer (8GB or more is recommended). 

