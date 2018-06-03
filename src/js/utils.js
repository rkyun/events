export function $loadTemplate(url, id) {
    return new Promise(resolve => {
        const req = new XMLHttpRequest();
        req.open('GET', url);
        req.send();
        req.onload = () => {
            $id(id).innerHTML = req.responseText;
            resolve();
        };
    });
}

export function $id(id) {
    return document.getElementById(id);
}
