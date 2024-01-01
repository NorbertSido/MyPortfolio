        let dataPerPage = 6;
        const baseURL = 'https://reqres.in/api/users';
        const table = document.getElementById('table');
        const page = document.getElementById("page");

// ==== Táblázat létrehozása ==== //
        function createTable(){
            const h2 = document.createElement('h2');
            const caption = document.createElement('caption');
            h2.innerHTML = 'Felhasználók listája'
            caption.appendChild(h2);
            table.appendChild(caption);
            
            // Create thead
            const thead = document.createElement('thead');
            const theadrow = document.createElement('tr');
            thead.appendChild(theadrow);
            table.appendChild(thead);
            
            // Create id column
            const listId = document.createElement('th');
            listId.innerHTML = 'ID'
            theadrow.appendChild(listId)

            // Create Avatar column
            const listAvatar = document.createElement('th');
            listAvatar.innerHTML = 'Avatar'
            theadrow.appendChild(listAvatar)


            // Create Név column
            const listName = document.createElement('th');
            listName.colSpan = '2'
            listName.innerHTML = 'Név'
            theadrow.appendChild(listName)

            // Create Email column
            const listEmail = document.createElement('th');
            listEmail.innerHTML = 'Email'
            theadrow.appendChild(listEmail)

            // Create Műveletek column
            const listMuveletek = document.createElement('th');
            listMuveletek.innerHTML = 'Műveletek'
            theadrow.appendChild(listMuveletek)

            // Create tbody
            const tbody = document.createElement('tbody');
            tbody.id = 'usersList';
            table.appendChild(tbody);

// ==== Táblázat felhasználó hozzáadása form ==== //
            // Create tfoot
            const tfoot = document.createElement('tfoot');
            const formRow = document.createElement('tr');
            tfoot.appendChild(formRow);
            table.appendChild(tfoot);

                // form Image
                const imgTD = document.createElement('td');
                const inputImg = document.createElement('input');
                inputImg.type = 'file';
                inputImg.accept = 'image/*';
                imgTD.colSpan = '2';
                inputImg.id = 'newUserImg'
                imgTD.appendChild(inputImg);
                formRow.appendChild(imgTD);

                // form First name
                const firstNameTD = document.createElement('td');
                const firstNameInput = document.createElement('input');
                firstNameInput.type = 'text';
                firstNameInput.id = 'newUserFirstName';
                firstNameInput.placeholder = 'First name';
                firstNameTD.appendChild(firstNameInput);
                formRow.appendChild(firstNameTD);

                // form Last name
                const lastNameTD = document.createElement('td');
                const lastNameInput = document.createElement('input');
                lastNameInput.type = 'text';
                lastNameInput.id = 'newUserLastName';
                lastNameInput.placeholder = 'Last name';
                lastNameTD.appendChild(lastNameInput);
                formRow.appendChild(lastNameTD);

                // form Email
                const emailTD = document.createElement('td');
                const emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.id = 'newUserEmail';
                emailInput.placeholder = 'Email';
                emailTD.appendChild(emailInput);
                formRow.appendChild(emailTD);

                // form save button
                const saveTD = document.createElement('td');
                const saveBtn = document.createElement('button');
                saveBtn.type = 'button';
                saveBtn.className = 'btn btn-primary';
                saveBtn.innerText = 'Mentés';
                saveBtn.onclick = function(){
                        const firstNameInput = document.getElementById('newUserFirstName').value;
                        const lastNameInput = document.getElementById('newUserLastName').value;
                        const emailInput = document.getElementById('newUserEmail').value;
                        const inputImg = document.getElementById('newUserImg').value;

                        try{
                            if(firstNameInput !== ''  && lastNameInput !== '' && emailInput !== '')
                            {
                                if(firstNameInput.length < 2) throw new Error('First name-nek legalább 2 karakter hosszúnak kell lennie! ') 
                                if(lastNameInput.length < 2) throw new Error('Last name-nek legalább 2 karakter hosszúnak kell lennie! ')
                                // Email validáció készítése
                                
                                addUser(inputImg, firstNameInput, lastNameInput, emailInput);
                            }
                            else alert('Minden mező kitöltése kötelező!')
                        }

                        catch(upLoadError){ alert(upLoadError.message);}

                        finally{ return false;}
                    };
                saveTD.appendChild(saveBtn);
                formRow.appendChild(saveTD);
        }
        createTable();

// ==== Felhasználó hozzáadása ==== //
        async function addUser(image ,firstName, lastName, email){

            let addUserdata = {image ,firstName, lastName, email}
            let response = await fetch(baseURL,
                {
                    method: 'POST',
                    headers: {
                    'content-Type': 'application/json'
                    },
                    body: JSON.stringify(addUserdata)
                });
                if(response.status === 201){
                    const responseData = await response.json()
                    console.log(responseData)
                    alert('Az adatok feltöltése sikeresen megtörtént! ' + 'Létrehozás dátuma: ' + responseData.createdAt + ' ' + 'Id: ' + responseData.id)
                    table.innerText = '';
                    page.innerText = '';
                    createTable();
                    loadData(baseURL);
                }
                else alert('Sajnáljuk, a feltöltés nem sikerült!')
            }

// ====  ==== //
        function createUsers(usersData) {
            const userListData = document.getElementById("usersList");
            const tr = document.createElement("tr");
            
            // User id
            const userId = document.createElement("td");
            userId.innerHTML = usersData.id;
            tr.appendChild(userId);

            //User Avatar
            const userAvatar = document.createElement("td");
            const avatarImg = document.createElement("img");
            avatarImg.src = usersData.avatar;
            userAvatar.appendChild(avatarImg);
            tr.appendChild(userAvatar);
            

            // User Full name
            const userFullName = document.createElement("td");
            const nameButton = document.createElement('button');
            nameButton.id = 'nameButton';
            nameButton.setAttribute('data-bs-target','#staticBackdrop');
            nameButton.setAttribute('data-bs-toggle','modal');
            nameButton.class = "btn btn-primary";
            nameButton.innerHTML = usersData.first_name + ' ' + usersData.last_name;
            nameButton.onclick = function(){
                selectedUser(usersData.id);
            };
            userFullName.colSpan = "2"
            userFullName.appendChild(nameButton);
            tr.appendChild(userFullName);
            
            // User e-mail
            const userEmail = document.createElement("td");
            userEmail.innerHTML = usersData.email;
            tr.appendChild(userEmail);
            
            //Delete buttom
            const td = document.createElement("td");
            const button = document.createElement("button");
            button.innerHTML = 'Törlés';
            button.className = 'btn btn-secondary'
            button.onclick = function(){
              deleteUser(usersData.id);
            };
            td.appendChild(button);
            tr.appendChild(td);

            userListData.appendChild(tr);
      }

// ==== Adatok szűrése darabszámra ==== //
        function datarequest(){
            dataPerPage = parseInt(document.getElementById('dataRequest').value);
            const URL = baseURL + '?per_page=' + dataPerPage;
            table.innerText = '';
            page.innerText = '';
            createTable();
            loadData(URL);
        }

// ==== Adatok lapozhatósága ==== //
        function createPages(last_page){
            
            for(let p = 1; p <= last_page; p++){
                const a = document.createElement('a');
                a.href = '#';
                a.innerText = + p
                if(p === 1) page.innerText = 'Oldalszám:'
                a.onclick = function(){
                const URL = baseURL + '?per_page=' + dataPerPage + '&page=' + p; 
                page.innerHTML = '';
                document.getElementById('usersList').innerHTML = '';
                loadData(URL);
                return false;
            }
            page.appendChild(a);
          }
        }

// ==== Felhasználó törlése ==== //
        async function deleteUser(id){
            try{
                let response = await fetch(baseURL + '/' + id,
                {
                    method: 'DELETE',
                    headers: {
                    'content-Type': 'application/json'
                    },
                });

            if(response.status === 204) {
                alert('Felhasználó törlése sikeresen megtörtént!');
                table.innerText = '';
                page.innerText = '';
                createTable();
                loadData(baseURL + '?per_page=' + dataPerPage);
            }
            else alert('A felhasználót már törölték!')
            }
            catch(error){
            console.log('Hiba történt a törlés során!');
            }
        }
        
// ==== Névjegykártya megjelenítése ==== //
        async function selectedUser(id){
            try{
                let response = await fetch(baseURL + '/' + id,
                {
                    method: 'GET',
                    headers: {
                    'content-Type': 'application/json'
                    },
                })

                if(response.status === 200){
                    let userData = await response.json();

                    const modalUserFn = document.getElementById('modalUserFn');
                    modalUserFn.value = userData.data.first_name

                    const modalUserLn = document.getElementById('modalUserLn');
                    modalUserLn.value = userData.data.last_name;

                    const modalUserEmail = document.getElementById('modalUserEmail');
                    modalUserEmail.value = userData.data.email;

                    const modalUserId = document.getElementById('modalUserId');
                    modalUserId.innerHTML = 'ID: ' + userData.data.id;

                    const modalUserAvatar = document.getElementById('modalUserAvatar');
                    modalUserAvatar.src = userData.data.avatar;

                    const deleteUserBtn = document.getElementById('deleteUserBtn');
                    deleteUserBtn.onclick = function(){
                       deleteUser(userData.data.id);
                    };

                    const refreshUserBtn = document.getElementById('refreshButton');
                    refreshUserBtn.onsubmit = function(){
                        const firstName = document.getElementById('modalUserFn').value;
                        const lastName = document.getElementById('modalUserLn').value;
                        const email = document.getElementById('modalUserEmail').value;
                        const id = userData.data.id;

                        try{
                            if(firstName !== userData.data.first_name || lastName !== userData.data.last_name || email !== userData.data.email)
                            {
                                if(firstName.length < 2) throw new Error('First name-nek legalább 2 karakter hosszúnak kell lennie! ') 
                                if(lastName.length < 2) throw new Error('Last name-nek legalább 2 karakter hosszúnak kell lennie! ')
                                // if(email vizsgálata)

                                refreshUser(id, firstName, lastName, email);
                            }
                            else alert('Az adatokban nem történtek változtatások!')
                        }
                        catch(refreshError){
                            alert(refreshError.message);
                        }
                        finally{
                            return false;
                        }
                    };
                }
                else console.log('Sajnáljuk, ilyen felhasználó nem létezik!')
            }
            catch(error){
            console.log('Hiba')
            }
        }
        
// ==== Adatok frissítése ==== //
        async function refreshUser(id, firstName, lastName, email){
            let newData = {firstName, lastName, email}
            let response = await fetch(baseURL + '/' + id,
                {
                    method: 'PUT',
                    headers: {
                    'content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                });
                if(response.status === 200){
                    alert('A frissítés sikeresen megtörtént!')
                    table.innerText = '';
                    page.innerText = '';
                    createTable();
                    loadData(baseURL + '?per_page=' + dataPerPage);
                }
                else alert('Sajnáljuk, a frissítés nem sikerült!')
            }
            
// ==== Adatok betöltése ==== //
        async function loadData(URL) {
            try {
                let result = await fetch(URL);
                if (result.status !== 200)
                throw new Error("Hiba történt a kérés vérgrehajtása során!");
                try {
                    let data = await result.json();

                    for (let i = 0; i < data.data.length; i++) {
                        let usersData = data.data[i];
                        createUsers(usersData);
                    }
                    createPages(data.total_pages)
                } 
                catch (error2) {
                    console.log("Hiba történt: " + error2);
                }
            } 
            catch (error) {
                console.log("Hiba történt: " + error);
            }
        }

        loadData(baseURL + '?per_page=' + dataPerPage);