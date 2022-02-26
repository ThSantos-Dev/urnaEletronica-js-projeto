'use strict'

// import { dados } from './dados.js';


let seuVotoPara = document.querySelector('.divisao1-left-1 span')
let cargo = document.querySelector('.divisao1-left-2 span')
let numeros = document.querySelector('.divisao1-left-3')
let descricao = document.querySelector('.divisao1-left-4')
let aviso = document.querySelector('.divisao2')
let lateral = document.querySelector('.divisao1-right')

// Variaveis de ambiente ETAPAS
let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []

function comecarEtapa(){
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for(let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero piscar"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

// Atualizando Template
function atualizaTemplate() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero == numero)
            return true
        else 
            return false
    })

    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`

        let fotosHtml = ""

        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small)
                fotosHtml += `
                <div class="divisao1-right-img small">
                    <img src="imgs/${candidato.fotos[i].url}" alt=""/>
                    ${candidato.fotos[i].legenda}
                </div>
                `
            else 
                fotosHtml += `
                    <div class="divisao1-right-img">
                        <img src="imgs/${candidato.fotos[i].url}" alt=""/>
                        ${candidato.fotos[i].legenda}
                    </div>
                    `
        }

        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = `<div class="aviso-grande piscar">VOTO NULO</div>`
    }
}



// Verificando qual foi o 'botao' clicado
function clicou(n) {
    let elNumero = document.querySelector('.numero.piscar')

    if(elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`
    }

    elNumero.classList.remove('piscar')

    if(elNumero.nextElementSibling !== null)
        elNumero.nextElementSibling.classList.add('piscar')
    else
        atualizaTemplate()

}

function branco(){
    numero = ''

    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = "block"
    numeros.innerHTML = ''
    descricao.innerHTML = '<div class="aviso-grande piscar">VOTO EM BRANCO</div>'
    lateral.innerHTML = ''

}
function corrige(){
    comecarEtapa()
}

function confirma(){
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if(votoBranco == true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual++

        if(etapas[etapaAtual] !== undefined)
            comecarEtapa()
        else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-fim piscar">FIM!</div>'
            console.log(votos)
            
            alert('A nova votação está disponivel em 10 segundos.')
            // Reoalad da tela
            setTimeout(() => {
                location.reload()
            }, 10000);
        }
    }



}

comecarEtapa()