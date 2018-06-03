import Database from './database';

import router from './router';

import {$loadTemplate, $id } from './utils';

import serialize from 'form-serialize';

export default class EventForm {

    constructor() {
        this.db = new Database('events');
    }

    renderPage() {
        $loadTemplate('./../templates/event-form.html', 'app').then(()=> {
            const formElement = $id('event-form');
            formElement.addEventListener('submit', this.handleSubmit.bind(this));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const event = serialize(e.target, {hash: true});
        this.db.set(event).then(()=>{
            router.navigate('home');
        }) 
    }

}
