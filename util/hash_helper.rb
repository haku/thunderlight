module HashHelper

  def self.symbolise_keys(h)
    h.inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
  end

  def self.parse_array_keys(h)
    h.inject({}){|memo,(k,v)| memo[JSON.parse(k)] = v; memo}
  end

end
