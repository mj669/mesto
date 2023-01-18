class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._handleOverlayClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('click', this._handleOverlayClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _handleOverlayClose(event) {
        const currentModalWindow = event.currentTarget;
        if (event.target === currentModalWindow) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => this.close());
    };
}

export default Popup;
