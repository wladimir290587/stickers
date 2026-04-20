export default class Settings {  
	_setStickerFontSize(value) {
		this._stickerFontSize = value;
	}
	_setStickerFontColor(value) {
		this._stickerFontColor = value;
	}
	_setStickerBackgroundColor(value) {
		this._stickerBackgroundColor = value;
	}

	_getStickerFontSize() {
		return this._stickerFontSize;
	}
	_getStickerFontColor() {
		return this._stickerFontColor;
	}
	_getStickerBackgroundColor() {
		return this._stickerBackgroundColor;
	}
}