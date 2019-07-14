import HttpStatus from "http-status-codes";
import * as errors from "../errors";

abstract class GameStateError extends errors.MassiveDecksError<errors.Details> {
  public readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR;

  protected constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, GameStateError);
  }
}

// Can happen with calls with large numbers of slots or if the user selects
// decks with very few cards.
export class OutOfCardsError extends GameStateError {
  public constructor() {
    super("Ran out of cards in the game.");
    Error.captureStackTrace(this, OutOfCardsError);
  }

  public details = (): errors.Details => ({
    error: "OutOfCards"
  });
}