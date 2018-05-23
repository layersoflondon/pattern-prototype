class Map {

    constructor() {

        // General functions
        this.setupRandomImage();
        this.setupRecordCards();

        // Tools & actions
        this.setupToolIcons();
        this.setupTrayActions();
        this.setupLayerTools();
        this.setupQuickstartSearch();

        // Overlays
        this.setupOverlay();
        this.setupOverlaySubnavigation();
        this.setupSearchOverlay();
        this.setupDateRangeOverlay();
        this.setupLayersOverlay();
        this.setupCreateCollectionOverlay();
        this.setupYourAccountOverlay();
        this.setupRecordOverlay();
        this.setupAddRecordOverlay();

    }


    // General functions

    setupRandomImage() {

        $('.random-image').each(function () {
            $(this).css('background-image', 'url(/example/' + (Math.floor(Math.random() * 16) + 1) + '.jpg');
        });

        $('.random-image-large').each(function () {
            $(this).css('background-image', 'url(/example/' + (Math.floor(Math.random() * 16) + 1) + '-large.jpg');
        });

    }

    setupRecordCards() {

        var memoryType = [
            'That time at',
            'Once at',
            'Memories of',
            'We used to live in',
            'The History of',
            'I was married at',
            'Famous history of',
            'What happened in',
            'Never forget',
            'Photos of',
            'Images of',
            'Sad times at',
            'Great times at',
            'The old fig tree at',
            'The street party at',
            'Under',
            'Before',
            'Explosion at',
            'Dreams of',
            'I love',
            'Drama at',
            'I left my heart in'
        ]

        var placeNames = [
            'Keldburgh',
            'Keldwike',
            'Preston',
            'Blackdale',
            'Kelddon',
            'Great Marslea',
            'Barmarsh',
            'Moorburn Bridge',
            'Eastleigh',
            'Redholm',
            'Guildbury',
            'Marswike Bridge',
            'Westbrook',
            'Whitefield',
            'Otterdon',
            'Otterdon Heath',
            'Loxhall',
            'Ilburgh',
            'Harthwaite',
            'Marsmarsh',
            'Whitewich',
            'Hazelwick',
            'Blackdon',
            'Marsmere',
            'Market Hophalgh',
            'Westdon',
            'Moorwick Cross',
            'Nether Presholm',
            'Hartmoor',
            'Millhey',
            'Oxhampton',
            'Hartfold Heath',
            'Foxfold	Nether',
            'Birchdon',
            'Normouth',
            'Otterden',
            'Newhey',
            'Millthorpe Cross',
            'Oakmarsh',
            'Hopholm	Moorlea',
            'Ilfield',
            'Ashhaven',
            'Harmoor	Norworth',
            'Blacklea Head',
            'Ashmoor',
            'Foxthwaite',
            'Woolham',
            'Hartford',
            'Northworth Lake',
            'Loxmere',
            'Little Portsford',
            'Kirmoor',
            'Eastport',
            'Millburgh',
            'Woolwich',
            'Easthaven Head',
            'Woolmere',
            'Dunleigh'
        ]

        $('.m-record-card h1').each(function () {
            var memoryNum = Math.floor(Math.random() * memoryType.length);
            var placeNum = Math.floor(Math.random() * placeNames.length);
            //$(this).text(memoryType[memoryNum] + ' ' + memoryNum + ' ' + placeNames[placeNum] + ' ' + placeNum);
            $(this).text(memoryType[memoryNum] + ' ' + placeNames[placeNum]);
        });

        $('.m-record-card a').each(function () {
            $(this).data('marker-number', Math.floor(Math.random() * 20));
        });


        $('.m-record-card a').not('.m-record-card--collection a').click((event) => {
            $('.m-record h1').text($(event.currentTarget).find('h1').text());
            this.showOverlay('record');
            event.preventDefault();
        });

        $('.m-record-card a').not('.m-record-card--collection a').hover((event) => {
            bounceRandomMarker($(event.currentTarget).data('marker-number'));
            event.preventDefault();
        });

        $('.m-record-card--collection a').click((event) => {
            this.showTrayContent('collection');
            event.preventDefault();
        });
    }


    // Tools & actions

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
            $('.m-tray-area').addClass('is-closed');
            $('.m-map-wrapper').addClass('tray-is-closed');
            $('.m-map-wrapper').addClass('showing-place-picker');
            $('.m-place-picker').addClass('is-showing');
            hideAllMarkers();
            setMapCursorCrosshair();
        });
        $('.m-tool-button--your-content').click((event) => {
            $('.m-tray-title-area--search-results h1').text('Your records & collections');

            $('.m-sidebar').addClass('is-inactive');
            setTimeout(function() {
                $('.m-sidebar').removeClass('is-inactive');
            }, 2000);

            this.showTrayContent('search-results');
        });
        $('.m-tool-button--your-account').click((event) => {
            this.showOverlay('your-account--details');
        });
    }

    setupTrayActions() {

        $('.m-tray-area .open-close').click((event) => {
            $('.m-tray-area').toggleClass('is-closed');
            $('.m-map-wrapper').toggleClass('tray-is-closed');
        });

        $('.m-tray-title-area .close button').click((event) => {
            this.showTrayContent('default');
        });

        $('.m-tray-title-area--search-results .refine').click((event) => {
            this.showOverlay('refine');
        });

        $('.creator-link a').click((event) => {
            this.showTrayContent('team');
            event.preventDefault();
        });

    }

    setupLayerTools() {

        $('.m-layer-tools .panel a').click((event) => {
            this.showOverlay('layers');
            event.preventDefault();
        });

/*        $('.m-layer-tools .panel .close').click((event) => {
            //Close
            $('.m-layer-tools').addClass('is-closed');
            event.preventDefault();
        });*/

        $('.m-layer-tools .panel .open').click((event) => {
            //Open
            $('.m-layer-tools').toggleClass('is-closed');
            event.preventDefault();
        });

    }

    showTrayContent(state) {
        $('.m-tray-area [class^="s-tray-area"]').removeClass('is-showing');
        $('.m-tray-area .s-tray-area--' + state).addClass('is-showing');
    }

    setupQuickstartSearch() {

        $('.m-quickstart-search input[type="submit"]').click((event) => {
            showPlaceMarkers();
            var searchTerm = $('.m-quickstart-search input[type="text"]').val();
            $('.m-tray-title-area--search-results h1').text('"' + searchTerm + '"');
            this.showTrayContent('search-results');
            event.preventDefault();
        });

    }


    // Overlays

    showOverlay(state) {
        $('.m-overlay').addClass('is-showing');
        $('.m-overlay [class^="s-overlay"]').removeClass('is-showing');
        $('.m-overlay .s-overlay--' + state).addClass('is-showing');
    }

    hideOverlay() {
        $('.m-overlay').removeClass('is-showing');
    }

    setupOverlay() {

        $('.m-overlay').click((event) => {
            this.hideOverlay();
        });


        $('.m-overlay .close').click((event) => {
            this.hideOverlay();
            event.stopPropagation();
        });

        $('.m-overlay > div > div').not('.close').click((event) => {
            // This will need to be changed for live!
            event.stopPropagation();
        });

    }

    setupOverlaySubnavigation() {

        $('.m-overlay-subnavigation a').click((event) => {
            var p = event.currentTarget;
            var linkTarget = $(p).data('link-target');
            $('.m-overlay-subnavigation li').removeClass('is-current');
            $('a[data-link-target="' + linkTarget + '"]').parent().addClass('is-current');
            this.showOverlay('your-account--' + linkTarget);
            event.preventDefault();
            event.stopPropagation();
        });

    }

    setupSearchOverlay() {

        $('.m-search-overlay button.submit-button').click((event) => {
            this.hideOverlay();
            showPlaceMarkers();
            var searchTerm = $('.m-search-overlay input[type="text"]').val();
            $('.m-tray-title-area--search-results h1').text('“' + searchTerm + '”');
            this.showTrayContent('search-results');
            event.preventDefault();
        });

        $('.m-search-overlay .filters-show button').click((event) => {
            $('.m-search-overlay .filters').toggleClass('is-open');
            event.preventDefault();
        });

        $('.m-search-overlay .date-range .subsection-header button').click((event) => {
            $('.m-search-overlay .date-range .era-picker').toggle();
            event.preventDefault();
        });

        $('.form-group--toggle-switch .toggle').click((event) => {
            $(event.currentTarget).parent().parent().toggleClass('is-toggled');
            //event.preventDefault();
        });



  /*      $('.m-search-overlay .date-range .subsection-header button').click((event) => {
            $('.m-search-overlay .date-range .era-picker').toggle();
            event.preventDefault();
        });*/


    }

    setupDateRangeOverlay() {

        $('.m-date-range-overlay > button').click((event) => {
            this.hideOverlay();
            $('.m-tray-title-area--search-results h1').text('1941 – 1945');
            this.showTrayContent('search-results');
            event.preventDefault();
        });

        $('.m-date-range-overlay .eras a').click((event) => {
            this.hideOverlay();
            var searchTerm = $(event.currentTarget).text();
            $('.m-tray-title-area--search-results h1').text(searchTerm);
            this.showTrayContent('search-results');
            event.preventDefault();
        });

    }

    setupLayersOverlay() {

        $('.m-layers-picker a').click((event) => {
            $(event.currentTarget).parent().toggleClass('is-selected');
            event.preventDefault();
        });

        $('.m-layers-picker .wrap > button').click((event) => {
            this.hideOverlay();
        });

    }

    setupCreateCollectionOverlay() {

        $('.m-add-collection input[type="submit"]').click((event) => {
            this.hideOverlay();
            event.preventDefault();
        });

    }

    setupYourAccountOverlay() {

        $('.teamlink-owner').click((event) => {
            this.showOverlay('your-account--team-owner');
            event.preventDefault();
        });

        /*   $('.teamlink-owner-managed').click((event) => {
               this.showOverlay('your-account--team-owner-managed');
               event.preventDefault();
           });*/

        $('.teamlink-member').click((event) => {
            this.showOverlay('your-account--team-member');
            event.preventDefault();
        });

        /*    $('.teamlink-member-managed').click((event) => {
                this.showOverlay('your-account--team-member-managed');
                event.preventDefault();
            });*/

        $('.m-account-page input[type="submit"]').click((event) => {
            event.preventDefault();
        });

        $('.section--members a').click((event) => {
            this.showTrayContent('creator');
            this.hideOverlay();
            $('.s-tray-area--creator .m-tray-title-area h1').text($(event.currentTarget).text());
            event.preventDefault();
        });

        $('.section--collections a').click((event) => {
            this.showTrayContent('collection');
            this.hideOverlay();
            $('.s-tray-area--collection .m-tray-title-area h1').text($(event.currentTarget).text());
            event.preventDefault();
        });

        $('.section--records a').click((event) => {
            $('.m-record h1').text($(event.currentTarget).text());
            this.showOverlay('record');
            event.preventDefault();
        });

        $('.section--team-header .show-on-map').click((event) => {
            $('.s-tray-area--team .m-tray-title-area h1').text($(event.currentTarget).parent().find('h1').text());
            this.hideOverlay();
            this.showTrayContent('team');
            event.preventDefault();
        });

    }

    setupRecordOverlay() {

        $('.m-record .creator a').click((event) => {
            this.showTrayContent('creator');
            $('.s-tray-area--creator .m-tray-title-area h1').text($(event.currentTarget).text());
            this.hideOverlay();
            event.preventDefault();
        });

        $('.m-record button.edit').click((event) => {
            $('.m-add-record h1').text('Edit record');
            $('.m-add-record').addClass('is-edit-mode');
            this.showOverlay('add-record');
            event.preventDefault();
            event.stopPropagation();
        });

    }

    setupAddRecordOverlay() {

        $('.end-date-link a').click((event) => {
            $('.end-date-link').hide();
            $('.end-date').show();
            event.preventDefault();
        });

    }


    // Misc

    mapClicks(xPos, yPos) {

        $('.m-map-popover').hide();

        if ($('.showing-place-picker').length) {
            $('.m-add-record h1').text('Add record');
            $('.m-add-record').removeClass('is-edit-mode');
            this.showOverlay('add-record');
            $('.m-map-wrapper').removeClass('showing-place-picker');
            setMapCursorDefault();
            showAllMarkers();
        }

    }

    mapDrag() {

        $('.m-map-popover').hide();

        if ($('.s-tray-area--introduction').hasClass('is-showing')) {
            $('.s-tray-area--introduction').removeClass('is-showing');
            $('.s-tray-area--default').addClass('is-showing');
        }

    }

    markerClicks(xPos, yPos) {

        $('.m-map-place-popover').hide();

        $('.m-map-popover').show();
        var parentHeight = $('.m-map').outerHeight();
        var parentWidth = $('.m-map').outerWidth();
        var parentPosition = $('.m-map').offset();
        var popoverHeight = $('.m-map-popover').outerHeight();
        var popoverWidth = $('.m-map-popover').outerWidth();
        $('.m-map-popover').css('left', (xPos + (parentWidth / 2) - (popoverWidth / 2)) + 'px');
        $('.m-map-popover').css('top', (yPos + (parentHeight / 2) - popoverHeight - 70) + 'px');

    }

    placeClicks(xPos, yPos) {

        $('.m-map-popover').hide();

        $('.m-map-place-popover').show();
        var parentHeight = $('.m-map').outerHeight();
        var parentWidth = $('.m-map').outerWidth();
        var parentPosition = $('.m-map').offset();
        var popoverHeight = $('.m-map-place-popover').outerHeight();
        var popoverWidth = $('.m-map-place-popover').outerWidth();
        $('.m-map-place-popover').css('left', (xPos + (parentWidth / 2) - (popoverWidth / 2)) + 'px');
        $('.m-map-place-popover').css('top', (yPos + (parentHeight / 2) - popoverHeight - 70) + 'px');

    }

}

var prototypeFunctionality = new Map();
