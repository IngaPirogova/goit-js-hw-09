import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minutesData = document.querySelector('span[data-minutes]');
const secondsData = document.querySelector('span[data-seconds]');
let inputDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);       
        inputDates = selectedDates[0];
        if (inputDates >= Date.now()) {
            startBtn.removeAttribute('disabled');
        } else {
            // Notify.failure('Please choose a date in the future');
            alert('Please choose a date in the future');
        }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onClickStartButton);

function onClickStartButton() {
    startBtn.setAttribute('disabled', true);
    const DataId = setInterval(() => {
        const deltaTime = inputDates - Date.now();
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        daysData.textContent = days;
        hoursData.textContent = hours;
        minutesData.textContent = minutes;
        secondsData.textContent = seconds;
        if (deltaTime < 1000) {
            clearInterval(DataId);
        }
    }, 1000)
    console.log();
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

 return { days, hours, minutes, seconds };
}






















/*Element.setAttribute()
Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента.
Синтаксис
element.setAttribute(name, value);
name - имя атрибута (строка).
value - значение атрибута.
Пример
В следующем примере, setAttribute() используется, чтобы установить атрибут disabled кнопки <button>, делая её отключённой.
<button>Hello World</button>
Copy to Clipboard
var b = document.querySelector("button");
b.setAttribute("disabled", "disabled");*/


/*Метод padStart() заполняет текущую строку другой строкой (несколько раз, если нужно) так, 
что итоговая строка достигает заданной длины. Заполнение осуществляется в начале (слева) текущей строки.
Синтаксис
str.padStart(targetLength [, padString])
Параметры
targetLength
Длина итоговой строки после дополнения текущей строки. Если значение меньше, чем длина текущей строки, текущая строка будет возвращена без изменений.
padString Необязательный
Строка для заполнения текущей строки. Если эта строка слишком длинная для заданной длины, она будет обрезана. Значение по умолчанию - " " (U+0020).
Возвращаемое значение
String заданной длины с заполнением строкой, выполненное в начале.
Примеры
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
*/