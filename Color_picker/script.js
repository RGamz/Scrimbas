const colorSchemeSelector = document.querySelector(".color-scheme-default");
const colorSchemeList = document.querySelector(".color-scheme-list")

colorSchemeSelector.addEventListener("click", function() {
    colorSchemeList.classList.toggle("active");
})

colorSchemeList.addEventListener("click", function(event) {
    const selected = document.querySelector(".selected")
    const currentColorScheme = document.querySelector(".current-color-scheme")

    selected.classList.toggle("selected");
    const clickedElement = event.target; 
    clickedElement.closest("li").classList.toggle("selected");
    currentColorScheme.textContent = clickedElement.closest("li").firstElementChild.textContent;
    colorSchemeList.classList.toggle("active");
})