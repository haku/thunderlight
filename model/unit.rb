require 'json'
require 'securerandom'

class Unit

  attr_reader :uid, :title, :vector
  attr_writer :vector

  def initialize(params = {})
    @uid = params[:uid] || SecureRandom.uuid
    @title = params[:title] || 'NoName'
    @vector = params[:vector]
  end

  def to_s
    "unit{#{@title}, #{@vector || '-'}}"
  end

  def to_json(*a)
    {
      'json_class' => self.class.name,
      'data' => {
        uid: @uid,
        title: @title,
        vector: @vector
      } 
    }.to_json(*a)
  end

  def self.json_create(o)
    h = HashHelper.symbolise_keys(o['data'])
    h[:vector] = HashHelper.symbolise_keys(h[:vector]) if h[:vector]
    new(h)
  end

end
