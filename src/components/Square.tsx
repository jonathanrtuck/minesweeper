import { Dispatch, FunctionComponent } from "react";
import clsx from "clsx";

import localFont from "next/font/local";

import { Action, Coordinates, State } from "@/types";

import styles from "@/styles/Square.module.css";

const NumberFont = localFont({
  src: "../fonts/MineSweeper.otf",
});

export const Square: FunctionComponent<{
  columnIndex: number;
  dispatch: Dispatch<Action>;
  rowIndex: number;
  state: State;
}> = ({ columnIndex, dispatch, rowIndex, state }) => {
  const { isLost, isWon } = state;
  const { hasFlag, hasMine, isRevealed, numAdjacentMines } =
    state.squares[rowIndex][columnIndex];
  const coordinates: Coordinates = [rowIndex, columnIndex];
  const isGameOver = isLost || isWon;

  if (isLost && hasMine && !hasFlag) {
    return (
      <span
        className={clsx(styles.square, styles.mine, {
          [styles.revealed]: isRevealed,
        })}>
        💣
      </span>
    );
  }

  if (!isRevealed) {
    return (
      <button
        aria-disabled={isGameOver}
        className={clsx(styles.square, styles.button, {
          [styles.flag]: hasFlag,
          [styles.gameOver]: isGameOver,
          [styles.mine]: hasMine,
        })}
        onClick={
          isGameOver || hasFlag
            ? undefined
            : () => {
                dispatch({
                  coordinates,
                  type: "reveal",
                });
              }
        }
        onContextMenu={
          isGameOver
            ? undefined
            : () => {
                dispatch({
                  coordinates,
                  type: "flag",
                });
              }
        }
        type="button">
        {hasFlag && (isLost && !hasMine ? "💣" : "🚩")}
        {isWon && hasMine && "🚩"}
      </button>
    );
  }

  return (
    <data
      className={clsx(
        NumberFont.className,
        styles.square,
        styles.number,
        styles[`number-${numAdjacentMines}`]
      )}
      value={numAdjacentMines}>
      {numAdjacentMines !== 0 && numAdjacentMines}
    </data>
  );
};
