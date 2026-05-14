/* ============================================================
   Snake Game JS
   ============================================================ */
(function () {
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('snake-score');
  const highEl = document.getElementById('snake-high');
  const finalEl = document.getElementById('snake-final');
  const startBtn = document.getElementById('snake-start');
  const pauseBtn = document.getElementById('snake-pause');
  const gameoverEl = document.getElementById('snake-gameover');

  const CELL = 20;
  const COLS = Math.floor(canvas.width / CELL);
  const ROWS = Math.floor(canvas.height / CELL);

  let snake, dir, nextDir, food, score, highScore, loop, paused, running;
  highScore = parseInt(localStorage.getItem('snake-high') || '0');
  highEl.textContent = highScore;

  function reset() {
    snake = [{ x: 10, y: 10 }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = 0;
    paused = false;
    running = true;
    gameoverEl.classList.remove('visible');
    placeFood();
    if (loop) clearInterval(loop);
    loop = setInterval(tick, 120);
  }

  function placeFood() {
    let valid = false;
    while (!valid) {
      food = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
      valid = !snake.some(s => s.x === food.x && s.y === food.y);
    }
  }

  function tick() {
    if (!running || paused) return;
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      return gameOver();
    }
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      return gameOver();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreEl.textContent = score;
      placeFood();
      if (loop) {
        clearInterval(loop);
        loop = setInterval(tick, Math.max(60, 120 - Math.floor(score / 50) * 5));
      }
    } else {
      snake.pop();
    }
    draw();
  }

  function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid dots
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.fillRect(x * CELL + 1, y * CELL + 1, 2, 2);
      }
    }

    // Snake
    snake.forEach((seg, i) => {
      const alpha = 1 - i * 0.015;
      ctx.fillStyle = i === 0
        ? '#667eea'
        : `rgba(102, 126, 234, ${Math.max(0.4, alpha)})`;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 4);
      ctx.fill();

      if (i === 0) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(seg.x * CELL + 5, seg.y * CELL + 5, 4, 4);
        ctx.fillRect(seg.x * CELL + 12, seg.y * CELL + 5, 4, 4);
      }
    });

    // Food
    ctx.fillStyle = '#f64f59';
    ctx.shadowColor = '#f64f59';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function gameOver() {
    running = false;
    clearInterval(loop);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('snake-high', highScore);
      highEl.textContent = highScore;
    }
    finalEl.textContent = score;
    gameoverEl.classList.add('visible');
  }

  function setDir(x, y) {
    if (!running || paused) return;
    if (dir.x === -x && dir.y === -y) return;
    nextDir = { x, y };
  }

  startBtn.addEventListener('click', reset);
  pauseBtn.addEventListener('click', () => {
    if (!running) return;
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
  });

  document.addEventListener('keydown', e => {
    const k = e.key;
    if (k === 'ArrowUp' || k === 'w' || k === 'W') { e.preventDefault(); setDir(0, -1); }
    if (k === 'ArrowDown' || k === 's' || k === 'S') { e.preventDefault(); setDir(0, 1); }
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') { e.preventDefault(); setDir(-1, 0); }
    if (k === 'ArrowRight' || k === 'd' || k === 'D') { e.preventDefault(); setDir(1, 0); }
    if (k === ' ') { e.preventDefault(); reset(); }
  });

  document.querySelectorAll('.snake-dpad-btn[data-dir]').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = btn.dataset.dir;
      if (d === 'up') setDir(0, -1);
      if (d === 'down') setDir(0, 1);
      if (d === 'left') setDir(-1, 0);
      if (d === 'right') setDir(1, 0);
    });
  });

  // Init canvas with food placed (static preview)
  reset();
  clearInterval(loop);
  running = false;
  paused = false;
  draw();
})();