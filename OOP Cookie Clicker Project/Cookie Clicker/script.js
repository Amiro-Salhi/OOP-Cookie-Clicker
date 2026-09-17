let cookies = 0;

const cookiebutton = document.getElementById("cookie")

cookiebutton.addEventListener("click" , increase_counter)

function increase_counter () {
    cookies = cookies + 1
    document.getElementById("counter").innerHTML = cookies + " " + "Cookies"
};
