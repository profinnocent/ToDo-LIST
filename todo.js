const ul = document.querySelector('ol');
let inputBox = document.querySelector('#inputbox');
const addBtn = document.querySelector('#addbtn');


let todoDB = [];
let route = false;
let dbItem = "";
let pos = 0;



if (localStorage.getItem('tododb') == null) {
  localStorage.setItem('tododb', JSON.stringify(todoDB));
}
else {
  // localStorage.setItem('tododb', JSON.stringify(todoDB));

  todoDB = JSON.parse(localStorage.getItem('tododb'));

  //update ul list
  route = true;
  todoDB.forEach((item) => {
    dbItem = item;
    addToList();
  })
  route = false;

}

//For Enter key pressed on keyboard 
addBtn.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13) { 
      event.preventDefault();
	    
      addToList();
    }
  });



addBtn.addEventListener("click", addToList);

function addToList() {
  //Create an add li and add task
  let li = document.createElement('li');

  //create div for text
  const divText = document.createElement('div');
  //create div for buttons
  const div = document.createElement('div');


  if (inputBox.value == '' && route == false) {
    alert('Enter a task');
  }
  else if (inputBox.value !== '' && route == false) {
    todoDB.push(inputBox.value);
    localStorage.setItem('tododb', JSON.stringify(todoDB));

    divText.innerText = inputBox.value;
    printLi();
    addBtns();
  } else if (route == true) {
    divText.innerText = dbItem;
    printLi();
    addBtns();

  }



  //Function to print Li
  function printLi() {
    li.classList.add('liclass');
    li.appendChild(divText);
    li.appendChild(div);
    ul.appendChild(li);
  }



  //function to add buttons
  function addBtns() {

    //add edit button
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('editclass');
    div.appendChild(editBtn);


    //create delete button
    const delBtn = document.createElement('button');
    delBtn.innerText = 'Del';
    delBtn.classList.add('delclass');
    div.appendChild(delBtn);


    inputBox.value = '';

    //delete function
    delBtn.onclick = function() {

      let lis = Array.from(document.querySelectorAll('li'));

      pos = lis.indexOf(li);

  //Remove from array
  todoDB.splice(pos, 1);
  
  localStorage.setItem('tododb', JSON.stringify(todoDB));

      li.style.display = 'none';
    }

    //edit function
    editBtn.onclick = function() {
      if (this.innerText == 'Edit') {
        inputBox.value = divText.innerText;
        this.innerText = "Save";
      } 
      else {
        let lis = Array.from(document.querySelectorAll('li'));
        
        pos = lis.indexOf(li);
        
        console.log(pos);
        
        todoDB[pos] = inputBox.value;
        
        localStorage.setItem('tododb',JSON.stringify(todoDB));

        divText.innerText = inputBox.value;
        this.innerText = 'Edit';
        inputBox.value = "";
      }

    }
  }


}



