import { assertPiece, emptyBoard, getFileRank } from './chess-utils.js';

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

export default class FENBoard {
  /**
   * The board as an 8x8 array of piece characters, `''` for empty squares.
   * Row 0 is rank 8 and column 0 is the a-file, so `board[7][0]` is a1.
   *
   * @type {string[][]}
   */
  board = emptyBoard();

  /**
   * @param {string} [fen] - a FEN position, or "start" for the starting
   *   position. Omit for an empty board.
   */
  constructor(fen) {
    this.fen = fen;
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */
  piece(square) {
    const [file, rank] = getFileRank(square);
    return this.board[rank][file];
  }

  /**
   * Places a piece in the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   * @param {string} piece - the ascii representation of a piece. Eg: "K"
   */
  put(square, piece) {
    const [file, rank] = getFileRank(square);
    assertPiece(piece);
    this.board[rank][file] = piece;
  }

  /**
   * Removes the piece at the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   */
  clear(square) {
    this.put(square, '');
  }

  /**
   * Moves a piece.
   *
   * @param {string} from - The square to move from. Eg: "a2"
   * @param {string} to - The square to move to. Eg: "a3"
   */
  move(from, to) {
    const piece = this.piece(from);
    if (!piece) {
      throw new Error('Move Error: the from square was empty');
    }
    this.put(to, piece);
    if (from !== to) {
      this.clear(from);
    }
  }

  /**
   * Set the current position.
   *
   * Only the piece placement field is used; anything after the first
   * space (active color, castling, ...) is ignored.
   *
   * @param {string} fen - a position string as FEN
   * @throws {Error} if the piece placement is malformed; the board is
   *   left unchanged in that case
   */
  set fen(fen) {
    const board = emptyBoard();

    if (fen === 'start') fen = START_FEN;
    if (fen) {
      const placement = String(fen).split(' ', 1)[0];
      const ranks = placement.split('/');
      if (ranks.length > 8) {
        throw new Error(`Invalid FEN: expected at most 8 ranks, got ${ranks.length}`);
      }

      ranks.forEach((rankString, rank) => {
        let file = 0;
        for (const char of rankString) {
          if (char >= '1' && char <= '8') {
            file += Number(char);
          } else if (char === '0' || char === '9') {
            throw new Error(`Invalid FEN: unexpected "${char}" in rank ${8 - rank}`);
          } else {
            if (file < 8) board[rank][file] = char;
            file++;
          }
        }
        if (file > 8) {
          throw new Error(`Invalid FEN: rank ${8 - rank} has more than 8 squares`);
        }
      });
    }

    // Copy into the existing rows so `board` keeps its identity.
    this.board.forEach((row, rank) => row.splice(0, 8, ...board[rank]));
  }

  /**
   * Get the current position as FEN.
   *
   * @return {string}
   */
  get fen() {
    return this.board
      .map((row) => {
        let out = '';
        let empty = 0;
        for (const piece of row) {
          if (piece) {
            if (empty) out += empty;
            empty = 0;
            out += piece;
          } else {
            empty++;
          }
        }
        return empty ? out + empty : out;
      })
      .join('/');
  }
}
