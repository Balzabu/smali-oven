/* copy_to_clipboard() will copy the value of the smali_result text-area into the client clipboard.
   Supports mobile devices too. */
function copy_to_clipboard() {
	// Get the text field
	var copyText = document.getElementById("smali_result");

	// Select the text field
	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices

	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText.value);

	// Alert the copied text
	alert("Copied to clipboard.");
}


/* dontIndent() removes all the spaces indentations in a string */
function dontIndent(str) {
	return ('' + str).replace(/(\n)\s+/g, '$1');
}

/* getUrlParameter() returns the value of a specific URL parameter, if not found return false */
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
};


// When the page has loaded
$(document).ready(function () {
	// What does the user want to generate?
	var requested_type = getUrlParameter('type_select');

	// The parameter "type_select" is missing, redirect.
	if (requested_type == false) {
		alert("Some parameters are missing, please retry! ");
		window.location.replace("index.html");
	}

	// The user wants to generate a Toast Message
	else if (requested_type == "toast") {
		// Which kind of Toast Message does the user want to generate?
		requested_option = getUrlParameter('select_choice');

		// The parameter "select_choice" is missing, redirect.
		if (requested_option == false) {
			alert("Some parameters are missing, please retry! ");
			window.location.replace("index.html");
		}

		// The user wants to generate a "Simple Toast Message"
		else if (requested_option == "simple_toast") {
			// What does the user want to use as text?
			requested_text = getUrlParameter('text');

			// The parameter "text" is missing, redirect.
			if (requested_text == false) {
				alert("Some parameters are missing, please retry! ");
				window.location.replace("index.html");
			}
			// The parameter has been found, generate our Smali Code and show it into the "smali_result" textarea.
			else {

				// Build the smali code
				let smali_simple_toast =
					`const/4 v0, 0x1
					const-string v1, "${requested_text}"
					invoke-static {p0, v1, v0}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;
					move-result-object v0
					invoke-virtual {v0}, Landroid/widget/Toast;->show()V`;

				// Show result
				$('#smali_result').val(dontIndent(smali_simple_toast))
			}

		}

		// The user wants to generate a "Simple Base64 Toast Message"
		else if (requested_option == "base64_toast") {

			// What does the user want to use as text?
			requested_text = getUrlParameter('text');

			// The parameter "text" is missing, redirect.
			if (requested_text == false) {
				alert("Some parameters are missing, please retry! ");
				window.location.replace("index.html");
			}

			// The parameter has been found, generate our Smali Code and encode the provided text. Then show the code into the "smali_result" textarea.
			else {

				// Create Base64 Object
				var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

				// Encode requested_text in B64
				var encoded_requested_text = Base64.encode(requested_text);

				// Build the smali code
				let base64_simple_toast =
					`const-string v1, "${encoded_requested_text}"
					const/4 v0, 0x0  
					invoke-static {v1, v0}, Landroid/util/Base64;->decode(Ljava/lang/String;I)[B  
					move-result-object v0  
					new-instance v1, Ljava/lang/String;  
					invoke-direct {v1, v0}, Ljava/lang/String;-><init>([B)V  
					const/4 v0, 0x1  
					invoke-static {p0, v1, v0}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;  
					move-result-object v0  
					invoke-virtual {v0}, Landroid/widget/Toast;->show()V`;

				// Show result
				$('#smali_result').val(dontIndent(base64_simple_toast))
			}

		}

		// The user wants to generate a "Colorful Simple Toast Message"
		else if (requested_option == "simple_colorful_toast") {

			// What does the user want to use as text? Which color?
			requested_text = getUrlParameter('text');
			requested_color = getUrlParameter('hex-color');

			// One, if not both, the parameters "text" or "hex-color" are missing, redirect.
			if (requested_text == false || requested_color == false) {
				alert("Some parameters are missing, please retry! ");
				window.location.replace("index.html");
			}

			// The parameters have been found, generate our Smali Code and show the code into the "smali_result" textarea.
			else {

				// Build the smali code
				let simple_colorful_toast =
					`const-string v0, "<b><font color=${requested_color}>${requested_text}</font></b>"
					invoke-static {v0}, Landroid/text/Html;->fromHtml(Ljava/lang/String;)Landroid/text/Spanned;
					move-result-object v0
					const/4 v1, 0x1
					invoke-static {p0, v0, v1}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;
					move-result-object v2
					invoke-virtual {v2}, Landroid/widget/Toast;->show()V`;

				// Show result
				$('#smali_result').val(dontIndent(simple_colorful_toast))
			}
		}

		// The user wants to generate a "Colorful Base64 Toast Message"
		else if (requested_option == "base64_colorful_toast") {

			// What does the user want to use as text? Which color?			
			requested_text = getUrlParameter('text');
			requested_color = getUrlParameter('hex-color');


			// One, if not both, the parameters "text" or "hex-color" are missing, redirect.			
			if (requested_text == false || requested_color == false) {
				alert("Some parameters are missing, please retry! ");
				window.location.replace("index.html");
			}

			// The parameters have been found, build our Toast Message html code and encode it in Base64.Then show the code into the "smali_result" textarea.
			else {
				// Create Base64 Object
				var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

				// Encode requested_text in B64
				let requested_html_body = `<font color=${requested_color}>${requested_text}</font>`;
				var encoded_requested_text = Base64.encode(requested_html_body);

				// Build the smali code
				let base64_colorful_toast =
					`const-string v1, "${encoded_requested_text}"
					const/4 v0, 0x0
					invoke-static {v1, v0}, Landroid/util/Base64;->decode(Ljava/lang/String;I)[B
					move-result-object v0
					new-instance v1, Ljava/lang/String;
					invoke-direct {v1, v0}, Ljava/lang/String;-><init>([B)V
					invoke-static {v1}, Landroid/text/Html;->fromHtml(Ljava/lang/String;)Landroid/text/Spanned;
					move-result-object v1
					const/4 v0, 0x1
					invoke-static {p0, v1, v0}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;
					move-result-object v2
					invoke-virtual {v2}, Landroid/widget/Toast;->show()V`;

				// Show result
				$('#smali_result').val(dontIndent(base64_colorful_toast));
			}

		}
		// The user supplied an unknown Toast Message Setting
		else {
			alert("Some parameters are wrong, please retry! ");
			window.location.replace("index.html");
		}

	}

	// The user wants to generate a Dialog
	else if (requested_type == "dialog") {

		// Which kind of Dialog does the user want to generate?
		requested_option = getUrlParameter('select_choice');

		// The parameter "select_choice" is missing, redirect.
		if (requested_option == false) {
			alert("Some parameters are missing, please retry! ");
			window.location.replace("index.html");
		}

		// The user wants to generate a "Simple Dialog"
		else if (requested_option == "simple_dialog") {

			// What does the user want to use as text? Dialog title? Dialog positive text?
			requested_text = getUrlParameter('text');
			requested_dialog_title = getUrlParameter('dialog_title');
			requested_dialog_positive_text = getUrlParameter('dialog_positive_text');

			// One of the parameters is missing, redirect.			
			if (requested_text == false || requested_dialog_title == false || requested_dialog_positive_text == false) {
				alert("Some parameters are missing, please retry! ");
				window.location.replace("index.html");
			}

			// The parameters have been found, build our Dialog. Then show the code into the "smali_result" textarea.
			else {

				// Build the smali code
				let simple_dialog =
				   `new-instance v0, Landroid/app/AlertDialog$Builder;
					invoke-direct {v0, p0}, Landroid/app/AlertDialog$Builder;-><init>(Landroid/content/Context;)V
					const-string v1, "${requested_dialog_title}"
					invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setTitle(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;
					move-result-object v0
					const-string v1, "${requested_text}"
					invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setMessage(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;
					move-result-object v0
					const-string v1, "${requested_dialog_positive_text}"
					const/4 v2, 0x0
					invoke-virtual {v0, v1, v2}, Landroid/app/AlertDialog$Builder;->setPositiveButton(Ljava/lang/CharSequence;Landroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;
					move-result-object v0
					invoke-virtual {v0}, Landroid/app/AlertDialog$Builder;->show()Landroid/app/AlertDialog;`;

				// Show result
				$('#smali_result').val(dontIndent(simple_dialog))
			}
		}

		// The user wants to generate a "Base64 Simple Dialog"	
		else if (requested_option == "base64_simple_dialog") {

			// What does the user want to use as text? Dialog title? Dialog positive text?
			requested_text = getUrlParameter('text');
			requested_dialog_title = getUrlParameter('dialog_title');
			requested_dialog_positive_text = getUrlParameter('dialog_positive_text');

			// One, if not both, the parameters "text" or "hex-color" are missing, redirect.			
			if (requested_text == false || requested_dialog_title == false || requested_dialog_positive_text == false) {
				alert("Some parameters are missing, please retry! ");
				window.location.replace("index.html");
			}

			// The parameters have been found, build our Dialog. Then show the code into the "smali_result" textarea.
			else {

				// Create Base64 Object
				var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

				// Encode parameters in B64
				var encoded_requested_text = Base64.encode(requested_text);
				var encoded_dialog_title = Base64.encode(requested_dialog_title);
				var encoded_dialog_positive_text = Base64.encode(requested_dialog_positive_text);

				// Build the smali code
				let base64_simple_dialog =
				   `move-object v0, p0
					move-object v1, p1
					new-instance v5, Landroid/app/AlertDialog$Builder;
					move-object v10, v5
					move-object v5, v10
					move-object v6, v10
					move-object v7, v0
					invoke-direct {v6, v7}, Landroid/app/AlertDialog$Builder;-><init>(Landroid/content/Context;)V
					new-instance v6, Ljava/lang/String;
					move-object v10, v6
					move-object v6, v10
					move-object v7, v10
					const-string v8, "${encoded_dialog_title}"
					const/4 v9, 0x0
					invoke-static {v8, v9}, Landroid/util/Base64;->decode(Ljava/lang/String;I)[B
					move-result-object v8
					invoke-direct {v7, v8}, Ljava/lang/String;-><init>([B)V
					invoke-virtual {v5, v6}, Landroid/app/AlertDialog$Builder;->setTitle(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;
					move-result-object v5
					new-instance v6, Ljava/lang/String;
					move-object v10, v6
					move-object v6, v10
					move-object v7, v10
					const-string v8, "${encoded_requested_text}"
					const/4 v9, 0x0
					invoke-static {v8, v9}, Landroid/util/Base64;->decode(Ljava/lang/String;I)[B
					move-result-object v8
					invoke-direct {v7, v8}, Ljava/lang/String;-><init>([B)V
					invoke-virtual {v5, v6}, Landroid/app/AlertDialog$Builder;->setMessage(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;
					move-result-object v5
					new-instance v6, Ljava/lang/String;
					move-object v10, v6
					move-object v6, v10
					move-object v7, v10
					const-string v8, "${encoded_dialog_positive_text}"
					const/4 v9, 0x0
					invoke-static {v8, v9}, Landroid/util/Base64;->decode(Ljava/lang/String;I)[B
					move-result-object v8
					invoke-direct {v7, v8}, Ljava/lang/String;-><init>([B)V
					const/4 v7, 0x0
					check-cast v7, Landroid/content/DialogInterface$OnClickListener;
					invoke-virtual {v5, v6, v7}, Landroid/app/AlertDialog$Builder;->setPositiveButton(Ljava/lang/CharSequence;Landroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;
					move-result-object v5
					invoke-virtual {v5}, Landroid/app/AlertDialog$Builder;->create()Landroid/app/AlertDialog;
					move-result-object v5
					move-object v3, v5
					.line 22
					move-object v5, v3
					invoke-virtual {v5}, Landroid/app/AlertDialog;->show()V`;

				// Show result
				$('#smali_result').val(dontIndent(base64_simple_dialog))
			}
		}
	}
});