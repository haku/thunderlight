module HashHelper

  def self.symbolise_keys(h)
    return nil if h.nil?
    h.inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
  end

  def self.parse_array_keys(h)
    return nil if h.nil?
    h.inject({}){|memo,(k,v)| memo[JSON.parse(k)] = v; memo}
  end
  
  def self.sym_keys_i_vals(h)
    return nil if h.nil?
    h.inject({}){|memo,(k,v)| memo[k.to_sym] = v.to_i; memo}
  end

end
