/*
    AUTHOR: MINT IT MEDIA
    http://mintitmedia.com

    File with MINT functions
*/

var folder = '/';
var server = get_server_path() + folder;

/*
	Author: jgd
	Function executed once all the elements are loaded.
*/
$(window).load(function(){
    // mint:jgd: 
	var page = get_currentpage();
	var last_item = getLastItem(page);
	
  if($('#'+last_item).length) gotoTop(last_item, 85);

	if($('.home #hidden_menu').length) load_scroll_menu();

	if($('#submenu_the_menu').length) load_submenu();
	
	if($('#letter').length) load_letter();
	
	if($('#phrase_slider').length) load_bullet_slider();
	
	// solution & product grid
	
	if($('#slider_conocenos').length) load_full_slider();
	
	if($('#get_directions_btn').length) get_location();
	
	// function activated in contact to validat the form
//	if($("#contact_form").length) //$("#contact_form").validate();
	
	/* OFA */
	//Submit button function for validating/sending message
	$('#contact_form_submit').click(function(){
		errors = []
		if (validate_section('#contact_form')){
			$('#form-msg').html('');
			$('#form-msg').addClass('loading-ajax');
			send_message(get_message_data(), '#contact_form', '#form-msg');
		} else {
			$('#form-msg').removeClass('text-success').addClass('text-danger').html(get_error_list());
		}
		return false;
	});

});

/*
	Author: ofa
	Function gets the data from the form and returns it in a json format
*/
function get_message_data(){
	return {
		'name' : $('#name').val(),
		'email' : $('#email').val(),
		'message' : $('#message').val(),
	}
}

function load_letter()
{
	$("#letter .wrap h3").click(function(){
		$("#letter .wrap").addClass("open");
	});	
	$("#close-letter").click(function(){
		$("#letter .wrap").removeClass("open");
	});
}

function load_scroll_menu()
{
	
	
	if($('#hidden_menu').offset())
		var sticky_navigation_offset_top = 300;
		//var sticky_navigation_offset_top = $('#hidden_menu').offset().top;
	var sticky_navigation = function(){
		var scroll_top = $(window).scrollTop();
		scroll_top+=18;
		if (scroll_top > sticky_navigation_offset_top){
			$('#hidden_menu').css({ 'position': 'fixed', 'top':0, 'left':0, 'opacity': 1 });
		}
		else {
			$('#hidden_menu').css({ 'position': 'fixed', 'top': 5000, 'opacity': 0});   	
		}
		
	};
	sticky_navigation();
	$(window).scroll(function() {
		sticky_navigation();
	});
}

function load_submenu()
{
	if($('#submenu_the_menu').offset())
		var subtle_navigation_offset_top = 300;
		
	var subtle_navigation = function(){
		var scroll_top = $(window).scrollTop();
		scroll_top+=18;
		if (scroll_top > subtle_navigation_offset_top){
			$('#submenu_the_menu').addClass('subtle');
		}
		else {
			$('#submenu_the_menu').removeClass('subtle'); 	
		}	
	};
	subtle_navigation();
	$(window).scroll(function() {
		subtle_navigation();
	});
}	
function load_full_slider(my_id){
	
	var id = (my_id) ? my_id : "slider_conocenos";
	var mouseEnteredSlider = false;
	var slider = $( '#'+id ).cbpFWSlider({
	// default transition speed (ms)
		speed : 500,
	// default transition easing
		easing : 'ease'
	}).mouseenter(function() {
		mouseEnteredSlider = true;
	}).mouseleave(function() {
		mouseEnteredSlider = false;
	});

	setInterval(function() {
		if(!mouseEnteredSlider) {
			if($('.cbp-fwnext').css('display') != 'none'){
				$('.cbp-fwnext').click();
			} else {
				$('.cbp-fwdots span:first-child').click();
			}
		}
	}, 10000);
	
}


function load_vert_slider(my_id, prev, next)
{
	var id = (my_id) ? my_id : "vert_slider"; //siempre será id, asignar sin símbolo
	var prev_name= (prev) ? prev : "prev_btn";  //siempre será id, asignar sin símbolo
	var next_name= (next) ? next : "next_btn";  //siempre será id, asignar sin símbolo
	
	
	$("#"+id).cycle({ 
	    fx:     'fade', 
	    speed:  'fast', 
	    timeout: 0, 
	    next:   "#"+next_name, 
	    prev:   "#"+prev_name
	});
}

function load_bullet_slider(my_id , my_nav_id )
{
	var id= (my_id) ? my_id : ".bullet_slider"; //puede ser clase o id, incluir símbolo
	var nav_id = (my_nav_id) ? my_nav_id : "bullet_nav"; //siempre sera id, sin símbolo
	
	$(id).after('<div id="'+ nav_id +'" class="bullets">').cycle({ 
	    fx:     'cover', 
	    speed:  'slow', 
	    //timeout: 0, 
	    pager: "#"+nav_id,
	});
}	

function load_acordeon()
{
	$("#reasons_accordeon > li > h3").click(function(){
		$('#reasons_accordeon div').slideUp(300);
	    if(false == $(this).next().is(':visible')) {
				
				$('#reasons_accordeon h3').css({'background-position':"right 10px"});
				$('#reasons_accordeon div').hide('slow');
				
				$(this).next().show('slow');
	    	$(this).css({'background-position':"right -40px"});
			
	    }
			else{
				$(this).css({'background-position':"right 10px"});
			}
	});
	$('#reasons_accordeon div').hide();
	$('#reasons_accordeon h3').css({'background-position':"right 10px"});
	
	$('#reasons_accordeon div:eq(0)').show();
	$('#reasons_accordeon h3:eq(0)').css({'background-position':"right -40px"});
}


/*
	Author: jgd
	Function to get current page ex- /contact, /about-us
*/
function get_currentpage()
{
	var loc = window.location;
	p = loc.href.substring(loc.href.indexOf(loc.host) + loc.host.length + folder.length );
	if(p == '') p = 'inicio';
	return p;
}

/*
	Author: jgd, gvg
	Function to move scroll to specif element tag;
	You can add an offset value if necessary to affect the final position
*/
function gotoTop(id, offset)
{
	var offset_val = (offset) ? offset : 0;
	
	if(id.length)
		$('html, body').animate({
			scrollTop: $('#'+id).delay( 800 ).offset().top - offset_val
		}, 'slow');
}

/*
	Author: jgd
	Function to get last parameter from URL.
*/
function getLastItem(cadena)
{
   var params = cadena.split('/');
   return params.pop();
}

/*
	Author: jgd
	Function to get url server
*/
function get_server_path()
{
	var loc = window.location;
	return "http://" + loc.hostname;
}

/*
	Author: gvg
	Get current location from input and open google maps with origin and destination
*/
function get_location()
{

		$("#get_directions_btn").click(function (e) {
			e.preventDefault();

			if($('#origin').val()){
				var origin= escape($('#origin').val());
				var url = "http://maps.google.com/maps?saddr="+origin+"&daddr=3070+W.+Chapman+Ave.+Suite+C,+Orange+CA,+92868*"; 
				
				
				window.open(url, '_blank');
			
				
			}
			else{
				//no address, send error message 
				

				document.getElementById("dir_error").innerHTML="Please insert a valid address";
		
			
			}
			
			
		});
}