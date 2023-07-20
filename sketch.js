let log;
let font;
let fontsize = 48;
let keys;
let tempos = ["Presente", "Pretérito Perfeito", "Pretérito Imperfeito", "Pretérito Mais-que-perfeito", "Futuro do Presente", "Futuro do Pretérito"];
let verb_1, verb_2;
let canvasWidth;
let canvasHeight;
let startT, deltaT = 1000, doit = false;
let url = 'http://38.242.219.56/~dedic/poemaquina_logs/log_cron.json';
let poema_log;
let start_unixtime;
let bg;
let cord_sobre;
let clac;
let fundo_sound;
let last;



function preload() {
  log = loadJSON(url);
  font = loadFont('fonts/Kingthings Trypewriter 2.ttf');
  font_oswald = loadFont('fonts/Oswald-VariableFont_wght.ttf');
  font_log = loadFont("fonts/Hack-Regular.ttf");
  font_titulo = loadFont("fonts/SourceSans3-VariableFont_wght.ttf");
  bg = loadImage("files/fundo_amarelo_textura.jpg");
  //clac = loadSound('files/clac madeira.mp3');
  //fundo_sound = loadSound('files/som fundo maquina 1.mp3');
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  //canvasWidth = 1280;
  //canvasHeight = 768;

  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.position(0, 0);

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  doit = true;
  startT=millis();
  //fundo_sound.play();
  //fundo_sound.loop();
  //clac.play();
  
  }

function myTimer() {
  if (millis() > startT + deltaT) {
    startT = millis()
    console.log("it is time for it now"); // do what you have to do!
    doit = true;
  }
  else {
    doit = false;
  }
}


function draw() {
  //background(255,181,42)
  background(bg)
  
  if (doit){
    if (log['last_poem'] != undefined) {
        verbo1 = log['last_poem'][0];
        verbo2 = log['last_poem'][1];
        poema_log = log['poema_log'].join("\n");;
        start_unixtime = log['start_unixtime'];
        start_isoformat = log['start_isoformat'];
        end_isoformat = log['end_isoformat'];
        end_unixtime = log['end_unixtime'];
        poema_count_str = log['poema_count_str'];
        //clac.play();

        //if (last < log['poema_count']) {
        //  clac.play(); 
        //}
        //last = log['poema_count'];
    }
    log = loadJSON(url);
   }
  myTimer();


  //if (last != log['poema_count']) {
    //clac.play(); 
  //}


  textFont(font);
  textSize(32);
  textAlign(RIGHT, CENTER);

  let y = canvasHeight/2 - (660/2);
  let x = 90;




  //fill(0);
  //text("Poema " + poema_count_str, canvasWidth / 2 - x, y);
  
  textSize(fontsize);
  fill(0);
  text("Eu", canvasWidth / 2 - x, y+70);
  text("te", canvasWidth / 2 - x, y+120);
  fill(255, 0, 0);
  text(verbo1, canvasWidth / 2 - x, y+170);

  fill(0);
  text("Você", canvasWidth / 2 - x, y+280);
  text("me", canvasWidth / 2 - x, y+330);
  fill(255, 0, 0);
  text(verbo2, canvasWidth / 2 - x, y+380);       


  date = new Date();
  now_unixtime = round(date.getTime() / 1000);  
  //var s = new Date(start_unixtime *1000).toISOString();


  // Contador
  //textFont(font_oswald);
  textFont(font_log);
  textSize(20);
  //textAlign(CENTER, CENTER);

  fill(0);
  str = "";
  dif =  now_unixtime - start_unixtime;
  for (let i = 0; i < (10 - String(dif).length); i++) {
  str = "0" + str;
  } 
  contador = str + (dif);
  text(contador, width / 2 - x, y + 520);
  textSize(14);
  text("Segundos desde o início:", width / 2 - x - 130, y + 523);

  textSize(20);
  restantes =  int((end_unixtime - now_unixtime) / 3600 / 24).toLocaleString('pt-BR') ;
  text(restantes, width / 2 - x, y + 550);
  textSize(14);
  text("Dias restantes:", width / 2 - x - 92, y + 553);



  textSize(14);
  text("Início: " + start_isoformat.replace("T", " ").replace(".000Z", "") + " GMT", width / 2 - x, y + 580);

  text("Previsão de término: " + end_isoformat , width / 2 - x, y + 605);

  textFont(font_log);



  //log
  textFont(font_log);
  textSize(14);
  textAlign(LEFT);
  text(poema_log, canvasWidth / 2 + 80, canvasHeight / 2);



  //Sobre
  textFont(font_log);
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text("VERBORRAGIA", 20, 20);

  text("SOBRE", 20, 70);
  cord_sobre = textWidth("SOBRE")
  //console.log(cord_sobre)

}

function mouseMoved() {
    width_text1 = textWidth(verbo1);
    if (mouseX > 20 && mouseX < 20 + cord_sobre && mouseY > 70 && mouseY < 100){
    popup();
    } else {
        popup_close();

    }
    
}
