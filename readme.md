# fen-chess-board [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url]
[travis-image]: https://img.shields.io/travis/laat/fen-chess-board.svg?style=flat
[travis-url]: https://travis-ci.org/laat/fen-chess-board
[npm-image]: https://img.shields.io/npm/v/fen-chess-board.svg?style=flat
[npm-url]: https://npmjs.org/package/fen-chess-board

> Module for keeping track of chess boards in [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation).

## Usage

```javascript
import FENBoard from 'fen-chess-board'

let fenBoard = new FENBoard('start');
fenBoard.board
/*=>
[ [ 'r', 'p', '', '', '', '', 'P', 'R' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'b', 'p', '', '', '', '', 'P', 'B' ],
  [ 'q', 'p', '', '', '', '', 'P', 'Q' ],
  [ 'k', 'p', '', '', '', '', 'P', 'K' ],
  [ 'b', 'p', '', '', '', '', 'P', 'B' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'r', 'p', '', '', '', '', 'P', 'R' ] ]
*/
```

### put()
Put the white queen on the a4 square
```javascript
fenBoard = new FENBoard()
fenBoard.put("a4", "Q")

fenBoard.board
/*=>
[ [ , , , , 'Q' ],
  [],
  [],
  [],
  [],
  [],
  [],
  [] ]
*/
```

set a4 square empty
```javascript
fenBoard = new FENBoard('start')
fenBoard.put("a1", "");

fenBoard.board
/*=>
[ [ 'r', 'p', '', '', '', '', 'P', '' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'b', 'p', '', '', '', '', 'P', 'B' ],
  [ 'q', 'p', '', '', '', '', 'P', 'Q' ],
  [ 'k', 'p', '', '', '', '', 'P', 'K' ],
  [ 'b', 'p', '', '', '', '', 'P', 'B' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'r', 'p', '', '', '', '', 'P', 'R' ] ]
*/
```

### move()
move a piece from a4 to a1
```javascript
fenBoard = new FENBoard('start')
fenBoard.move("d2", "d4")

fenBoard.board
/*=>
[ [ 'r', 'p', '', '', '', '', 'P', 'R' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'b', 'p', '', '', '', '', 'P', 'B' ],
  [ 'q', 'p', '', '', 'P', '', '', 'Q' ],
  [ 'k', 'p', '', '', '', '', 'P', 'K' ],
  [ 'b', 'p', '', '', '', '', 'P', 'B' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'r', 'p', '', '', '', '', 'P', 'R' ] ]
*/
```

### setting board position
```javascript
const scolarsMate = 'r1bqk1nr/pppp1Qpp/2n5/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR'
fenBoard = new FENBoard();
fenBoard.fen = scolarsMate

fenBoard.board
/*=>
[ [ 'r', 'p', '', '', '', '', 'P', 'R' ],
  [ '', 'p', '', '', '', '', 'P', 'N' ],
  [ 'b', 'p', 'n', 'b', 'B', '', 'P', 'B' ],
  [ 'q', 'p', '', '', '', '', 'P', '' ],
  [ 'k', '', '', 'p', 'P', '', '', 'K' ],
  [ '', 'Q', '', '', '', '', 'P', '' ],
  [ 'n', 'p', '', '', '', '', 'P', 'N' ],
  [ 'r', 'p', '', '', '', '', 'P', 'R' ] ]
*/
```

### getting board position
```javascript
fenBoard = new FENBoard();
fenBoard.fen = scolarsMate
scolarsMate === fenBoard.fen
//=> true
```

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
