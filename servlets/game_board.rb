get '/game_board' do
  board = State.read_board()
  puts board
  haml :game_board, :locals => {board: board}
end

post '/game_board/tick' do
  State.update_board do |board|
    board.tick!
  end
  redirect to('/game_board')
end

post '/game_board/vector' do
  puts "vector: #{params}"
  State.update_board do |board|
    board.set_unit_vector params['uid'], HashHelper.sym_keys_i_vals(params['vector'])
  end
  "ok"
end

post '/game_board/thrust' do
  puts "thrust: #{params}"
  State.update_board do |board|
    board.set_unit_thrust params['uid'], HashHelper.sym_keys_i_vals(params['thrust'])
  end
  "ok"
end
