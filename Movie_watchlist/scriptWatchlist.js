const mainDiv = document.getElementById("main")


async function getMovieData(searchText) {

  const url = `https://www.omdbapi.com/?t=${searchText}&apikey=955d9993`;
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()
    if(result.Response === "False") {
      mainDiv.innerHTML = 
      `
      <div class="backgroundText">Unable to find what you’re looking for. Please try another search.</div>
      `

    } else {
        console.log(result)
        mainDiv.insertAdjacentHTML("beforeend", 
          `
            <div class="backgroundMovies">
              <div class="movieEl">
                  
                  <img class="movieElImg" src=${result.Poster}>

                  <div class="movieElBody">
                      <div class="movieElHeader">
                          <div class="movieElName">${result.Title}</div>
                          <div class="movieElRating">
                              <img class="starIcon" src="./star.png">
                              <div class="movieElNote">${result.imdbRating}</div>
                          </div>
                      </div>

                      <div class="movieElSubHeader">
                          <div class="movieElLength">${result.Runtime}</div>
                          <div class="movieElgenres">${result.Genre}</div>
                          <div class="movieElWatchlist">
                              <img class="plusIcon" id="plusIcon" src="./plus.png">
                              <div class="removeFromWatchlist" id="removeFromWatchlist">Unwatch</div>
                          </div>
                      </div>

                      <div class="movieElDescription">
                          ${result.Plot}
                      </div>

                  </div>
              </div>
            </div>
          `
        )

        const movieCard = mainDiv.lastElementChild
        const unwatch = movieCard.querySelector(".removeFromWatchlist")

        unwatch.addEventListener("click", () => {
            localStorage.removeItem(searchText)
            movieCard.remove()
        })
    }
    
  } catch (error) {
    console.error(error.message)
  }
}


if(localStorage.length > 0) {
    console.log(localStorage)
    for (let i = 0; i < localStorage.length; i++) {
        const movieTitle = localStorage.key(i)
        console.log(movieTitle)
        getMovieData(movieTitle)
    }

}