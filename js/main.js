/* Detect if the user wants to generate a Toast Message or a Dialog */
$('#type_select').on('load change',function() {
	var current_value = $("#type_select").val();

	/* No option select (default) */
	if( current_value == "empty" ){
		$('#div_options').css('display','none');  /* Hide Options Div */
		$('#div_color').css('display','none');  /* Hide Color */
		$('#div_dialog_title').css('display','none');  /* Hide Dialog Title */
		$('#div_dialog_positive_text').css('display','none');  /* Hide Positive Text */
	}

	/* Toast message selected */
	else if( current_value == "toast" ){

		$('#div_options').css('display','none');  /* Hide Options Div */
		$('#options_label').text('Toast Options *');  /* Set the title of the options div */

		/* Change the values of the choices, first option: Simple Toast Message */
		$('#options_1').attr('value', 'simple_toast');
		$('#options_1').text('Simple Toast Message');

		/* Change the values of the choices, second option: Simple Base64 Toast Message */
		$('#options_2').attr('value', 'base64_toast');
		$('#options_2').text('Simple Base64 Toast Message');


		/* Check if the options 3 and 4 do exist, or have been deleted since the 'Dialog' option was selected */
		var option_3_Exists = ($('#select_choice option[id=' + 'options_3' + ']').length > 0);
		var option_4_Exists = ($('#select_choice option[id=' + 'options_4' + ']').length > 0);

		
		if(!option_3_Exists && !option_4_Exists) /* If the options do not exist */
		{
			/* Create them with the correct values,
			   third option:  Simple Colorful Toast Message
			   fourth option: Colorful Base64 Toast Message */
			$('#select_choice').append("<option id='options_3' name='options_3' value='"+'simple_colorful_toast'+"'>"+'Colorful Simple Toast Message'+"</option>");
			$('#select_choice').append("<option id='options_4' name='options_4' value='"+'base64_colorful_toast'+"'>"+'Colorful Base64 Toast Message'+"</option>");
		}

		else{ /* Simply change the values  */

			/* Change the values of the choices, third option: Simple Colorful Toast Message */
			$('#options_3').attr('value', 'simple_colorful_toast');
			$('#options_3').text('Colorful Simple Toast Message');			

			/* Change the values of the choices, fourth option: Colorful Base64 Toast Message */
			$('#options_4').attr('value', 'base64_colorful_toast');
			$('#options_4').text('Colorful Base64 Toast Message');
		}
		
		$('#div_options').css('display','block');  /* Show Options Div */
		$('#select_choice').trigger('change');  /* Trigger a change event */
	}

	/* Dialog selected */
	else if( current_value == "dialog" ){

		$('#div_color').css('display','none');  /* Hide Color */
		
		$('#div_options').css('display','none');  /* Hide Options Div */
		$('#options_label').text('Dialog Options *');  /* Set the title of the options div */
		
		/* Change the values of the choices, first option: Simple Dialog */
		$('#options_1').attr('value', 'simple_dialog');
		$('#options_1').text('Simple Dialog');

		/* Change the values of the choices, first option: Simple Base64 Dialog */
		$('#options_2').attr('value', 'base64_simple_dialog');
		$('#options_2').text('Simple Base64 Dialog');

		/* Delete the third and fourth option */
		$("option[id='options_3']").remove();
		$("option[id='options_4']").remove();

		$('#div_options').css('display','block');  /* Show Options Div */
		$('#select_choice').trigger('change');  /* Trigger a change event */
	}
  });


/* Detect the current selection, and display elements based on it */
$('#select_choice').on('load unload change',function() {
	var current_setting_value = $("#select_choice").val();

	/* Dialogs selected */
	if(current_setting_value == "simple_dialog" || current_setting_value == "base64_simple_dialog"){
		$('#div_color').css('display','none'); /* Hide Color */
		$('#div_dialog_title').css('display','block'); /* Show Dialog Title */
		$('#div_dialog_positive_text').css('display','block'); /* Show Dialog Positive Text */

		/* Mark the Dialog Inputs as 'required' */
		$('#div_dialog_title').prop('required',true);
		$('#div_dialog_positive_text').prop('required',true);

	}

	/* Simple & Base64 Simple Toast Messages */
	else if(current_setting_value == "simple_toast" || current_setting_value == "base64_toast"){
		$('#div_color').css('display','none'); /* Hide Color */
		$('#div_dialog_title').css('display','none'); /* Hide Dialog Title */
		$('#div_dialog_positive_text').css('display','none'); /* Hide Dialog Positive Text */

		/* Mark the Dialog Inputs as 'not required' */
		$('#dialog_title').prop('required',false);
		$('#dialog_positive_text').prop('required',false);
	}

	/* Simple & Base64 Simple Toast Messages with HEX-COLOR */
	else if(current_setting_value == "simple_colorful_toast" || current_setting_value == "base64_colorful_toast"){
		$('#div_color').css('display','block'); /* Show Color */
		$('#div_dialog_title').css('display','none'); /* Hide Dialog Title */
		$('#div_dialog_positive_text').css('display','none'); /* Hide Dialog Positive Text */

		/* Mark the Dialog Inputs as 'not required' */
		$('#dialog_title').prop('required',false);
		$('#dialog_positive_text').prop('required',false);
	}
}
);

/* Form submitted, suppress useless parameters for specific choices */
$("form").submit(function() {
	select_choice_value = document.getElementById('select_choice').value
	if(select_choice_value == "simple_toast" || select_choice_value == "base64_toast" || select_choice_value == "simple_dialog" || select_choice_value == "base64_simple_dialog"){
		/* All of these don't need the hex-color */
		$( "#hex-color" ).prop( "disabled", true );

		/* If not dialogs, disable the input fields (Avoids submitting the parameters) */
		if(select_choice_value == "simple_toast" || select_choice_value == "base64_toast"){
			$("#dialog_title").prop("disabled", true);
			$("#dialog_positive_text").prop("disabled", true);
		}
	}
	else if(select_choice_value == "simple_colorful_toast" || select_choice_value == "base64_colorful_toast"){
		/* These need the hex-color */
		$(this).children('#hex-color').add();

		/* Since these are not dialogs, disable the input fields (Avoids submitting the parameters) */
		$("#dialog_title").prop("disabled", true);
		$("#dialog_positive_text").prop("disabled", true);
	}

});