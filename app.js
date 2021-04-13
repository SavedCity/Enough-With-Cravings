$(() => {
  //                      //
  // settings for the API //
  let settings = {
    async: true,
    crossDomain: true,
    url: null,
    method: "GET",
    headers: {
      "x-rapidapi-key": "6acd4a796fmsh9d9c5c055289025p12f47ejsnf311c06d1ff9",
      "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
    },
  };

  //button to retrieve data //
  $("form").on("submit", (event) => {
    let userInput = $("#search").val();

    settings.url = "https://www.edamam.com/search?q=" + userInput;

    // clears previous results upon submitting
    $("#main-container").empty();
    // prevents from refreshing on every click //
    event.preventDefault();
    // clears search bar after submitting
    $("form").trigger("reset");

    $.ajax(settings).then((data) => {
      for (let i = 0; i < data.hits.length; i++) {
        // Image
        let images = $("<img>")
          .addClass("images")
          .attr("src", data.hits[i].recipe.image);

        // Title
        let title = $("<h3>").addClass("title").html(data.hits[i].recipe.label);

        // ingredient button
        let buttonIngredient = $("<button>")
          .addClass("underBtn")
          .text("Ingredients");

        //  heatlh button
        let buttonHealth = $("<button>").addClass("underBtn").text("Allergens");

        // div for under buttons
        let underDiv = $("<div>").addClass("underDiv");

        // small div containing each result
        let smallDiv = $("<div>").addClass("small");

        // div for modal
        let mainModal = $("<div>").addClass("mainModal");

        // ul for modal
        let modalUl = $("<ul>").addClass("modalUl");

        // ingredient Labels li
        let ingredientLabel = $("<li>")
          .addClass("ingredients")
          .html(data.hits[i].recipe.ingredientLines);

        // Health Labels li
        let healthLabel = $("<li>")
          .addClass("health")
          .html(data.hits[i].recipe.healthLabel);

        // link for recipe
        let url = $(`<a target="_blank" href= ${data.hits[i].recipe.url}>`)
          .addClass("url")
          .html("Go to recipe");

        // appending to the DOM
        // $("#main-container").append(mainModal);
        // mainModal.append(modalUl);
        // modalUl.append(ingredientLabel);

        $("#main-container").append(smallDiv);
        smallDiv.append(title);
        smallDiv.append(images);
        underDiv.append(buttonIngredient);
        underDiv.append(buttonHealth);
        smallDiv.append(underDiv);
        smallDiv.append(url);
        console.log(data.hits[i].recipe);

        // in case image is not availble
        $("img").on("error", function () {
          $(this).attr(
            "src",
            "https://faculty.eng.ufl.edu/dobson-lab/wp-content/uploads/sites/88/2015/11/img-placeholder.png"
          );
        });
      }
    });
  });

  // STICKY NAV //
  let nav = $(".nav").offset().top;

  // The body would jump upwards so had to fix that
  $(".nav").wrap(".navPlaceholder");

  $(window).on("scroll", () => {
    let scrollValue = $(window).scrollTop();

    if (scrollValue > nav) {
      $(".nav").addClass("sticky");
    } else {
      $(".nav").removeClass("sticky");
    }
  });
});
