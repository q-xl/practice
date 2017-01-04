
window.onload = function(){
	
	var width  = 500,
		height = 440,
		speed = 0.02,
		startTime = Date.now(),
		currentTime = Date.now(),
		svg = d3.select(".ball").append("svg")
				.attr("width", width)
				.attr("height", height),

		//d3内置的垂直投影方法，用于生成球形
		projection = d3.geo.orthographic()
						.scale(200),
		//d3内置的经纬网绘制方法，用于绘制经纬线
		graticule = d3.geo.graticule(),
		path = d3.geo.path()
					.projection(projection),
		color = d3.scale.category20(),
		grid = graticule(),
		map = svg.append("g")
					 .attr("transform", "translate(" +  -230 + "," + -20 + ")");
	
	map.append("path")
		.datum( grid )
		.attr("id","grid_id")
		.attr("class","grid_path")
		.attr("d",path);
	
	d3.timer(function() {
		
		currentTime = Date.now();
		
		projection.rotate([speed * (currentTime - startTime), -15]).clipAngle(90);
		
		map.select("#grid_id")
			.attr("d",path);
		
	});

}
