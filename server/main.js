import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('users', function () {
	if (this.userId) {
		return Meteor.users.find({}, {fields: {emails: 1, createdAt: 1}});		
	} else {
		return [];
	}
});

Meteor.methods({
	'enteringmsg':function(msg,SentTo){
		var data = Messages.insert({
			messgae : msg,
			SentTo : SentTo,
			SentFrom : this.userId,
			time : new Date()
		});
		console.log("data is",data);
	}
});

Meteor.publish('mssgs',function(userId){
	console.log("inside messages publish");
	if (this.userId) {
		var ids = [this.userId, userId];
		console.log("ids aer ", ids);
		console.log("messages are ",  Messages.find({$and: [{ sentBy: { $in: ids } },{ receivedBy: { $in: ids } }]}).fetch()   );
		return Messages.find({
			$and: [
				{ SentFrom: { $in: ids } },
				{ SentTo: { $in: ids } }
			]
		});
	} else {
		return [];
	}
}) 