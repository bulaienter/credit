$(function(){
	$('.item .score span').click(function(){
		var id = $(this).attr('data-id');
		console.log(id);
		$(this).parent('.score').children('span').removeClass('active');
		$(this).parent('.score').children('span').each(function(index,item){
			if(index <= id){
				$(this).addClass('active');
			}
		})
	});
})