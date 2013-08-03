$( document ).on( "pageshow", "#detailsPage", function(event) {
	var id = getUrlVars()["id"];
	var serviceurl = 'http://www.usgbc.org/mobile/services/projects/' + id;
	$.getJSON(serviceurl, displayProject);
});



function displayProject(data) {
	var projects = data.nodes;
	$.each(projects, function(index, project) {	
		project = project.node;
		$('#projectPic').attr('data-src',project.image2);
		$('#name').text(project.name);
		$('#address').html(project.address);
		$('#foundation_statement').html(project.foundation_statement);
		$('#description').html(project.description);		
		$('#city').text(project.city);
    	$("img").unveil();				
	});

	
}

