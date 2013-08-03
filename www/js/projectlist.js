var page = getUrlVars()["page"];
if(!page) page=0;
var scrollheight = -500;
var serviceURL = "http://www.usgbc.org/mobile/services/projects";
serviceURL = serviceURL + "?page=" + page;
serviceURL = serviceURL + "?callback=";
var projects;
	$( document ).on( "click", ".ui-input-clear", function() {
		getProjectList();
	});

	$('#projectListPage').bind('pageinit', function(event) {
		getProjectList();
		
		$( "#load-more" ).on( "listviewbeforefilter", function ( e, data ) {	
			var $ul = $( this ),
				$input = $( data.input ),
				value = $input.val(),
				html = "";
				$ul.html( "" );
			if ( value && value.length > 2 ) {
				getProjectList(0,$input.val());
			}
		});
	
	});


function getProjectList(pagenum, search) {
	if(!pagenum) pagenum=0;
	serviceURL = "http://www.usgbc.org/mobile/services/projects";
	serviceURL = serviceURL + "?page=" + pagenum;
	
	if(search != null){
		serviceURL = "http://www.usgbc.org/mobile/services/projects";
		serviceURL = serviceURL + "?search=" + search + "&page=" + pagenum;
	}
	serviceURL = serviceURL + "?callback=";
		
	console.log(serviceURL);
	$.getJSON(serviceURL, function(data) {
		console.log(data);
		if(pagenum<1){
			$('#projectList li').remove();
			$('#projectList #load-more').remove();				
		} else {
			$('#projectList #load-more').remove();			
		}
		projects = data.nodes;
		$.each(projects, function(index, project) {
			if(project.node.image != null) data_src = project.node.image; else data_src="img/project_placeholder.png";
			$('#projectList').append('<li><a data-transition="flip" href="projectdetails.html?id=' + project.node.id + '">' +
					'<img style="max-width:100px;max-height:80px" src="img/project_placeholder.png" data-src="' + data_src + '"/>' +
					'<p style="margin:10px;margin-bottom:0px;margin-top:0px"><strong>' + project.node.name  + '</strong></p>' +
					'<p style="margin:10px;margin-top:0px;margin-bottom:0px;">' + project.node.rating_system + ' ' + project.node.version + '</p>' +
					'<div style="position:absolute;right:5px;font-size:10px;top:2px">' + project.node.certification_level + '</div>' + 
					'<p class="ui-li-desc" style="margin:10px;margin-top:5px;color:#666">' + project.node.city + ', ' + project.node.state +  '</p></a></li>');
		});
		$('#projectList').append('<li id="load-more"><center>Loading...</center></li>');		
		$('#projectList').listview('refresh');
    	$("img").unveil();		
		$('#load-more').waypoint(function(direction){
			if(direction == "down"){
				page = page + 1;
				scrollheight = scrollheight * (page+1);
				if(search == null) getProjectList(page); 
				if(search != null) 	$('#projectList #load-more').remove();	
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


