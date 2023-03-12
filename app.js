const express = require("express");
const https = require("https");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName + lastName + email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url =
    "https://us9.api.mailchimp.com/3.0/lists/1b7bf94527";
  const options = {
    method: "POST",
    auth: "agwu:a387fb3498654397d03e49dbd51ebc6ed-us9",
  };

  const request = https.request(url, options, (response) => {
    if(response.statusCode=== 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    };
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(3000, () => {
  console.log("server is running on port 3000.");
});

// //We need to install the npm module @mailchimp/mailchimp_marketing.
// ////We need to install the npm module @mailchimp/mailchimp_marketing.
// //npm install @mailchimp/mailchimp_marketing
// const mailchimp = require("@mailchimp/mailchimp_marketing");

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const https = require("https");

// app.use(bodyParser.urlencoded({ extended: true }));
// //The public folder which holds the CSS and images
// app.use(express.static("public"));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/signup.html");
// });

// //Setting up MailChimp
// mailchimp.setConfig({
//   //replace with your api key
//   apiKey: "387fb3498654397d03e49dbd51ebc6ed-us9",
//   //replace with last us-XX from api key
//   server: "us9",
// });

// app.post("/", function (req, res) {
//   //change the values to according to your input attributes in html
//   const firstName = req.body.fname;
//   const secondName = req.body.lname;
//   const email = req.body.email;

//   //Your list/audience id
//   const listId = "1b7bf94527";

//   //Creating an object with the users data
//   const subscribingUser = {
//     firstName: firstName,
//     lastName: secondName,
//     email: email,
//   };

//   //Uploading the data to the server
//   async function run() {
//     const response = await mailchimp.lists.addListMember(listId, {
//       email_address: subscribingUser.email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: subscribingUser.firstName,
//         LNAME: subscribingUser.lastName,
//       },
//     });

//     //If all goes well logging the contact's id

//     res.sendFile(__dirname + "/success.html");
//     console.log(
//       `Successfully added contact as an audience member. The contact's id is ${response.id}.`
//     );
//   }
//   //Running the function and catching the errors (if any)
//   //If anything goes wrong send the faliure page
//   run().catch((e) => res.sendFile(__dirname + "/failure.html"));
// });

// app.post("/failure", function (req, res) {
//   res.redirect("/");
// });

// app.listen(process.env.PORT || 3000, function () {
//   console.log("Server is running at port 3000");
// });

// // You can use Render, Railway or Cyclic to host your app for free.

// // apiKey
// // 387fb3498654397d03e49dbd51ebc6ed-us9

// // audience id
// // 1b7bf94527
