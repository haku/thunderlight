describe('game_board', function(){

  function simplifyVector(vector, exp) {
    expect(GameBoard.simplifyVector(vector)).toEqual(exp);
  }

  describe('simplfy vector', function() {
    it('s2  ne2 nw2', function(){simplifyVector({ s: 2, ne: 2, nw: 2}, {            })});
    it('ne1 sw1'    , function(){simplifyVector({ne: 1, sw: 1       }, {            })});
    it('se1 nw1'    , function(){simplifyVector({se: 1, nw: 1       }, {            })});
    it('s2 n1'      , function(){simplifyVector({ s: 2, n: 1        }, { s: 1       })});
    it('ne1 se2 sw1', function(){simplifyVector({ne: 1, se: 2, sw: 1}, {se: 2       })});
    it('ne2 nw2'    , function(){simplifyVector({ne: 2, nw: 2       }, { n: 2       })});
    it('se2 sw2'    , function(){simplifyVector({se: 2, sw: 2       }, { s: 2       })});
  //it('s2  ne1 se1', function(){simplifyVector({ s: 2, ne: 1, se: 1}, { s: 1, se: 2})});
  });

  function applyVector(coord, vector, exp) {
    expect(GameBoard.applyVector(coord, vector)).toEqual(exp);
  }

  describe('apply single vector', function() {
    it('n',   function(){applyVector([3,1], {n:  1}, [3,0])});
    it('ne',  function(){applyVector([3,1], {ne: 1}, [4,0])});
    it('se',  function(){applyVector([3,1], {se: 1}, [4,1])});
    it('s' ,  function(){applyVector([3,1], {s:  1}, [3,2])});
    it('sw',  function(){applyVector([3,1], {sw: 1}, [2,1])});
    it('nw',  function(){applyVector([3,1], {nw: 1}, [2,0])});
    it('ane', function(){applyVector([4,1], {ne: 1}, [5,1])});
    it('ase', function(){applyVector([4,1], {se: 1}, [5,2])});
    it('asw', function(){applyVector([4,1], {sw: 1}, [3,2])});
    it('anw', function(){applyVector([4,1], {nw: 1}, [3,1])});
  });

  describe('apples 2 vectors', function() {
    it('ne se', function(){applyVector([1,1], {ne: 1, se: 1}, [3,1])});
  });

  describe('apples vector mag 2', function() {
    it('n2',   function(){applyVector([9,3],  {n:  2}, [ 9,1])});
    it('ne2',  function(){applyVector([9,3],  {ne: 2}, [11,2])});
    it('se2',  function(){applyVector([9,3],  {se: 2}, [11,4])});
    it('s2',   function(){applyVector([9,3],  {s:  2}, [ 9,5])});
    it('sw2',  function(){applyVector([9,3],  {sw: 2}, [ 7,4])});
    it('nw2',  function(){applyVector([9,3],  {nw: 2}, [ 7,2])});
    it('ane2', function(){applyVector([10,3], {ne: 2}, [12,2])});
    it('ase2', function(){applyVector([10,3], {se: 2}, [12,4])});
    it('asw2', function(){applyVector([10,3], {sw: 2}, [ 8,4])});
    it('anw2', function(){applyVector([10,3], {nw: 2}, [ 8,2])});
  });

  describe('apples vector mag 3', function() {
    it('n3',   function(){applyVector([9,3],  {n:  3}, [ 9,0])});
    it('ne3',  function(){applyVector([9,3],  {ne: 3}, [12,1])});
    it('se3',  function(){applyVector([9,3],  {se: 3}, [12,4])});
    it('s3',   function(){applyVector([9,3],  {s:  3}, [ 9,6])});
    it('sw3',  function(){applyVector([9,3],  {sw: 3}, [ 6,4])});
    it('nw3',  function(){applyVector([9,3],  {nw: 3}, [ 6,1])});
    it('ane3', function(){applyVector([10,3], {ne: 3}, [13,2])});
    it('ase3', function(){applyVector([10,3], {se: 3}, [13,5])});
    it('asw3', function(){applyVector([10,3], {sw: 3}, [ 7,5])});
    it('anw3', function(){applyVector([10,3], {nw: 3}, [ 7,2])});
  });

  function possibleThrustCoords(coord, vector, points, exp) {
    expect(GameBoard.possibleThrustCoords(coord, vector, points)
        .map(function(c){return c.slice(0,2)}).sort())
      .toEqual(exp.sort());
  }

  describe('possible thust to coords', function() {

    var start = [9,3];
    var vector = {se: 1};
    var expected_0 = [
      [10,3]
    ];
    var expected_1 = [
      [10,2], // { n: 1}
      [11,3], // {ne: 1}
      [11,4], // {se: 1}
      [10,4], // { s: 1}
      [ 9,4], // {sw: 1}
      [ 9,3]  // {nw: 1}
    ];
    var expected_2 = [
      [ 9,2],
      [10,1],
      [11,2],
      [12,2],
      [12,3],
      [12,4],
      [11,5],
      [10,5],
      [ 9,5],
      [ 8,4],
      [ 8,3],
      [ 8,2]
    ];

    it('thrust=0', function(){possibleThrustCoords(start, vector, 0,
        expected_0)});

    it('thrust=1', function(){possibleThrustCoords(start, vector, 1,
        [].concat(expected_0, expected_1) )});

    it('thrust=2', function(){possibleThrustCoords(start, vector, 2,
        [].concat(expected_0, expected_1, expected_2) )});

  });

});
