function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

const clipes = ["clipes/anti-hero.mp4", "clipes/bad blood.mp4", "clipes/bejeweled.mp4", "clipes/blank space.mp4", "clipes/lover.mp4", "clipes/me.mp4", "clipes/shake it off.mp4", "clipes/willow.mp4", "clipes/you belong with me.mp4", "clipes/you need to calm down.mp4", "clipes/the story of us.mp4", "clipes/the man.mp4", "clipes/we are never ever getting back together.mp4", "clipes/look what you made me do.mp4", "clipes/begin again.mp4", "clipes/everything has changed.mp4", "clipes/style.mp4", "clipes/i knew you were trouble.mp4", "clipes/out of the woods.mp4", "clipes/ready for it.mp4", "clipes/karma.mp4", "clipes/i bet you think about me.mp4", "clipes/delicate.mp4", "clipes/cardigan.mp4", "clipes/lavender haze.mp4", "clipes/22.mp4", "clipes/back to december.mp4"]
const repostas = ["anti-hero", "begin again", "bad blood", "lavender haze", "i bet you think about me", "bejeweled", "blank space", "lover", "me", "look what you made me do", "shake it off", "willow", "you belong with me", "you need to calm down", "style", "enchanted", "all of the girls you loved before", "you're not sorry", "karma", "august", "midnight rain", "the way i loved you", "the man", "love story", "we are never ever getting back together", "paper rings", "delicate", "hits different", "out of the woods", "sweet nothing", "tolerate it", "i knew you were trouble", "fearless", "evermore", "paris", "ready for it", "better man", "ours", "you are in love", "never grow up", "cardigan", "innocent", "drive", "the story of us", "everything has changed", "22", "back to december"]
var j = 0
$('ul').hide();
$('#main').hide();
$('#pontuacao').hide();
$('#escolher').hide()

$('#todos').click(function (e) {
    shuffle(clipes)
    $('video').attr('src', clipes[j])
    $('#menu').hide()
    $('#main').show()
    $('#pontuacao').show();
})

$('#diario').click(function (e) {
    let z = clipes.length - 1
    $('video').attr('src', clipes[z])
    $('#menu').hide()
    $('#main').show()
    $('#next').hide()
})


t = ""
for(i in repostas) {
    t += "<li class='list-group-item'>"+ "<a class='itenss' href='#'>" +repostas[i]+ "</a>" +"</li>"
}

lista.innerHTML = t


$('#resposta').keyup(function (e)  {
    let filtro = $(this).val().toLowerCase() 
    let menu = $('#lista')
    let menuitens = $('li')
    if (filtro === "") {
        $('ul').hide();
    } else {
        $('ul').show();
    }

    for (let i = 0; i < menuitens.length; i++) {
        links =  menuitens[i].getElementsByClassName('itenss')[0]
        $(menuitens[i]).css('display', 'block')
        if(links.innerHTML.toLowerCase().indexOf(filtro) > -1) {
            $(menuitens[i]).css('display', 'block')
        } else {
            $(menuitens[i]).css('display', 'none')
        }
    }
})

$('.itenss').click(function(e) {
    let item = $(this).html()
    $('#resposta').val(item)
    $('ul').hide();

})

var respondido = false
var dica = false
var pontos = false

$('#confirmar').click(function(e) {
    let repostaCerta = $('video').attr('src')
    repostaCerta = repostaCerta.split(".")
    repostaCerta = repostaCerta[0].split("/")

    if($('#resposta').val() != ""){
        $('ul').hide();
        if(repostaCerta[1].toLowerCase() === $('#resposta').val()) {
            $('#main').css('border', '4px solid green')
            respondido = true
            $('#resposta').attr('disabled', 'disabled')
            pontuacao()
        } else {
            $('#main').css('border', '4px solid red')
            respondido = true
            $('#resposta').attr('disabled', 'disabled')
        }
        $('#next').removeAttr('disabled')
    }
})


$('#next').click(e => {
    $('#next').attr('disabled', 'disabled')
    if (respondido){
        $('video').attr("src", clipes[++j])
    }
    dica = false
    respondido = false
    pontos = false
    $('#resposta').removeAttr('disabled')
    $('#resposta').val("")
    $('ul').hide();
    $('#main').css('border', '1px solid rgba(255, 255, 255, 0.15)')
    if(j >= clipes.length){
        $('#resposta').attr('disabled', 'disabled')
        $('#next').attr('disabled', 'disabled')
        $('#confirmar').attr('disabled', 'disabled')
    }
})

$('#dica').click(e => {
    let caminho = $('video').attr('src')
    caminho = caminho.split(".")
    caminho = caminho[0].split("/")
    caminho = "audios/" + caminho[1] + ".mp4"
    $('audio').attr('src', caminho)
    $('audio').attr('autoplay', 'loop')
    dica = true
})

$('#darkMode').click(e => {
    const body = $('body')
    let valor = body.attr('data-bs-theme');
    valor = valor == "light" ? "dark" : "light"
    body.attr('data-bs-theme', valor)
})

function pontuacao() {
    if(!dica && !pontos) {
        let valorAtual = parseInt($('#score').html())
        valorAtual = valorAtual + 2;
        $('#score').html(valorAtual)
    } else if (dica && !pontos) {
        let valorAtual = parseInt($('#score').html())
        valorAtual++;
        $('#score').html(valorAtual)
    }
    pontos = true
}

$('#choose').click(e => {
    $('#menu').hide()
    $('#main').hide()
    $('#escolher').show();
    $('#listaEscolha').show()
    
    t = ""
    for(i in clipes) {
        t += "<li class='list-group-item d-flex justify-content-center'>"+ "<a class='escolhas' href='#'>" +"Clipe: " +i + "</a>" +"</li>"
    }

    listaEscolha.innerHTML = t


    $('.escolhas').click(function(e) {
        let numero = $(this).html()
        numero = numero.split(':')
        console.log(numero)
        const indice = parseInt(numero[1])
        $('#escolher').hide();
        $('#main').show()
        $('video').attr('src', clipes[indice])
        $('#next').hide()

    })

})

$(document).keydown(function(e) {
    if(e.which === 27) {
        location.reload()
    }
})






