const { stdout, stdin } = process;
stdin.setEncoding("utf8");
stdin.setRawMode("true");
const alphabets = "qwertyuiopasdfghjklzxcvbnm".split("");
let onScreenCharacters = [];
let score = 0;

const getRandomcharacterPos = function() {
    let newCharacter = {};
    let columns = process.stdout.columns - 1;
    const selectedColumn = Math.floor(Math.random() * 26);
    newCharacter.x = Math.floor(Math.random() * columns);
    newCharacter.y = 0;
    newCharacter.char = alphabets[selectedColumn];
    return newCharacter;
};

const eleminateBottomCharacter = function() {
    onScreenCharacters.forEach(characterDetails => {
        if (characterDetails.y > 29) {
            onScreenCharacters.splice(
                onScreenCharacters.indexOf(characterDetails),
                1
            );
        }
    });
};

const insertNewCharacter = function() {
    onScreenCharacters.forEach(character => {
        character.y += 1;
        eleminateBottomCharacter();
    });
    onScreenCharacters.push(getRandomcharacterPos());
};

const printExistingChars = function() {
    console.clear();
    onScreenCharacters.forEach(charinfo => {
        stdout.cursorTo(charinfo.x, charinfo.y);
        console.log(charinfo.char);
    });
    displayScore();
    displayHowToQuit();
};

const displayHowToQuit = function() {
    stdout.cursorTo(50, 30);
    console.log('PRESS "Q" to Quit');
};

const displayScore = function() {
    stdout.cursorTo(90, 30);
    console.log("SCORE:", score);
};

const evaluateChar = function(data) {
    onScreenCharacters.forEach(characterDetails => {
        if (data.trim() === characterDetails.char) {
            score++;
            onScreenCharacters.splice(
                onScreenCharacters.indexOf(characterDetails),
                1
            );
        }
        if (data.trim() === "Q") {
            console.log("Your total score is :", score);
            process.exit();
        }
    });
};

const main = function() {
    setInterval(printExistingChars, 300);
    setInterval(insertNewCharacter, 1000);
    stdin.on("data", evaluateChar);
};

main();