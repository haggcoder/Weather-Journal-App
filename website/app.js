/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '56469cc5f1f8c1166cdfc22da612d4cc';

document.getElementById('generate').addEventListener('click', performAction);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function performAction(){
    const zip = document.getElementById('zip').value;
    getWeather(baseURL,zip,apiKey)
        .then(function(data){
            let user_response = document.getElementById('feelings').value;
            postData("/",{
                temperature: data.main.temp,
                date: newDate,
                userResponse: user_response
            });
        })
        .then(()=>updateUI());
}

const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
    try{
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log("error!",error);
    }
};

const updateUI = async () => {
    const request = await fetch('/data');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('content').innerHTML = allData.userResponse;
    }catch(error){
      console.log("error!", error);
    }
};

const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },    
        body: JSON.stringify(data), 
    });
    try{
        const newData = await response.json();
        return newData;
    }catch(error){
      console.log("error!", error);
    }
};