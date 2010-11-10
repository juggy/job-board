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
				if(job.isNew()){
					item.edit();
				}
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
	
	
	window.BaseForm = Backbone.View.extend({
		events:{
			"change input,textarea,select" : "formChanged"
		},	
		initialize: function(){
			_.bindAll(this, "save", "formChanged", "error", "success");
			_.extend(this, Backbone.Events);
		},
		save: function(){
			this.formChanged();
		},
		formChanged: function(){
			var formArray = $("form", this.el).serializeArray();
			var formMap = {};
			_.each(formArray, function(input){ formMap[input["name"]] = input["value"] });
			
			this.trigger("form:save");
			this.model.save(formMap, { success: this.success, error: this.error});
		},
		error: function(model, response){
			this.trigger("form:error");
			this.trigger("form:save:done");
			
			var errors = $.parseJSON(response.responseText);
			this.cleanForm();
			
			_.each(_.keys(errors), function(field){
				var li = $("input[name=" + field + "]", this.el).parent();
				li.addClass("error");
				li.append('<p class="inline-errors">' + errors[field] + "<p>")
			});
		},
		success: function(model, response){
			this.trigger("form:success");
			this.trigger("form:save:done");
			this.cleanForm();
		},
		cleanForm: function(){
			$("li", this.el).removeClass("error");
			$("li p.inline-errors", this.el).remove();
		}
	});
	
	window.JobEditView = BaseForm.extend({
		el : $("#job-edit"),
		initialize: function(){
			_.bindAll(this, 'changeSelection', 'closeEdit', 'render');
			Template.load("job_edit"); //to make render requests synchronuous
			JobList.bind("edit:close", this.closeEdit);
			
			// super call
			BaseForm.prototype.initialize.call(this);
		},
		render: function(){
			this.el.empty();
			if(!_.isUndefined(this.model)){
				me = this;
				T("job_edit", {job : this.model.toJSON()}, this,
					function(html){
						me.el.html(html);
					}
				);
				if(this.model.isNew()){
					this.save();
				}
			}
		},
		closeEdit: function(){
			this.model = undefined;
			StatusView.close();
			this.render();
		},
		changeSelection: function(item){
			this.model = item.model;
			StatusView.close();
			this.render();
		}
	});
	
	window.ConnectionStatusView = Backbone.View.extend({
		el: $("#connection-status"),
		initialize: function(){
			_.bindAll(this, 'showWorking', 'showError', 'showOk', 'close');
			JobEdit.bind("form:save", this.showWorking);
			JobEdit.bind("form:error", this.showError);
			JobEdit.bind("form:success", this.showOk);
		},
		showWorking: function(){
			//display working status
			$(".working", this.el).show();
			$(".error", this.el).hide();
			$(".ok", this.el).hide();
			this.el.slideDown();
		},
		showError: function(){
			$(".working", this.el).hide();
			$(".error", this.el).show();
			$(".ok", this.el).hide();
			this.el.slideDown();
		},
		showOk: function (){
			//display with ok status
			$(".working", this.el).hide();
			$(".error", this.el).hide();
			$(".ok", this.el).show();
			this.el.slideDown();
			window.setTimeout(this.close, 2000);
		},
		close : function(){
			this.el.slideUp();
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
	window.StatusView = new ConnectionStatusView;
});