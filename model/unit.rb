require 'json'
require 'securerandom'

class Unit

  attr_reader :uid, :title, :vector, :thrust
  attr_writer :vector, :thrust

  def initialize(params = {})
    @uid = params[:uid] || SecureRandom.uuid
    @title = params[:title] || 'NoName'
    @vector = params[:vector]
    @thrust = params[:thrust]
  end

  def to_s
    "unit{#{@title}, #{@vector || '-'}, #{@thrust || '-'}}"
  end

  def to_json(*a)
    {
      'json_class' => self.class.name,
      'data' => {
        uid: @uid,
        title: @title,
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
