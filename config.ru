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

# util
require './util/hash_helper.rb'

# model
require './model/state.rb'
require './model/game_board.rb'
require './model/unit.rb'

# servlets
require './servlets/desu'
require './servlets/index'
require './servlets/board'
require './servlets/vector_dialog_test'

run Sinatra::Application
