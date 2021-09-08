// const { width: canvasWidth, height: canvasHeight } =
//   document.body.getBoundingClientRect();

const { Engine, Render, Runner, Bodies, Body, World, Events } = Matter;

class Maze {
  #config;
  render;
  constructor(config) {
    this.#config = config;
    this.canvas = {
      width: this.#config.canvasWidth,
      height: this.#config.canvasHeight,
      bounds: {},
    };
    this.maze = {
      cells: [],
      cell: {
        width: this.canvas.width / this.#config.cols,
        height: this.canvas.height / this.#config.rows,
      },
      horizontals: [],
      verticals: [],
    };
    this.goal = null;
    this.player = null;

    this._initMatter();
    this.#initMaze();
  }

  _initMatter() {
    // create a renderer
    const engine = Engine.create();
    engine.world.gravity.y = 0;
    this.world = engine.world;

    this.render = Render.create({
      element: document.body.querySelector('#maze'),
      engine: engine,
      options: {
        width: this.canvas.width,
        height: this.canvas.height,
        wireframes: false,
        // showAngleIndicator: true,
        // showCollisions: true,
      },
    });

    Render.run(this.render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
  }

  // Maze Generation
  #initMaze() {
    this.#renderCanvasBorders();
    this.#createCells();
    this.#createStatingPoint();
    this.#createMazeInnerWalls();
    this.#createGoal();
    this.#createPlayer();
    this.#detectCollision();
  }

  //bounds
  #renderCanvasBorders() {
    const { width: canvasWidth, height: canvasHeight, bounds } = this.canvas;

    bounds['top'] = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 2, {
      isStatic: true,
    });
    bounds['bottom'] = Bodies.rectangle(
      canvasWidth / 2,
      canvasHeight,
      canvasWidth,
      2,
      {
        isStatic: true,
      }
    );
    bounds['left'] = Bodies.rectangle(0, canvasHeight / 2, 2, canvasHeight, {
      isStatic: true,
    });

    bounds['right'] = Bodies.rectangle(
      canvasWidth,
      canvasHeight / 2,
      2,
      canvasHeight,
      {
        isStatic: true,
      }
    );

    // add all of the bodies to the world
    World.add(this.world, [
      bounds['top'],
      bounds['bottom'],
      bounds['left'],
      bounds['right'],
    ]);
  }

  #createCells() {
    const { rows, cols } = this.#config;
    this.maze.cells = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false));

    this.maze.verticals = Array(rows)
      .fill(null)
      .map(() => Array(cols - 1).fill(false));

    this.maze.horizontals = Array(rows - 1)
      .fill(null)
      .map(() => Array(cols).fill(false));
  }

  #createStatingPoint() {
    const startRow = Math.floor(Math.random() * this.maze.cells.length);
    const startCol = Math.floor(Math.random() * this.maze.cells[0].length);

    this.#checkNeighbors(startRow, startCol);
  }

  #createMazeInnerWalls() {
    this.maze.horizontals.forEach((row, rowIdx) =>
      row.forEach((open, colIdx) => {
        if (!open) {
          World.add(
            this.world,
            Bodies.rectangle(
              colIdx * this.maze.cell.width + this.maze.cell.width / 2,
              rowIdx * this.maze.cell.height + this.maze.cell.height,
              this.maze.cell.width,
              2,
              { isStatic: true, label: 'wall', render: { fillStyle: 'white' } }
            )
          );
        }
      })
    );
    this.maze.verticals.forEach((row, rowIdx) =>
      row.forEach((open, colIdx) => {
        if (!open) {
          World.add(
            this.world,
            Bodies.rectangle(
              colIdx * this.maze.cell.width + this.maze.cell.width,
              rowIdx * this.maze.cell.height + this.maze.cell.height / 2,
              2,
              this.maze.cell.height,
              { isStatic: true, label: 'wall', render: { fillStyle: 'white' } }
            )
          );
        }
      })
    );
  }
  // Recursive
  #checkNeighbors(row = 0, col = 0) {
    // if i visited the cell at [row, col], then return
    if (this.maze.cells[row][col]) return;
    // Mark this cell as visited = true
    this.maze.cells[row][col] = true;

    // Assemble random-order list of neighbors
    const neighbors = this.#shuffle([
      [row - 1, col, 'up'],
      [row, col + 1, 'right'],
      [row + 1, col, 'down'],
      [row, col - 1, 'left'],
    ]);
    // For each Neighbor...
    for (let [nextRow, nextCol, direction] of neighbors) {
      // See if Neighbor is out of bounds/wall
      if (
        nextRow < 0 ||
        nextRow >= this.maze.cells.length ||
        nextCol < 0 ||
        nextCol >= this.maze.cells[nextRow].length
      ) {
        continue;
      }

      // if we visited that Neighbor, continue to next Neighbor
      if (this.maze.cells[nextRow][nextCol]) continue;

      // remove wall from horizontals or verticals
      switch (direction) {
        //Horz
        case 'up':
          this.maze.horizontals[row - 1][col] = true;
          break;
        case 'down':
          this.maze.horizontals[row][col] = true;
          break;
        case 'left':
          this.maze.verticals[row][col - 1] = true;
          break;
        case 'right':
          this.maze.verticals[row][col] = true;
          break;
        // verticals
        default:
          return;
      }
      // Visit next Neighbor = Recuration

      this.#checkNeighbors(nextRow, nextCol);
    }
  }

  #shuffle(arr) {
    let counter = arr.length;

    while (counter > 0) {
      const rndIdx = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[rndIdx];
      arr[rndIdx] = temp;
    }
    return arr;
  }

  #createGoal() {
    this.goal = Bodies.rectangle(
      this.canvas.width - this.maze.cell.width / 2,
      this.canvas.height - this.maze.cell.height / 2,
      this.maze.cell.width * 0.7,
      this.maze.cell.height * 0.7,
      {
        isStatic: true,
        label: 'goal',
        render: { fillStyle: 'red' },
      }
    );
    World.add(this.world, this.goal);
  }
  #createPlayer() {
    this.player = Bodies.circle(
      this.maze.cell.width / 2,
      this.maze.cell.height / 2,
      this.maze.cell.width * 0.2,
      {
        // isStatic: true,
        label: 'player',
        render: { fillStyle: 'blue' },
      }
    );
    World.add(this.world, this.player);

    document.addEventListener('keydown', this.handleKeyEvents.bind(this));
  }

  handleKeyEvents(e) {
    const { keyCode } = e;

    let { x, y } = this.player.velocity;
    switch (keyCode) {
      //up
      case 38:
        Body.setVelocity(this.player, { x, y: y - 5 });
        break;
      //down
      case 40:
        Body.setVelocity(this.player, { x, y: y + 5 });
        break;
      //left
      case 37:
        Body.setVelocity(this.player, { x: x - 5, y });
        break;
      //right
      case 39:
        Body.setVelocity(this.player, { x: x + 5, y });
        break;
      default:
        return;
    }
  }
  #detectCollision() {
    Events.on(this.render.engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      const labels = ['player', 'goal'];
      pairs.forEach((collision) => {
        if (
          labels.includes(collision.bodyA.label) &&
          labels.includes(collision.bodyB.label)
        ) {
          world.gravity.y = 1;
          world.bodies.forEach((body) => {
            if (body.label === 'wall') {
              Body.setStatic(body, false);
            }
          });
          document.querySelector('.winner').classList.remove('hidden');
        }
      });
    });
  }
}

const { width: canvasWidth, height: canvasHeight } = document
  .querySelector('#maze')
  .getBoundingClientRect();

const maze = new Maze({
  canvasWidth,
  canvasHeight,
  rows: 20,
  cols: 30,
});
