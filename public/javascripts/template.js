$(function(){
	var Templating = function(){};
	Templating._cache = {};
	Templating._queues = {};
	Templating.FETCHING = "";
	
	Templating.load = function(location){
		if(Templating._cache[location] === undefined){
			//not loaded fetch
			Templating._cache[location] = Templating.FETCHING;
			$.ajax({url: "/views/" + location + ".haml",
			       data: {},
			       dataType: null,
			       type: 'get',
			       success: function(data) {
			         var template = Templating._cache[location] = Haml.compile(data);
							 var q = Templating._queues[location];
							 if(q != undefined){
								for(x in q){
									q[x](template);
								}
								Templating._queues[location] = undefined;
							 }
			       }});
		}
		return Templating._cache[location];
	};
	
	Templating.render = function(location, locals, callback){
		
		var template = Templating.load(location);
		if(template === Templating.FETCHING){
			//queue our stuff for later rendering
			var queue = Templating._queues[location];
			if(queue === undefined){
				queue = [];
				Templating._queues[location] = queue;
			}
			queue.push(function(t){
				var html = Haml.execute(t, window, locals);
				callback(html);
			});
		} else {
			var html = Haml.execute(template, window, locals);
			callback(html);
		}
	};	
	
	window.Template = Templating;
	window.T = Templating.render;
	
});