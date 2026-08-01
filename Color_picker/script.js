const colorSchemeSelector = document.querySelector(".color-scheme-default");
const colorSchemeList = document.querySelector(".color-scheme-list");
const getColorBtn = document.querySelector("#get-color-btn");
const colorPicker = document.querySelector(".color-picker");
const hexTextList = document.querySelectorAll(".hex");
const colorBoxList = document.querySelectorAll(".color-box");

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

async function getColorScheme(color, mode) {
    color = colorPicker.value.slice(1);
    const selected = document.querySelector(".selected");
    mode = selected.classList[0];

    const url = `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=5`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        for (let i = 0; i < hexTextList.length; i++) {
            hexTextList[i].textContent = result.colors[i].hex.value;
            colorBoxList[i].style.backgroundColor = result.colors[i].hex.value;
        }
    
    } catch (error) {
        console.error(error.message);
    }
}

getColorScheme()

getColorBtn.addEventListener("click", function() {
    getColorScheme()
})