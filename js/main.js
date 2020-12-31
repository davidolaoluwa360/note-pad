// author: Atebisun David
// Project_Github_page: https://davidolaoluwa360.github.io/note-pad/

// Here is a constructor function with some property related to the notepad
function Note(){  
    "use strict";
    this.key = 1;
    this.value = "";
    this.save = false;
}

// here is a prototype that saves the key and value of user note to the localstorage
Note.prototype.saveToLS = function(key, value){
    if(this.save){
        localStorage.setItem(key, value);
    }
};

// here is a prototype of note that remove saved notes from the Localstorage
Note.prototype.removeFromLS = function(key){
    localStorage.removeItem(key);
};

Note.prototype.addNote = function(key = 0, value = "", hasValue = false){
    const noteContainer = document.querySelector(".note-container");
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = 
    `
    <div class="note-utils">
        <i class="fas fa-plus note-add"></i>
        <i class="fas fa-times note-close"></i>
    </div>
    <input class="hidden" type="hidden" value='${hasValue ? key  : this.key}'/>
    <div class="note-text-area" contenteditable="true">${hasValue ? value: ""}</div>
    <div class="save-note">
        <button class="save">Save</button>
    </div>
    `;
    noteContainer.appendChild(note);

    // here is an event that add new note to the page and assign it a new key
    note.querySelector(".note-add").addEventListener("click", () => {
        this.key++;
        this.addNote();
    });

    // here is an event that save  note to the localstorage
    note.querySelector(".save").addEventListener("click", () =>{
        let key = noteContainer.querySelector(`input[value='${note.querySelector(`input[type="hidden"]`).value}']`).value;
        let value = noteContainer.querySelector(`input[value='${note.querySelector(`input[type="hidden"]`).value}']`).parentNode.querySelector(".note-text-area").innerHTML;
        key = Number.parseInt(key);
        if(value.trim().length === 0){
            alert("Please fill the space to save");
        }else{
            this.save = true;
            this.saveToLS(key, value);
        }
    });

    // here is an event that close note and also delete it from the localstorage if saved
    note.querySelector(".note-close").addEventListener("click", () => {
        let key = noteContainer.querySelector(`input[value='${note.querySelector(`input[type="hidden"]`).value}']`).value;
        this.removeFromLS(Number.parseInt(key));
        noteContainer.querySelector(`input[value='${note.querySelector(`input[type="hidden"]`).value}']`).parentNode.remove();
    });
};

const note = new Note();

// Here before the calling of the note Object
// 1; a check is been made to the localstorage
// 2; if the localstorage have some existing value or notes we are displaying it to the user
// 3; else if there is nothing in the user localstorage we are displaying empty notes to the user
if(localStorage.length > 0){
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        note.addNote(key, localStorage.getItem(Number.parseInt(key)), true);
    })
}else{
    note.addNote();
}

// here is an event that add notes to the page
const startNote = document.querySelector(".add");
startNote.addEventListener("click", () => {
    note.addNote();
})

