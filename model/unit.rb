require 'json'
require 'securerandom'

class Unit

  attr_reader :uid, :title, :thrust_points,
    :vector, :thrust
  attr_writer :vector, :thrust

  def initialize(params = {})
    @uid = params[:uid] || SecureRandom.uuid
    @title = params[:title] || 'NoName'
    @thrust_points = params[:thrust_points] || 0
    @vector = params[:vector]
    @thrust = params[:thrust]
  end

  def to_s
    "unit{#{@title}, #{@thrust_points}, #{@vector || '-'}, #{@thrust || '-'}}"
  end

  def to_json(*a)
    {
      'json_class' => self.class.name,
      'data' => {
        uid: @uid,
        title: @title,
        thrust_points: @thrust_points,
        vector: @vector,
        thrust: @thrust
      } 
    }.to_json(*a)
  end

  def self.json_create(o)
    h = HashHelper.symbolise_keys(o['data'])
    [:vector, :thrust].each do |k|
      h[k] = HashHelper.symbolise_keys(h[k]) if h[k]
    end
    new(h)
  end

end
