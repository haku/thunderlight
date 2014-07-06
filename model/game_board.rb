class GameBoard

  attr_reader :id, :title, :width, :height, :turn_number,
    :textures, :units

  def self.from_h(h, summaries = false)
    if summaries
      units = {}
    else
      textures = h.delete(:textures)
      textures = HashHelper.parse_array_keys(textures) if textures && textures.keys.first.class == String
      units = h.delete(:units)
      units = HashHelper.parse_array_keys(units) if units.keys.first.class == String
    end
    GameBoard.new(h, textures, units)
  end

  def initialize(params = {}, textures = {}, units = {})
    @id = params[:id] || SecureRandom.uuid
    @title = params[:title]
    @width = params[:width] || 30
    @height = params[:height] || 20
    @turn_number = params[:turn_number] || 1
    @textures = textures || {}
    @units = units
  end

  def to_s
    "gameBoard{#{@id}, #{@title}, #{@width}, #{@height}, #{@turn_number}, #{@textures.size}, #{@units.size}}"
  end

  def to_h
    {
      id: @id,
      title: @title,
      width: @width,
      height: @height,
      turn_number: @turn_number,
      textures: @textures,
      units: @units
    }
  end

  def tick!
    @turn_number += 1;
    new_units = {}
    @units.each do |coord, units|
      units.each do |unit|
        if unit.next_vector
          unit.vector = unit.next_vector
          unit.next_vector = nil
        end
        (new_units[GameBoard.apply_vector(coord, unit.vector)] ||= []) << unit
      end
    end
    @units = new_units
  end

  TEXTURE_VARIANTS = {
    'asteroid' => 5
  }

  def textures_varied
    @textures.each_with_object({}) do |(coord, ts), h|
      h[coord] = ts.map do |t|
        n = TEXTURE_VARIANTS[t]
        # FIXME this will go wonky when more than one type of texture.
        n ? "#{t} u#{(rand * n).to_i}" : t
      end
    end
  end

  def add_texture(coord, type)
    (@textures[coord] ||= []) << type
  end

  def add_unit(coord, unit)
    (@units[coord] ||= []) << unit
  end

  def set_unit_vector(uid, vector)
    # TODO this search should probable be more efficient.
    @units.each do |coord, units|
      units.each do |unit|
        unit.next_vector = vector if unit.uid == uid
      end
    end
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
        c[1] -= ((m + (c[0] % 2 == 0 ? 0 : 1)) / 2)
        c[0] += m
      when :se
        c[1] += ((m + (c[0] % 2 == 0 ? 1 : 0)) / 2)
        c[0] += m
      when :s
        c[1] += m
      when :sw
        c[1] += ((m + (c[0] % 2 == 0 ? 1 : 0)) / 2)
        c[0] -= m
      when :nw
        c[1] -= ((m + (c[0] % 2 == 0 ? 0 : 1)) / 2)
        c[0] -= m
      end
    end
    return c
  end

end
