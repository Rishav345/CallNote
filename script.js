let addNote = document.querySelector(".add");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".close-btn");
const form = document.querySelector("form");
const imageInput = document.querySelector('input[placeholder="https://example.com"]');
const nameInput = document.querySelector('input[placeholder="Enter Full Name"]');
const townInput = document.querySelector('input[placeholder="Enter HomeTown"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment"]');
const categoryInputs = document.querySelectorAll('input[name="category"]');
let upbtn = document.querySelector(".up")
let downbtn = document.querySelector(".down")
let stack = document.querySelector(".stack")
let del = document.querySelector(".c1")

addNote.addEventListener("click", () => {
    formContainer.style.display = "initial";
});

closeForm.addEventListener("click", () => {
    formContainer.style.display = "none";
});

function saveToLocal(obj) {
    if (localStorage.getItem("tasks") === null) {
        let newtask = [];
        newtask.push(obj);
        localStorage.setItem("tasks", JSON.stringify(newtask));
    }
    else {
        let newtask = localStorage.getItem("tasks");
        newtask = JSON.parse(newtask);
        newtask.push(obj);
        localStorage.setItem("tasks", JSON.stringify(newtask));
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const imgUrl = imageInput.value.trim();
    const name = nameInput.value.trim();
    const town = townInput.value.trim();
    const purpose = purposeInput.value.trim();
    categoryInputs.forEach((e) => {
        if (e.checked) {
            selected = e.value;
        }
    });


    if (imgUrl === "") {
        alert("Field Cant be Empty");
        return
    }
    if (name === "") {
        alert("Field Cant be Empty");
        return
    }
    if (town === "") {
        alert("Field Cant be Empty");
        return
    }
    if (purpose === "") {
        alert("Field Cant be Empty");
        return
    }

    form.reset();
    formContainer.style.display = "none";

    saveToLocal({
        imgUrl,
        name,
        town,
        purpose,
        selected,
    });
    showTasks()
});

function showTasks() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks.forEach((e) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add(`${e.selected}`)

        // img div
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img");

        const img = document.createElement("img");
        img.src = e.imgUrl;

        imgDiv.appendChild(img);

        // h1
        const name = document.createElement("h1");
        name.textContent = e.name;

        // location div
        const location = document.createElement("div");
        location.classList.add("location");

        const loc1 = document.createElement("p");
        loc1.textContent = "Home Town";

        const loc2 = document.createElement("p");
        loc2.textContent = e.town;

        location.append(loc1, loc2);

        // booking div
        const booking = document.createElement("div");
        booking.classList.add("booking");

        const book1 = document.createElement("p");
        book1.textContent = "Purpose";

        const book2 = document.createElement("p");
        book2.textContent = e.purpose;

        booking.append(book1, book2);

        // buttons
        const callBtn = document.createElement("button");
        callBtn.classList.add("c-btn");
        callBtn.textContent = "Call";

        const msgBtn = document.createElement("button");
        msgBtn.classList.add("m-btn");
        msgBtn.textContent = "Message";

        // append all to card
        card.append(
            imgDiv,
            name,
            location,
            booking,
            callBtn,
            msgBtn
        );
        // add to body (or any container)
        document.querySelector(".stack").appendChild(card);
    })
}
showTasks()

function updateCard() {
    let cards = document.querySelectorAll(".stack .card");

    cards.forEach((card, index) => {
    if (index < 3) {
        card.style.zIndex = 3 - index;
        card.style.transform = `translateY(${index * 15}px) scale(${1 - (index * 0.05)})`;
        card.style.opacity = 1 - (index * 0.2);
    } else {
        // reset for extra cards
        card.style.zIndex = 0;
        card.style.transform = "none";
        card.style.opacity = 0;
    }
});


}

upbtn.addEventListener("click", () => {
    let lastChild = stack.lastElementChild;
    if (lastChild) {
        stack.insertBefore(lastChild, stack.firstElementChild);
        updateCard()
    }

});
downbtn.addEventListener("click", () => {
    const firstchild = stack.firstElementChild;
    if (firstchild) {
        stack.appendChild(firstchild);
        updateCard()
    }

});
