class Unit

  attr_reader :title, :vector

  def initialize(params = {})
    @title = params[:title] || 'NoName'
    @vector = params[:vector]
  end

end
