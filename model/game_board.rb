class GameBoard

  attr_reader :width, :height, :units

  def self.from_h(h)
    units = h[:units]
    if units.keys.first.class == String
      units = HashHelper.parse_array_keys(units)     
    end
    GameBoard.new(h[:width], h[:height], units)
  end

  def initialize(width = 8, height = 4, units = {})
    @width = width
    @height = height
    @units = units
    fake_data if units.empty?
  end

  def to_s
    "gameBoard{#{width}, #{height}, #{units}}"
  end

  def to_h
    {
      width: @width,
      height: @height,
      units: @units
    }
  end

  def tick
    self
  end

  def fake_data
    (@units[[1,2]] ||= []) << Unit.new(
      title:  'M1',
      vector: {nw: 1, sw: 1}
    ) << Unit.new(
      title: 'M2'
    )
  end

end
