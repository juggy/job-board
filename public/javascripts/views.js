$(function(){
	window.JobListView = Backbone.View.extend({
		el: $('#job-list'),
		items: {},
	
		initialize: function(){
			_.bindAll(this, 'addOne', 'addAll', 'render');
			Jobs.bind('add',     this.addOne);
			Jobs.bind('refresh', this.addAll);
			//Jobs.bind('all',     this.render);
		},
		render: function(){
			console.log("render");
			this.el.empty();
			this.addAll();
			
		},
		
		addOne: function(job){
			var item = null;
			if(this.items[job.id] === undefined)
				item = this.items[job.id] = new JobListItemView({model: job, parent_el: this.el});
			else
				item = this.items[job.id];
		
			item.render();
		},
		
		addAll: function(){
			Jobs.each(this.addOne);
		}
	});
	
	window.JobListItemView = Backbone.View.extend({
		events: {
			"click" : "edit"
		},
		initialize: function(){
			Template.load("job_item"); //to make render requests synchronuous
			this.model.bind('change', this.render);
			this.model.view = this;
		},
		render: function(){
			parent_el = this.options["parent_el"];
			T("job_item", {job : this.model.toJSON()}, 
				function(html){
					parent_el.append(html);
				}
			);
		}
	});
	
	
	window.AppView = Backbone.View.extend({
		el: $("#job-app"),
		initialize: function() {
			new JobListView();
			Jobs.fetch();
		}
	});
	
	window.App = new AppView;
	
});