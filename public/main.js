$(function() {
	RailsVis.getCommits();
})

var RailsVis = {

	getCommits: function() {
		$.ajax({
			type: 'GET',
			url: '/commits',
			dataType: "json",
			success: function(data){
				console.log(data);
			}
		})
	}

}