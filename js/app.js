var Calculadora = (function(){
    var teclas = document.querySelectorAll('.tecla');
    var display = document.getElementById('display');
    var valorguardado=0;
    var ultimaOperacion;
    var ultimoIngreso;
    var ultimoIgual=null;

    for (var i = 0; i < teclas.length; i++) {
        teclas[i].onmousedown = function(){
            reducirTecla(this);
            tomarValor(this.id);
        };
        teclas[i].onmouseup = function(){
            restaurarTecla(this);
        };
    }
    function reducirTecla(val){val.style.padding = "1px";}
    function restaurarTecla(val){val.style.padding = "0px";}
    function tomarValor(val){
        var pantalla = display.innerHTML;
        var numerosActuales = display.innerHTML.replace('.', '').replace('-', '');
        if(Number.isInteger(parseInt(val))){
            if (pantalla == '0.'){
                display.innerHTML += parseInt(val);
            } else if(pantalla == 0){
                display.innerHTML = parseInt(val);
            }else if (numerosActuales.length < 8){
                display.innerHTML += parseInt(val);
            }
        } else if(val == 'on'){
            display.innerHTML=0;
            valorguardado=0;
            ultimoIgual=null;
        } else if (val == 'punto'){
            if(pantalla.indexOf('.') == -1 && numerosActuales.length < 8){
                display.innerHTML+='.';
            }
        } else if(val == 'sign'){
            if(pantalla.indexOf('-') == -1){
                if (pantalla == '0.'){
                    display.innerHTML = '-'+pantalla;
                } else if(pantalla == 0){
                    display.innerHTML = pantalla;
                } else {
                    display.innerHTML = '-'+pantalla;
                }
            }else{
                if (pantalla == '0.'){
                    display.innerHTML = pantalla.replace('-','');;
                } else if(pantalla == 0){
                    display.innerHTML = pantalla;
                } else {
                    display.innerHTML = pantalla.replace('-','');;
                }
            }
        } else if (val == 'mas'){
            valorguardado=Number(valorguardado)+Number(pantalla);
            ultimaOperacion='mas';
            display.innerHTML = 0;
        } else if (val == 'menos'){
            valorguardado=Number(valorguardado)-Number(pantalla);
            ultimaOperacion='menos';
            display.innerHTML = 0;
        } else if (val == 'por'){
            valorguardado == 0 ? valorguardado=Number(pantalla) : Number(valorguardado)*Number(pantalla);
            ultimaOperacion='por';
            display.innerHTML = 0;
        } else if (val == 'dividido'){
            valordivisor = Number(pantalla);
            valorguardado == 0 ? valorguardado=Number(pantalla) : Number(valorguardado)/Number(pantalla);
            ultimaOperacion='dividido';
            display.innerHTML = 0;
        } else if (val == 'igual'){
            if(ultimoIgual!=null){
                if (ultimaOperacion == 'mas'){
                    valorguardado=Number(valorguardado)+Number(ultimoIngreso);
                } else if (ultimaOperacion == 'menos'){
                    valorguardado=Number(valorguardado)-Number(ultimoIngreso);
                } else if (ultimaOperacion == 'por'){
                    valorguardado = Number(valorguardado)*Number(ultimoIngreso);
                } else if (ultimaOperacion == 'dividido'){
                    valorguardado = Number(valorguardado)/Number(ultimoIngreso);
                }
            }else {
                ultimoIngreso=Number(pantalla);
                if (ultimaOperacion == 'mas'){
                    valorguardado=Number(valorguardado)+Number(pantalla);
                } else if (ultimaOperacion == 'menos'){
                    valorguardado=Number(valorguardado)-Number(pantalla);
                } else if (ultimaOperacion == 'por'){
                    valorguardado == 0 ? valorguardado=Number(pantalla) : valorguardado = Number(valorguardado)*Number(pantalla);
                } else if (ultimaOperacion == 'dividido'){
                    valorguardado == 0 ? valorguardado=Number(pantalla) : valorguardado = Number(valorguardado)/Number(pantalla);
                }
            }

            display.innerHTML = valorguardado.toString().substr(0,8);
            ultimoIgual='igual';
        }    
    }
}());

