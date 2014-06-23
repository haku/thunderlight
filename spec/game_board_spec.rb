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
    it('ane'){apply_vector([4,1], {ne: 1}, [5,1])}
    it('ase'){apply_vector([4,1], {se: 1}, [5,2])}
    it('asw'){apply_vector([4,1], {sw: 1}, [3,2])}
    it('anw'){apply_vector([4,1], {nw: 1}, [3,1])}
  end

  describe 'apples 2 vectors' do
    it('ne se'){apply_vector([1,1], {ne: 1, se: 1}, [3,1])}
  end

  describe 'apples vector mag 2' do
    it('n2'  ){apply_vector([9,3],  {n:  2}, [ 9,1])}
    it('ne2' ){apply_vector([9,3],  {ne: 2}, [11,2])}
    it('se2' ){apply_vector([9,3],  {se: 2}, [11,4])}
    it('s2'  ){apply_vector([9,3],  {s:  2}, [ 9,5])}
    it('sw2' ){apply_vector([9,3],  {sw: 2}, [ 7,4])}
    it('nw2' ){apply_vector([9,3],  {nw: 2}, [ 7,2])}
    it('ane2'){apply_vector([10,3], {ne: 2}, [12,2])}
    it('ase2'){apply_vector([10,3], {se: 2}, [12,4])}
    it('asw2'){apply_vector([10,3], {sw: 2}, [ 8,4])}
    it('anw2'){apply_vector([10,3], {nw: 2}, [ 8,2])}
  end

  describe 'apples vector mag 3' do
    it('n3'  ){apply_vector([9,3],  {n:  3}, [ 9,0])}
    it('ne3' ){apply_vector([9,3],  {ne: 3}, [12,1])}
    it('se3' ){apply_vector([9,3],  {se: 3}, [12,4])}
    it('s3'  ){apply_vector([9,3],  {s:  3}, [ 9,6])}
    it('sw3' ){apply_vector([9,3],  {sw: 3}, [ 6,4])}
    it('nw3' ){apply_vector([9,3],  {nw: 3}, [ 6,1])}
    it('ane3'){apply_vector([10,3], {ne: 3}, [13,2])}
    it('ase3'){apply_vector([10,3], {se: 3}, [13,5])}
    it('asw3'){apply_vector([10,3], {sw: 3}, [ 7,5])}
    it('anw3'){apply_vector([10,3], {nw: 3}, [ 7,2])}
  end

  def apply_vector(coord, vector, exp)
    expect(GameBoard.apply_vector(coord, vector)).to eq(exp)
  end

end
