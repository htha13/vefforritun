/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;
var correct;
var playing;


/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 * 
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');
  play();
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplýsingar um niðurstöður.  *
 */
function play() {
  correct = 0;
  playing = true;
  let byrjun = new Date();
  for (let i =0; i<GAMES_TO_PLAY; i++) {
    if (!playing) {
      break;
    }
    ask();

  }
  if (playing) { 
    let timi = (new Date()-byrjun)/1000;
    alert('Þú svaraðir ' + correct + ' af ' + GAMES_TO_PLAY + ' rétt á '
    + timi.toFixed(2) + ' sekúndum. \n Meðalrétt svör eru ' + (correct/timi).toFixed(2));
  }
  if (confirm('Spila annann leik?')) {
    play();
  }
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
    let spurning = createProblem();
    let input = prompt('Hvað er ' + spurning.a + spurning.symbol + spurning.b);
    if (input==null) {
      alert('Hætt í leik.');
      playing = false;
      return;
    }
    else if (spurning.svar==parseInt(input,10)) {
      correct++;
    }
}

function createProblem() {
  let a = randomNumber(1,100);
  let b = randomNumber(1,100);
  let c = randomNumber(1,10);
  let d = randomNumber(1,10);
  let e = randomNumber(2,10);
  let f = e*randomNumber(2,10);
  switch (randomNumber(0,3)) {
    case 0:
      return {a : a, b: b, svar: a+b, symbol: ' + ' };
    case 1:
      return {a : a, b: b, svar: a-b, symbol: ' - ' };  
    case 2:
      return {a : c, b: d, svar: c*d, symbol: ' * ' };
    case 3:
      return {a : f, b: e, svar: f/e, symbol: ' / ' };
  }
}
/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
