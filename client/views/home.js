Template.homePage.created = function(){
	//Set initial number of polls to be displayed
	Session.set('maxPolls', 10);
};

Template.homePage.helpers({
	polls: function () {
		//gets the moment value of 24 hours prior to page load
		const yesterday = moment().subtract(24, 'hours').valueOf();
		//queries for polls whose duration is greater than the moment value of 24 hours ago
		const currentPolls = Polls.find({ duration: {$gt: yesterday}}, {sort: {timestamp: -1}, limit: Session.get('maxPolls')}).fetch();
		//render number of polls equal to maxPolls, set by user
		return currentPolls;
	}
});

Template.homePage.events({
	'click [data-action="update-polls-displayed"]': function(event, template){
		event.preventDefault();
		//grab the number of polls to be displayed, convert it to number
		const polls = Number(template.find('#polls-displayed').value);
		//update the number polls to be displayed
		Session.set('maxPolls', polls);
	}
});
