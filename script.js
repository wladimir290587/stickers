import ZIndexer from './zIndexer.js'
import Settings from './settings.js'
import Stock from './stock.js'

class Sticker {
    constructor(parent, key, id, zIndexer) {  
        this._elem = document.createElement('textarea');  
        this._elem.className = 'sticker';  

        this._parent = parent;  
        this._parent.appendChild(this._elem);  
        
        this._zIndexer = zIndexer;  
        
        this._initRelocation();  
        this._initRemove();  
        this._initAtopState();  
        this._setSettings()  
        
        this._watchSize();  
        this._watchText();  
        
        this._stock = new Stock(key, id);  
    
        this._settings = new Settings(parent);  
    }
    
    create(w, h, x, y) {  
        this._setW(w);  
        this._setH(h);  
        this._setX(x);  
        this._setY(y);  
        this._setText('');  
        this._setFontSize(16);  
        
        this._setMaxZ();  
    }
    
    restore(data) { 
        this._setW(data.w);  
        this._setH(data.h);  
        this._setX(data.x);  
        this._setY(data.y);  
        this._setZ(data.z);  

        this._setFontSize(data.stickerFontSize);  
        this._setFontColor(data.stickerFontColor);  
        this._setBackgroundColor(data.stickerBackgroundColor);  

        this._setText(data.text);   
    }
    
    _save() {  
        let data = {  
            x: this._getX(),  
            y: this._getY(),  
            z: this.getZ(),  
            w: this._getW(),  
            h: this._getH(),  
            text: this._getText(),  
            
            stickerFontSize: this._settings._getStickerFontSize(),   
            stickerFontColor: this._settings._getStickerFontColor(),  
            stickerBackgroundColor: this._settings._getStickerBackgroundColor(),  
         
        };
        
        this._stock.save(data);  
    }

    _setFontSize(value) {  
        this._settings._setStickerFontSize(value);  
        this._elem.style.fontSize = value + 'px';  
        
        this._save();  
    }

    _setFontColor(value) {  
        this._settings._setStickerFontColor(value);  
        this._elem.style.color = value;  
        
        this._save();  
    }

    _setBackgroundColor(value) {  
        this._settings._setStickerBackgroundColor(value);  
        this._elem.style.backgroundColor = value;  
        
        this._save();  
    }
    
    _setW(value) {  
        this._w = value;  
        this._elem.style.width = value + 'px';  
        
        this._save();  
    }
    _getW() {  
        return this._w;  
    }
    
    _setH(value) {  
        this._h = value;  
        this._elem.style.height = value + 'px';  
        
        this._save();  
    }
    _getH() {  
        return this._h;  
    }
    
    _setX(value) {  
        this._x = value;  
        this._elem.style.left = value + 'px';  
        
        this._save();  
    }
    _getX() {  
        return this._x;  
    }
    
    _setY(value) {  
        this._y = value;  
        this._elem.style.top = value + 'px';  
        
        this._save();  
    }
    _getY() {  
        return this._y;  
    }
    
    _setZ(value) {  
        this._z = value;  
        this._elem.style.zIndex = value;  
        
        this._save();  
    }
    getZ() {  
        return this._z;  
    }
    
    _setText(text) {  
        this._text = text;  
        this._elem.value = text;  
        
        this._save();  
    }
    _getText() {  
        return this._text;
    }
    
    _setMaxZ() {  
        let maxZ = this._zIndexer.getMaxZ(); 
        
        if (maxZ !== this.getZ() || maxZ === 0) {  
            this._setZ(maxZ + 1);  
        }
    }
    
    _watchSize() {  
         
        this._elem.addEventListener('mouseup', () => {  
            let newWidth = parseInt(this._elem.clientWidth);  
            let newHeight = parseInt(this._elem.clientHeight);  
            
            if (newWidth !== this._getW()) {  
                this._setW(newWidth);  
            }
            if (newHeight !== this._getH()) {  
                this._setH(newHeight);  
            }
        });
    }
    _watchText() {  
        this._elem.addEventListener('blur', () => {  
            let newText = this._elem.value;  
            
            if (newText !== this._getText()) {  
                this._setText(newText);  
            }
        });
    }
    
    _initAtopState() {  
        this._elem.addEventListener('click', () => { 
            this._setMaxZ();  
            this._setW(this._getW() + 2);  
            this._setH(this._getH() + 2);  
        });
        this._elem.addEventListener('dragstart', () => { 
            this._setMaxZ();  
        });
    }

    _setSettings() {  
        div = document.querySelector('#settings');  
        this._elem.addEventListener('click', () => { 
                div.innerHTML = '';  
                let p_FontSize = document.createElement('p');  
                p_FontSize.innerHTML = 'Размер шрифта: ';
                p_FontSize.classList.add('settings');

                let select = document.createElement('select'); 
                select.style.fontSize = '16px';
                
                let optionInnerHTML = [10, 14, 16, 22, 36, 48, 72];

                for (let i = 0; i < 7; i++) {
                    let option = document.createElement('option'); 
                    option.value = optionInnerHTML[i];
                    option.innerHTML = optionInnerHTML[i] + 'px';
                    select.appendChild(option);
                }

                select.classList.add('settings');
            
                select.value = this._settings._getStickerFontSize();  
                
                select.addEventListener('change', () => {
                    this._settings._setStickerFontSize(select.value);  
                    this._elem.style.fontSize = this._settings._getStickerFontSize() + 'px';  
                    this._save();
                });
                div.appendChild(p_FontSize);
                div.appendChild(select);


                let p_FontColor = document.createElement('p');  
                p_FontColor.innerHTML = 'Цвет шрифта: ';
                p_FontColor.classList.add('settings');
                let input_FontColor = document.createElement('input'); 
                input_FontColor.type = 'color';
                input_FontColor.classList.add('settings');
                input_FontColor.value = this._settings._getStickerFontColor();  
                input_FontColor.addEventListener('blur', () => {
                    this._settings._setStickerFontColor(input_FontColor.value);  
                    this._elem.style.color = this._settings._getStickerFontColor();  
                });
                div.appendChild(p_FontColor);
                div.appendChild(input_FontColor);


                let p_BackgroundColor = document.createElement('p');  
                p_BackgroundColor.innerHTML = 'Цвет фона:';
                p_BackgroundColor.classList.add('settings');
                let input_BackgroundColor = document.createElement('input'); 
                input_BackgroundColor.type = 'color';
                input_BackgroundColor.classList.add('settings');
                input_BackgroundColor.value = this._settings._getStickerBackgroundColor();  
                input_BackgroundColor.addEventListener('blur', () => {
                    this._settings._setStickerBackgroundColor(input_BackgroundColor.value);  
                    this._elem.style.backgroundColor = this._settings._getStickerBackgroundColor();  
                });
                div.appendChild(p_BackgroundColor);
                div.appendChild(input_BackgroundColor);
        });
        window.addEventListener('click', (event) => { 
            if (!(event.target.classList == 'sticker' || event.target.classList == 'settings')) {
                div.innerHTML = '';  
                this._save();  
            }
        });
    };
    
    _initRemove() {  
        this._elem.addEventListener('mousedown', event => {
            if (event.which == 2) {  
                this._parent.removeChild(this._elem);  
                event.preventDefault();  
                
                this._stock.remove();  
            }
        });
    }
    
    _initRelocation() {  
        this._elem.draggable = true;  
        
        let correctionX = 0;  
        let correctionY = 0;  
        
        this._elem.addEventListener('dragstart', event => {  
            correctionX = this._getX() - event.pageX;  
            correctionY = this._getY() - event.pageY;  
        });
        this._elem.addEventListener('dragend', event => {  
            this._setX(event.pageX + correctionX);  
            this._setY(event.pageY + correctionY);  
            
            this._elem.blur();  
        });
    }
}

let key = 'stickers';  
let zIndexer = new ZIndexer;  

let stock = new Stock(key);  
let globalData = stock.getAll(); 

let div = document.createElement('div');  
div.id = 'settings';
div.style.width = '200px';
div.style.height = '200px';
document.body.appendChild(div);

 
 
var id = 0;  
for (id in globalData) {  
	let sticker = new Sticker(document.body, key, id, zIndexer);  
	sticker.restore(globalData[id]);  
	
	zIndexer.add(sticker);  
};
 
window.addEventListener('dblclick', (event) => {  
	id++;  
	
	let sticker = new Sticker(document.body, key, id, zIndexer);  
	sticker.create(150, 200, event.pageX, event.pageY);  
	
	zIndexer.add(sticker);  
});