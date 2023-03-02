let type = ["s","d","c","h"];
let values = ["2", "3", "4", "5","6","7","8","9","10","j","q","k","a"];
let player1 = [];
let player2 = [];
let backup1 = [];
let backup2 = [];
let inPlay = [];
let player1_Points = 0;
let player2_Points = 0;
let roundWon = false;
let renderedCards = false;

function getDeck()
{
    let deck = new Array();
    for(let i = 0; i < type.length; i++)
    {
        for(let x = 0; x < values.length; x++)
        {
            let card = {Value: values[x], Type: type[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i=0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    for (let x = 52; x > 26; x--) {
        let kaart = Math.floor((Math.random() * deck.length));
        player1.push(deck[kaart]);
        deck.splice(kaart, 1);
    }
    player2 = deck;
    console.log(player1);
    console.log(player2);
}

function shuffleBackUp(deck) {
    for (let i=0; i < 100; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function renderCards ()
{
    document.getElementById("points").innerText = `Player1: ${player1_Points} Player2: ${player2_Points}`
    if(renderedCards === false) {
        document.getElementById("player1_cardBack").appendChild(document.createElement('img')).src = 'image/taguots.png';
        document.getElementById("player2_cardBack").appendChild(document.createElement('img')).src = 'image/taguots.png';
        renderedCards = true;
    }
}

function renderCardsNumber ()
{
    document.getElementById("player1_count").innerHTML = `${player1.length}`;
    document.getElementById("player2_count").innerHTML = `${player2.length}`;
}

function ClearCards ()
{
    let play = document.getElementById("play");
    let play2 = document.getElementById("play2");
    while (play.firstChild || play2.firstChild)
    {
        play.removeChild(play.firstChild);
        play2.removeChild(play2.firstChild);
    }
    roundWon = false;
    console.log(player1);
    console.log(player2);
}

function CheckWin () {
    let card1 = values.indexOf(player1[player1.length-1].Value);
    let card2 = values.indexOf(player2[player2.length-1].Value);
    inPlay.push(player1[player1.length-1]);
    inPlay.push(player2[player2.length-1]);
    console.log(inPlay);
    console.log(card1);
    console.log(card2);
    console.log(backup1, backup2);
    if(card1 > card2)
    {
        while (inPlay.length > 0) {
            backup1.push(inPlay[inPlay.length-1]);
            inPlay.pop();
        }
        document.getElementById("points").innerText = `Player1: ${backup1.length} Player2: ${backup2.length}`
        roundWon = true;
    } else if(card2 > card1) {
        while (inPlay.length > 0) {
            backup2.push(inPlay[inPlay.length-1]);
            inPlay.pop();
        }
        document.getElementById("points").innerText = `Player1: ${backup1.length} Player2: ${backup2.length}`
        roundWon = true;
    } else if(card1 === card2) {
        roundWon = false;
    }
}

function playCard()
{
    if(player1.length === 0){
        shuffleBackUp(backup1)
        player1 = backup1;
        backup1 = [];
    }
    if(player2.length === 0){
        shuffleBackUp(backup2)
        player2 = backup2;
        backup2 = [];
    }
    if (roundWon === true) {
        ClearCards();
    }
    CheckWin();
    document.getElementById("play").appendChild(document.createElement('img')).src = `image/${player1[player1.length-1].Value}_${player1[player1.length-1].Type}.png`;
    player1.pop();
    document.getElementById("play2").appendChild(document.createElement('img')).src = `image/${player2[player2.length-1].Value}_${player2[player2.length-1].Type}.png`;
    player2.pop();
    renderCardsNumber();
}
