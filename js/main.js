function Note(){  
    "use strict";
    this.key = 1;
    this.value = "";
    this.save = false;
}

Note.prototype.saveToLS = function(key, value){
    if(this.save){
        localStorage.setItem(key, value);
    }
};

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


    note.querySelector(".note-add").addEventListener("click", () => {
        this.key++;
        this.addNote();
    });

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

    note.querySelector(".note-close").addEventListener("click", () => {
        let key = noteContainer.querySelector(`input[value='${note.querySelector(`input[type="hidden"]`).value}']`).value;
        this.removeFromLS(Number.parseInt(key));
        noteContainer.querySelector(`input[value='${note.querySelector(`input[type="hidden"]`).value}']`).parentNode.remove();
    });
};

const note = new Note();

if(localStorage.length > 0){
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        note.addNote(key, localStorage.getItem(Number.parseInt(key)), true);
    })
}else{
    note.addNote();
}

const startNote = document.querySelector(".add");
startNote.addEventListener("click", () => {
    note.addNote();
})

