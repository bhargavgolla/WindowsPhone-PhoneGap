/*Picasa Connect*/
var GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
var GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
//var GOOGLE_CLIENT_ID = "514002281531.apps.googleusercontent.com";
var GOOGLE_CLIENT_ID = "514002281531-v2ra3gc5k5r6d7ddpop7uscq6ructqpm.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET='3ovwIt7G7q9FbOFgjNAAwy44';
var PICASA_SCOPE = "https://picasaweb.google.com/data/";
var redirect_uri='urn:ietf:wg:oauth:2.0:oob';
var code='';
var access_token='';
var refresh_token='';
var start=-7;
function listing_photos(access_token,refresh_token){
	start=start+8;
	var photos_url='https://picasaweb.google.com/data/feed/api/user/default?kind=photo&thumbsize=104&max-results=8&start-index='+start+'&access_token='+access_token+'&fields=link[@rel="next"],entry(summary,media:group(media:thumbnail))';
	console.log(photos_url);
	$.ajax({
		type: "GET",
		url:photos_url,
		contentType: 'application/x-www-form-urlencoded',
		success: function(data) {
					$('#picasaMore').remove();
					$(data).find("entry").each(function()
					{
						if($(this).find('summary').text()==='')
						{
							$('#picasa').append('<img src="'+$(this).find('thumbnail').attr('url')+'" /><br />No Caption<br />');
						}
						else
						{
							console.log($(this).find('thumbnail').attr('url')+'----'+$(this).find('summary').text());
							$('#picasa').append('<img src="'+$(this).find('thumbnail').attr('url')+'" /><br />'+$(this).find('summary').text()+'<br />');
						}
					});
					if($(data).find('link').attr('rel')!=undefined)
					{
						console.log($(data).find('link').attr('rel'));
						$('#picasa').append($('<a id="picasaMore" class="more" data-role="button" data-icon="forward" onclick="listing_photos(access_token,refresh_token);" />').text('More..'));
					}
				},
		error: function( error ){
						// Log any error.
						alert("ERROR:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText);
						alert(JSON.stringify(error));
				},
		async:false
	});
}
function get_accesstoken(){
    $('#login').css('display', 'none');
    console.log("Here");
    //code=prompt('Paste the authorization code received here.');
    //alert("Gello");
	console.log(code);
	var token_url=GOOGLE_TOKEN_URL;
	var token_data='code='+encodeURIComponent(code)+'&redirect_uri='+encodeURIComponent(redirect_uri)+'&client_id='+encodeURIComponent(GOOGLE_CLIENT_ID)+'&scope='+'&client_secret='+encodeURIComponent(GOOGLE_CLIENT_SECRET)+'&grant_type=authorization_code';
	console.log(token_url);
	console.log(token_data);
	token_url=token_url+'?'+token_data;
	$.ajax({
		type: "POST",
		url:token_url,
		contentType: 'application/x-www-form-urlencoded',
		//data: token_data,
		success: function(data) {
					console.log(data);
					access_token=(data).access_token;
					refresh_token=(data).refresh_token;
					console.log(access_token);
					console.log(refresh_token);
					listing_photos(access_token,refresh_token);
				},
		error: function( error ){
						// Log any error.
						alert("ERROR:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText);
						console.log(JSON.stringify(error));
				},
		async:false
	});
}
$(document).ready(function () {
	$.support.cors = true;
    $("#picasa").empty();
    ChildBrowser.install();
	jso_configure({
			"google": {
					client_id: GOOGLE_CLIENT_ID,
					redirect_uri: "https://sites.google.com/site/oauthauthentication/",
					authorization: "https://accounts.google.com/o/oauth2/auth"
				}
	});
	jso_ensureTokens({"google": [PICASA_SCOPE,"https://www.googleapis.com/auth/userinfo.profile"]});
	jso_dump();
	$.oajax({
		url: "https://www.googleapis.com/oauth2/v1/userinfo",
	 	jso_provider: "google",
	 	jso_allowia: true,
	 	jso_scopes: ["https://www.googleapis.com/auth/userinfo.profile",PICASA_SCOPE],
	 	dataType: 'json',
	 	success: function(data) {
	 		console.log("Response (google):");
	 		console.log(data);
	 	}
	});
    $('#login').click(function () {
        var login_url = GOOGLE_AUTH_URL + '?scope=' + PICASA_SCOPE + '&redirect_uri=' + redirect_uri + '&response_type=code&client_id=' + GOOGLE_CLIENT_ID + '&approval_prompt=force' + '&access_type=offline';
        console.log(login_url);
		$('#login').css('display','none');
		$('#codesubmit').css('display','block');
        window.plugins.childBrowser.showWebPage(login_url);
        //ChildBrowser.showWebPage(login_url);
        //console.log("Here");
        /*window.plugins.childBrowser.onClose(function () {
        console.log("Here");
        get_accesstoken();
        });*/
        //ChildBrowser.onClose = get_accesstoken;
        //window.plugins.childBrowser.onClose = get_accesstoken;
    });
	$('#codebutton').click(function(){
		code=$('#codeCont').val().toString();
		$('#codesubmit').css('display','none');
		get_accesstoken();
	});
});
