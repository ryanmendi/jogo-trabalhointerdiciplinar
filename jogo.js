console.log('Flappy Bird');

let frames = 0;

const Som_HIT = new Audio();
Som_HIT.src = './Efeitos/efeitos_hit.wav';

const musicfund = new Audio();
musicfund.src = './musc_fundo/fazsol.mp3';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// [Plano de Fundo]

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

function CriaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const MovimentoDoChao = 1;
            const RepeteEm = chao.largura / 2;
            const movimentacao = chao.x - MovimentoDoChao;
            chao.x = movimentacao % RepeteEm

        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };
    return chao;
}
//Chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    },
};

function fazcolisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }
    return false;
}

function CriaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular');
            flappyBird.velocidade = - flappyBird.pulo
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (fazcolisao(flappyBird, Globais.chao)) {
                console.log('faz colisão');
                Som_HIT.play();
                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 500);

                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, //frame asa cima 
            { spriteX: 0, spriteY: 26, }, // frame asa meio
            { spriteX: 0, spriteY: 52, }, // frame asa baixo 
        ],
        FrameAtual: 0,
        AtualizaFrameAtual() {
            const IntervaloDeFrames = 10; 
            const PassouOIntervalo = frames % IntervaloDeFrames === 0;
            if (PassouOIntervalo) {
                const BaseDoIncremento = 1;
                const Incremento = BaseDoIncremento + flappyBird.FrameAtual;
                const BaseRepeticao = flappyBird.movimentos.length;
                flappyBird.FrameAtual = Incremento % BaseRepeticao;
            }
           
        },

        desenha() {
            flappyBird.AtualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.FrameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }
    return flappyBird;
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        console.log('devo pular');
        flappyBird.velocidade = - flappyBird.pulo
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        if (fazcolisao(flappyBird, chao)) {
            console.log('faz colisão');
            mudaParaTela(Telas.INICIO);
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}


/// [mensagemGetReady]
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }
}


// 
// [Telas]
const Globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }

}

const Telas = {
    INICIO: {
        inicializa() {
            Globais.flappyBird = CriaFlappyBird();
            Globais.chao = CriaChao();
        },
        desenha() {
            planoDeFundo.desenha();
            Globais.chao.desenha();
            Globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            Globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        Globais.chao.desenha();
        Globais.flappyBird.desenha();
    },
    click() {
        Globais.flappyBird.pula();
        musicfund.play();
    },
    atualiza() {
        Globais.flappyBird.atualiza();
    }
};

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}


window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();