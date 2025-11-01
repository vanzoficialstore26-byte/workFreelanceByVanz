// Simple slot logic
const symbols = ['🍒','🍋','🔔','⭐️','💎','7️⃣']; // 6 simbol
const balanceEl = document.getElementById('balance');
const betInput = document.getElementById('betInput');
const spinBtn = document.getElementById('spinBtn');
const autoBtn = document.getElementById('autoBtn');
const messageEl = document.getElementById('message');
const maxBetBtn = document.getElementById('maxBet');

const reels = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

let balance = 1000;
let autoLeft = 10;
let spinning = false;

function updateUI(){
  balanceEl.textContent = balance;
  autoBtn.textContent = AUTO (${autoLeft});
}

function randomSymbol(){
  return symbols[Math.floor(Math.random()*symbols.length)];
}

// Simple payout rules:
// - if 3 same: multiplier depends on symbol: special ones get higher
// - if 2 same: x2
function evaluateResult(syms, bet){
  const [a,b,c] = syms;
  if(a===b && b===c){
    // three of a kind
    // special multipliers
    if(a === '7️⃣') return {mult:20, text:'Jackpot 7! (x20)'};
    if(a === '💎') return {mult:15, text:'Triple Diamond! (x15)'};
    if(a === '⭐️') return {mult:12, text:'Triple Star! (x12)'};
    if(a === '🔔') return {mult:10, text:'Triple Bell! (x10)'};
    return {mult:10, text:'Triple match! (x10)'};
  } else if (a===b  a===c  b===c){
    return {mult:2, text:'Two of a kind (x2)'};
  }
  return {mult:0, text:'Tidak menang'};
}

function setReelSymbol(reelEl, symbol){
  reelEl.innerHTML = <div class="symbol">${symbol}</div>;
}

// animate spin: we will rapidly change symbols for duration
function spinOnce(bet){
  if(spinning) return;
  bet = Math.max(1, Math.floor(bet));
  if(bet > balance){
    messageEl.textContent = 'Saldo tidak cukup.';
    return;
  }
  spinning = true;
  spinBtn.disabled = true;
  betInput.disabled = true;
  maxBetBtn.disabled = true;

  balance -= bet;
  updateUI();
  messageEl.textContent = 'Memutar...';

  // durations (ms) for each reel stop
  const durations = [900, 1400, 2000];
  const results = [];

  // for each reel, rapidly cycle symbols
  reels.forEach((reel, idx) => {
    reel.classList.add('spin');
    let ticks = Math.floor(durations[idx]/80);
    let i = 0;
    const t = setInterval(()=> {
      // show random symbol
      setReelSymbol(reel, randomSymbol());
      i++;
      if(i >= ticks){
        clearInterval(t);
        // final symbol
        const final = randomSymbol();
        results[idx] = final;
        setReelSymbol(reel, final);
        reel.classList.remove('spin');
        // when all finished evaluate
        if(results.filter(Boolean).length === reels.length){
          onSpinEnd(results, bet);
        }
      }
    }, 80 + Math.random()*30);
  });

}

function onSpinEnd(resultSymbols, bet){
  const evalRes = evaluateResult(resultSymbols, bet);
  if(evalRes.mult > 0){
    const payout = bet * evalRes.mult;
    balance += payout;
    messageEl.textContent = ${evalRes.text} — Kamu menang Rp ${payout}. (Taruhan Rp ${bet});
  } else {
    messageEl.textContent = Maaf, tidak menang. (Taruhan Rp ${bet});
  }
  updateUI();
  spinning = false;
  spinBtn.disabled = false;
  betInput.disabled = false;
  maxBetBtn.disabled = false;
  // for auto spins:
  if(autoLeft > 0){
    autoLeft--;
    autoBtn.textContent = AUTO (${autoLeft});
    if(autoLeft>0){
      // small delay between auto spins
      setTimeout(()=> {
        const b = parseInt(betInput.value,10) || 1;
        if(balance >= b) spinOnce(b);
        else {
          messageEl.textContent = 'Saldo tidak cukup untuk taruhan auto. Auto dihentikan.';
        }
      }, 600);
    } else {
      messageEl.textContent += ' | Auto selesai.';
    }
  }
}

spinBtn.addEventListener('click', ()=> {
  const bet = parseInt(betInput.value,10) || 1;
  spinOnce(bet);
});

maxBetBtn.addEventListener('click', ()=>{
  betInput.value = Math.max(1, Math.floor(balance));
});

autoBtn.addEventListener('click', ()=>{
  if(spinning){
    messageEl.textContent = 'Sedang berputar — tunggu selesai.';
    return;
  }