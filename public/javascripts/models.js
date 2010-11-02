$(function(){
	
	window.Job = Backbone.Model.extend({
	});
	
	window.User = Backbone.Model.extend({
		
	});
	
	window.JobList = Backbone.Collection.extend({
		model:  Job,
		url: '/jobs'
		
	});
	
	window.Jobs = new JobList;
	
});