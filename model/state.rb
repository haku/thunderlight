require 'json'

module State

  BOARDS_DIR = File.expand_path(File.join(File.dirname(__FILE__), "../var/boards"))

  class << self

    def list_boards
      return [] if !Dir.exists?(BOARDS_DIR)
      Dir.entries(BOARDS_DIR).reject{|e| e.start_with?('.')}.map{|n| n.gsub('.json', '')}.map do |id|
        read_board(id, true)
      end
    end

    def new_board(title)
      board = GameBoard.new(title: title)
      add_fake_data(board)
      write_board(board)
      return board
    end

    def read_board(board_id, summaries = false)
      file = file_for_board(board_id)
      raise "File not found: #{file}" if !File.exist?(file)
      GameBoard.from_h(HashHelper.symbolise_keys(JSON.parse(IO.read(file), {
        create_additions: true
      })), summaries)
    end

    def update_board(board_id)
      board = read_board(board_id)
      yield board
      write_board(board)
    end

    private

    def file_for_board(board_id)
      FileUtils.mkdir_p BOARDS_DIR if !Dir.exists?(BOARDS_DIR)
      file = File.join(BOARDS_DIR, "#{board_id}.json")
      return file
    end
    
    def write_board(board)
      IO.write(file_for_board(board.id), JSON.pretty_generate(board.to_h))
    end

    def add_fake_data(board)
      (0..(board.width - 1)).to_a.product((0..board.height - 1).to_a).sample(board.width * board.height * 0.05).each do |c|
        board.add_texture c, :asteroid
      end
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
