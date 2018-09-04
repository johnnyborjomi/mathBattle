const button = document.querySelector('button');
let xhr = new XMLHttpRequest();
const body = document.querySelector('body');
let loader = document.createElement('h1');

function httpGet (url) {
    return new Promise(function(resolve, reject){

        xhr.open('GET', url, true);

        xhr.onload = function () {
            if(this.status === 200) {
                resolve(this.response);
            }else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject();
        };

        xhr.send();
        loader.textContent = 'loading..';
        body.appendChild(loader);
    });

}

button.addEventListener('click', function (e) {
    e.preventDefault();

    httpGet('ping').then(
        response => {
            console.log(response);
            let responseElem = document.createElement('h1');
            responseElem.textContent = response;
            body.appendChild(responseElem);
            loader.textContent = '';
        },
        () => {
            var mess = new Error("Network Error LOL")
            alert(mess);
            loader.textContent = '';
        }
    );

});

