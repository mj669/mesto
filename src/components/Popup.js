class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);
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
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        this._popup.addEventListener('click', this._handleOverlayClose);
    };
}

export default Popup;
