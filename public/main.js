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
				RailsVis.graphCommits(commits)
			}
		})
	},

	graphCommits: function(commits) {


		// here is where we are going to generate our d3 graph!
	

	},





	maxCommitsInDay: function(commitsByFrequency) {
		var i = 0; length = commitsByFrequency.length, max = 0,
		commitsInDay = 0;
		for(; i < length;) {
			commitsInDay = commitsByFrequency[i].length
			if(commitsInDay > max){
				max = commitsInDay;
			}
			i += 1;
		}
		return max;
	},

	// returns earliest and latests dats from array of commits
	dateDomain: function(commits) {
		var i = 0, length = commits.length, 
		min = RailsVis.commitDate(commits[0]), 
		max = min, date;

		for(; i < length ;) {
			date = RailsVis.commitDate(commits[i]);
			if(date > max) {
				max = date;
			} else if (date < min) {
				min = date;
			}
			i += 1;
		}
		return [min,max];
	},


	// returns date of commit if passed github commit
	commitDate: function(commit) {
		var commitString = commit['commit']['committer']['date'],
		dateArray = commitString.split('T')[0].split('-')
		return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
	},


	// returns commits arranged by day when given commits
	commitFrequencies: function(commits) {
		var byDateObj = {}, i = 0, length = commits.length,
			max = 0, date, byDateArray = [];

		for(;i<length;) {
			date = RailsVis.commitDate(commits[i]);
			byDateObj[date] = byDateObj[date] || [];
			byDateObj[date].push(commits[i]);
			i += 1;
		}

		for(var key in byDateObj) {
			byDateArray.push( byDateObj[key] );
		}
		return byDateArray;
	},

	// difference in number of days between commits
	daysBetween: function(minMaxArray) {
		var milliseconds = minMaxArray[1] - minMaxArray[0];
		return parseInt(milliseconds* 1.15741E-8, 10) + 1;
	}



}