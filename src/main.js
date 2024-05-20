function main() {
    let model = new Model();
    let view = new ViewBanCo(model.row, model.col);
    let controller = new ControllerBanCo(model, view);
}

main();

// bổ sung các pop up hướng dẫn và giới thiệu thành viên bên dưới
function popUpEvent(event) {
    if (event.target === btnShowPopUp) {
        divPopUp.style.visibility = "visible";
    }
    if (event.target === btnClosePopUp) {
        divPopUp.style.visibility = "hidden";
    }
    if (event.target === btnShowGuide) {
        divGuide.style.visibility = "visible";
    }
    if (event.target === btnCloseGuide) {
        divGuide.style.visibility = "hidden";
    }
}

let btnShowPopUp = document.getElementById("btnMyInfor");
let btnClosePopUp = document.getElementById("btnClosePopUp");

let divPopUp = document.getElementById("popUpMyInfor");

btnShowPopUp.addEventListener("click", popUpEvent);
btnClosePopUp.addEventListener("click", popUpEvent);

let btnShowGuide = document.getElementById("btnGuide");
let btnCloseGuide = document.getElementById("btnCloseGuide");

let divGuide = document.getElementById("popUpGuide");

btnShowGuide.addEventListener("click", popUpEvent);
btnCloseGuide.addEventListener("click", popUpEvent);