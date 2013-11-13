$(function() {
	RailsVis.getCommits();
})

var RailsVis = {

	getCommits: function() {
		$.ajax({
			type: 'GET',
			url: '/commits',
			dataType: "json",
			success: function(commits){
				console.log(commits);
			}
		})
	},

	graphCommits: function() {

	},



}