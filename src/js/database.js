import PouchDB from 'pouchdb';

export default class Database {
    
    
    constructor(name){
        this.name = name;
        

        if (!this.localDb){
           this.localDb = new PouchDB(name, {adapter: 'idb'});
        }

        this.localDb.changes({since: 'now', live: true, include_docs: true})
            .on('change', this.handleChange.bind(this))
            .on('error', () => {
                console.error('database changes error');
            });

        this.rows = this.getAll();
    }


    getAll() {
        return new Promise(resolve => {
        
        if(!this.rows){
            this.localDb.allDocs({include_docs: true})
                .then(docs => {
                    this.rows = docs.rows.map(row => {
                     return row.doc;
                    });
                   
                    resolve(this.rows);
                });
        } else {
            resolve(this.rows);
        }
        });       
    }

    get(id) {
        return new Promise((resolve, reject ) => {
            this.localDb.get(id).then(doc => {
                resolve(doc);
            }).catch(() => {
                reject('Not found');
            })
        });
    }

    set(row) {
        if(!row._id) {
            row._id = this.name + '/' + (new Date()).getTime();
        }

        return new Promise(resolve => {
           this.localDb.put(row).then(result => {
            resolve(result);
           }) 
        });
            
    }
    

    handleChange(change) {
       
        const row = this.find(change.id, this.rows);

        if(change.delated) {
            const idx = rows.indexOf(row);

            if(idx !== -1) {
                this.rows.splice(idx, 1);
            }
        } else {
            if(row) {
                var idx = this.rows.indexOf(row);
                this.rows[idx] = change.doc;
            } else {
                this.rows.push(change.doc);
            }
        }

    }

   find(needle, stack) {
        if (!stack)
            return false;

        const filtered = stack.filter(item => {
            return item._id === needle;
        });

        if (filtered.length)
            return filtered[0];
    
        return false;
   }

}
