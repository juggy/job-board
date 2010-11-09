$(function(){
	
	window.Job = Backbone.Model.extend({
		initialize: function() {
			if(!_.isUndefined("_id")) this.set({id : this.get("_id")});
		}
	});
	
	window.User = Backbone.Model.extend({
		initialize: function() {
			if(!_.isUndefined("_id")) this.set({id : this.get("_id")});
		},
		url: function(){
			return "/user"
		}
	});
	
	window.CurrentUser = new User().fetch();
	
	window.JobList = Backbone.Collection.extend({
		model:  Job,
		url: '/jobs'
		
	});
	
	window.Jobs = new JobList;
	
});