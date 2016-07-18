$(document).ready(function() {
	
	$('.buygoods').on('click', function(event){
			var src = $(this).find('img').attr('src');
			var offset = $('#i-shopping-cart').offset(), flyer = $('<img class="temp_image" src="'+src+'" width="70" height="70" style="z-index:10000"/>');

			flyer.fly({
			    start: {
			        left: event.pageX,
			        top: event.pageY - $(window).scrollTop()
			    },
			    end: {
			        left: offset.left,
			        top: offset.top  - $(window).scrollTop(),
			        width: 24,
			        height: 20
			    },
			    onEnd:function() {
			    	flyer.remove();   //2:3,2|4,1|5,1|78,1
				}
			});
		});
	
});
