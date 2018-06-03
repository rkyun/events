import Navigo from 'navigo';

import Home from './home';

import {$id, $loadTemplate} from './utils';

export default class Router {

    constructor(root = null, useHash = false, hash = null) {
        this.root = root;
        this.useHash = useHash;
        this.hash = hash;

        this.init()
    }

    init() {
        
        const home = new Home();
        this.router = new Navigo(this.root, this.useHash, this.hash);

        this.router
            .on('new', () => {
                $loadTemplate('./../templates/new.html', 'app');                
            })
            .on('event', () => {
                $loadTemplate('./../templates/event.html', 'app');
            })
            .on(home.renderPage.bind(home))
            .notFound((query) => { 
                $loadTemplate('./../templates/404.html', 'app');
            })
            .resolve();
    }

}
