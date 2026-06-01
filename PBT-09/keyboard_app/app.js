const images = [
    "https://picsum.photos/id/1015/900/500",
    "https://picsum.photos/id/1025/900/500",
    "https://picsum.photos/id/1035/900/500",
    "https://picsum.photos/id/1045/900/500",
    "https://picsum.photos/id/1055/900/500",
    "https://picsum.photos/id/1065/900/500",
    "https://picsum.photos/id/1075/900/500",
    "https://picsum.photos/300/220?16",
    "https://picsum.photos/200/300?21"
];

let currentIndex = 0;
let playing = false;
let slideshow = null;

const mainImage =document.querySelector("#mainImage");
const prevBtn =document.querySelector("#prevBtn");
const nextBtn =document.querySelector("#nextBtn");
const playBtn =document.querySelector("#playBtn");
const overlay =document.querySelector("#paletteOverlay");
const commandInput =document.querySelector("#commandInput");
const commandList =document.querySelector("#commandList");
const commands = [
    "Next Image",
    "Previous Image",
    "Play Slideshow",
    "Pause Slideshow",
    "Jump First Image"
];

function renderImage(){
    mainImage.src =images[currentIndex];
}
renderImage();
function nextImage(){
    currentIndex =(currentIndex + 1)% images.length;
    renderImage();
}
function prevImage(){
    currentIndex =(currentIndex - 1 + images.length)% images.length;
    renderImage();
}
function toggleSlideshow(){
    playing = !playing;
    playBtn.textContent =playing? "Pause": "Play";
    if(playing){
        slideshow =setInterval(nextImage,2000);
    }
    else{
        clearInterval(slideshow);
    }
}
prevBtn.addEventListener("click",prevImage);

nextBtn.addEventListener("click",nextImage);

playBtn.addEventListener("click",toggleSlideshow);

/* Keyboard navigation */

document.addEventListener("keydown",e => {
        /* Ctrl + K */
        if(e.ctrlKey && e.key.toLowerCase() === "k"){
            e.preventDefault();
            openPalette();
            return;
        }
        /* Escape */
        if(e.key === "Escape"){

            closePalette();
            return;
        }
        /* Ignore gallery keys
           khi đang gõ input */
        if(document.activeElement=== commandInput){
            return;
        }
        /* Left */
        if(e.key === "ArrowLeft"){
            prevImage();
        }
        /* Right */
        if(e.key === "ArrowRight"){
            nextImage();
        }
        /* Space */
        if(e.code === "Space"){
            e.preventDefault();
            toggleSlideshow();
        }
        /* 1-9 */
        if(/^[1-9]$/.test(e.key)){
            const index =
                Number(e.key) - 1;
            if(index <images.length){
                currentIndex =index;
                renderImage();
            }
        }
    }
);

function openPalette(){
    overlay.classList.remove("hidden" );
    commandInput.value = "";
    renderCommands("");
    commandInput.focus();
}
function closePalette(){
    overlay.classList.add("hidden");
}

function renderCommands(keyword){
    commandList.textContent = "";
    const filtered =
        commands.filter(cmd =>
                cmd
                    .toLowerCase()
                    .includes(
                        keyword.toLowerCase()
                    )
        );
    filtered.forEach(cmd => {
        const li =document.createElement("li");
        li.textContent = cmd;
        commandList.appendChild(
            li
        );
    });
}

commandInput.addEventListener("input",() => {
        renderCommands(commandInput.value);
    }
);

commandInput.addEventListener("keydown", e => {
        if(e.key === "Enter"){
            const first =commandList.querySelector("li");
            if(first){
                alert(
                    `Execute: ${first.textContent}`
                );
                closePalette();
            }
        }
    }
);

document.querySelector("#openPalette").addEventListener("click",openPalette);