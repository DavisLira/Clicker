var pedraButton = document.getElementById("pedra");
var pedrasSpan = document.getElementById("pedras");
var exportButton = document.getElementById("exportar");
var importInput = document.getElementById("importar");
var pedras = localStorage.getItem("pedras") || 0;

// Função para atualizar o contador de pedras na tela
function atualizarPedras() {
    pedrasSpan.innerHTML = pedras;
}

// Evento de clique no botão para pegar pedra
pedraButton.addEventListener("click", function() {
    pedras++;
    localStorage.setItem("pedras", pedras);
    atualizarPedras();
});

// Evento de clique no botão para exportar o jogo
exportButton.addEventListener("click", function() {
    var jogoData = {
        pedras: pedras
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

// Evento de mudança no input para importar o jogo
importInput.addEventListener("change", function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var jsonData = event.target.result;
        var jogoData = JSON.parse(jsonData);
        if (jogoData && jogoData.pedras !== undefined) {
            pedras = jogoData.pedras;
            localStorage.setItem("pedras", pedras);
            atualizarPedras();
        } else {
            alert("Arquivo inválido!");
        }
    };
    reader.readAsText(file);
});

// Atualizar o contador de pedras na inicialização
atualizarPedras();
