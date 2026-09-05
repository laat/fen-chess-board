const FILES = 'abcdefgh';
const RANKS = '87654321'; // board row 0 is rank 8 (top of the board)

/**
 * Creates an empty 8x8 board where every square is the empty string.
 *
 * @return {string[][]}
 */
export function emptyBoard() {
  return Array.from({ length: 8 }, () => new Array(8).fill(''));
}

/**
 * Returns the `[file, rank]` indices for a square, usable to index the
 * board array as `board[rank][file]`.
 *
 * Row 0 is rank 8 (the top of the board as usually displayed), so
 * `getFileRank("a2")` returns `[0, 6]`.
 *
 * @param {string} square - Eg: "a2"
 * @return {[number, number]}
 * @throws {Error} if the square is not a valid algebraic square
 */
export function getFileRank(square) {
  const file = typeof square === 'string' && square.length === 2 ? FILES.indexOf(square[0]) : -1;
  const rank = file === -1 ? -1 : RANKS.indexOf(square[1]);
  if (rank === -1) {
    throw new Error(`Invalid square: ${JSON.stringify(square)}`);
  }
  return [file, rank];
}

/**
 * Validates the piece character used by `put()`.
 *
 * Any single character that cannot be confused with FEN syntax is
 * accepted, so non-standard pieces can be used for chess variants.
 *
 * @param {string} piece - Eg: "K", or "" for an empty square
 * @throws {Error} if the piece is not a single character or is FEN syntax
 */
export function assertPiece(piece) {
  if (typeof piece !== 'string' || piece.length > 1 || /[0-9/ ]/.test(piece)) {
    throw new Error(`Invalid piece: ${JSON.stringify(piece)}`);
  }
}
