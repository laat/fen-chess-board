# fen-chess-board [![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/fen-chess-board.svg?style=flat
[npm-url]: https://npmjs.org/package/fen-chess-board

Module for keeping track of chess boards in [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation).

It tracks piece placement only. It does not validate moves, and it ignores
the active colour, castling rights, en passant square and move counters of a
full FEN string.

- Zero dependencies
- Native ES module with TypeScript types included
- Requires Node.js 22 or later (or any modern browser)

## Install

```sh
npm install fen-chess-board
```

## Usage

```javascript test
import FENBoard from "fen-chess-board";

const fenBoard = new FENBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

fenBoard.move("e2", "e4");
fenBoard.fen; //=> "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR"

fenBoard.board[0]; //=> ["r", "n", "b", "q", "k", "b", "n", "r"]
fenBoard.board[1]; //=> ["p", "p", "p", "p", "p", "p", "p", "p"]
fenBoard.board[2]; //=> ["" , "" , "" , "" , "" , "" , "" , "" ]
fenBoard.board[3]; //=> ["" , "" , "" , "" , "" , "" , "" , "" ]
fenBoard.board[4]; //=> ["" , "" , "" , "" , "P", "" , "" , "" ]
fenBoard.board[5]; //=> ["" , "" , "" , "" , "" , "" , "" , "" ]
fenBoard.board[6]; //=> ["P", "P", "P", "P", "" , "P", "P", "P"]
fenBoard.board[7]; //=> ["R", "N", "B", "Q", "K", "B", "N", "R"]
```

## API

### `new FENBoard(fen?)`

Creates a board. Pass a FEN string, `"start"` for the standard starting
position, or nothing for an empty board.

```javascript test
import FENBoard from "fen-chess-board";

new FENBoard("start").fen; //=> "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
new FENBoard().fen; //=> "8/8/8/8/8/8/8/8"
```

### `fenBoard.fen`

Gets or sets the position as a FEN string. Setting it replaces the whole
board. Only the piece placement field is read, so a full FEN string with
the extra fields works too, but they are not preserved.

```javascript test
import FENBoard from "fen-chess-board";

const scholarsMate = "r1bqk1nr/pppp1Qpp/2n5/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR";
const fenBoard = new FENBoard();

fenBoard.fen = scholarsMate;
fenBoard.fen === scholarsMate; //=> true

fenBoard.fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 1";
fenBoard.fen; //=> "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR"
```

Malformed piece placement throws:

```javascript test
import FENBoard from "fen-chess-board";

new FENBoard("8/8/8/8/8/8/8/8/8"); //=> Error: Invalid FEN: expected at most 8 ranks, got 9
new FENBoard("ppppppppp/8/8/8/8/8/8/8"); //=> Error: Invalid FEN: rank 8 has more than 8 squares
```

### `fenBoard.board`

The board as an 8x8 array of piece characters, with `""` for empty squares.
Row 0 is rank 8 and column 0 is the a-file, so `board[7][0]` is a1, the
same orientation as a printed diagram from white's side.

```javascript test
import FENBoard from "fen-chess-board";

const fenBoard = new FENBoard("start");

fenBoard.board[0][4]; //=> "k"
fenBoard.board[7][4]; //=> "K"
fenBoard.board[4]; //=> ["", "", "", "", "", "", "", ""]
```

### `fenBoard.piece(square)`

Returns the piece on a square, or `""` if it is empty. Squares use
lowercase algebraic notation, `"a1"` through `"h8"`.

```javascript test
import FENBoard from "fen-chess-board";

const fenBoard = new FENBoard("start");

fenBoard.piece("e1"); //=> "K"
fenBoard.piece("e4"); //=> ""
fenBoard.piece("z9"); //=> Error: Invalid square: "z9"
```

### `fenBoard.put(square, piece)`

Puts a piece on a square, replacing whatever was there. Use `""` to empty
the square. Any single character that is not FEN syntax is accepted, so
custom pieces work for chess variants.

```javascript test
import FENBoard from "fen-chess-board";

const fenBoard = new FENBoard();

fenBoard.put("a4", "Q");
fenBoard.fen; //=> "8/8/8/8/Q7/8/8/8"
fenBoard.board[4]; //=> ["Q", "", "", "", "", "", "", ""]

fenBoard.put("a4", "QQ"); //=> Error: Invalid piece: "QQ"
```

### `fenBoard.clear(square)`

Empties a square. Same as `put(square, "")`.

```javascript test
import FENBoard from "fen-chess-board";

const fenBoard = new FENBoard("start");

fenBoard.clear("a1");
fenBoard.fen; //=> "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/1NBQKBNR"
```

### `fenBoard.move(from, to)`

Moves the piece on `from` to `to`, capturing whatever was on `to`. No move
legality is checked. Throws if `from` is empty.

```javascript test
import FENBoard from "fen-chess-board";

const fenBoard = new FENBoard("start");

fenBoard.move("d2", "d4");
fenBoard.fen; //=> "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR"

fenBoard.move("d5", "d6"); //=> Error: Move Error: the from square was empty
```

## TypeScript

Type declarations ship with the package.

```typescript
import FENBoard from "fen-chess-board";

const board: FENBoard = new FENBoard("start");
const piece: string = board.piece("e1");
```

## Development

The code blocks in this readme are run as tests by
[readme-assert](https://github.com/laat/readme-assert), alongside the unit
tests in `src/`.

```sh
npm test
```

### Releasing

Bump `version` in `package.json`, push to `master`, then publish a GitHub
release with the tag `v<version>` (for example `v4.0.0`). The release
workflow runs the tests and stages the version on npm with provenance via
[trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm
token is needed. Approve the staged version with 2FA under **Staged
Packages** on npmjs.com, or with `npm stage approve <stage-id>`, to make it
live.

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
