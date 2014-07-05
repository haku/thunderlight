get '/' do
  board_ids = State.list_boards()
  haml :index, :locals => {board_ids: board_ids}
end

post '/new_board' do
  board = State.new_board
  redirect to("/board/#{board.id}")
end
