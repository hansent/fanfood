$(document).ready(function(){
	$( ".action .button" ).click(function() {
	  //$( ".log" ).slideToggle( "slow", function() {});	  
	  $(this).parent().next( ".log" ).slideToggle( "slow", function() {});
	  //$(this).parent().next(".fa-arrow-down").toggle();
	  //$(this).parent().next(".fa-arrow-up").toggle();
	  $(this).children(".fa-arrow-up").toggle();
	  $(this).children(".fa-arrow-down").toggle();
	});
});

//$("#responseText").charCount();

$(".responseText").charCount({
    allowed: 125,		
    warning: 20,
    counterText: 'Characters left: '	
});