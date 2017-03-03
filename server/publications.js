//****************
//PUBLICATIONS
//****************

Meteor.publish('polls', function () {
	check(arguments, [Match.Any]);
	return Polls.find({});
});


Meteor.publish('pollDetails', function (pollId) {
	check(pollId, String);
	return [
		Polls.find({_id: pollId}),
		Votes.find({pollId: pollId})
	]; // <-- something missing here?
});
