require 'json'

class Unit

  attr_reader :title, :vector

  def initialize(params = {})
    @title = params[:title] || 'NoName'
    @vector = params[:vector]
  end

  def to_json(*a)
    {
      'json_class' => self.class.name,
      'data' => {
        title: @title,
        vector: @vector
      } 
    }.to_json(*a)
  end

  def self.json_create(o)
    new(HashHelper.symbolise_keys(o['data']))
  end

end
