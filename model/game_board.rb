class GameBoard

  attr_reader :width, :height, :units

  def self.from_h(h)
    units = h[:units]
    if units.keys.first.class == String
      units = HashHelper.parse_array_keys(units)     
    end
    GameBoard.new(h[:width], h[:height], units)
  end

  def initialize(width = 30, height = 20, units = {})
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

  def tick!
    new_units = {}
    @units.each do |c, us|
      us.each do |u|
        (new_units[GameBoard.apply_vector(c, u.vector)] ||= []) << u 
      end
    end
    @units = new_units
  end

  private

  def self.apply_vector(coord, v)
    return coord if v.nil?
    c = coord.clone
    v.each do |dir, m|
      case dir
      when :n
        c[1] -= m
      when :ne
        c[1] -= m if c[0] % 2 == 1
        c[0] += m
      when :se
        c[1] += m if c[0] % 2 == 0
        c[0] += m
      when :s
        c[1] += m
      when :sw
        c[1] += m if c[0] % 2 == 0
        c[0] -= m
      when :nw
        c[1] -= m if c[0] % 2 == 1
        c[0] -= m
      end
    end
    return c
  end




  def fake_data
    (@units[[1,1]] ||= []) << Unit.new(
      title:  'M1',
      vector: {ne: 1, se: 1}
    ) << Unit.new(
      title: 'M2'
    )
  end

end