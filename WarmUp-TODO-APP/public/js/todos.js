// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		// $(this).val("");
		//create a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

$(".fa-caret-square-o-down").click(function(){
	$("input[type='text']").fadeToggle();
});

$('.itemD').on('click', (e) => {
	$target = $(e.target);
	const id = $target.attr('data-id');
	$.ajax({
	  type:'DELETE',
	  url: '/delete/'+id,
	  success: (response) => {
		alert('Deleting Todo');
		window.location.href='/';
	  },
	  error: (error) => {
		console.log(error);
	  }
	});
	});
	
	$('.fa-trash').on('click', (e) => {
		$target = $(e.target);
		const id = $target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url: '/delete/'+id,
			success: (response) => {
			alert('Deleting Todo');
			window.location.href='/';
			},
			error: (error) => {
			console.log(error);
			}
		});
		});

  