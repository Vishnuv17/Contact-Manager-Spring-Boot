const Server_Url = "http://localhost:8080/contact";
const deleteContactUrl = "http://localhost:8080/deletedContacts";

function addContacts() {

    const input_name = document.getElementById('name').value;
    const input_phone = document.getElementById('phone_number').value;
    const input_email = document.getElementById('email').value;
    const input_linkedIn = document.getElementById('linkedIn').value;
    const input_github = document.getElementById('github').value;
    const input_website = document.getElementById('website').value;
    const input_gender = document.getElementById('gender').value;

    const contact = {
        name: input_name,
        phone_number: input_phone,
        email: input_email,
        linkedIn: input_linkedIn,
        github: input_github,
        website: input_website,
        gender: input_gender,
        fav: false
    };

    fetch(`${Server_Url}/addContact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    })

    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Contact Added Successfully");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error adding contact");
    });
}

function createHtmlContactcard(contact) {
    const contact_img = contact.gender === 'female' ? "female.jpg" : "male.jpg  ";
     return `
            <div class="col-md-6">
            <div class="card p-3 shadow-sm" onclick="goToViewPage(${contact.id})" style="cursor:pointer;">
                <div class="d-flex align-items-center">
                    <div class="text-center me-3">
                        <img src="${contact_img}" class="rounded-circle" style="width:70px; height:70px;">
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">${contact.name}</h5>
                            <div class="contact-links">
                                <a href="${contact.linkedIn}" class="text-primary me-2 fs-5 hover-shadow"><i class="bi bi-linkedin"></i></a>
                                <a href="${contact.github}" class="text-dark me-2 fs-5 hover-shadow"><i class="bi bi-github"></i></a>
                                <a href="${contact.website}" class="text-info fs-5 hover-shadow"><i class="bi bi-globe"></i></a>
                            </div>
                        </div>
                        <div class="mt-2" style="font-size:14px;">
                            <div><i class="bi bi-envelope me-2"></i> ${contact.email}</div>
                            <div class="mt-1"><i class="bi bi-telephone me-2"></i> ${contact.phone_number}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                `;
}

function fetchAndDisplayContacts() {
    fetch(`${Server_Url}/home`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        const home_page_contacts = document.getElementById('home-page-contacts');
        home_page_contacts.innerHTML = "";
        data.forEach(contact => {
            home_page_contacts.innerHTML += createHtmlContactcard(contact);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}

function goToViewPage(id) {
    window.location.href = `viewcontact.html?id=${id}`;
}

function changeFavState(contact){
    const updatedFavState = !contact.fav;
    contact.fav = updatedFavState;
    fetch(`${Server_Url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    })

    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchAndDisplayContactDetails(contact.id);
        
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error updating contact");
    });
}


function fetchAndDisplayContactDetails(id) {

    fetch(`${Server_Url}/${id}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(contact => {
        document.getElementById('edit-contact-btn').onclick = function() {
            document.getElementById('edit_name').value = contact.name;
            document.getElementById('edit_phone').value = contact.phone_number;
            document.getElementById('edit_email').value = contact.email;
            document.getElementById('edit_linkedin').value = contact.linkedIn;
            document.getElementById('edit_github').value = contact.github;
            document.getElementById('edit_website').value = contact.website;
            document.getElementById('edit_gender').value = contact.gender;
        }
        document.getElementById('delete-contact-btn').onclick = function() {
            if (confirm(`Are you sure you want to delete contact: ${contact.name}?`)) {

                storeDeletedContact(contact);

                fetch(`${Server_Url}/${contact.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    
                }).then(response => {
                console.log('Contact deleted successfully');
                window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("Error deleting contact");
                });
            }
        }

        document.getElementById('editContactModalLabel').innerText = `Edit Contact - ${contact.name}`;
        document.getElementById('contact-name').innerText = contact.name;
        document.getElementById('contact-phone').innerText = contact.phone_number;
        document.getElementById('contact-email').innerText = contact.email;
        document.getElementById('contact-github').href = contact.github;
        document.getElementById('contact-github').innerText = contact.github.replace('https://', '').replace('http://', '');
        document.getElementById('contact-linkedin').href = contact.linkedIn;
        document.getElementById('contact-linkedin').innerText = contact.linkedIn.replace('https://', '').replace('http://', '');
        document.getElementById('contact-website').href = contact.website;
        document.getElementById('contact-website').innerText = contact.website.replace('https://', '').replace('http://', '');
        const favouriteIcon = document.getElementById('favourite-contact');
        favouriteIcon.addEventListener('click',() => changeFavState(contact));
        if (contact.fav) {
            favouriteIcon.classList.add('text-warning');
            favouriteIcon.classList.remove('text-secondary');
        } else {
            favouriteIcon.classList.add('text-secondary');
            favouriteIcon.classList.remove('text-warning');
        }

        const contactImg = document.getElementById('contact-img');
        if(contact.gender=='male'){
            contactImg.src = "male.jpg";
        }
        else if(contact.gender=='female'){
            contactImg.src = "female.jpg";
        }
        const saveEditedContactBtn = document.getElementById('save-edited-contact-btn');
        saveEditedContactBtn.onclick = function() {
            saveEditedContact(contact);
            }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function fetchAndDisplayFavContacts() {
    fetch(`${Server_Url}/home`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        const fav_contact_div = document.getElementById('fav-contact-div');
        fav_contact_div.innerHTML = "";
        data.forEach(contact => {

            if(contact.fav){
                fav_contact_div.innerHTML += createHtmlContactcard(contact);
            }
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}


function saveEditedContact(contact){
    const edited_name = document.getElementById('edit_name').value;
    const edited_phone = document.getElementById('edit_phone').value;
    const edited_email = document.getElementById('edit_email').value;
    const edited_linkedIn = document.getElementById('edit_linkedin').value;
    const edited_github = document.getElementById('edit_github').value;
    const edited_website = document.getElementById('edit_website').value;
    const edited_gender = document.getElementById('edit_gender').value;

    contact.name = edited_name;
    contact.phone_number = edited_phone;
    contact.email = edited_email;
    contact.linkedIn = edited_linkedIn;
    contact.github = edited_github;
    contact.website = edited_website;
    contact.gender = edited_gender;

    fetch(`${Server_Url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    })

    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchAndDisplayContactDetails(contact.id);
        redirectToViewPage = `viewcontact.html?id=${contact.id}`;
        window.location.href = redirectToViewPage;
        
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error updating contact");
    });
}


function storeDeletedContact(deletedContactResponse) {

    fetch(`${deleteContactUrl}/addContact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedContactResponse)
    })

    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Contact Added Successfully");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error adding contact");
    });
}

function fetchAndDisplayDeletedContacts() {
    fetch(`${deleteContactUrl}/home`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        const deleted_page_contacts = document.getElementById('deleted-contact-div');
        deleted_page_contacts.innerHTML = "";
        data.forEach(contact => {
            deleted_page_contacts.innerHTML += createHtmlContactcard(contact);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });

    
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        fetchAndDisplayContacts();
    }
    else if (window.location.pathname.endsWith("viewcontact.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const contactId = urlParams.get('id');
        if (contactId) {
            fetchAndDisplayContactDetails(contactId);
        }
    }else if (window.location.pathname.endsWith("fav_contact.html")) {
        fetchAndDisplayFavContacts();
    }else if (window.location.pathname.endsWith("deletedContact.html")) {
        fetchAndDisplayDeletedContacts();
    }
});