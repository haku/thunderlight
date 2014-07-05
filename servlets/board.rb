get '/board/:board_id' do |board_id|
  board = State.read_board(board_id)
  puts board
  haml :board, :locals => {board: board}
end

post '/board/:board_id/tick' do |board_id|
  State.update_board(board_id) do |board|
    board.tick!
  end
  redirect to("/board/#{board_id}")
end

post '/board/:board_id/vector' do |board_id|
  puts "#{board_id} vector: #{params}"
  State.update_board(board_id) do |board|
    board.set_unit_vector params['uid'], HashHelper.sym_keys_i_vals(params['vector'])
  end
  "ok"
end
