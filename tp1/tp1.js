let darkmap;
let youDied;

let correr = [];
let caminar = [];
let caer = [];

let estado = "correr";

let x = -70;
let y = 0;

let frameActual = 0;
let ultimoCambio = 0;

let velocidadMovimiento = 6;
let velocidadInicial = 6;
let escala = 2;

let inicioCaminar = 280;
let puntoCaida = 480;

let mostrarYouDied = false;
let opacidadMuerte = 0;


function preload() {

  darkmap = loadImage('data/darkmap.png');

  youDied = loadImage('data/youdied.png');

  for (let i = 0; i <= 20; i++) {

    let imagen = loadImage('data/' + i + '.png');

    if (i <= 6) {

      correr.push(imagen);
    } else if (i <= 14) {

      caminar.push(imagen);
    } else {

      caer.push(imagen);
    }
  }
}


function setup() {

  createCanvas(800, 600);

  imageMode(CENTER);

  y = height - 150;
}



function draw() {


  dibujarDarkmap();


  switch (estado) {

  case "correr":

    actualizarAnimacion(correr, 80);

    x += velocidadMovimiento;


    // empieza a caminar
    if (x >= inicioCaminar) {

      x = inicioCaminar;

      estado = "caminar";

      frameActual = 0;

      ultimoCambio = millis();

      velocidadMovimiento = 3.5;
    }

    break;


  case "caminar":

    actualizarAnimacion(caminar, 120);

    x += velocidadMovimiento;


    // desacelerar pj
    velocidadMovimiento = map(x, inicioCaminar, puntoCaida, 3.5, 0.7);

    if (x >= puntoCaida) {

      x = puntoCaida;

      estado = "caer";

      frameActual = 0;

      ultimoCambio = millis();
    }

    break;

  case "caer":

    actualizarCaida();

    break;
  }

  dibujarPersonaje(obtenerFrameActual(), x, y, escala);


  if (mostrarYouDied) {

    mostrarPantallaMuerte();
  }
}


function dibujarDarkmap() {

  image(darkmap, width / 2, height / 2, width, height);
}


function actualizarAnimacion(animacion, velocidad) {

  if (millis() - ultimoCambio > velocidad) {

    frameActual++;

    if (frameActual >= animacion.length) {

      frameActual = 0;
    }


    ultimoCambio = millis();
  }
}



function actualizarCaida() {

  if (millis() - ultimoCambio > 280) {

    if (frameActual < caer.length - 1) {

      frameActual++;
    } else {

      frameActual = caer.length - 1;

      mostrarYouDied = true;
    }


    ultimoCambio = millis();
  }
}


function obtenerFrameActual() {

  if (estado === "correr") {

    return correr[frameActual];
  } else if (estado === "caminar") {

    return caminar[frameActual];
  } else {

    return caer[frameActual];
  }
}



function dibujarPersonaje(imagen, posX, posY, escala) {

  image(imagen, posX, posY, imagen.width * escala, imagen.height * escala);
}



function mostrarPantallaMuerte() {

  if (opacidadMuerte < 180) {

    opacidadMuerte += 4;
  }


  fill(0, opacidadMuerte);

  noStroke();

  rect(0, 0, width, height);



  tint(255, opacidadMuerte);

  image(youDied, width / 2, height / 2, 750, 150);


  noTint();
}



function keyPressed() {

  if (key === 'r' || key === 'R') {


    estado = "correr";

    frameActual = 0;

    x = -70;

    velocidadMovimiento = velocidadInicial;

    ultimoCambio = millis();

    mostrarYouDied = false;

    opacidadMuerte = 0;
  }
}
