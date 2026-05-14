/* ============================================================
   Calculator JS
   ============================================================ */
(function () {
  let display = '0';
  let expression = '';
  let memory = '';
  let waitingForOperand = false;
  let pendingOp = null;
  let pendingVal = null;

  const mainEl = document.getElementById('calc-main');
  const exprEl = document.getElementById('calc-expr');
  const memEl = document.getElementById('calc-memory');
  const body = document.getElementById('calc-body');

  function update() {
    mainEl.textContent = display.length > 12
      ? parseFloat(display).toExponential(5)
      : display;
    exprEl.textContent = expression;
  }

  function inputDigit(d) {
    if (waitingForOperand) {
      display = d;
      waitingForOperand = false;
    } else {
      display = display === '0' ? d : display + d;
    }
    if (display.length > 15) display = display.slice(0, 15);
    update();
  }

  function inputDecimal() {
    if (waitingForOperand) {
      display = '0.';
      waitingForOperand = false;
    } else if (!display.includes('.')) {
      display += '.';
    }
    update();
  }

  function clearAll() {
    display = '0';
    expression = '';
    pendingOp = null;
    pendingVal = null;
    waitingForOperand = false;
    update();
  }

  function toggleSign() {
    if (display !== '0') {
      display = display.startsWith('-')
        ? display.slice(1)
        : '-' + display;
    }
    update();
  }

  function percentage() {
    const v = parseFloat(display) / 100;
    display = String(v);
    update();
  }

  function doOp(nextOp) {
    const val = parseFloat(display);
    if (pendingOp && !waitingForOperand) {
      const res = compute(pendingVal, val, pendingOp);
      display = String(res);
      expression = `${pendingVal} ${opSym(pendingOp)} ${val} =`;
      pendingVal = res;
    } else {
      expression = `${display} ${opSym(nextOp)}`;
      pendingVal = val;
    }
    pendingOp = nextOp;
    waitingForOperand = true;
    update();
  }

  function compute(a, b, op) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? 'Error' : a / b;
    }
    return b;
  }

  function opSym(op) {
    return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
  }

  function equals() {
    if (!pendingOp) return;
    const val = parseFloat(display);
    const res = compute(pendingVal, val, pendingOp);
    expression = `${pendingVal} ${opSym(pendingOp)} ${val} =`;
    display = String(res);
    pendingOp = null;
    pendingVal = null;
    waitingForOperand = true;
    update();
  }

  function handleKey(e) {
    const k = e.key;
    if (k >= '0' && k <= '9') inputDigit(k);
    else if (k === '.') inputDecimal();
    else if (k === '+') doOp('+');
    else if (k === '-') doOp('-');
    else if (k === '*') doOp('*');
    else if (k === '/') doOp('/');
    else if (k === 'Enter' || k === '=') equals();
    else if (k === 'Escape' || k === 'Delete') clearAll();
    else if (k === '%') percentage();
    else if (k === 'Backspace') {
      if (!waitingForOperand && display.length > 1) {
        display = display.slice(0, -1);
      } else {
        display = '0';
      }
      update();
    }
  }

  body.addEventListener('click', e => {
    const btn = e.target.closest('.calc-btn');
    if (!btn) return;
    const v = btn.dataset.val;
    if (!v) return;

    if (v === 'AC') clearAll();
    else if (v === '±') toggleSign();
    else if (v === '%') percentage();
    else if (v === '=') equals();
    else if (['+', '-', '*', '/'].includes(v)) doOp(v);
    else if (v === '.') inputDecimal();
    else inputDigit(v);
  });

  document.addEventListener('keydown', handleKey);
})();