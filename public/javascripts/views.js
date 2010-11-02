$(function(){
	window.JobListView = Backbone.View.extend({
		el: $('#job-list'),
		events: {
			"click" : "closeEdit"
		},
		items: {},
	
		initialize: function(){
			_.extend(this, Backbone.Events);
			_.bindAll(this, 'addOne', 'addAll', 'render', 'changeSelection');
			Jobs.bind('add',     this.addOne);
			Jobs.bind('refresh', this.addAll);
			this.toolbar = new JobListToolbar;
		},
		render: function(){
			this.el.empty();
			this.addAll();
		},
		addOne: function(job){
			var item = null;
			if(this.items[job.cid] === undefined){
				item = this.items[job.cid] = new JobListItemView({model: job, parent: this});
				item.bind("edit:item", this.changeSelection);
				item.bind("edit:item", JobEdit.changeSelection);
			}else
				item = this.items[job.cid];
		
			item.render();
		},
		
		addAll: function(){
			Jobs.each(this.addOne);
		},
		changeSelection: function(item){
			this.deselect();
			this.select(item);
		},
		closeEdit: function(){
			this.trigger("edit:close");
			this.deselect();
		},
		deselect: function(){
			if(!_.isUndefined(this.selected)){
				this.selected.deselect();
				this.selected = undefined;
			}
		},
		select: function(item){
			this.selected = item;
			item.select();
		}
	});
	
	window.JobListItemView = Backbone.View.extend({
		className: "job-item",
		events: {
			"click" : "edit"
		},
		initialize: function(){
			Template.load("job_item"); //to make render requests synchronuous
			this.model.bind('change', this.render);
			this.model.view = this;
			_.extend(this, Backbone.Events);
		},
		render: function(){
			me = this;
			T("job_item", {job : this.model.toJSON()}, 
				function(html){
					me.el = $(html);
					me.delegateEvents();
					me.options["parent"].el.append(me.el);
				}
			);
		},
		edit: function(){
			this.trigger("edit:item", this);
			return false;
		},
		select: function(){
			this.el.addClass("selected");
		},
		deselect: function(){
			this.el.removeClass("selected");
		}
		
	});
	
	window.JobListToolbar = Backbone.View.extend({
		el: $("#job-toolbar"),
		events:{
			"click button#add": "addJob"
		},
		addJob: function(){
			Jobs.add(new Job({title: "New Job"}));
			return false;
		}
	});
	
	window.JobEditView = Backbone.View.extend({
		el : $("#job-edit"),
		initialize: function(){
			_.bindAll(this, 'changeSelection', 'closeEdit');
			Template.load("job_edit"); //to make render requests synchronuous
			JobList.bind("edit:close", this.closeEdit);
		},
		render: function(){
			if(_.isUndefined(this.model)){
				this.el.empty();
				
			}else{
				me = this;
				T("job_edit", {job : this.model.toJSON()}, 
					function(html){
						me.el.html(html);
					}
				);
			}
		},
		closeEdit: function(){
			this.model = undefined;
			this.render();
		},
		changeSelection: function(item){
			this.model = item.model;
			this.render();
		}
	});
	
	
	window.JobAppView = Backbone.View.extend({
		el: $("#job-app"),
		initialize: function() {
			Jobs.fetch();
		}
	});
	
	window.JobList = new JobListView;
	window.JobEdit = 	new JobEditView;
	window.JobApp = new JobAppView;
	
});