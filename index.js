'use strict';



function handleSubmit(){
  $('main').on('submit', function(e){
    e.preventDefault();
    const breed = $(e.currentTarget).find(`input[id='add-dog-images']`).val();
    console.log(breed);
    
      
    getDogImage(breed);
  });
}

function generateImages(json){
  console.log('generating images', json);
  let imagesHTML = ``
  try{
    imagesHTML = `
  <img src="${json.message}" class="results-img">
  `;
  if(json.status === "error"){
    throw new Error(`${json.code}: ${json.message}`)
  }
  } catch {
    imagesHTML = `
    <h2>Error</h2>
    <p>Error code: ${json.code}</P>
    <p>Error message: ${json.message}</p>
  `;
  }
  
$(".dog-images").html(imagesHTML);
}

function getDogImage(breed) {
  const options = {method: 'GET'};
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`, options)
    .then(response => response.json())
    .then(responseJson => generateImages(responseJson)).catch();
    
}


function main(){
  handleSubmit();
  
}

$(main);