# fen-chess-board [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/fen-chess-board.svg?style=flat
[travis-url]: https://travis-ci.org/laat/fen-chess-board
[npm-image]: https://img.shields.io/npm/v/fen-chess-board.svg?style=flat
[npm-url]: https://npmjs.org/package/fen-chess-board

> Module for keeping track of chess boards in [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation).

## Usage

```javascript test
import FENBoard from "fen-chess-board";

let fenBoard = new FENBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
fenBoard.board;
/*=>
[ [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
  [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
  [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ] ]
*/
```

### put()

Put the white queen on the a4 square

```javascript test
fenBoard = new FENBoard();
fenBoard.put("a4", "Q");

fenBoard.board;
/*=>
[ [],
  [],
  [],
  [],
  ['Q'],
  [],
  [],
  [] ]
*/
```

set a4 square empty

```javascript test
fenBoard = new FENBoard("start");
fenBoard.put("a1", "");

fenBoard.board;
/*=>
[ [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
  [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
  [ '' , 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ] ]
*/
```

### move()

move a piece from a4 to a1

```javascript test
fenBoard = new FENBoard("start");
fenBoard.move("d2", "d4");

fenBoard.board;
/*=>
[ [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
  [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , 'P', '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ 'P', 'P', 'P', '', 'P' , 'P', 'P', 'P' ],
  [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ] ]
*/
```

### setting board position

```javascript test
const scolarsMate = "r1bqk1nr/pppp1Qpp/2n5/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR";
fenBoard = new FENBoard();
fenBoard.fen = scolarsMate;

fenBoard.board;
/*=>
[ [ 'r',  '', 'b', 'q', 'k', '' , 'n', 'r' ],
  [ 'p', 'p', 'p', 'p', '' , 'Q', 'p', 'p' ],
  [ '' , '' , 'n', '' , '' , '' , '' , ''  ],
  [ '' , '' , 'b', '' , 'p', '' , '' , ''  ],
  [ '' , '' , 'B', '' , 'P', '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ 'P', 'P', 'P', 'P', '' , 'P', 'P', 'P' ],
  [ 'R', 'N', 'B', '' , 'K', '', 'N', 'R' ] ]
*/
```

### simple start position

```javascript test
fenBoard = new FENBoard("start");
fenBoard.board;
/*=>
[ [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
  [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ '' , '' , '' , '' , '' , '' , '' , ''  ],
  [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
  [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ] ]
*/
```

### getting board position

```javascript test
fenBoard = new FENBoard();
fenBoard.fen = scolarsMate;
scolarsMate === fenBoard.fen;
//=> true
```

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
