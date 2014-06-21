get '/game_board' do
  haml :game_board, :locals => {
    :width => 8,
    :height => 4
  }
end
