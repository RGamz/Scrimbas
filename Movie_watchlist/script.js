const searchBtn = document.getElementById("btnSearch")
const searchBarText = document.getElementById("site-search")
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
        mainDiv.innerHTML += 
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
                              <img class="plusIcon" src="./plus.png">
                              <div class="addToWatchlist">Watchlist</div>
                          </div>
                      </div>

                      <div class="movieElDescription">
                          ${result.Plot}
                      </div>

                  </div>
              </div>
            </div>
          `


    }
    
  } catch (error) {
    console.error(error.message)
  }
}

searchBtn.addEventListener("click", function() {
    const searchValue = searchBarText.value.trim().toLowerCase().replace(/\s+/g, "+");
    getMovieData(searchValue)
})


