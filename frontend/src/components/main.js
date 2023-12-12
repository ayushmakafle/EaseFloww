const Navbar =document.querySelector("Navbar");
window.addEventListener("scroll",() => {
    if(window.pageYOffset>60){
        Navbar.classList.add("scrolled");
    }else{
        Navbar.classList.remove("scrolled");
    }
})