Session.setDefault('selectedUser', 0);
Template.userList.helpers({
	'Lists': function(){
		return Meteor.users.find({_id : { $nin : [Meteor.userId()]}}).fetch()

	},
	name: function(){
		return this.emails[0].address
	},
	userEmail: function(){
		return Meteor.users.find({_id: this.SentFrom}).fetch()[0].emails[0].address;
	},
	'conversation' : function(){

		var ids = [Meteor.userId(), Session.get("selectedUser")];
		console.log("ids aer ", ids);
		console.log("messages are ",  Messages.find({$and: [{ sentBy: { $in: ids } },{ receivedBy: { $in: ids } }]}).fetch()   );
		return Messages.find({
			$and: [
				{ SentFrom: { $in: ids } },
				{ SentTo: { $in: ids } }
			]
		});

		return Messages.find().fetch();
	},
	user: function () {
		if (Session.get('selectedUser')) {
			return true
		} else return false;
	}
});