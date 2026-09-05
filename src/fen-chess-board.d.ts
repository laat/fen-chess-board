/**
 * A chess board that reads and writes positions in
 * Forsyth–Edwards Notation (FEN).
 *
 * Only the piece placement is tracked. Active colour, castling rights,
 * en passant square and move counters are ignored when parsing and are
 * not included when serialising.
 */
export default class FENBoard {
  /**
   * The board as an 8x8 array of piece characters, `""` for empty squares.
   * Row 0 is rank 8 and column 0 is the a-file, so `board[7][0]` is a1.
   */
  board: string[][];

  /**
   * Creates a new FENBoard.
   * @param fen - A FEN position string, or "start" for the starting position.
   *              Omit for an empty board.
   * @throws If the FEN string is malformed.
   */
  constructor(fen?: string);

  /**
   * Gets the piece at a square.
   * @param square - The square in algebraic notation, e.g. "a2".
   * @returns The piece character (e.g. "K", "p"), or empty string if empty.
   * @throws If the square is not a valid square ("a1" through "h8").
   */
  piece(square: string): string;

  /**
   * Places a piece on the given square.
   * @param square - The square in algebraic notation, e.g. "a2".
   * @param piece - The piece character, e.g. "K". Use "" to clear.
   * @throws If the square is invalid, or the piece is not a single character.
   */
  put(square: string, piece: string): void;

  /**
   * Removes the piece at the given square.
   * @param square - The square in algebraic notation, e.g. "a2".
   * @throws If the square is not a valid square ("a1" through "h8").
   */
  clear(square: string): void;

  /**
   * Moves a piece from one square to another, capturing whatever was on
   * the destination square.
   * @param from - The source square, e.g. "a2".
   * @param to - The destination square, e.g. "a4".
   * @throws If the source square is empty, or either square is invalid.
   */
  move(from: string, to: string): void;

  /**
   * Get or set the current position as a FEN string.
   *
   * Setting resets the board to the given position. Accepts "start" as
   * shorthand for the starting position and an empty value for an empty
   * board. Only the piece placement field is read; anything after the
   * first space is ignored.
   *
   * @throws If the FEN string is malformed. The board is left unchanged.
   */
  get fen(): string;
  set fen(fen: string | undefined);
}
