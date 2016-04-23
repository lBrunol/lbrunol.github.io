$(function(){
    /* Seleção única nas tabelas dentro dos modais */
    $('.unique-selection tr').click(function () {
        $(this).siblings().removeClass('active-tr');
        $(this).addClass('active-tr');
    });
    
    /* Seleção múltipla nas tabelas dentro dos modais */
    $('.multi-selection tr').click(function(){
        $(this).toggleClass('active-tr');
    });
    
});

/******************************FUNÇÕES*****************************/

/* Função para calcular o valor total com base na quantidade e valor passados por parâmetro
* @param quant {int} passar a quantidade do item para ser calculado
* @param valor {float, int, double} passar o valor para o calculo do valor total
*/
function calculaValorTotal(quant, valor) {

    var valorTotal;

    valorTotal = valor * quant;

    if (typeof valorTotal != 'undefined' && !isNaN(valorTotal)) {
        return valorTotal;
    } else {
        return 0;
    }
}

function somaValoresTotais (el){
    var valorTotal = 0;
    $(el).find('.valor-total').each(function(){
        valorTotal = valorTotal + moedaParaNumero(retiraReal($(this).text()));
    });
    
    return numeroParaMoeda(valorTotal);
}

/* Função que restringe a digitação para apenas números. Chamar a função em algum evento do teclado como keypress, keydown.
* @param e {event} 
*/
function apenasNumeros(e) {
    var tecla = e.keyCode ? e.keyCode : e.charCode
    if ((tecla > 47 && tecla < 58)) { // numeros de 0 a 9
        return true;
    } else {
        if (tecla != 8 && tecla != 9 && tecla != 44) { // backspace   e // tab
            return false;
        } else {
            return true;
        }
    }
}

/* Valida se há texto inválido nos campos preenchidos através dos modais */
function validaTextoInvalido (el){
    if(typeof $(el).attr('data-id') == 'undefined'){
        $(el).val('');
        return;
    }
}  

/* Função que desativa a digitação no campo
* @param e {event} 
*/
function travaDigitacao(e) {    
    return false;       
}

/* Função que converte um número para o formato de moeda.
* @param num {float} 
*/
function numeroParaMoeda(num) {
    x = 0;

    num = num + "";
    num = num.replace(",", ".");

    if (num < 0) { num = Math.abs(num); x = 1; }

    if (isNaN(num)) num = "0";
    cents = Math.floor((num * 100 + 0.5) % 100);
    num = Math.floor((num * 100 + 0.5) / 100).toString();

    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));

    ret = num + ',' + cents;
    if (x == 1)
        ret = '-' + ret;

    ret = adicionaReal(ret);

    return ret;
}

/* Função que adiciona o R$ em um número passado por parâmetro
* @param num {float} 
*/
function adicionaReal(num) {
    num = "R$ " + num;
    return num;
}

/* Função que retira o R$ em um número passado por parâmetro
* @param num {String} 
*/
function retiraReal(num) {
    num = num.replace("R$", "");
    return num;
}

/* Função que substitui a virgula por ponto
* @param num {String} 
*/
function deVirgulaParaPonto(num) {
    num = num.replace(",", ".");
    return num;
}

/* Função converte de moeda para número
* @param num {float} 
*/
function moedaParaNumero(num) {
    num = num.replace(".", "");
    num = num.replace(",", ".");
    num = Number.parseFloat(num);
    return num;
}

function atribuiTexto (el, val){
    $(el).val(val);
}