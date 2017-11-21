(function ($) {

    Drupal.behaviors.civicrm_images_preview = new function () {

        // Creating an image from a tag
        this.a_to_img = function (i, e) {
            let $e = $(e);
            let src = $e.attr('href');
            $e.after('<img src="'+src+'" />');
        }

        this.attach = function (context, settings) {
            // searching for civicrm images

            $('[class*="civicrm"], .user-profile.view-mode-ingallery', context)
                .find('a[href$=".jpg"], a[href$=".png"], a[href$=".JPG"], a[href$=".PNG"]').once('civicrm_images_preview', this.a_to_img);

        }
    };

    Drupal.behaviors.civicrm_autoupload_files_in_webform = new function () {

        // here is my spy on file input
        this.autoupload_spy = function (i, e) {
            let $e = $(e);
            // if there's a change
            $e.change( function () {
                // submit the file (not the form)
                $e.next().mousedown();
            });
        }

        this.attach = function (context, settings) {
            // searching for civicrm files
            $('.civicrm-enabled.form-managed-file input[type="file"]', context).once('civicrm_autoupload_files_in_webform', this.autoupload_spy);
        }
    };



    $(document).ready(function() {

        var bio_read_more = new function () {

            let me = this;

            // just toggling
            this.bio_read_more_click = function () {
                me.$dm_bio_read_more.toggleClass('hidden');
                me.$dm_bio_read_more_link.toggleClass('hidden');
                me.$dm_bio_show_less_link.toggleClass('hidden');
            }

            this.init = function () {
                this.$bio_content = $('.group-bio-content');
                this.$dm_bio_read_more = $('.field-name-field-dm-bio-read-more', this.$bio_content);

                if (this.$dm_bio_read_more.length) {
                    this.$dm_bio = $('.field-name-field-dm-bio-main', this.$bio_content);
                    // Creating read more and show less links
                    this.$dm_bio_read_more_link = $('<div class="dm-bio-read-more-link">Read more</div>');
                    this.$dm_bio_show_less_link = $('<div class="dm-bio-show-less-link hidden">Show less</div>');
                    // Inserting likns in the DOM
                    this.$dm_bio.after( this.$dm_bio_read_more_link );
                    this.$dm_bio_read_more.after( this.$dm_bio_show_less_link );
                    // Hidding read more content
                    this.$dm_bio_read_more.addClass('hidden');
                    // Attaching events
                    this.$dm_bio_read_more_link.click( this.bio_read_more_click );
                    this.$dm_bio_show_less_link.click( this.bio_read_more_click );
                }
            }

            this.init();

        }

        var sidemenu = new function () {

            let me = this;

            // just toggling
            this.toggleSidebar = function () {
                me.$main_menu_block.toggleClass('showing');
                me.$body.toggleClass('showing-sidemenu');
            }

            this.init = function () {

                // initializing
                this.$body = $('body');
                this.$menu_toggle = $('#block-craftcentral-craftcentral-header .cc-menu-toggle');
                this.$main_menu_block = $('#block-system-main-menu');
                this.$main_menu_block_menu_nav = this.$main_menu_block.find('ul.menu.nav');
                this.$main_menu_close_button = this.$main_menu_block_menu_nav.find('.cc-close-sidemenu');
                // Creating and inserting a background layer for interaction purposes
                this.$main_menu_background = $('<div class="main-menu-background"></div>');
                this.$main_menu_block_menu_nav.after( this.$main_menu_background );

                // Checking required elements
                if (this.$menu_toggle.length && this.$main_menu_block.length) {
                    // Attaching toggle events
                    this.$menu_toggle.click ( this.toggleSidebar );
                    this.$main_menu_background.click( this.toggleSidebar );
                    this.$main_menu_close_button.click( this.toggleSidebar );
                }
            }

            this.init();

        }
        

        let $artwork_submissions = $('.view-artwork-submissions .view-content');
        if ($artwork_submissions.length) {
            $artwork_submissions.slick({
                centerMode: true,
                variableWidth: true
            });
        }

    });

})(jQuery);
