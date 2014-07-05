require 'json'

module State

  GAME_BOARD_FILE = File.expand_path(File.join(File.dirname(__FILE__), "../game_board.json"))

  class << self

    def read_board
      if File.exist?(GAME_BOARD_FILE)
        GameBoard.from_h(HashHelper.symbolise_keys(JSON.parse(IO.read(GAME_BOARD_FILE), {
          create_additions: true
        })))
      else
        new_board()
      end
    end

    def update_board
      board = read_board()
      yield board
      write_board(board)
    end

    private

    def new_board
      board = GameBoard.new
      add_fake_data(board)
      write_board(board)
      return board
    end
    
    def write_board(board)
      IO.write(GAME_BOARD_FILE, JSON.pretty_generate(board.to_h))
    end

    def add_fake_data(board)
      board.add_unit [1,1], Unit.new(
        title: 'M1',
        thrust_points: 2,
        vector: {ne: 1, se: 1}
      )
      board.add_unit [1,1], Unit.new(
        title: 'M2',
        thrust_points: 1
      )
    end

  end

end
