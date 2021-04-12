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
    // prevent from refreshing on every click //
    $("#main-container").empty();
    event.preventDefault();
    $("form").trigger("reset");

    $.ajax(settings).then((data) => {
      for (let i = 0; i < data.hits.length; i++) {
        // Image
        let images = $("<img>")
          .addClass("images")
          .attr("src", data.hits[i].recipe.image);

        // Title
        let title = $("<h3>").addClass("title").html(data.hits[i].recipe.label);

        // health label button
        let buttonHealth = $("<button>")
          .addClass("healthBtn")
          .text("Allergens");

        // small div
        let smallDiv = $("<div>").addClass("small");

        // div for modal
        let mainModal = $("<div>").addClass("mainModal");

        // ul for modal
        let modalUl = $("<ul>").addClass("modalUl");

        // Health Labels li
        let healthLabel = $("<li>")
          .addClass("health")
          .html(data.hits[i].recipe.healthLabels);

        // appending to the DOM
        // $("#main-container").append(mainModal);
        // mainModal.append(modalUl);
        // modalUl.append(healthLabel);

        $("#main-container").append(smallDiv);
        smallDiv.append(title);
        smallDiv.append(images);
        smallDiv.append(buttonHealth);
        console.log(data.hits[i].recipe);
      }
    });
  });
});
