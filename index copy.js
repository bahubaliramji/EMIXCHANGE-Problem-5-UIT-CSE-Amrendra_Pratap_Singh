const express = require('express');
//import axios from 'axios';
const axios = require('axios');
const app = express();
let token = 'Zoho-oauthtoken 1000.c1bf7330c24a8e5639d3773f34456a59.4d15be8c27f8f41f6ff44bd3add540e8';


// const courses = [
//     {id: 1, name: 'course1'},
//     {id: 2, name: 'course2'},
//     {id: 3, name: 'course3'},
// ]
// app.get('/',(req,res) => {
//     res.send('Hello World....');
// });

// app.get('/api/courses', (req, res) => {
//     //res.send([1,2,3]);
//     res.send(courses) ;
// });

// app.get('/callback', (req, res) => {
//     //res.send([1,2,3]);
//     res.send(req);

// });



app.get('/zoho-get-records', (req, res) => {

    var config = {
        method: 'get',
        url: 'https://www.zohoapis.in/crm/v3/Leads?fields=Last_Name,Email&per_page=3',
        headers: {
            'Authorization': token,
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    //console.log(result);
});

app.get('/zoho-post-record', (req, res) => {

    var data = JSON.stringify({
      "data": [
        {
          "Company": "Zylker",
          "Last_Name": "Singh",
          "First_Name": "Amren",
          "Email": "ramjiamrendrapratap@gmail.com",
          "State": "Texas",
          "$wizard_connection_path": [
            "3652397000003679053"
          ],
          "Wizard": {
            "id": "3652397000000002175"
          }
        },
        {
          "Company": "Villa Margarita",
          "Last_Name": "Dolan",
          "First_Name": "Brian",
          "Email": "brian@villa.com",
          "State": "Texas"
        }
      ],
      "lar_id": "3652397000002045001",
      "trigger": [
        "approval",
        "workflow",
        "blueprint"
      ]
    });
    
    var config = {
      method: 'post',
      url: 'https://www.zohoapis.in/crm/v3/Leads',
      headers: { 
        'Authorization': token, 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    //console.log(result);
});

app.get('/zoho-delete-record/:id', (req, res) => {

var config = {
  method: 'delete',
  url: 'https://www.zohoapis.com/crm/v3/Leads/'+req.params.id,
  headers: { 
    'Authorization': token, 
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

});

app.get('/zoho-update-record/:id', (req, res) => {

    var data = '{\r\n  "data": [\r\n    {\r\n      "id": "3652397000003852095",\r\n      "Deal_Name": "v3 Update",\r\n      "Stage": "Closed Won",\r\n      "Pipeline": "Standard (Standard)",\r\n      "Foreign_Languages": [ //multi-select picklist\r\n        "Korean","Spanish"\r\n      ],\r\n      "$append_values": {\r\n        "Foreign_Languages": false\r\n      },\r\n      "Image_Upload": [\r\n        {\r\n          "Encrypted_Id": "2cceafa194d037b63f2000181dd81864f157209d250ab4a67473b91de8f0a2fa"\r\n        },\r\n        {\r\n          "id": "738964000002363016",\r\n          "_delete": null\r\n        }\r\n      ],\r\n      "Listings": [\r\n        {\r\n          "Interested_Listings": {\r\n            "id": "3652397000001988001"\r\n          }\r\n        }\r\n      ],\r\n      "Multi_user": [\r\n        {\r\n          "Multi_user": {\r\n            "name": "J Smith",\r\n            "id": "3652397000000281001"\r\n          }\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}';
    
    var config = {
      method: 'put',
      url: 'https://www.zohoapis.com/crm/v3/Leads/'+req.params.id,
      headers: { 
        'Authorization': token, 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    

});



// app.get('/api/course/:id', (req, res)=>{
//     //res.send(req.params.id);
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course)  res.status(404).send('The course with the given id was  not find');
//     res.send(course);
// });

// app.get('/api/posts/:year/:month', (req, res)=>{
//     res.send(req.query);
// });


// 
const port = process.env.POST || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

