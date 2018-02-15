class Map {

    constructor() {
        this.setupTrayActions();
        this.setupToolIcons();
        this.setupRecordCards();
        this.setupOverlay();
        this.mapClicks();
    }

    setupRecordCards() {
        $('.m-record-card a').not('.m-record-card--collection a').click((event) => {
            this.showOverlay('record');
            event.preventDefault();
        });
        $('.m-record-card--collection a').click((event) => {
            this.showTrayContent('collection');
            event.preventDefault();
        });
    }

    setupTrayActions() {
        $('.m-tray-area .open-close').click((event) => {
            $('.m-tray-area').addClass('is-closed');
            $('.m-map-wrapper').addClass('tray-is-closed');
        });

        $('.m-tray-title-area .close button').click((event) => {
            this.showTrayContent('default');
        });

        $('.creator-link a').click((event) => {
            this.showTrayContent('team');
            event.preventDefault();
        });

    }

    setupToolIcons() {

        $('.m-tool-button--search').click((event) => {
            this.showOverlay('search');
        });
        $('.m-tool-button--date-range').click((event) => {
            this.showOverlay('date-range');
        });
        $('.m-tool-button--layers').click((event) => {
            this.showOverlay('layers');
        });
        $('.m-tool-button--add-collection').click((event) => {
            this.showOverlay('add-collection');
        });
        $('.m-tool-button--add').click((event) => {
            this.showOverlay('add');
        });
        $('.m-tool-button--your-account').click((event) => {
            this.showOverlay('your-account');
        });
    }

    setupOverlay() {
        $('.m-overlay').click((event) => {
            this.hideOverlay('search');
        });
        $('.m-overlay .wrap').click((event) => {
            event.stopPropagation();
        });
    }

    showOverlay(state) {
        $('.m-overlay').addClass('is-showing');
        $('.m-overlay [class^="s-overlay"]').removeClass('is-showing');
        $('.m-overlay .s-overlay--' + state).addClass('is-showing');
    }

    hideOverlay() {
        $('.m-overlay').removeClass('is-showing');
    }

    mapClicks() {
        $('.m-map').click((event) => {
            $('.m-map-popover').show();

            var parentPosition = $('.m-map').offset();
            var popoverHeight = $('.m-map-popover').outerHeight();
            var popoverWidth = $('.m-map-popover').outerWidth();
            $('.m-map-popover').css('left', (event.clientX - parentPosition.left - (popoverWidth/2)) + 'px');
            $('.m-map-popover').css('top', (event.clientY - parentPosition.top - popoverHeight - 40) + 'px');
        });

    }

    showTrayContent(state) {
        //$('.m-overlay').addClass('is-showing');
        $('.m-tray-area [class^="s-tray-area"]').removeClass('is-showing');
        $('.m-tray-area .s-tray-area--' + state).addClass('is-showing');
    }

    hideOverlay() {
        $('.m-overlay').removeClass('is-showing');
    }
}

new Map();
