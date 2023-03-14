const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

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
    const newUrl = `${window.location.toString().substr(0, window.location.toString().indexOf('?'))}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
    
    const shareModals = document.querySelectorAll(".share-modal");
    shareModals.forEach(shareModal => {
        const copyBox = shareModal.querySelector(".share-modal__copy-box");
        copyBox.value = newUrl;

        shareModal.classList.add("visible");
    });
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
canvas.addEventListener("touchend", (e) => draw = false)

canvas.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

const searchParams = new URLSearchParams(window.location.search);
const doodle = searchParams.get("doodle");
console.log(doodle);

var img = new Image();
img.onload = function(){
  ctx.drawImage(img,0,0); // Or at whatever offset you like
};
img.src = doodle;

let loaders = document.querySelectorAll(".loader");
loaders.forEach(loader => {
    loader.classList.remove("visible");
});