console.log('flappy bird');

const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// fundo 
const fundo = {
    spritesX: 390,
    spritesY: 0,
    largura: 275,
    altura: 204,
    X: 0,
    Y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            fundo.spritesX, fundo.spritesY, // sprites x e y, ver em algum editor de imagem //  
            fundo.largura, fundo.altura, // tamanho do sprite recortado //  
            fundo.X, fundo.Y,
            fundo.largura, fundo.altura,
        );

        contexto.drawImage(
            sprites,
            fundo.spritesX, fundo.spritesY, // sprites x e y, ver em algum editor de imagem //  
            fundo.largura, fundo.altura, // tamanho do sprite recortado //  
            (fundo.X + fundo.largura), fundo.Y, // desenhar continuamente //
            fundo.largura, fundo.altura,
        );
    },
};

// chão 
const chao = {
    spritesX: 0,
    spritesY: 610,
    largura: 224,
    altura: 112,
    X: 0,
    Y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spritesX, chao.spritesY, // sprites x e y, ver em algum editor de imagem //  
            chao.largura, chao.altura, // tamanho do sprite recortado //  
            chao.X, chao.Y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spritesX, chao.spritesY, // sprites x e y, ver em algum editor de imagem //  
            chao.largura, chao.altura, // tamanho do sprite recortado //  
            (chao.X + chao.largura), chao.Y, // desenhar continuamente //
            chao.largura, chao.altura,
        );
    },
};

function chaocolisao(flappybird, chao) {//colisão
    const flappybirdy = flappybird.Y + flappybird.altura;
    const chaoy = chao.Y;

    if (flappybirdy >= chaoy) {
        return true;
    }
    return false;
}
function criaflappybird() {
    const flappybird = {
        spritesX: 0,
        spritesY: 0,
        largura: 33,
        altura: 24,
        X: 10,
        Y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular');
            console.log('[antes]', flappybird.velocidade);
            flappybird.velocidade = - flappybird.pulo;
            console.log('[depois]', flappybird.velocidade);
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {// gravidade
            if (chaocolisao(flappybird, chao)) {
                console.log('bateu')
                return;

                mudaparatela(telas.inicio);
                return;
            }
            flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
            flappybird.Y = flappybird.Y + flappybird.velocidade;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappybird.spritesX, flappybird.spritesY, // sprites x e y, ver em algum editor de imagem //  
                flappybird.largura, flappybird.altura, // tamanho do sprite recortado //  
                flappybird.X, flappybird.Y,
                flappybird.largura, flappybird.altura,
            );
        },
    };
    return flappybird;
}
// personagem 
const flappybird = {
    spritesX: 0,
    spritesY: 0,
    largura: 33,
    altura: 24,
    X: 10,
    Y: 50,
    pulo: 4.6,
    pula() {
        console.log('devo pular');
        console.log('[antes]', flappybird.velocidade);
        flappybird.velocidade = - flappybird.pulo;
        console.log('[depois]', flappybird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {// gravidade
        if (chaocolisao(flappybird, chao)) {
            console.log('bateu')
            return;

            mudaparatela(telas.inicio);
            return;
        }
        flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
        flappybird.Y = flappybird.Y + flappybird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappybird.spritesX, flappybird.spritesY, // sprites x e y, ver em algum editor de imagem //  
            flappybird.largura, flappybird.altura, // tamanho do sprite recortado //  
            flappybird.X, flappybird.Y,
            flappybird.largura, flappybird.altura,
        );
    },
};

const mensageminicio = { // mensagem do inicio
    sX: 134,
    sY: 0,
    largura: 174,
    altura: 152,
    X: (canvas.width / 2) - 174 / 2,
    Y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensageminicio.sX, mensageminicio.sY, // sprites x e y, ver em algum editor de imagem //  
            mensageminicio.largura, mensageminicio.altura, // tamanho do sprite recortado //  
            mensageminicio.X, mensageminicio.Y,
            mensageminicio.largura, mensageminicio.altura,
        );
    },
};
const globais = {}; // ultilização em tudo que for global, para ter acesso em outras telas ou em outros momentos 
let telaativa = {};
function mudaparatela(novatela) {// função para mudar a tela
    telaativa = novatela;

    if (telaativa.inicializa) {
        telaativa.inicializa();
    }

}
const telas = {
    inicio: {// agrupamento
        inicializa() {// sistema de reiniciamento do flappy bird
            globais.flappybird = criaflappybird();
        },
        desenha() {
            fundo.desenha();
            chao.desenha();
            globais.flappybird.desenha();
            mensageminicio.desenha();
        },
        click() {
            mudaparatela(telas.jogo); // muda para telas.jogo e descarta a mensagem de inicio
        },
        atualiza() {

        }
    }
};

telas.jogo = {
    desenha() {
        fundo.desenha();
        chao.desenha();
        globais.flappybird.desenha();
    },
    click() {
        globais.flappybird.pula();
    },
    atualiza() {
        globais.flappybird.atualiza();
    }
};

function loop() {
    telaativa.desenha();
    telaativa.atualiza();
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () { // click para sumir a tela de inicio
    if (telaativa.click) {
        telaativa.click();
    }
});

mudaparatela(telas.inicio);// finalizando a tela nova
loop();