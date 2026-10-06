const searchBtn = document.getElementById("btnSearch")
const searchBarText = document.getElementById("site-search")

async function getMovieData(searchText) {

  const url = `https://www.omdbapi.com/?t=${searchText}&apikey=955d9993`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

searchBtn.addEventListener("click", function() {
    const searchValue = searchBarText.value.trim().toLowerCase().replace(/\s+/g, "+");
    console.log(searchValue)
    getMovieData(searchValue)
    
})


