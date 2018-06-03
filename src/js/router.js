import Navigo from 'navigo';


export default class Router {

    constructor(root = null, useHash = false, hash = null) {
        this.root = root;
        this.useHash = useHash;
        this.hash = hash;

        this.init()
    }

    init() {
        this.router = new Navigo(this.root, this.useHash, this.hash);

        this.router
            .on('new', () => {
                this.loadHTML('./../templates/new.html', 'app');                        
            })
            .on('event', () => {
                this.loadHTML('./../templates/event.html', 'app');
            })
            .on(() => { 
                this.loadHTML('./../templates/home.html', 'app'); 
            })
            .notFound((query) => { 
                this.loadHTML('./../templates/404.html', 'app');
            })
            .resolve();
    }


    loadHTML(url, id) {
        const req = new XMLHttpRequest();
        req.open('GET', url);
        req.send();
        req.onload = () => {
            this.$id(id).innerHTML = req.responseText;
        };
    }


    $id(id) {
        return document.getElementById(id);
    }

}
