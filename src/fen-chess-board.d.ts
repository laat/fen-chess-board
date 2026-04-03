export default class FENBoard {
  /** The internal 8x8 board array. Rows are ranks 8-1 (top to bottom). */
  board: string[][];

  /**
   * Creates a new FENBoard.
   * @param fen - A FEN position string, or "start" for the starting position.
   *              Omit for an empty board.
   */
  constructor(fen?: string);

  /**
   * Gets the piece at a square.
   * @param square - The square in algebraic notation, e.g. "a2".
   * @returns The piece character (e.g. "K", "p"), or empty string if empty.
   */
  piece(square: string): string;

  /**
   * Places a piece on the given square.
   * @param square - The square in algebraic notation, e.g. "a2".
   * @param piece - The piece character, e.g. "K". Use "" to clear.
   */
  put(square: string, piece: string): void;

  /**
   * Removes the piece at the given square.
   * @param square - The square in algebraic notation, e.g. "a2".
   */
  clear(square: string): void;

  /**
   * Moves a piece from one square to another.
   * @param from - The source square, e.g. "a2".
   * @param to - The destination square, e.g. "a4".
   * @throws If the source square is empty.
   */
  move(from: string, to: string): void;

  /**
   * Get or set the current position as a FEN string.
   * Setting resets the board to the given position.
   * Accepts "start" as shorthand for the starting position.
   */
  get fen(): string;
  set fen(fen: string);
}
