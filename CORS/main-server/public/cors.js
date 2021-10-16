'use strict';

window.addEventListener('load', () => {
    document.getElementById('button1').addEventListener('click', (event) => {
        event.preventDefault();
        const form1 = document.getElementById('form1');
        const fd = new FormData(form1);
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:3001/test");

        xhr.addEventListener('load', (e) => {
            console.log('*** xhr: load ***');
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        });
        xhr.addEventListener('error', (e) => {
            console.log('*** xhr: error ***');
        });

        xhr.send(fd);
    });

    document.getElementById('button2').addEventListener('click', (event) => {
        event.preventDefault();
        const form1 = document.getElementById('form2');
        const fd = new FormData(form1);
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:3002/test");

        xhr.addEventListener('load', (e) => {
            console.log('*** xhr: load ***');
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        });
        xhr.addEventListener('error', (e) => {
            console.log('*** xhr: error ***');
        });

        xhr.send(fd);
    });

});
