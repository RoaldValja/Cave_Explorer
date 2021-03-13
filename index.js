let count = 0;
let path = 25;
let player = path;
let collision = 0;
let time = 1;
let difficulty = 200;
var intervall// = new setInterval(StartGame, time);

function StartNewGame(){
    let children = document.querySelector("#game").childElementCount;
    for(let i = 0; i < children; i++){
        document.querySelector("#game").childNodes[0].remove();
    }
    count = 0;
    path = 25;
    player = path;
    collision = 0;
    time = 1;
    difficulty = 200;
    StartGame();
}

function StartGame(){
    count++;
    GamePieces(count);
    
    if(count >= 100){
        PlacePlayer();
        PlaceObstacle();
        time = 15;
    }
    if(collision == 1){
        clearInterval(intervall);
    } else if(collision == 0){
        clearInterval(intervall);
        intervall = setInterval(StartGame.bind(this), time);
    }
}
/*
var intervall = setInterval(function() {
    count++;
    GamePieces(count);
    
    if(count >= 100){
        PlacePlayer();
        time = 1000;
    }
    if(collision == 1){
        clearInterval(intervall);
    }
    //intervall = setInterval(StartGame(), time);
}, time);*/

function GamePieces(count) {
    let columnCount = document.querySelector("#game").childElementCount;
    //console.log("columns: " + columnCount);
    if(columnCount >= 99){
        //console.log("its over limit");
        document.querySelector("#game").firstChild.remove();
    }
    let column = document.createElement("div");
    column.style.height = "95vh";
    column.style.width = "1%";
    column.style.cssFloat = "left";
    column.style.position = "relative";
    column.id = count + "col";
    //console.log(column.id);
    let pieces = [];
    CreatePath();
    //console.log("path: " + path);
    let caveSize = Math.floor((Math.random() * 5) + 7);
    //console.log("cave size: " + caveSize);

    let ceiling = path - Math.floor(caveSize / 2);
    //console.log("ceiling:" + ceiling);
    let pieceCount = 0;
    for(let i = 0; i < ceiling; i++){
        let piece = document.createElement("div");
        if(i < ceiling-2){
            CreatePiece(piece, "black");
        } else {
            CreatePiece(piece, "gray");
        }
        column.appendChild(piece);
        pieceCount++;
    }
    
    for(let i = ceiling; i < ceiling + caveSize; i++){
        let piece = document.createElement("div");
        CreatePiece(piece, "white");
        column.appendChild(piece);
        pieceCount++;
    }
    let floor = ceiling + caveSize;

    for(let i = floor; i < 50; i++){
        let piece = document.createElement("div");
        if(i > floor+1){
            CreatePiece(piece, "black");
        } else {
            CreatePiece(piece, "gray");
        }
        column.appendChild(piece);
    }
    //console.log("pieces: " + pieceCount);
    document.querySelector("#game").appendChild(column);
    //console.log(pieces.length);
}

function CreatePath(){
    let movePath;
    if(count < 20){

    }/*
    else if(path == 0){
        movePath = Math.floor((Math.random() * 2) + 1);
    } else if(path == 19){
        movePath = Math.floor((Math.random() * 2));
    } else {
        movePath = Math.floor((Math.random() * 3));
    }*/
    else if(path == 0){
        movePath = Math.floor((Math.random() * 6) + 1);
    } else if(path == 49){
        movePath = Math.floor((Math.random() * 6));
    } else {
        movePath = Math.floor((Math.random() * 8));
    }
   // console.log("movepath: " + movePath);
   if(path < 15){
    if(movePath <= 1){
        path -= 1;
    } else if(movePath >= 4){
        path += 1;
    } 
   }else if(path >= 35){
        if(movePath <= 4){
            path -= 1;
        } else if(movePath >= 6){
            path += 1;
        } 
    } else {
        if(movePath <= 2){
            path -= 1;
        } else if(movePath >= 5){
            path += 1;
        } 
    }
    
  //  console.log("path: " + path);
}

function CreatePiece(piece, color) {
    piece.style.backgroundColor = color;
    piece.style.height = "1.9vh";
}

window.onkeypress = function(event){
    let key = event.keyCode;
    //console.log(key);
    if(key == 119){
        MovePlayer("up");
    } else if(key == 115){
        MovePlayer("down");
    }

}

function PlacePlayer(){
    let column = document.querySelector("#game").childNodes[10];
    if(column.childNodes[player].style.backgroundColor == "black"){
        collision = 1;
    } else if(column.childNodes[player].style.backgroundColor == "brown"){
        collision = 1;
    } else if(column.childNodes[player].style.backgroundColor == "gray"){
        collision = 1;
    } else{
        column.childNodes[player].style.backgroundColor = "blue";
        //console.log("pani mängija");
    }
}

function MovePlayer(direction){
    if(direction == "up"){
        player--;
    } else if(direction == "down"){
        player++;
    }
}

function PlaceObstacle(){
    let column = document.querySelector("#game").childNodes[98];
    if(count % 200 == 199){
        difficulty = difficulty / 1.05;
        console.log("difficulty: " + difficulty);
    }
    for(let i = 0; i < 50; i++){
        if(column.childNodes[i].style.backgroundColor == "white"){
            let obstacle = Math.floor((Math.random() * difficulty));
            if(obstacle == 10){
                column.childNodes[i].style.backgroundColor = "brown";
            }
        }
    }
    
}