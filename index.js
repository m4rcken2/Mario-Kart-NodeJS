const player1 = {
    name:"Mario",
    speed: 4,
    move: 3,
    power: 3,
    points: 0
}

const player2 = {
    name: "Luigi",
    speed: 3,
    move: 4,
    power: 4,
    points: 0
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result
    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribut){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribut} = ${diceResult + attribut}`)
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁Rodada ${round}`)

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.speed;
            totalTestSkill2 = diceResult2 + character2.speed;

            await logRollResult(character1.name, "Velocidade", diceResult1, character1.speed)
            await logRollResult(character2.name, "Velocidade", diceResult2, character2.speed)
        }

        if (block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.move;
            totalTestSkill2 = diceResult2 + character2.move;

            await logRollResult(character1.name, "Namobrabilidade", diceResult1, character1.move)
            await logRollResult(character2.name, "Namobrabilidade", diceResult2, character2.move)
        }

        if (block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.power;
            let powerResult2 = diceResult2 + character2.power;
            
            console.log(`${character1.name} confrontou com ${character2.name} 🥊`)

            await logRollResult(character1.name, "Poder", diceResult1, character1.power)
            await logRollResult(character2.name, "Poder", diceResult2, character2.power)

            if (powerResult2 > powerResult1 && character1.points > 0 ){
                console.log(`${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto 🐢`)
                character1.points--;
            }
            if (powerResult1 > powerResult2 && character2.points > 0){
                console.log(`${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto 🐢`)
                character2.points--;
            }

            console.log(powerResult1 === powerResult2 ? "Confronto Empado nenhum ponto foi perdido" : "")
        }

        if (totalTestSkill1 < totalTestSkill2){
            console.log(`${character2.name} marcou um ponto`)
            character2.points++;
        }else if(totalTestSkill2 < totalTestSkill1){
            console.log(`${character1.name} marcou um ponto`)
            character1.points++;
        }

        console.log('------------------------------------')
    }

}

async function declareWinner(character1, character2){
    console.log(" Resulta final:")
    console.log(`${character1.name}: ${character1.points} pomto(s)`)
    console.log(`${character2.name}: ${character2.points} pomto(s)`)

    if(character1.points > character2.points)
        console.log(`\n${character1.name} venceu a corrida! PARABENS 🏆`)
    else if (character1.points < character2.points)
        console.log(`\n${character2.name} venceu a corrida! PARABENS 🏆`)
    else
        console.log("A corrida terminou em empate")
}

(async function main(){
 console.log(`🚨🌆 A corrida entre ${player1.name} e ${player2.name} comecando\n`);

await playRaceEngine(player1, player2)
await declareWinner(player1, player2)
})()