Template.userList.events({
	'click .showUserMessages':function(e){
		e.preventDefault();
		Meteor.subscribe('mssgs', this._id);
		Session.set("selectedUser", this._id);
	},
	'click #btn-chat':function(e){
		e.preventDefault();
		var msg = $("#text").val();
		Meteor.call('enteringmsg',msg,Session.get("selectedUser"),function(error){
			if(error){
				console.log("enter the data")
			}
		});
		$("#text").val('')
 	}
});

Template.logout.events({
	'click #signout':function(){
		Meteor.logout()
	}
})