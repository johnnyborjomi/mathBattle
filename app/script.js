const button = document.querySelector('button');
let xhr = new XMLHttpRequest();
const body = document.querySelector('body');
let elem = document.createElement('h1');


button.addEventListener('click', function (e) {
    e.preventDefault();
    xhr.open('GET', 'ping', true);
    xhr.send();
    elem.textContent = 'loading..';
    body.appendChild(elem);
});

xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    let responseElem = document.createElement('h1');
    responseElem.textContent = xhr.responseText;
    body.appendChild(responseElem);
};

