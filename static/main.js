const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');


// Create a new Webex app instance
var app = new window.Webex.Application();

// Wait for onReady() promise to fulfill before using framework
app.onReady().then(() => {
  console.log("App ready. Instance", app);
}).catch((errorcode) =>  {
  console.log("Error with code: ", Webex.Application.ErrorCodes[errorcode])
});

// Button click handler to set share URL
function handleSetShare() {
  // Replace this with the URL of your shared page
  var url = "https://developer.webex.com"
  // "Shared App" is the title of the window or tab that will be created
  app.setShareUrl(url, "", "Shared App").then(() => {
      log("Set share URL", url);
  }).catch((errorcode) => {
      log("Error: ", Webex.Application.ErrorCodes[errorcode])
  });
}
// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

if (TOKEN) {
  hide('.content.unauthorized');
  show('.content.authorized');
}
