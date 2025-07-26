const alertBtn = document.getElementById("liveAlertBtn");
const alertBox = document.getElementById("miAlerta");

alertBtn.addEventListener("click", function () {
    alertBox.classList.remove("d-none");  
    alertBox.classList.add("show");       
});