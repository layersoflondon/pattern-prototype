class Accordion {

    constructor() {

        this.setupAccordions();

    }

    setupAccordions() {

        $('.m-accordion .title').click((event) => {

            if(!$(event.currentTarget).parent().hasClass('is-open')) {
                //It's not open
                $('.m-accordion .pane').slideUp('fast');
                $('.m-accordion .section').removeClass('is-open');
                $(event.currentTarget).parent().addClass('is-open');
                $(event.currentTarget).next().slideDown(600);
            } else {
                //It's open
                $(event.currentTarget).parent().removeClass('is-open');
                $(event.currentTarget).next().slideUp(600);
            }
            event.preventDefault();
        });

    }


}

new Accordion();
