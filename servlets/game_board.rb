get '/game_board' do
  board = State.read_board()
  puts board
  haml :game_board, :locals => {board: board}
end

post '/game_board/tick' do
  State.update_board do |board|
    board.tick
  end
  redirect to('/game_board')
end
