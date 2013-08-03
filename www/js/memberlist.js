var page = getUrlVars()["page"];
if(!page) page=0;
var scrollheight = -500;
var serviceURL = "http://www.usgbc.org/mobile/services/members";
serviceURL = serviceURL + "?page=" + page;
serviceURL = serviceURL + "?callback=";
var members;
	$( document ).on( "click", ".ui-input-clear", function() {
		getmemberList();
	});

	$('#memberListPage').bind('pageinit', function(event) {
		getmemberList();
		
		$( "#load-more" ).on( "listviewbeforefilter", function ( e, data ) {	
			var $ul = $( this ),
				$input = $( data.input ),
				value = $input.val(),
				html = "";
				$ul.html( "" );
			if ( value && value.length > 2 ) {
				getmemberList(0,$input.val());
			}
		});
	
	});


function getmemberList(pagenum, search) {
	if(!pagenum) pagenum=0;
	serviceURL = "http://www.usgbc.org/mobile/services/members";
	serviceURL = serviceURL + "?page=" + pagenum;
	
	if(search != null){
		serviceURL = "http://www.usgbc.org/mobile/services/members";
		serviceURL = serviceURL + "?search=" + search + "&page=" + pagenum;
	}
	serviceURL = serviceURL + "?callback=";
		
	console.log(serviceURL);
	$.getJSON(serviceURL, function(data) {
		console.log(data);
		if(pagenum<1){
			$('#memberList li').remove();
			$('#memberList #load-more').remove();				
		} else {
			$('#memberList #load-more').remove();			
		}
		members = data.nodes;
		$.each(members, function(index, member) {
			$('#memberList').append('<li><a data-transition="flip" href="memberdetails.html?id=' + member.node.id + '">' +
					'<img style="max-width:100px;max-height:80px" src="img/member_placeholder.png" data-src="' + member.node.image + '"/>' +
					'<p style="margin:10px;margin-bottom:0px;margin-top:0px"><strong>' + member.node.name  + '</strong></p>' +
					'<div style="position:absolute;right:5px;font-size:10px;top:2px">' + member.node.level + '</div>' + 
					'<p class="ui-li-desc" style="margin:10px;margin-top:5px;color:#666">' + member.node.city + ', ' + member.node.state +  '</p></a></li>');
		});
		$('#memberList').append('<li id="load-more"><center>Loading...</center></li>');		
		$('#memberList').listview('refresh');
    	$("img").unveil();		
		$('#load-more').waypoint(function(direction){
			if(direction == "down"){
				page = page + 1;
				scrollheight = scrollheight * (page+1);
				if(search == null) getmemberList(page); 
				if(search != null) 	$('#memberList #load-more').remove();	
			}
			console.log("hello world" + direction);
		}, { offset: function() {
			    return 1000;
			  } });

	});
}
						

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


