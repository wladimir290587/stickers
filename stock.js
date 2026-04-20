import Storage from './storage.js'

export default class Stock {  
    constructor(key, id = null) {  
        this._storage = new Storage(key);  
        this._id = id;  
    }
    
    save(value) {  
        let data = this._extract();  
        data[this._id] = value;  
        this._compact(data);  
    }
    
    remove() {  
        let data = this._extract();  
        delete data[this._id];  
        this._compact(data);  
    }
    
    get() {  
        let data = this._extract();  
        if (data[this._id] !== undefined) {  
            return data[this._id];  
        } else {
            return undefined;  
        }
    }
    
    getAll() {  
        return this._extract(); 
    }
    
    _compact(data) {  
        this._storage.save(JSON.stringify(data));  
    }
    
    _extract() {  
        let data = this._storage.get();  
        
        if (data === null) {
            return {};  
        } else {
            return JSON.parse(data);  
        }
    }
}
