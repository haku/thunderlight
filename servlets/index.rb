get '/' do
  boards = State.list_boards()
  haml :index, :locals => {boards: boards}
end

post '/new_board' do
  puts "new_board: #{params}"
  title = params[:title]

  if !title || title.length < 1
    status 400
    body "Missing title."
    return
  end

  board = State.new_board(title)
  redirect to("/board/#{board.id}")
end
