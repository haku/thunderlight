# framework
require 'sinatra'
require 'haml'

# data
require 'active_support/time'
require 'active_support/number_helper'
require 'rest-client'
require 'json'
require 'fileutils'

# debug
require 'awesome_print'
require 'pry'

# model
require './model/unit.rb'

# servlets
require './servlets/desu'
require './servlets/game_board'

run Sinatra::Application
