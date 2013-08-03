$( document ).on( "pageshow", "#detailsPage", function(event) {
	var id = getUrlVars()["id"];
	var serviceurl = 'http://www.usgbc.org/mobile/services/projects/' + id;
	$.getJSON(serviceurl, displayProject);
});



function displayMember(data) {
	var projects = data.nodes;
	$.each(projects, function(index, project) {	
		project = project.node;
		$('#memberPic').attr('data-src',project.image2);
		$('#name').text(project.name);
		$('#address').html(project.address);
		$('#description').html(project.description);		
		$('#city').text(project.city);
    	$("img").unveil();				
	});

	
}

