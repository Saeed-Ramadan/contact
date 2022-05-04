//set function to select element in fast way:-
function getElement(selector, selectorValue) {
    let element;
    if (selector === 'id') {
        element = document.getElementById(selectorValue);
    } else if (selector === 'singleQuery') {
        element = document.querySelector(selectorValue);
    } else if (selector === 'multiQuery') {
        element = document.querySelectorAll(selectorValue);
    }
    return element;
}

//to call elements
let addNewButton = getElement("singleQuery", ".addNew");
let overLay = getElement("singleQuery", ".overLay");
let addNewDiv = getElement("singleQuery", ".addNewContact");
let close = getElement("singleQuery", ".close");

//to openLay
function openLay(element) {
    overLay.style.display = "block";
    element.style.display = "block";
}

//to closeLay
function closeLay(element) {
    overLay.style.display = "none";
    element.style.display = "none";
}

//to work openLay function on click
addNewButton.addEventListener('click', () => {
    openLay(addNewDiv);
});

//to work closeLay function on click
close.addEventListener('click', () => {
    closeLay(addNewDiv);
});

//to save data in local storage
let contactList = JSON.parse(localStorage.getItem("contact")) || [];
let contactFormId = contactList.length;

//select input and get values and push to array
let contactFormName = getElement("id", "contact-form-name");
let contactFormPhone = getElement("id", "contact-form-phone");
let contactFormEmail = getElement("id", "contact-form-email");
let contactFormAddress = getElement("id", "contact-form-address");

//function to add new contact
function newContact() {
    contactList.push({
        contactId: contactFormId += 1,
        contactName: contactFormName.value,
        contactPhone: contactFormPhone.value,
        contactEmail: contactFormEmail.value,
        contactAddress: contactFormAddress.value,
    });
    localStorage.setItem("contact", JSON.stringify(contactList));

}

//push the data from the array into the table:-
let tbody = getElement("id", "tbody");
function displayContact() {
    let tr = ' ';
    let i;
    for (i = 0; i < contactList.length; i++) {
        tr += `
        <tr data-id = ${i}>
            <td>${contactList[i].contactId}</td>
            <td>${contactList[i].contactName}</td>
            <td>${contactList[i].contactPhone}</td>
            <td>${contactList[i].contactEmail}</td>
            <td>${contactList[i].contactAddress}</td>
            <td class="green">Edit</td>
            <td class="red">Delete</td>
        </tr>
        `;
    }
    tbody.innerHTML = tr;
}
displayContact();

//to reset contact form
function resetContactForm() {
    contactFormName.value = '';
    contactFormPhone.value = '';
    contactFormEmail.value = '';
    contactFormAddress.value = '';
}

//to save the data in table
let save = getElement("singleQuery", ".save");
save.addEventListener("click", () => {
    newContact();
    displayContact();
    closeLay(addNewDiv);
    resetContactForm()
});

//edit
let editForm = getElement("singleQuery", ".editContact");
let updateBtn = getElement("singleQuery", ".update");
let editFormName = getElement("id", "edit-form-name");
let editFormPhone = getElement("id", "edit-form-phone");
let editFormEmail = getElement("id", "edit-form-email");
let editFormAddress = getElement("id", "edit-form-address");
let closeEditForm = getElement("singleQuery", ".editContact .close");

tbody.addEventListener('click', e => {



    if (e.target.classList.value === "green") {
        let tr = e.target.parentElement;
        let index = tr.dataset.id; //in the array
        let oldId = tr.children[0].innerHTML;

        editFormName.value = contactList[index].contactName;
        editFormPhone.value = contactList[index].contactPhone;
        editFormEmail.value = contactList[index].contactEmail;
        editFormAddress.value = contactList[index].contactAddress;

        openLay(editForm);
        closeEditForm.addEventListener('click', () => {
            closeLay(editForm);
        });
        let update = () => {
            contactList[index] = {
                contactId: parseInt(oldId),
                contactName: editFormName.value,
                contactPhone: editFormPhone.value,
                contactEmail: editFormEmail.value,
                contactAddress: editFormAddress.value,
            }

            closeLay(editForm);
            displayContact(); //tu update ui
            localStorage.setItem("contact", JSON.stringify(contactList));
            location.reload(); //to make title to page
        }
        updateBtn.addEventListener("click", update);
    }
    if (e.target.classList.value === "red") {
        let tr = e.target.parentElement;
        let index = tr.dataset.id;
        contactList.splice(index, 1);
        localStorage.setItem("contact", JSON.stringify(contactList));
        displayContact();
    }
});

let search = getElement("id" , "search");
let trs = getElement("multiQuery" , "tbody tr");
function searchContact () {
    let searchValue = search.value.toUpperCase();
    trs.forEach( tr => {
        let searchTr = tr.children[1].innerHTML.toUpperCase();
        if(!searchTr.includes(searchValue)){
            tr.style.display="none";
        }else{
            tr.style.display="block";
        }
    });
}
search.addEventListener('keyup' , searchContact);