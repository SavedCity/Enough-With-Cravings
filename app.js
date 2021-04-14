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

    settings.url =
      "https://www.edamam.com/search?q=" + userInput + "&from=0&to=24";

    // clears previous results upon submitting
    $(".intro-image").empty();
    $("#main-container").empty();
    $(".left-text").empty();
    $(".right-text").empty();

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
          .html(data.hits[i].recipe.healthLabels);

        // link for recipe
        let url = $(`<a target="_blank" href= ${data.hits[i].recipe.url}>`)
          .addClass("url")
          .html("Go to recipe");

        // appending to the DOM

        $("#main-container").append(smallDiv);

        smallDiv.append(title);
        smallDiv.append(images);
        underDiv.append(buttonIngredient);
        underDiv.append(buttonHealth);
        smallDiv.append(underDiv);
        smallDiv.append(url);
        // console.log(data.hits[i].recipe.healthLabels);

        //modal
        const modal_container = $("#modal_container");
        const close = $("#close");

        // ingredients modal button
        buttonIngredient.on("click", () => {
          $(".modal").empty();
          for (let x = 0; x < data.hits[i].recipe.ingredientLines.length; x++) {
            let ingredientLabel = $("<li>")
              .addClass("ingredients")
              .html(data.hits[i].recipe.ingredientLines[x]);
            // ul for modal
            let modalUl = $("<ul>").addClass("modalUl");
            console.log(data.hits[i].recipe.ingredientLines[x]);
          }
          modalUl.append(ingredientLabel);
          $(".modal").append(modalUl);
          modal_container.addClass("show");
        });

        // allergens modal button
        buttonHealth.on("click", () => {
          $(".modal").empty();
          for (let x = 0; x < data.hits[i].recipe.healthLabels.length; x++) {
            let healthLabel = $("<li>")
              .addClass("health")
              .html(data.hits[i].recipe.healthLabels);
            // ul for modal
            let modalUl = $("<ul>").addClass("modalUl");
            console.log(data.hits[i].recipe.healthLabels[x]);
          }
          modalUl.append(healthLabel);
          $(".modal").append(modalUl);
          modal_container.addClass("show");
        });

        close.on("click", () => {
          modal_container.removeClass("show");
        });

        // in case image is not availble
        $("img").on("error", function () {
          $(this).attr(
            "src",
            "https://faculty.eng.ufl.edu/dobson-lab/wp-content/uploads/sites/88/2015/11/img-placeholder.png"
          );
        });
        // for (let x = 0; x < data.hits[i].recipe.ingredientLines.length; x++) {
        //   // div for modal
        //   let mainModal = $("<div>").addClass("mainModal");
        //   // ingredient Labels li
        //   let ingredientLabel = $("<li>")
        //     .addClass("ingredients")
        //     .html(data.hits[i].recipe.ingredientLines[x]);
        //   // ul for modal
        //   let modalUl = $("<ul>").addClass("modalUl");
        //
        //   $(".modal-show").append(mainModal);
        //   $(mainModal).append(modalUl);
        //   $(modalUl).append(ingredientLabel);
        //   console.log(data.hits[i].recipe.ingredientLines[x]);
        // }
      }
      const searchTextLeft = $("<h3>")
        .addClass("left-text")
        .text(`Craving some ${userInput} recipes?`);
      $(".nav").prepend(searchTextLeft);
      const searchTextRight = $("<h3>")
        .addClass("right-text")
        .text(`Great ${userInput} recipes here!`);
      $(".nav").prepend(searchTextRight);
    });
  });

  //modal

  const open = $("#open");
  const modal_container = $("#modal_container");
  const close = $("#close");

  open.on("click", () => {
    modal_container.addClass("show");
  });

  close.on("click", () => {
    modal_container.removeClass("show");
  });

  // reload the page on logo click for both header and footer
  $(".utensils").on("click", () => {
    location.reload();
  });
  $(".utensils-top").on("click", () => {
    location.reload();
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
