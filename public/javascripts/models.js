$(function(){
	
	window.Job = Backbone.Model.extend({
		initialize: function() {
			this.set({id : this.get("_id")});
		}
	});
	
	window.User = Backbone.Model.extend({
		
	});
	
	window.JobList = Backbone.Collection.extend({
		model:  Job,
		url: '/jobs'
		
	});
	
	window.Jobs = new JobList;
	
});