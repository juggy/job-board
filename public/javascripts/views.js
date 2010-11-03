$(function(){
	window.JobListView = Backbone.View.extend({
		el: $('#job-list'),
		events: {
			"click" : "closeEdit"
		},
		items: {},
	
		initialize: function(){
			_.extend(this, Backbone.Events);
			_.bindAll(this, 'addOne', 'addAll', 'render', 'changeSelection', 'closeEdit', 'render');
			Jobs.bind('add',     this.addOne);
			Jobs.bind('refresh', this.render);
			//Jobs.bind('all',     this.render);
			this.toolbar = new JobListToolbar;
		},
		render: function(){
			this.el.empty();
			this.addAll();
		},
		addOne: function(job){
			var item = null;
			if(this.items[job.cid] === undefined){
				item = this.items[job.cid] = new JobListItemView({model: job});
				item.bind("edit:item", this.changeSelection);
				item.bind("edit:item", JobEdit.changeSelection);
			}else
				item = this.items[job.cid];
		
			this.el.append(item.el);
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
			_.bindAll(this, 'render', 'edit', 'select', 'deselect');
			Template.load("job_item"); //to make render requests synchronuous
			this.model.bind('change', this.render);
			this.model.view = this;
			_.extend(this, Backbone.Events);
			this.el = $(this.el);
		},
		render: function(){
			T("job_item", {job : this.model.toJSON()}, this,
				function(html){
					this.el.html(html);
					this.delegateEvents();
				}
			);
		},
		edit: function(){
			this.trigger("edit:item", this);
			return false;
		},
		select: function(){
			$(this.el).addClass("selected");
		},
		deselect: function(){
			$(this.el).removeClass("selected");
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
		events:{
			"change input,textarea,select" : "formChanged"
		},
		initialize: function(){
			_.bindAll(this, 'changeSelection', 'closeEdit', "formChanged", 'render');
			Template.load("job_edit"); //to make render requests synchronuous
			JobList.bind("edit:close", this.closeEdit);
		},
		render: function(){
			if(_.isUndefined(this.model)){
				this.el.empty();
				
			}else{
				me = this;
				T("job_edit", {job : this.model.toJSON()}, this,
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
		},
		formChanged: function(){
			var formArray = $("form", this.el).serializeArray();
			var formMap = {};
			_.each(formArray, function(input){ formMap[input["name"]] = input["value"] });
			this.model.set(formMap);
			this.model.save();
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