// Arrays con nombres de meses y días de la semana
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');


// Obtiene la fecha actual y sus componentes (año, mes, día)
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDay();

// Calcula una fecha futura (10 días a partir de la fecha actual, a las 11:30 AM)
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

// Extrae componentes de la fecha futura para mostrar en la página
const year = futureDate.getFullYear(); // Obtiene el año de la fecha futura
const hours = futureDate.getHours(); // Obtiene las horas de la fecha futura
const minutes = futureDate.getMinutes(); // Obtiene los minutos de la fecha futura

let month = futureDate.getMonth(); // Obtiene el número del mes de la fecha futura
month = months[month]; //Obtiene el nombre del mes
const weekday = weekdays[futureDate.getDay()]; // Obtiene el nombre del día de la semana de la fecha futura
const date = futureDate.getDate(); // Obtiene el día del mes de la fecha futura


// Actualiza el texto de un elemento con la fecha del sorteo
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}: ${minutes}am`;


// Obtiene el tiempo en milisegundos hasta la fecha futura
const futureTime = futureDate.getTime();


// Función para calcular y mostrar el tiempo restante
function getRemaindingTime() {
    // Obtiene la fecha actual en milisegundos
    const today = new Date().getTime();

    // Calcula el tiempo restante en milisegundos
    const t = futureTime - today;

    // Calcula días, horas, minutos y segundos restantes
    const oneDay = 24 * 60 * 60 * 1000;

    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr
    // values in miliseconds

    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    let days = t /oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);


    // Formatea los valores menores que 10 añadiendo un '0' delante si es necesario
    const values = [days, hours, minutes, seconds];
    function format(item) {
        if(item < 10) {
            return (item = `0${item}`);
        } else {
            return item;
        }
    }


    // Actualiza el contenido de elementos HTML con los valores calculados
    items.forEach(function(item, index) {
        item.innerHTML = format(values[index]);
    });

    // Si el tiempo restante es menor que 0, detiene el contador y muestra un mensaje de expiración
    if(t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
    }
} 


// Inicia un intervalo que ejecuta getRemainingTime cada segundo
let countdown = setInterval(getRemaindingTime, 1000);

// Establece los valores iniciales del contador
getRemaindingTime();