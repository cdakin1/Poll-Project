Router.configure({
	layoutTemplate: "defaultLayout",
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	progressDelay: 200
});

Router.map(function() {
	this.route('/', {
		name: 'home',
		path: '/',
		waitOn: function () {
			return Meteor.subscribe('polls');
		},
		action: function () {
			this.render('homePage');
		}
	});
	this.route('/poll/:_id', {
		name: 'pollDetails',
		path: '/poll/:_id',
		waitOn: function () {
			return Meteor.subscribe('pollDetails', this.params._id);
		},
		action: function () {
			this.render('pollDetails', {
				data: function () {
					return Polls.findOne({_id: this.params._id});
				}
			});
		}
	});
});