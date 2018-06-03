import Navigo from 'navigo';

import Home from './home';

import EventForm from './eventForm';

import {$id, $loadTemplate} from './utils';
        
const home = new Home();
const eventForm = new EventForm();

const router = new Navigo(null, true, '#/');

router
    .on('new', eventForm.renderPage.bind(eventForm))
    .on('event', () => {
        $loadTemplate('./../templates/event.html', 'app');
    })
    .on('home', home.renderPage.bind(home))
    .on(home.renderPage.bind(home))
    .notFound((query) => { 
        $loadTemplate('./../templates/404.html', 'app');
    })
    .resolve();
    

export default router;
