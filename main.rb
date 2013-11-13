require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'json'
require 'rest-client'

get '/commits' do
	commits = []
	10.times do |i|
		commit_page = RestClient.get("https://api.github.com/repos/rails/rails/commits", {params: {
			page: i,
			per_page: 100,
		}})
		JSON.parse(commit_page).each do |commit|
			commits << commit
		end
	end

	commits.to_json
end