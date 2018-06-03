import Database from './database';

import { $loadTemplate, $id } from './utils';
 
export default class Home {

    constructor() {
        this.db = new Database('events');
    }

    renderPage() {
        $loadTemplate('./../templates/home.html', 'app').then(()=>{
          this.renderEvents(); 
        });
    }
    

    renderEvents() {
        const $listElement =$id('events-list');
        
        this.db.getAll().then(result => {
            const events = result;

            let html = '';
            events.forEach(event => {
                html += `<li>${event._id}</li>`;
            });

            $listElement.innerHTML = html;
        })
    }

}
