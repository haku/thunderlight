require 'json'
require 'securerandom'

class Unit

  attr_reader :uid, :title, :thrust_points,
    :vector, :next_vector
  attr_writer :vector, :next_vector

  def initialize(params = {})
    @uid = params[:uid] || SecureRandom.uuid
    @title = params[:title] || 'NoName'
    @thrust_points = params[:thrust_points] || 0
    @vector = params[:vector]
    @next_vector = params[:next_vector]
  end

  def display_vector
    @next_vector || @vector
  end

  def to_s
    "unit{#{@title}, #{@thrust_points}, #{@vector || '-'}, #{@next_vector || '-'}}"
  end

  def to_json(*a)
    {
      'json_class' => self.class.name,
      'data' => {
        uid: @uid,
        title: @title,
        thrust_points: @thrust_points,
        vector: @vector,
        next_vector: @next_vector
      } 
    }.to_json(*a)
  end

  def self.json_create(o)
    h = HashHelper.symbolise_keys(o['data'])
    [:vector, :next_vector].each do |k|
      h[k] = HashHelper.symbolise_keys(h[k]) if h[k]
    end
    new(h)
  end

end
