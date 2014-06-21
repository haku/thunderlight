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
        GameBoard.new
      end
    end

    def update_board
      board = read_board()
      new_board = yield board
      raise "block did not return new board state." if new_board.nil?
      IO.write(GAME_BOARD_FILE, JSON.pretty_generate(new_board.to_h))
    end

  end

end
