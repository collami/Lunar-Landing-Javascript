//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)

//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

var velocidadsmartphone = null;
var alturasmartphone = null;
var combustiblesmartphone = null;

//al cargar por completo la página...
window.onload = function () {

	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	velocidadsmartphone = document.getElementById("velocidadsmartphone");
	alturasmartphone = document.getElementById("alturasmartphone");
	combustiblesmartphone = document.getElementById("fuelsmartphone");

	function is_touch_device() {
		if ('ontouchstart' in window) {
			document.getElementById("botonpulsar").style.display = "inline-block";
		}
	}

	document.getElementById("play").onclick = function () {
		pausa();
	};
	document.getElementById("reiniciar").onclick = function () {
		reiniciar();
	};
	document.getElementById("playsmartphone").onclick = function () {
		pausasmartphone();
	};
	document.getElementById("reiniciarsmartphone").onclick = function () {
		reiniciarsmartphone();
	};
	
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = function (event) {
		if (event.keyCode == 32) {
			motorOn();
		}
	}
	document.onkeyup = motorOff;

	//ASIGNAR EVENTOS TOUCH SCREEN PARA LA VERSION SMARTPHONE
	var botonOnSmartphone = document.getElementById("botonpulsar");
	botonOnSmartphone.addEventListener("touchstart", handlerFunction, false);
	botonOnSmartphone.addEventListener("touchend", endingFunction, false);

	function handlerFunction(event) {
		motorOn();
	}

	function endingFunction(event) {
		motorOff();
	}

	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start() {
	//cada intervalo de tiempo mueve la nave
	timer = setInterval(function () {
		moverNave();
	}, dt * 1000);
}

function stop() {
	clearInterval(timer);
}

function moverNave() {
	//cambiar velocidad y posicion
	v += a * dt;
	y += v * dt;
	//actualizar marcadores
	velocidad.innerHTML = v.toFixed(2);
	altura.innerHTML = y.toFixed(2);
	velocidadsmartphone.innerHTML = v.toFixed(2);
	alturasmartphone.innerHTML = y.toFixed(2);

	//mover hasta que top sea un 73% de la pantalla
	if (y < 73) {
		document.getElementById("nave").style.top = y + "%";
	} else if (v < 5) {
		alert("HAS GANADO!! Si quieres volver a jugar pulsa Reiniciar");
		stop();
	} else {
		document.getElementById("imgnave").src = "img/explosion.gif";
		stop();
		setTimeout(function () {
			alert("HAS PERDIDO!! Si quieres volver a jugar pulsa Reiniciar");
		}, 2000);

	}
}

function motorOn() {
	//el motor da aceleración a la nave
	a = -g;
	//mientras el motor esté activado gasta combustible
	document.getElementById("imgnave").style.display = "none";
	document.getElementById("imgnaveconllama").style.display = "block";
	if (timerFuel == null)
		timerFuel = setInterval(function () {
			actualizarFuel();
		}, 10);
	if (c <= 0) {
		motorOff();
	}
}

function motorOff() {
	a = g;
	document.getElementById("imgnave").style.display = "block";
	document.getElementById("imgnaveconllama").style.display = "none";
	clearInterval(timerFuel);
	timerFuel = null;
}

function actualizarFuel() {
	//Restamos combustible hasta que se agota
	c -= 0.1;
	if (c < 0) {
		c = 0;
		motorOff()
	}
	combustible.innerHTML = c.toFixed(2);
	combustiblesmartphone.innerHTML = c.toFixed(2);

}

function reiniciar() {
	javascript: location.reload();

}

function pausa() {
	stop();
}

function reiniciarsmartphone() {
	javascript: location.reload();

}

function pausasmartphone() {
	stop();
}

