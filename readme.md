#Welcome to the Polls!
This is a small example Meteor app which allows users to create polls and vote on polls. It's also not quite ready for 
public use. To get an idea of your code style and how you solve problems with Meteor we have a few features we'd like 
you to add to this app. But first lets get it up and running in its current state.

#requirements
Before we can run this app we need to have Meteor installed, this assumes you are running on OSX or Linux, 
see windows.meteor.com for a windows installer.

meteor -  `curl https://install.meteor.com | /bin/sh`

jshint -  `sudo npm install -g jshint`

npm dependencies (run in poll-booth folder) - `meteor npm install`  

#running
To get the polls up and running open a terminal to the project directory and run the following command:

    meteor
    
The app should startup and be available at  http://localhost:3000/
 

#syntax validation
We have some light jshint rules to keep our code clean, you can run jshint to find any issues with the following command:

    jshint .
    
#Let's add some features to our polling app!

##We have polls, but they are open to rampant voter fraud! 
In order to legitimize our polls we should enforce some rules about voting. Only logged in users should be able to vote 
on a poll, and each user should only be allowed to submit one vote per poll. In the same vein we should limit the ability 
to create polls to only users who are logged in, we don't want spammers creating polls filled with ads. Also some of our 
users might be clever enough to open a web console so let's make sure we aren't trusting only the client to enforce any 
of these rules. If a user tries to vote without being logged in, or tries to vote more than once find a way to let them 
know that they need to login or only count as one vote.

##The resident sociologist has some suggestions.
Humans are social animals, and most want to be in the 'cool' crowd. Studies have shown that when making a decision, if a 
person knows that there is a majority consensus for an option the person is more likely to choose that option.
In order to prevent skewed polls we should hide the results for a poll until a user has submitted their vote on that poll.

##In our democracy we would like to agree on more than just a 'yes' or a 'no'.
Currently all polls are limited to a 'Yes' or 'No' vote. We should be able to create polls with arbitrary options beyond 
just 'Yes' and 'No.' Let's update poll creation to make our app a bit more useful. In addition to a title and 
description I want to be able to edit the options available in the poll. Both the text of the options and also the number 
of options should be editable from the poll creation dialogue. The minimum number of options in a poll should 
be 2, and let's set an arbitrary upper limit at 6 options.

While we are adding restrictions to our poll we should also make sure that polls are given a title. If 
the title field is left blank, prevent the user from creating the poll and let them know that they need to add a title.

##Elections don't last forever, nothing does
Let's put a time limit on our polls. Allow the poll creator to enter how many hours a poll will remain 
active. After the time is up the poll should remain in the home page list of polls for one day, but not allow any more 
votes. After one day (24 hours) beyond the poll close the poll should no longer show up in our home page. Let's keep 
the polls in our database for future reference.

##A more interesting home page
Currently on the home page we see a list of polls, but so far we only get the title of the poll. It would be nice to 
see a little more information here. Let's show how much longer the poll will be active (or when it closed if it's no 
longer active). Let's also display the number of people who have voted on a poll below its title. We also hope to someday 
be a very popular poll provider, so we want our home page to be able to display a large number of polls and remain 
performant. Use any way you see fit to minimize the load time for our home page while still allowing the user to browse 
through a large number of polls.

##We're here to help
If you have any questions, or run into technical issues, or even just want some clarification or direction for anything 
please don't hesitate to ask. Just drop me an e-mail at david@torsh.co and I'll be glad to help out.




