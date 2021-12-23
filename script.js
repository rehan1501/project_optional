let skorken = 0;
let skorplayer = 0;
let timeout = "";

let ken = document.getElementById("ninja-ken");
let splashScreen = document.getElementsByClassName("splash")[0];
let startgame = document.getElementsByClassName("start")[0];
let displayskorKen = document.getElementsByClassName("skor-ken")[0];
let displayskorPlayer = document.getElementsByClassName("skor-player")[0];

let reset = document.getElementById("reset");
let batu = document.getElementById("batu");
let gunting = document.getElementById("gunting");
let kertas = document.getElementById("kertas");

if (localStorage.getItem("skorKen")) {
    skorken = localStorage.getItem("skorKen");
    displayskorKen.innerHTML = skorken;
}
if (localStorage.getItem("skorplayer")) {
    skorken = localStorage.getItem("skorplayer");
    displayskorKen.innerHTML = skorplayer;
}



startgame.addEventListener("click", () => {
    splashScreen.style.top = "-120vh";
    splashScreen.style.transition = ".75s";
});

batu.addEventListener("click", () => {
    janken(0);
});
gunting.addEventListener("click", () => {
    janken(1);
});
kertas.addEventListener("click", () => {
    janken(2);
});

reset.addEventListener("click", () => {
    if (confirm("Ini akan memulai ulang permainan, Anda yakin?")) {
        skorken = 0;
        skorplayer = 0;
        displayskorKen.innerHTML = skorken;
        displayskorPlayer.innerHTML = skorplayer;
        localStorage.clear();
    };
});


function janken(tangan) {
    let jariKen = Math.floor(Math.random() * 3);
    switch (jariKen) {
        case 0:
            ken.style.backgroundImage = "url(ken-batu.png)";
            break;
        case 1:
            ken.style.backgroundImage = "url(ken-gunting.png)";
            break;
        default:
            ken.style.backgroundImage = "url(ken-kertas.png)";
            break;
    }
    ken.classList.remove("goyang");
    switch (tangan) {
        case 0:
            if (jariKen === 0) {
                result("draw");
            } else if (jariKen == 1) {
                result("player");
            } else {
                result("ken");
            }
            break;
        case 1:
            if (jariKen === 0) {
                result("ken");
            } else if (jariKen == 1) {
                result("draw");
            } else {
                result("player");
            }
            break;
        default:
            if (jariKen === 0) {
                result("player");
            } else if (jariKen == 1) {
                result("ken");
            } else {
                result("draw");
            }
            break;
    }
}

function result(who) {
    clearTimeout(timeout);

    switch (who) {
        case "ken":
            skorken++;
            localStorage.setItem("skorKen", skorken);
            displayskorKen.innerHTML = skorken;
            console.log("Ninja Ken Menang");
            break;
        case "player":
            skorplayer++;
            localStorage.setItem("SKORPLAYER", skorplayer);
            displayskorPlayer.innerHTML = skorplayer;
            console.log("Anda Menang");
            break;
        default:
            console.log("seri");
            break;
    }

    timeout = setTimeout(() => {
        ken.style.removeProperty("background-image");
        ken.classList.add("goyang");
    }, 3000);
}