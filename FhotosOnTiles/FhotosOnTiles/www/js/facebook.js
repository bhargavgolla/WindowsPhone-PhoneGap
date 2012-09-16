/*Facebook Connect*/
var FACEBOOK_CLIENT_ID="372531062816463";
var appsecret="d637e2263e05ba7bc8bdebabe1f2114f";
//var FACEBOOK_AUTH_URL= "https://www.facebook.com/dialog/oauth/";
var FACEBOOK_AUTH_URL= "https://graph.facebook.com/oauth/authorize";
var FACEBOOK_PHOTOS_SCOPE ="user_photos";
//var redirect_uri='urn:ietf:wg:oauth:2.0:oob';
var redirect_uri='https://sites.google.com/site/oauthauthentication/';
var facebook_token='';
function facebook_initialize()
{
	
}
function facebookLocChanged(loc){
/* Here we check if the url is the login success */
	if (loc.indexOf("http://www.facebook.com/connect/login_success.html") > -1) {
		client_browser.close(); 
		var fbCode = loc.match(/code=(.*)$/)[1]
		$.ajax(
		{
			url:'https://graph.facebook.com/oauth/access_token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&code='+fbCode+'&redirect_uri=http://www.facebook.com/connect/login_success.html',
			data: {},
			success: function(data, status){
				facebook_token = data.split("=")[1];
				client_browser.close();
				initialize_facebook();
			},
			error: function(error) {
				alert("Error:"+error.toString());
				client_browser.close();
			},
			dataType: 'text',
			type: 'POST'
		}
		);
	}
}
$(document).ready(function(){
	$.support.cors = true;
    $("#facebook").empty();
    client_browser = ChildBrowser.install();
	FB.init({ appId: FACEBOOK_CLIENT_ID, nativeInterface: CDV.FB, useCachedDialogs: false });
	/*window.fbAsyncInit = function() {
    FB.init({
      appId      : FACEBOOK_CLIENT_ID, // App ID
      channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "js/facebook_js_sdk.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));*/
	$('#login').click(function () {
        /*var login_url = FACEBOOK_AUTH_URL + '?client_id=' + FACEBOOK_CLIENT_ID+ '&redirect_uri=' + redirect_uri +'&scope=' + FACEBOOK_PHOTOS_SCOPE +'&display=touch';
        console.log(login_url);
		$('#login').css('display','none');
		$('#codesubmit').css('display','block');
        //window.plugins.childBrowser.showWebPage(login_url);
		client_browser.onLocationChange = function(loc){
											facebookLocChanged(loc);
										};
		if (client_browser != null) {
			window.plugins.childBrowser.showWebPage(login_url);
		}*/
		FB.login(
			function(response) {
				if (response.session) {
					alert('logged in');
				} 
				else {
					//alert('not logged in');
				}
			},
			{ scope: "user_photos" }
		);
    });
	$('#codebutton').click(function(){
		code=$('#codeCont').val().toString();
		$('#codesubmit').css('display','none');
		FB.getLoginStatus(function(response) {
			if (response.status == 'connected') 
			{
				alert('logged in');
			}
			else 
			{
				alert('not logged in');
			}
		});
	});
});