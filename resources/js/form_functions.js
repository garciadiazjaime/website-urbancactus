/*
    AUTHOR: MINT IT MEDIA
    http://mintitmedia.com

    File with MINT functions
*/


var errors = [];


function send_message(message_data, form_id, error_div_id){
	$(error_div_id).html('');
	$(error_div_id).addClass('loading-ajax');
	
	setTimeout(function(){ 
	$.post( "/send_message/", message_data , 'json').done(function( data ) {
            $(error_div_id).removeClass('loading-ajax');
			if (typeof data.status != 'undefined' && data.status){
				reset_form(form_id);
				$(error_div_id).removeClass('text-danger').addClass('text-success').html('<strong>Your message was sent successfully!</strong>');
            } else {
            	$(error_div_id).removeClass('text-success').addClass('text-danger').html('<strong>Message sending failed, please try again.</strong>');
            }
	   });
	}, 500);

	return true;
}

/*
	Author: ofa
	Function that validates al inputs in div with id=setcion_id
*/

function validate_section(section_id){
	var required_valid_status = email_valid_status = true;
	$(section_id+' input.required-input').each(function(){
		$(this).removeClass('not-valid required');
		if(!$(this).val().length){
			required_valid_status = false;
			$(this).addClass('not-valid required');
		}
	});

	$(section_id+' textarea.required-text').each(function(){
		$(this).removeClass('not-valid required');
		if(!$(this).val().length){
			required_valid_status = false;
			$(this).addClass('not-valid required');
		}
	});

	$(section_id+' select.required-select').each(function(){
		$(this).removeClass('not-valid required');
		if($(this).val()==0){
			required_valid_status = false;
			$(this).addClass('not-valid required');
		}
	});

	$(section_id+' input.required-email').each(function(){
		$(this).removeClass('not-valid  required');
		if(!$(this).val().length){
			required_valid_status = false;
			$(this).addClass('not-valid  required');
		} else {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  			if ( !regex.test($(this).val()) ){
  				email_valid_status = false;
  				$(this).addClass('not-valid  required');
  			}
		}
	});

	if (!required_valid_status) { errors.push('required-field') }
	if (!email_valid_status) { errors.push('invalid-email') }

	return (required_valid_status && email_valid_status);
}

function get_error_list(){
	var errors_html = '';
	if ( $.inArray( 'required-field', errors ) > -1 ) {
		errors_html = errors_html + '<li>Please fill all required fields.</li>'; }
	if ( $.inArray( 'invalid-email', errors ) > -1 ) { 
		errors_html = errors_html + '<li>Please use a valid e-mail address</li>'; }
	if ( $.inArray( 'empty-vehicle', errors ) > -1 ) { 
		errors_html = errors_html + '<li>Please fill all required fields</li>'; }
	errors_html = '<ul>'+errors_html+'</ul>';
	return errors_html;
}

function reset_form(section_id){
	$(section_id+' input, '+section_id+' textarea ,'+section_id+' select').each(function(){
		$(this).val('');
	});

	return true;
}