const express = require('express');
//import axios from 'axios';
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
let token = 'Zoho-oauthtoken 1000.260c3303da7d7f7cdf290845b4728a44.516fa9eb57a51afb6d81c04fb8341b29';
app.use(bodyParser());


app.get('/zoho-get-records', (req, res) => {

    var config = {
        method: 'get',
        url: 'https://www.zohoapis.in/crm/v3/Leads?fields=Last_Name,First_Name,Email&per_page=5',
        headers: {
            'Authorization': token,
        }
    };

    axios(config)
        .then(function (response) {
          res.send(`<!DOCTYPE html>
          <html>
          <head>
          <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          
          tr:nth-child(even) {
            background-color: #dddddd;
          }
          </style>
          </head>
          <body>
          
          <h2>Leads Record</h2>
          <br>
          <form method="POST" action="http://localhost:3000/zoho-post-record">
 
  <input type="email" id="Email" name="Email" placeholder="Email" ><br>
  <input type="text" id="First_Name" name="First_Name" placeholder="First_Name" ><br>
  <input type="text" id="Last_Name" name="Last_Name" placeholder="Last_Name" ><br>
  <input type="text" id="Company" name="Company" placeholder="Company" ><br>
  <input type="text" id="State" name="State" placeholder="State" ><br>

  <input type="submit" value="POST Record">
</form> 
          <table>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            ${response.data.data.map((item,index)=>{
              return `<tr>
              <td>${item.id}</td>
              <td>${item.Email}</td>
              <td>${item.First_Name}</td>
              <td>${item.Last_Name}</td>
              <td><a target="_blank" href="http://localhost:3000/zoho-update-record/${item.id}">Update</a></td>
              <td><a target="_blank" href="http://localhost:3000/zoho-delete-record/${item.id}">Delete</a></td>

            </tr>`
            })}

          
          </table>
          
          </body>
          </html>
          
          `);
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    //console.log(result);
});

app.post('/zoho-post-record', (req, res) => {
    console.log(req.body);
    var data = JSON.stringify({
      "data": [
        {
          "Company": "Test",
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
        req.body,
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
      res.redirect('/zoho-get-records');
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
  //res.send('Done');
})
.catch(function (error) {
  //console.log(error);
  res.send('Done');
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
      //console.log(error);
      res.send('Done');
    });
    

});



const port = process.env.POST || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

