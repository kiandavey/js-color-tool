const hexInputEl = document.getElementById("hexInput");
const inputColorEl = document.getElementById("inputColor");
const alteredColorEl = document.getElementById("alteredColor");
const alteredColorTextEl = document.getElementById("alteredColorText");
const sliderTextEl = document.getElementById("sliderText");
const sliderEl = document.getElementById("slider");
const lightenTextEl = document.getElementById("lightenText");
const darkenTextEl = document.getElementById("darkenText");
const toggleBtnEl = document.getElementById("toggleBtn");

toggleBtnEl.addEventListener("click", () => {
    if(toggleBtnEl.classList.contains('toggled')) {
        toggleBtnEl.classList.remove('toggled');
        lightenTextEl.classList.remove('unselected');
        darkenTextEl.classList.add('unselected');
    } else {
        toggleBtnEl.classList.add('toggled');
        lightenTextEl.classList.add('unselected');
        darkenTextEl.classList.remove('unselected');
    }
});

hexInputEl.addEventListener("input", () => {
    let value = hexInputEl.value
    if(!value.startsWith("#")) value = "#" + value;

    if(inputChecker(value)) {
        inputColorEl.style.backgroundColor = value;
    } else {
        inputColorEl.style.backgroundColor = "";
    }

    reset(); 
});

const inputChecker = (input) => {
    if (!input) return false;

    if (input.startsWith("#")) {
        input = input.slice(1);
    }

    input = input.toLowerCase();

    for (let char of input) {
        if (!('0123456789abcdef'.includes(char))) {
            return false;
        }
    }
    return input.length === 3 || input.length === 6;
}

const convertHexToRGB = (hex) => {
    if(!inputChecker(hex)) return null;

    if (hex.startsWith("#")) hex = hex.slice(1);

    if(hex.length !== 3 && hex.length !== 6) return;

    if(hex.length === 3) {
        hex = hex[0] + hex[0]
        + hex[1] + hex[1]
        + hex[2] + hex[2];
    }

    const r  = parseInt(hex.substring(0,2), 16);
    const g  = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);

    return {r, g, b};
} 

const convertRGBToHex = (r, g, b) => {
  const firstPair = r.toString(16).padStart(2, "0");
  const secondPair = g.toString(16).padStart(2, "0");
  const thirdPair = b.toString(16).padStart(2, "0");
  
  return "#" + firstPair + secondPair + thirdPair;
}

const alterColor = (hex, percentage) => {
    const rgb = convertHexToRGB(hex);
    if (!rgb) return null;
    
    const {r,g,b} = rgb;

    const adjust = Math.round(255 * (percentage / 100));

    const newR = Math.min(255, Math.max(0, r + adjust));
    const newG = Math.min(255, Math.max(0, g + adjust));
    const newB = Math.min(255, Math.max(0, b + adjust));

    return convertRGBToHex(newR, newG, newB);
}

sliderEl.addEventListener("input", () => {

    if(!inputChecker(hexInputEl.value)) return;

    sliderTextEl.textContent = `${sliderEl.value}%`;

    const valueAddition  = 
    toggleBtnEl.classList.contains('toggled') ? 
    -sliderEl.value 
    : sliderEl.value;

    const alteredHex = alterColor(hexInputEl.value, valueAddition)
    alteredColorEl.style.backgroundColor = alteredHex;
    alteredColorTextEl.textContent = `Altered Color (${alteredHex})`; 
});

const reset = () =>{ 
  sliderEl.value = 0;
  sliderTextEl.innerText = `0%`;
  alteredColorEl.style.backgroundColor = hexInputEl.value;
  alteredColorTextEl.innerText = `Altered Color (${hexInputEl.value})`; 
}