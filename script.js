var salvarJogoButton = document.getElementById("salvar-jogo");
var carregarJogoInput = document.getElementById("carregar-jogo");

var botaoPedra = document.getElementById("botao-pedra");
var botaoPicaretaMadeira = document.getElementById("botao-picareta-madeira");

var contadorPedrasElement = document.getElementById("quantidade-pedras");
var pedrasPorSegundoElement = document.getElementById("pedras-por-segundo");
var custoMadeiraElement = document.getElementById("custo-madeira");
var quantidadePicaretasElement = document.getElementById("quantidade-picaretas");

var pedrasAtual = parseFloat(localStorage.getItem("quantidade-pedras")) || 0;
var pedraAutomatica = parseFloat(localStorage.getItem("pedra-automatica")) || 0;
var custoMadeira = parseFloat(localStorage.getItem("custo-madeira")) || 25;
var quantidadePicaretasMadeira = parseFloat(localStorage.getItem("quantidade-picaretas-madeira")) || 0;

function atualizarContadores() {
    contadorPedrasElement.innerHTML = Math.floor(pedrasAtual);
    pedrasPorSegundoElement.innerHTML = pedraAutomatica.toFixed(2);
    custoMadeiraElement.innerHTML = custoMadeira;
    quantidadePicaretasElement.innerHTML = quantidadePicaretasMadeira;
}

function comprarPicaretaMadeira() {
    if (pedrasAtual >= custoMadeira) {
        pedrasAtual -= custoMadeira;
        custoMadeira += 1;
        pedraAutomatica += 0.1;
        quantidadePicaretasMadeira++;
        localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
        localStorage.setItem("pedra-automatica", pedraAutomatica.toFixed(2));
        localStorage.setItem("custo-madeira", custoMadeira);
        localStorage.setItem("quantidade-picaretas-madeira", quantidadePicaretasMadeira);
        atualizarContadores();
        if (!intervaloPedraAutomatica) {
            iniciarPedrasAutomaticas();
        }
    }
}

function adicionarPedrasAutomaticamente() {
    pedrasAtual += pedraAutomatica;
    localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
    atualizarContadores();
}

var intervaloPedraAutomatica;

function iniciarPedrasAutomaticas() {
    intervaloPedraAutomatica = setInterval(adicionarPedrasAutomaticamente, 1000);
}

salvarJogoButton.addEventListener("click", function() {
    var jogoData = {
        pedrasAtual: pedrasAtual,
        pedraAutomatica: pedraAutomatica,
        custoMadeira: custoMadeira,
        quantidadePicaretasMadeira: quantidadePicaretasMadeira
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
            custoMadeira = jogoData.custoMadeira;
            quantidadePicaretasMadeira = jogoData.quantidadePicaretasMadeira;
            localStorage.setItem("quantidade-pedras", pedrasAtual);
            localStorage.setItem("pedra-automatica", pedraAutomatica);
            localStorage.setItem("custo-madeira", custoMadeira);
            localStorage.setItem("quantidade-picaretas-madeira", quantidadePicaretasMadeira);
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

atualizarContadores();

botaoPedra.addEventListener("click", function() {
    pedrasAtual++;
    localStorage.setItem("quantidade-pedras", pedrasAtual.toFixed(2));
    atualizarContadores();
});

botaoPicaretaMadeira.addEventListener("click", function() {
    comprarPicaretaMadeira();
});

if (pedraAutomatica > 0) {
    iniciarPedrasAutomaticas();
}
