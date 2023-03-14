const canvas = document.getElementById("canvas")
canvas.height = 500; //window.innerHeight
canvas.width = 300; //window.innerWidth

const ctx = canvas.getContext("2d")

let prevX = null
let prevY = null

ctx.lineWidth = 5

let draw = false

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// Saving drawing as image
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = "sketch.png"
    a.click()
})

let shareBtn = document.querySelector(".share")
shareBtn.addEventListener("click", () => {
    const shareUrl = canvas.toDataURL("imag/png")
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("doodle", shareUrl);
    const newUrl = `${window.location.protocol + '//' + window.location.hostname + window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
    
    const shareModals = document.querySelectorAll(".share-modal");
    shareModals.forEach(shareModal => {
        const copyBox = shareModal.querySelector(".share-modal__copy-box");
        copyBox.value = newUrl;

        shareModal.classList.add("visible");
    });
})


let copyBtn = document.querySelector(".copy")
copyBtn.addEventListener("click", () => {
    const copyBox = document.querySelector(".share-modal .share-modal__copy-box");

    copyBox.select();
    copyBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyBox.value);

})

let closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", () => {
    let shareModals = document.querySelectorAll(".share-modal");
    shareModals.forEach(shareModal => {
        shareModal.classList.remove("visible");
    });
})

canvas.addEventListener("mousedown", (e) => draw = true)
canvas.addEventListener("mouseup", (e) => draw = false)
canvas.addEventListener("touchstart", (e) => draw = true)
canvas.addEventListener("touchend", (e) => {
    draw = false
    prevX = null
    prevY = null
})

canvas.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX - canvas.offsetLeft
        prevY = e.clientY - canvas.offsetTop
        return
    }

    let currentX = e.clientX - canvas.offsetLeft
    let currentY = e.clientY - canvas.offsetTop

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

canvas.addEventListener("touchmove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.touches[0].clientX - canvas.offsetLeft
        prevY = e.touches[0].clientY - canvas.offsetTop
        return
    }

    let currentX = e.touches[0].clientX - canvas.offsetLeft
    let currentY = e.touches[0].clientY - canvas.offsetTop

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

const searchParams = new URLSearchParams(window.location.search);
const doodle = searchParams.get("doodle");

if (doodle !== null) {
    var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    img.src = doodle;
}

let loaders = document.querySelectorAll(".loader");
loaders.forEach(loader => {
    loader.classList.remove("visible");
});