function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

const clipes = ["clipes/anti-hero.mp4", "clipes/bad blood.mp4", "clipes/bejeweled.mp4", "clipes/blank space.mp4", "clipes/lover.mp4", "clipes/me.mp4", "clipes/shake it off.mp4", "clipes/willow.mp4", "clipes/you belong with me.mp4", "clipes/you need to calm down.mp4", "clipes/the story of us.mp4"]
const repostas = ["anti-hero", "bad blood", "bejeweled", "blank space", "lover", "me", "shake it off", "willow", "you belong with me", "you need to calm down", "style", "enchanted", "all of the girls you loved before", "you're not sorry", "karma", "august", "midnight rain", "the way i loved you", "love story", "paper rings", "delicate", "hits different", "sweet nothing", "tolerate it", "fearless", "evermore", "paris", "better man", "ours", "you are in love", "never grow up", "innocent", "drive", "the story of us"]
$('ul').hide();
$('#todos').click(function (e) {
    shuffle(clipes)
    let j = 0
    $('video').attr('src', clipes[j])
    $('#menu').hide()
    $('#main').show()
})

$('#diario').click(function (e) {
    let j = clipes.length - 1
    $('video').attr('src', clipes[j])
    $('#menu').hide()
    $('#main').show()
})

t = ""
for(i in repostas) {
    t += "<li>"+ "<a href='#'>" +repostas[i]+ "</a>" +"</li>"
}

lista.innerHTML = t


$('input').keyup(function (e)  {
    let filtro = $(this).val().toLowerCase() 
    let menu = $('#lista')
    let menuitens = $('li')
    if (filtro === "") {
        $('ul').hide();
    } else {
        $('ul').show();
    }
    

    for (let i = 0; i < menuitens.length; i++) {
        links =  menuitens[i].getElementsByTagName("a")[0]
        $(menuitens[i]).css('display', 'block')
        if(links.innerHTML.toLowerCase().indexOf(filtro) > -1) {
            $(menuitens[i]).css('display', 'block')
        } else {
            $(menuitens[i]).css('display', 'none')
        }
    }
})

$('a').click(function(e) {
    let item = $(this).html()
    $('input').val(item)
    $('ul').hide();

})

var respondido = false

$('#confirm').click(function(e) {
    let repostaCerta = $('video').attr('src')
    repostaCerta = repostaCerta.split(".")
    repostaCerta = repostaCerta[0].split("/")

    if($('input').val() != ""){
        $('ul').hide();
        if(repostaCerta[1].toLowerCase() === $('input').val()) {
            $('#main').css('border', '4px solid green')
            respondido = true
            $('input').attr('disabled', 'disabled')
        } else {
            $('#main').css('border', '4px solid red')
            respondido = true
            $('input').attr('disabled', 'disabled')
        }
    }
    
})


$('#next').click(e => {
    if (respondido){
        $('video').attr("src", clipes[++j])
    }
    respondido = false
    $('input').removeAttr('disabled')
    $('input').val("")
    $('ul').hide();
    $('#main').css('border', '2px solid black')
})

$('#dica').click(e => {
    let caminho = $('video').attr('src')
    caminho = caminho.split(".")
    caminho = caminho[0].split("/")
    caminho = "audios/" + caminho[1] + ".mp4"
    $('audio').attr('src', caminho)
    $('audio').attr('autoplay', 'loop')

})



