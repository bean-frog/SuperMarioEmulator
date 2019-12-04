export function createDashboardLayer(font,mario) {
    
    return function drawDashboard(context) {
        const lives = mario.stomper.lives;
        const coins = mario.stomper.collect;
        font.print('MARIO: '+lives,context,32,16);
        font.print('COINS: '+coins,context,164,16);
    };
}