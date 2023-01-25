// 1
const textHeader = document.querySelector('.text-header'),
    textFooter = document.querySelector('.text-footer');

let newElementText = textHeader.textContent;
textHeader.textContent = textFooter.textContent;
textFooter.textContent = newElementText;

// 2

function squareCircle() {
    let radius = 3;
    let square = Math.PI * Math.pow(radius, 2);
    document.querySelector('.result-square').innerHTML = `Площа кола з радіусом - ${radius} = ${square}`;
}
squareCircle();

// 3
const btnTask3 = document.querySelector('#btn3');

btnTask3.addEventListener('click', () => {
    let inputs = document.querySelectorAll('#num'),
        arr = [];

    inputs.forEach((item, i) => {
        arr[i] = +item.value;
    })
    let sorterMass = arr.sort(sortedNumbers),
        count = 0;

    for (let i = sorterMass.length; i >= 0; i--) {
        if (sorterMass[sorterMass.length - 1] == sorterMass[i]) {
            count++;
        }
    }
    let answer = `Максимальне число: ${sorterMass[sorterMass.length - 1]}. К-сть максимальних чисел: ${count}`;
    alert(answer);

    document.cookie = `name = ${answer}`;

    function sortedNumbers(a, b) {
        return a - b;
    }
});

let cocires = confirm(`${document.cookie} \n -------- \n Видалити кукі?`);
if (cocires == true) {
    document.cookie = "name = ; expires = Thu, 01 Jan 1970 00:00:01 GMT;"
} else {
    console.log('false')
}


// 4

let blockTask4 = document.querySelector('.task4'),
    inputColor = document.querySelector('#color-input'),
    colorElement = '';

inputColor.addEventListener('blur', () => {
    colorElement = inputColor.value;
    blockTask4.style.background = colorElement;
    localStorage.setItem('background', colorElement);
});

if (localStorage.getItem('background')) {
    blockTask4.style.background = localStorage.getItem('background');
}


// 5
let textHeaderRedact = document.querySelector('.redact'),
    headerBlock = document.querySelector('.header-block');

if (localStorage.getItem('text')) {
    textHeaderRedact.innerHTML = localStorage.getItem('text');
}
textHeaderRedact.addEventListener('dblclick', () => {
    console.log('tester');
    textHeaderRedact.innerHTML = `<textarea id="message" cols="30" rows="10">${textHeaderRedact.innerHTML}</textarea>`;
    let btnRadact = document.createElement('button');
    btnRadact.textContent = 'Редагувати';
    headerBlock.append(btnRadact);

    btnRadact.addEventListener('click', () => {
        btnRadact.remove();
        let mess = message.value;
        localStorage.setItem('text', mess);
        textHeaderRedact.innerHTML = `${message.value}`;
    });
});



