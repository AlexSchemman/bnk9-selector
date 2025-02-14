const dial = document.getElementById("dial") as HTMLDivElement;
const dialIcon = document.getElementById("dial-icon") as HTMLDivElement;
const options = Array.from(document.querySelectorAll(".option")) as HTMLDivElement[];
let selectedIndex = 0;
let angle = 0;

// ✅ Keep the dial icon fixed in the center
dialIcon.style.transform = "rotate(0deg)";

// ✅ Toggle visibility with F24
window.electron.toggleMenu(() => {
  document.getElementById("selector")?.classList.toggle("hidden");

  
  if (options[selectedIndex].textContent?.trim() === "Exit App") {
    console.log("Exiting app...");
    window.electron.exitApp();
  }
});

// ✅ Highlight the initial selection
options[selectedIndex].classList.add("selected");

// ✅ Set the initial positioning
options.forEach((option, index) => {
  const optionAngle = index * 90 - angle;
  option.style.transform = `rotate(${optionAngle}deg) translateY(-90px) rotate(${-optionAngle}deg)`;
});

// ✅ Detect Mouse Wheel Scroll
document.addEventListener("wheel", (event) => {
  console.log({event})
  if (event.deltaY < 0) {
    console.log("Scroll Up - Rotate Left");
    window.electron.sendRotate("left");
  } else {
    console.log("Scroll Down - Rotate Right");
    window.electron.sendRotate("right");
  }
});


// ✅ Rotate dial on scroll
window.electron.rotate((direction) => {
  console.log({direction})
  options[selectedIndex].classList.remove("selected");

  if (direction === "right") {
    selectedIndex = (selectedIndex - 1 + options.length) % options.length;
    angle -= 90;
  } else {
    selectedIndex = (selectedIndex + 1) % options.length;
    angle += 90;
  }

  // Counter-rotate each option so they stay upright
  options.forEach((option, index) => {
    const optionAngle = index * 90 - angle;
    option.style.transform = `rotate(${optionAngle}deg) translateY(-90px) rotate(${-optionAngle}deg)`;
  });

  options[selectedIndex].classList.add("selected");
});
