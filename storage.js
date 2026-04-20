export default class Storage {  
	constructor(key) {   
		this._key = key;
	}
	
	save(data) {  
		localStorage.setItem(this._key, data);
	}
	
	get() {  
		return localStorage.getItem(this._key);
	}
}