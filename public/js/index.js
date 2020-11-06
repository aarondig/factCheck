$(document).on('keypress', function(event) {
    if (event.which == 13) {
        var userInput = $("#search").val().trim();
        var userSearch = encodeURIComponent(userInput);
        console.log(userSearch);

        event.preventDefault();

        $.ajax("/api/search", {
            type: "POST",
            data: {
                search: userInput,
                searchEncoded: userSearch
            }
        }).then(
            function() {
                // Reload the page to get the updated list
                // location.reload();
            }
        );
        getData();
    }
});

// Display fact checks from database
function getData() {
    $.get("/api/display", function(data) {
        console.log(data);
        // if (data.length !== 0) {

        //     for (var i = 0; i < data.length; i++) {

        //         var card = $("<a>").attr("href", data[i].url);
        //         card.addClass("ui card");

        //         var content = $("<div>");
        //         content.addClass("content");
        //         card.append(content);

        //         var header = $("<div>").html(data[i].title);
        //         header.addClass("header");
        //         content.append(header);

        //         // var meta = $("<div>").html(data[i].publisher);
        //         // meta.addClass("meta");
        //         // content.append(meta);

        //         var description = $("<div>").html("<p>" + data[i].body + "</p>");
        //         description.addClass("description");
        //         content.append(header);

        //         var rating = $("<div>").html("<i>" + data[i].rating + "</i>");
        //         rating.addClass("extra content");
        //         content.append(rating);

        //         $("#factchecks").prepend(card);

        //     }

        // }

    });
}
// CARD FLIP

var $num = $('.cardContainer .card').length;

var $even = $num / 2;
var $odd = ($num + 1) / 2;

if ($num % 2 == 0) {
    $('.cardContainer .card:nth-child(' + $even + ')').addClass('active');
    $('.cardContainer .card:nth-child(' + $even + ')').prev().addClass('prev');
    $('.cardContainer .card:nth-child(' + $even + ')').next().addClass('next');
} else {
    $('.cardContainer .card:nth-child(' + $odd + ')').addClass('active');
    $('.cardContainer .card:nth-child(' + $odd + ')').prev().addClass('prev');
    $('.cardContainer .card:nth-child(' + $odd + ')').next().addClass('next');
}

$('.cardContainer .card').on('click', function() {
    if ($('.cardContainer').is(':animated')) {
        return;
    }

    var $slide = $('.cardContainer .active').width();

    if ($(this).hasClass('next')) {
        $('.cardContainer').animate({ left: '-=' + $slide });
    } else if ($(this).hasClass('prev')) {
        $('.cardContainer').animate({ left: '+=' + $slide });
    }

    $(this).removeClass('prev next');
    $(this).siblings().removeClass('prev active next');

    $(this).addClass('active');
    $(this).prev().addClass('prev');
    $(this).next().addClass('next');
});

// KEYBOARD NAV
$('html body').keydown(function(e) {
    if (e.keyCode == 37) { // left
        $('.cardContainer .active').prev().trigger('click');
    } else if (e.keyCode == 39) { // right
        $('.cardContainer .active').next().trigger('click');
    }
});

//RIPPLE EFFECT

var timesClicked = 1;

$(".search").click(function(e) {
    timesClicked++;
    if (timesClicked % 2 == 0) {
        async function display() {
            document.getElementById("search").style.display = "inline-block";
        }
        display().then(function() {
            $("#search").focus();
        });
        display();

        document.querySelector("h2").style.color = "#141414";

        // Setup
        var posX = $(".search").offset().left,
            posY = $(".search").offset().top,
            buttonWidth = $(".search").width(),
            buttonHeight = $(".search").height();

        // Add the element
        $(".search").append("<span class='ripple'></span>");

        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;


        // Add the ripples CSS and start the animation
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");

    } else {
        $(".ripple").remove();
        document.getElementById("search").style.display = "none";
        document.querySelector("h2").style.color = "#ffff";
    }
});