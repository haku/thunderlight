get '/game_board' do
  units = {}

  (units[[1,2]] ||= []) << Unit.new(
    title:  'M1',
    vector: {nw: 1, sw: 1}
  ) << Unit.new(
    title: 'M2'
  )

  haml :game_board, :locals => {
    width:  8,
    height: 4,
    units:  units
  }
end
