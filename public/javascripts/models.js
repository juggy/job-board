$(function(){
	
	window.BaseModel = Backbone.Model.extend({
		set:function(attrs, options){
			if (!attrs) return this;
      if (attrs.attributes) attrs = attrs.attributes;
			if(!_.isUndefined(attrs["_id"])){
				attrs["id"] = attrs["_id"];
				attrs["_id"]= undefined;
			}
			return Backbone.Model.prototype.set.call(this, attrs, options);
		}
	});
	
	window.Job = BaseModel.extend({
		initialize: function() {
			//if(!_.isUndefined("_id")) this.set({id : this.get("_id")});
		}
	});
	
	window.User = BaseModel.extend({
		initialize: function() {
			//if(!_.isUndefined("_id")) this.set({id : this.get("_id")});
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