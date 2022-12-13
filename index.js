shownotes();

function shownotes() {
  let note = localStorage.getItem("note");
  if (note == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(note);
  }
  let html = "";
  notesObj.forEach(function (check, index) {
    html += `
   <tr>
                        <td>${check[0]}</td>
                        <td>${check[1]}</td>
                        <td>${check[2]}</td>
                        <td><button onclick="deleteBook(${index})" type="button" class="btn btn-outline-danger">Delete Book</button></td>
                       
                    </tr>`;
  });
  let display = document.getElementById("tableBody");
  let oops = document.getElementById("oops");

  if (notesObj.length != 0) {
    display.innerHTML = html;
    oops.innerHTML = ``;
  } else {
    display.innerHTML = ``;
    oops.innerHTML = `<img 
  src="./oops.jpg" class="card mx-auto border-0"><div class="card border-0 mx-auto">
  <div class=" mx-auto border-0">
    <h2>Your library is currently empty. No books to display.</h2>
  </div>
</div>`;
  }
}

function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  }
  return true;
};
Display.prototype.show = function (myType, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${myType} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button"  class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(function () {
    message.innerHTML = ``;
  }, 3000);
};
Display.prototype.append = function (book) {
  let note = localStorage.getItem("note");
  if (note == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(note);
  }
  notesObj.push([book.name, book.author, book.type]);
  localStorage.setItem("note", JSON.stringify(notesObj));
  shownotes();
};

// Implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("myForm");
  libraryForm.reset();
};

let libraryForm = document.getElementById("myForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let bookName = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(bookName, author, type);

  let display = new Display();

  if (display.validate(book)) {
    display.append(book);
    display.clear();
    display.show("success", "Book is added to library");
  } else {
    display.show("danger", "Book cannot with added with given credentials");
  }

  e.preventDefault();
}

function deleteBook(id) {
  let note = localStorage.getItem("note");
  if (note == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(note);
  }
  notesObj.splice(id, 1);
  localStorage.setItem("note", JSON.stringify(notesObj));
  shownotes();
}
