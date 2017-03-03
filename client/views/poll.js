Template.pollDetails.created = function() {
	this.hasExpired = new ReactiveVar(false);
	//sets the poll expiration to true if the time is past duration set by user
	if(this.data.duration <= moment().valueOf()) {
		this.hasExpired.set(true);
	}
	this.hasVoted = new ReactiveVar(false);
	//fetch array of current users votes
	const votes = Votes.find({ userId: Meteor.userId() }).fetch();
	//set whether or not the user has voted
	//if the poll has expired set hasVoted to true so poll results are shown
	if(votes.length > 0 || this.hasExpired.get()) {
		this.hasVoted.set(true);
	}
};

Template.pollListItem.events = {
	'click [data-action="view-poll"]': function(event){
		event.preventDefault();
		Router.go("/poll/" + this._id);
	}
};

Template.pollDetails.events = {
	'click [data-action="vote-on-poll"]': function(event){
		//check to see if poll has expired
		if(!Template.instance().hasExpired.get()) {
			//check to see if user is logged in
			if(Meteor.user()) {
				//check to see if user has voted in this poll
				if(!Template.instance().hasVoted.get()) {
					event.preventDefault();
					//disallow the user from voting again
					Template.instance().hasVoted.set(true);
					var poll = Template.currentData();
					var pollOption = this;
					Votes.insert({
						userId: Meteor.userId(),
						pollId: poll && poll._id,
						timestamp: moment().valueOf(),
						option: pollOption.valueOf()
					});
				} else {
					//alert if user has already cast a vote
					window.alert('You have already voted in this poll.');
				}
			} else  {
				//alert if user is not signed in
				window.alert('Please sign in to vote.');
			}
		} else {
			//alert if user tries to vote from console after poll has closed
			window.alert('Poll has closed!');
		}
	}
};

Template.pollDetails.helpers({
	'voteCountForOption': function(){
		var pollOption = this;
		return Votes.find({option: pollOption.valueOf()}).count();
	}
});

Template.pollListItem.helpers({
	'getVotes': function() {
		//attempt to query for votes, this function is not working
		const votes = Votes.find({ pollId: this._id }).fetch();
	 	return votes.length;
	},
	'getExpiration': function() {
		//displays time remaining on each poll
		return moment(this.duration);
	}
});
