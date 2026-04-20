export default class ZIndexer {  
	constructor() {
		this._stickers = [];  
	}
	
	add(sticker) {  
		this._stickers.push(sticker);  
	}
	
	getMaxZ() {  
		if (this._stickers.length !== 0) {  
			let zindexes = [];  
			
			this._stickers.forEach(sticker => {  
				zindexes.push(sticker.getZ());  
			});
			
			return Math.max.apply(null, zindexes);  
		} else {
			return 0;  
		}
	}
}