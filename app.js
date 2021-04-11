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
  $(".go").on("click", (event) => {
    let userInput = $("#search").val();

    settings.url = "https://www.edamam.com/search?q=" + userInput;
    // prevent from refreshing on every click //
    // event.preventDefault();

    $.ajax(settings).then((data) => {
      for (let i = 0; i < data.hits.length; i++) {
        // creating a container for every result
        let squares = $("<img>")
          .addClass("containers")
          .attr("src", data.hits[i].recipe.image);

        // appending it to the DOM
        $("#main-container").append(squares);
        console.log(data.hits[i].recipe.image);
      }
      console.log(data);
    });
  });
});
