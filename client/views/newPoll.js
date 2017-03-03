Template.newPoll.created = function(){
	var template = this;
	template.creatingPoll = new ReactiveVar(false);
	template.pollHours = new ReactiveVar(24);
	Session.set('options', ["Yes", "No"]);
};

Template.newPoll.events = {
	'click [data-action="open-new-poll-input"]': function(event){
		//check if user is logged in to create a poll
		if(Meteor.user()) {
			event.preventDefault();
			var template = Template.instance();
			template.creatingPoll.set(true);
		} else {
			window.alert('Please sign in to create a poll.');
		}
	},
	'click [data-action="cancel-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		template.creatingPoll.set(false);
	},
	'click [data-action="create-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		//check if user is logged in again, this should prevent creating polls from the console
		if(Meteor.user()) {
			if(!template.$('#newPollTitle').val()) {
				window.alert("Please add a title to your poll.");
			} else {
				Polls.insert({
					userId: Meteor.userId(),
					title: template.$('#newPollTitle').val(),
					description: template.$('#newPollDescription').val(),
					timestamp: moment().valueOf(),
					options: Session.get('options'),
					duration: moment().add(template.pollHours.get(), 'hours').valueOf()
				});
			}
			template.creatingPoll.set(false);
		} else {
			window.alert('Please sign in to create a poll.');
		}
	},
	//function to add new options to checklist
	'submit .new-option': function(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    //grav options array
    const currentOptions = Session.get('options');
		//check to see if options are at max length
		if(currentOptions.length === 6) {
			window.alert('Poll cannot have more than six options.');
		} else {
		//add new option to array
			currentOptions.push(text);
			//set options session to new array
			Session.set('options', currentOptions);
			//clear input field
			target.text.value = '';
		}
  },
	'click .delete': function(event) {
		const currentOptions = Session.get('options');
		const target = event.target;
		//check to see if options are at minimum length
		if(currentOptions.length === 2) {
			window.alert('Poll cannot have fewer than two options.');
		} else {
		//remove option from array
			currentOptions.forEach((el, id) => {
				if(el === this.valueOf()) {
					currentOptions.splice(id, 1);
				}
			});
			Session.set('options', currentOptions);
		}
	},
	'click [data-action="update-poll-duration"]': function(event, template){
		const hours = template.find('#poll-duration').value;
		template.pollHours.set(hours);
	}
};

Template.newPoll.helpers({
	options: function() {
		return Session.get('options');
	},
	duration: function() {
		console.log(Template.instance().pollHours.get());
		return Template.instance().pollHours.get();
	}
});
