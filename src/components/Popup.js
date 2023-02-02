class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
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
        this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
    };
}

export default Popup;
