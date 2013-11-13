require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'json'
require 'rest-client'
require 'dotenv'

Dotenv.load

get '/commits' do
	commits = []
	1.times do |i|
		commit_page = RestClient.get("https://api.github.com/repos/rails/rails/commits", {params: {
			client_id: ENV["CLIENT_ID"],
			client_secret: ENV["CLIENT_SECRET"],
			page: i,
			per_page: 100,
		}})
		JSON.parse(commit_page).each do |commit|
			commits << commit
		end
	end
	commits.to_json
end