Router.route('/home',{
	onBeforeAction:function(){
		if(Meteor.userId()){
			this.next();
		}
		else{
			Router.go('/');
		}
	},

	waitOn:function(){
		return [Meteor.subscribe('users'),Meteor.subscribe('mssgs')]
	},

	action:function(){
		this.render('home')
	}
})  