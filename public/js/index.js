$(document).on("keypress", function (event) {
  if (event.which == 13) {
    var userInput = $("#search").val().trim();
    var userSearch = encodeURIComponent(userInput);
    console.log(userSearch);

    event.preventDefault();

    $.ajax("/api/search", {
      type: "POST",
      data: {
        search: userInput,
        searchEncoded: userSearch,
      },
    }).then(function () {
      // Reload the page to get the updated list
      // location.reload();
      getData();
    });
  }
});

// Display fact checks from database
function getData() {
  $.get("/api/display", function (data) {
    $("#factchecks").empty();
    $("#factchecks").removeAttr("style");
    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
        var html = `
        <div class="card">
            <div class="content">
                <div class="card-back">
                    <div class="header">${data[i].title}</div>
                    <div class="meta">${data[i].publisher}</div>
                    <div class="description">
                        <p>${data[i].text}</p>
                    </div>
                </div>
                <div class="card-front ${data[i].id}">
                    <div class="header">${data[i].rating}
                </div>
            </div>
      </div>
      `;
        //   <div class="extra content">
        //       ${data[i].rating}
        //     </div>
        //   <a href="${data[i].url}"></a>
        var cardnum = JSON.stringify(data[i].id);
        // var cardnum = document.getElementsByClassName(data[i].id);
        // console.log(cardnum);
        $("#factchecks").prepend(html);
        if (`${data[i].rating}` === "False") {
          $("." + cardnum).addClass("false");
        }
        if (`${data[i].rating}` === "True") {
          $("." + cardnum).addClass("true");
        }
        if (`${data[i].rating}` === "Mostly false") {
          $("." + cardnum).addClass("mostlyFalse");
        }
        if (
          `${data[i].rating}` === "Half true" ||
          `${data[i].rating}` === "Partly False"
        ) {
          $("." + cardnum).addClass("warning");
        }
        if (`${data[i].rating}` === "Satire") {
          $("." + cardnum).addClass("satire");
        }
        // if (`${data[i].rating}` == "True") {
        //   $(".card-front").addClass("true");
        // }
        // if (`${data[i].rating}` == "Half" || "Missing Context" || "Partly") {
        //   $(".card-front").addClass("warning");
        // }
      }
      var query = `"${data[0].query}"`;
      $("#queryName").html(query.toUpperCase());

      cardflip();
    }
    if (data == 0) {
      alert("No Articles Found.");
    }
  });
}
// CARD FLIP
function cardflip() {
  var $num = $(".cardContainer .card").length;
  var $even = $num / 2;
  var $odd = ($num + 1) / 2;
  console.log($even);
  console.log($odd);
  if ($num % 2 == 0) {
    $(".cardContainer .card:nth-child(" + $even + ")").addClass("active");
    $(".cardContainer .card:nth-child(" + $even + ")")
      .prev()
      .addClass("prev");
    $(".cardContainer .card:nth-child(" + $even + ")")
      .next()
      .addClass("next");
  } else {
    $(".cardContainer .card:nth-child(" + $odd + ")").addClass("active");
    $(".cardContainer .card:nth-child(" + $odd + ")")
      .prev()
      .addClass("prev");
    $(".cardContainer .card:nth-child(" + $odd + ")")
      .next()
      .addClass("next");
  }

  $(".cardContainer .card").on("click", function () {
    if ($(".cardContainer").is(":animated")) {
      return;
    }

    var $slide = $(".cardContainer .active").width() + 400;

    if ($(this).hasClass("next")) {
      $(".cardContainer").animate({ left: "-=" + $slide });
    } else if ($(this).hasClass("prev")) {
      $(".cardContainer").animate({ left: "+=" + $slide });
    }

    $(this).removeClass("prev next");
    $(this).siblings().removeClass("prev active next");

    $(this).addClass("active");
    $(this).prev().addClass("prev");
    $(this).next().addClass("next");
  });
}

// KEYBOARD NAV
$("html body").keydown(function (e) {
  if (e.keyCode == 37) {
    // left
    $(".cardContainer .active").prev().trigger("click");
  } else if (e.keyCode == 39) {
    // right
    $(".cardContainer .active").next().trigger("click");
  }
});

//RIPPLE EFFECT

var timesClicked = 1;

$(".search").click(function (e) {
  timesClicked++;
  if (timesClicked % 2 == 0) {
    async function display() {
      document.getElementById("search").style.display = "inline-block";
    }
    display().then(function () {
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
    $(".ripple")
      .css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + "px",
        left: x + "px",
      })
      .addClass("rippleEffect");
  } else {
    $(".ripple").remove();
    document.getElementById("search").style.display = "none";
    document.querySelector("h2").style.color = "#ffff";
  }
});
