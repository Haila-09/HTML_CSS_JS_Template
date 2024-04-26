// check if there's localstrorage color option
if(localStorage.getItem("option-box") !== null){
    document.documentElement.style.setProperty("--main-color" , localStorage.getItem("option-box"));
    // if localstorage not null we will remove active class
    document.querySelectorAll(".colors-list li").forEach(function (el){
        el.classList.remove("active")
           // add class active on element
        if(el.dataset.color == localStorage.getItem("option-box")){
            el.classList.add("active")
        }
    });
}
// random background option
let backGroundOption = true;

// variable to control the background interval
let backgroundInterval;

// check if there's localstorage background item
let storageBackground = localStorage.getItem("randomBackground");
if(storageBackground !== null){
    if(storageBackground === "true"){
        backGroundOption = true;
    }
    else {
        backGroundOption = false;
    }
    document.querySelectorAll(".box span").forEach((el)=>{
        el.classList.remove("active")
    })
    if(storageBackground === "true"){
        document.querySelector(".box .yes").classList.add("active")
    }
    else {
        document.querySelector(".box .no").classList.add("active")
    }
  
}
// check if there's localstorage value 
if(localStorage.getItem("show-Bulltes") !== null){
    // document.querySelectorAll(".option-box .show")
   document.querySelectorAll(".option-box .box.show span").forEach((span)=> {
        // span.addEventListener("load" , ((e)=> {
        if(localStorage.getItem("show-Bulltes") == "block"){
            document.querySelector(".box.show .yes").classList.add("active");
        }
        else {
            document.querySelector(".box.show .no").classList.add("active");
        }
        // }))
    

   })
    console.log(localStorage.getItem("show-Bulltes"))

    if(localStorage.getItem("show-Bulltes") == "block"){
        document.querySelectorAll(".nav-bulltes .bullets").forEach((blt)=> {
            blt.style.display = "block";
        })
    }
    else {
        document.querySelectorAll(".nav-bulltes .bullets").forEach((blt)=> {
            blt.style.display = "none";
        })
    }
}

// click on toggle settings gear
document.querySelector(".setting .ico").onclick = function (){
    this.classList.toggle("fa-spin");
   document.querySelector(".setting").classList.toggle("colsed");
}
// switch color
let listbox = document.querySelectorAll(".colors-list li");
// loop for all item list
listbox.forEach(function(el){
    // add event each li
    el.addEventListener("click", function(e){
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);
        localStorage.setItem("option-box" , e.target.dataset.color);
        // remove active class from all children
        e.target.parentElement.querySelectorAll(".colors-list li").forEach(function (el){
        el.classList.remove("active");
    })
    // add active class on target element
        e.target.classList.add("active")
    })
});

// switch round background option 
let boxBackground = document.querySelectorAll(".box span");

boxBackground.forEach((element)=>{
    element.parentElement.addEventListener("click",((e)=>{
        element.classList.remove("active")
        e.target.classList.add("active")
        if(e.target.dataset.background == "yes"){
            backGroundOption == true;
            randomizeImgs()
            localStorage.setItem("randomBackground" , true)
        }
        else {
            backGroundOption == false;
            clearInterval(backgroundInterval)
            localStorage.setItem("randomBackground", false)
        }
    }))
})
// start show bullets 
// end show bullets
let boxBullets = document.querySelectorAll(".option-box .show span");

// console.log(boxBullets)
boxBullets.forEach((el)=> {
    console.log(el)
    el.addEventListener("click" , ((e)=> {
        if(e.target.dataset.show == "block"){
            document.querySelectorAll(".nav-bulltes .bullets").forEach((blt)=> {
                blt.style.display = "block";
                localStorage.setItem("show-Bulltes" , "block")
            })
        }
         else {
            document.querySelectorAll(".nav-bulltes .bullets").forEach((blt)=> {
                blt.style.display = "none";
                localStorage.setItem("show-Bulltes" , "none")
            })
         }
        
    }))
})
// reset botton
document.querySelector(".reset").onclick = function () {
    localStorage.clear()
    localStorage.removeItem("option-box");
    localStorage.removeItem("randomBackground");
    localStorage.removeItem("show-Bulltes");
    window.location.reload;
   
}

// start landing pages    
let land = document.querySelector(".landing")

let Arr = ["01.ad.jpg" ,"02.ad.jpg" , "03.ad.jpg" ,"06.jpeg"]

function randomizeImgs(){
    if(backGroundOption == true){
        backgroundInterval = setInterval (() => {
            let randomNumber = Math.floor(Math.random() * Arr.length)
            land.style.backgroundImage = 'url("imgs/'+Arr[randomNumber]+'")'
        },1000)
    }
}   
randomizeImgs()

// start toggle links

var tLinks = document.querySelector(".header .links");
var toggleMenu = document.querySelector(".header .toggle-menu");

toggleMenu.onclick = function (e) {
    e.stopPropagation();
  
    tLinks.classList.toggle("open");
    toggleMenu.classList.toggle("menu-Active");
  
}
document.body.addEventListener("click" , ((e)=> {

    if(e.target !== toggleMenu && e.target !== tLinks){
        // console.log(e.target)
        if(tLinks.classList.contains("open")){
            tLinks.classList.remove("open");
            toggleMenu.classList.remove("menu-Active")
        }
     
    }
}));
tLinks.onclick = function (e) {
    e.stopPropagation()
}







// end toggle links

// start Skill
let allSkills = document.querySelector(".our-skill");


window.onscroll = function (){
    let skillScrollTop = allSkills.offsetTop;
    // console.log(skillScrollTop);
    let skillSkillHeight = allSkills.offsetHeight;
    // console.log(skillSkillHeight);
    let innerScrollHight = this.innerHeight;
    console.log(innerScrollHight)
    let scrollYPage = window.pageYOffset;
    // console.log(scrollYPage)
    if(skillScrollTop > (skillSkillHeight + scrollYPage - innerScrollHight)){
        document.querySelectorAll(".our-skill .box span").forEach((element)=>{
        element.style.setProperty("width", element.dataset.progress)
        })
    }
}
// end our skill

// start popup
let allImage = document.querySelectorAll(".our-gallery .images-box img");
allImage.forEach((img)=>{
    img.addEventListener("click" , ((e)=>{
        // create overllay
        let overllay = document.createElement("div");
        overllay.className = "overllay";

        // append overllay in page
        document.body.appendChild(overllay)

        // create poPup
        let poPup = document.createElement("div");
        poPup.className = "popUp";

        // create img
        let theImg = document.createElement("img");
        theImg.src = img.src;

        // append the popup in overllay
        overllay.appendChild(poPup);

        if(img.hasAttribute("alt")){
            let title = document.createElement("div");
            title.className = "title";
            title.textContent = img.getAttribute("alt");
            poPup.appendChild(title);

              // create to close button 
            let btn = document.createElement("div");

            // add class to close button 
            btn.className = "btn";

            // add close button to title box
            title.appendChild(btn);
          
            // add text to close button
            btn.textContent = "X";

            // close popup
            btn.addEventListener("click",function (e){
                if(e.target.className == "btn"){
                    e.target.parentElement.parentElement.remove()
                }
                overllay.remove()
            })
        }
        poPup.appendChild(theImg)
    }))
});
// end popup

// select All links
const allLinks = document.querySelectorAll(".landing ul a ")
// select all bulltes
const  bulluts = document.querySelectorAll(".nav-bulltes .bullets");

function scrollToSomeWhere(element){
    
   element.forEach((ele)=> {
    ele.addEventListener("click" , ((e)=> {
        e.preventDefault()
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        })
    }))
    }) 
}
scrollToSomeWhere(bulluts);
scrollToSomeWhere(allLinks);

// handle active state
// تطبيق الfunction
// function handleActive(ev){
//     ev.target.parentElement.document.querySelectorAll("ev").forEach((el)=> {
//         el.classList.remove("active");
//     })
//     // Add Active class On self
//         ev.target.classList.add("active");
// }
// removeActiveClass()



