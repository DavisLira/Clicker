var salvarJogoButton = document.getElementById("salvar-jogo");
var carregarJogoInput = document.getElementById("carregar-jogo");
var botaoConfiguracoes = document.getElementById("configuracoes");
var botaoVoltar = document.getElementById("voltar");

var container = document.querySelector(".container");
var controls = document.querySelector(".controls");

var botaoPegarPedra = document.getElementById("botao-pedra");
var botaoPicaretaMadeira = document.getElementById("botao-picareta-madeira");
var botaoPicaretaPedra = document.getElementById("botao-picareta-pedra");

var contadorPedrasElement = document.getElementById("quantidade-pedras");
var pedrasPorSegundoElement = document.getElementById("pedras-por-segundo");
var custoPicaretaMadeiraElement = document.getElementById("custo-picareta-madeira");
var custoPicaretaPedraElement = document.getElementById("custo-picareta-pedra");
var quantidadePicaretasElement = document.getElementById("quantidade-picaretas");

var pedrasAtual = parseFloat(localStorage.getItem("quantidade-pedras")) || 0;
var pedraAutomatica = parseFloat(localStorage.getItem("pedra-automatica")) || 0;
var custoPicaretaMadeira = parseFloat(localStorage.getItem("custo-picareta-madeira")) || 25;
var quantidadePicaretasMadeira = parseFloat(localStorage.getItem("quantidade-picaretas-madeira")) || 0;
var custoPicaretaPedra = parseFloat(localStorage.getItem("custo-picareta-pedra")) || 100;
var quantidadePicaretasPedra = parseFloat(localStorage.getItem("quantidade-picaretas-pedra")) || 0;

var intervaloPedraAutomatica;

function atualizarContadores() {
    contadorPedrasElement.innerHTML = Math.floor(pedrasAtual);
    pedrasPorSegundoElement.innerHTML = pedraAutomatica.toFixed(2);
    custoPicaretaMadeiraElement.innerHTML = custoPicaretaMadeira;
    custoPicaretaPedraElement.innerHTML = custoPicaretaPedra;
    quantidadePicaretasElement.innerHTML = quantidadePicaretasMadeira + quantidadePicaretasPedra;
    liberaPicaretaPedra();
}

function liberaPicaretaPedra() {
    if (quantidadePicaretasMadeira < 50) {
        botaoPicaretaPedra.style.visibility = 'hidden';
    } else if (quantidadePicaretasMadeira >= 50) {
        botaoPicaretaPedra.style.visibility = 'visible';
    }
}

function adicionarPedrasAutomaticamente() {
    pedrasAtual += pedraAutomatica;
    localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
    atualizarContadores();
}

function iniciarPedrasAutomaticas() {
    intervaloPedraAutomatica = setInterval(adicionarPedrasAutomaticamente, 1000);
}

if (pedraAutomatica > 0) {
    iniciarPedrasAutomaticas();
}

botaoPegarPedra.addEventListener("click", function() {
    pedrasAtual++;
    localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
    atualizarContadores();
});

function comprarPicaretaMadeira() {
    if (pedrasAtual >= custoPicaretaMadeira) {
        pedrasAtual -= custoPicaretaMadeira;
        custoPicaretaMadeira += 1;
        pedraAutomatica += 0.1;
        quantidadePicaretasMadeira++;
        localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
        localStorage.setItem("pedra-automatica", pedraAutomatica.toFixed(2));
        localStorage.setItem("custo-picareta-madeira", custoPicaretaMadeira);
        localStorage.setItem("quantidade-picaretas-madeira", quantidadePicaretasMadeira);
        atualizarContadores();
        if (!intervaloPedraAutomatica) {
            iniciarPedrasAutomaticas();
        }
    }
}

botaoPicaretaMadeira.addEventListener("click", function() {
    comprarPicaretaMadeira();
});

function comprarPicaretaPedra() {
    if (pedrasAtual >= custoPicaretaPedra) {
        pedrasAtual -= custoPicaretaPedra;
        custoPicaretaPedra += 10;
        pedraAutomatica += 1;
        quantidadePicaretasPedra++;
        localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
        localStorage.setItem("pedra-automatica", pedraAutomatica.toFixed(2));
        localStorage.setItem("custo-picareta-pedra", custoPicaretaPedra);
        localStorage.setItem("quantidade-picaretas-pedra", quantidadePicaretasPedra);
        atualizarContadores();
        if (!intervaloPedraAutomatica) {
            iniciarPedrasAutomaticas();
        }
    }
}

botaoPicaretaPedra.addEventListener("click", function() {
    comprarPicaretaPedra();
});

atualizarContadores();







salvarJogoButton.addEventListener("click", function() {
    var jogoData = {
        pedrasAtual: pedrasAtual,
        pedraAutomatica: pedraAutomatica,
        custoPicaretaMadeira: custoPicaretaMadeira,
        custoPicaretaPedra: custoPicaretaPedra,
        quantidadePicaretasMadeira: quantidadePicaretasMadeira,
        quantidadePicaretasPedra: quantidadePicaretasPedra
    };
    var jsonData = JSON.stringify(jogoData);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "jogo_data.json";
    a.click();
    URL.revokeObjectURL(url);
});

carregarJogoInput.addEventListener("change", function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var jsonData = event.target.result;
        var jogoData = JSON.parse(jsonData);
        if (jogoData && jogoData.pedrasAtual !== undefined) {
            pedrasAtual = jogoData.pedrasAtual;
            pedraAutomatica = jogoData.pedraAutomatica;
            custoPicaretaMadeira = jogoData.custoPicaretaMadeira;
            custoPicaretaPedra = jogoData.custoPicaretaPedra;
            quantidadePicaretasMadeira = jogoData.quantidadePicaretasMadeira;
            quantidadePicaretasPedra = jogoData.quantidadePicaretasPedra;
            localStorage.setItem("quantidade-pedras", pedrasAtual);
            localStorage.setItem("pedra-automatica", pedraAutomatica);
            localStorage.setItem("custo-picareta-madeira", custoPicaretaMadeira);
            localStorage.setItem("custo-picareta-pedra", custoPicaretaPedra);
            localStorage.setItem("quantidade-picaretas-madeira", quantidadePicaretasMadeira);
            localStorage.setItem("quantidade-picaretas-pedra", quantidadePicaretasPedra);
            atualizarContadores();
            if (pedraAutomatica > 0) {
                iniciarPedrasAutomaticas();
            }
        } else {
            alert("Arquivo inválido!");
        }
    };
    reader.readAsText(file);
});

botaoConfiguracoes.addEventListener("click", function() {
    container.style.display = 'none';
    controls.style.display = 'flex';
});

botaoVoltar.addEventListener("click", function() {
    container.style.display = 'flex';
    controls.style.display = 'none';
})