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
			var attrs = {}
			if(_.isUndefined(this.get("company_name"))) attrs["company_name"] = CurrentUser.get("company_name") || "";
			if(_.isUndefined(this.get("contact_email"))) attrs["contact_email"] = CurrentUser.get("email");
			if(_.isUndefined(this.get("title"))) attrs["title"] = "";
			if(_.isUndefined(this.get("city"))) attrs["city"] = "";
			if(_.isUndefined(this.get("state"))) attrs["state"] = "";
			if(_.isUndefined(this.get("country"))) attrs["country"] = "";
			if(_.isUndefined(this.get("short_description"))) attrs["short_description"] = "";
			if(_.isUndefined(this.get("description"))) attrs["description"] = "";
			
			this.set(attrs);
		}
	});
	
	window.User = BaseModel.extend({
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