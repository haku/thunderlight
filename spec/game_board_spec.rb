require 'spec_helper'
require 'pry'

describe GameBoard do

  describe 'applies single vector' do
    it('n'  ){apply_vector([3,1], {n:  1}, [3,0])}
    it('ne' ){apply_vector([3,1], {ne: 1}, [4,0])}
    it('se' ){apply_vector([3,1], {se: 1}, [4,1])}
    it('s'  ){apply_vector([3,1], {s:  1}, [3,2])}
    it('sw' ){apply_vector([3,1], {sw: 1}, [2,1])}
    it('nw' ){apply_vector([3,1], {nw: 1}, [2,0])}
    it('ne2'){apply_vector([4,1], {ne: 1}, [5,1])}
    it('se2'){apply_vector([4,1], {se: 1}, [5,2])}
    it('sw2'){apply_vector([4,1], {sw: 1}, [3,2])}
    it('nw2'){apply_vector([4,1], {nw: 1}, [3,1])}
  end

  describe 'apples 2 vectors' do
    it('ne se'){apply_vector([1,1], {ne: 1, se: 1}, [3,1])}
  end

  def apply_vector(coord, vector, exp)
    expect(GameBoard.apply_vector(coord, vector)).to eq(exp)
  end

end
