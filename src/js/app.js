import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'owl.carousel';
import 'bootstrap';
// import "owl.carousel/dist/owl.carousel.min.js";

$(document).ready(function () {

    var $toggleButton = $('.toggle-button'),
        $menuWrap = $('.menu-wrap'),
        $sidebarArrow = $('.sidebar-menu-arrow');

    // Hamburger button

    $toggleButton.on('click', function () {
        $(this).toggleClass('button-open');
        $menuWrap.toggleClass('menu-show');
    });

    // Sidebar navigation arrows

    $sidebarArrow.click(function () {
        $(this).next().slideToggle(300);
    });

    $('.owl-carousel').children().each(function (index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });

    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        items: 3,
    });

    $(document).on('click', '.owl-item>div', function () {
        $('.owl-carousel').trigger('to.owl.carousel', $(this).data('position'));
    });

    $('select').formSelect();
    M.updateTextFields();

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, options);
    });

    $('.datepicker').datepicker();

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.timepicker');
        var instances = M.Timepicker.init(elems, options);
    });

    $('.timepicker').timepicker();

    $('input.autocomplete').autocomplete({
    });
});
