"use client";

import { useState, useEffect, useRef } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const SPEED = 100;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
} as const;

type Position = { x: number; y: number };
type DirectionKey = keyof typeof DIRECTIONS;

const getRandomPosition = (snake: Position[]): Position => {
  let newPos: Position;
  do {
    newPos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some((segment) => segment.x === newPos.x && segment.y === newPos.y)
  );
  return newPos;
};

type SnakeProps = {
  onGameOver?: () => void;
};

const Snake = ({ onGameOver }: SnakeProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>(getRandomPosition(snake));
  const [direction, setDirection] = useState<Position>(DIRECTIONS.ArrowRight);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const directionRef = useRef(direction);
  const gameLoopRef = useRef<number | undefined>(undefined); // ✅ Change from `null` to `undefined`

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newDirection = DIRECTIONS[event.key as DirectionKey];
      if (!newDirection) return;

      if (
        directionRef.current.x + newDirection.x === 0 &&
        directionRef.current.y + newDirection.y === 0
      ) {
        return;
      }

      directionRef.current = newDirection;
      setDirection(newDirection);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      onGameOver?.(); // Call onGameOver callback when game ends
      return;
    }

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead: Position = {
          x: prevSnake[0].x + directionRef.current.x,
          y: prevSnake[0].y + directionRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomPosition(newSnake));
          setScore((prevScore) => prevScore + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });

      gameLoopRef.current = window.setTimeout(moveSnake, SPEED);
    };

    gameLoopRef.current = window.setTimeout(moveSnake, SPEED);

    return () => {
      if (gameLoopRef.current !== undefined) {
        clearTimeout(gameLoopRef.current); // ✅ Ensure it's a valid number
      }
    };
  }, [isGameOver, food]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold">Score: {score}</h2>
      <div
        className="border-2 border-black mt-4"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          position: "relative",
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="bg-green-500 absolute"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              top: segment.y * CELL_SIZE,
              left: segment.x * CELL_SIZE,
            }}
          />
        ))}
        <div
          className="bg-red-500 absolute"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            top: food.y * CELL_SIZE,
            left: food.x * CELL_SIZE,
          }}
        />
      </div>
    </div>
  );
};

export default Snake;
