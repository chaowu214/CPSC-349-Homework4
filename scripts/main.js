// (function (window) {
//     'use strict';
//     var FORM_SELECTOR = '[data-coffee-order="form"]';
//     var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
//     // var SERVER_URL = 'http://10.0.0.51:2403/coffeeorders';
//     var SERVER_URL = 'https://co.audstanley.com/coffeeorders';
//     var App = window.App;
//     var Truck = App.Truck;
//     var DataStore = App.DataStore;
//     var FormHandler = App.FormHandler;
//     var Validation = App.Validation;
//     var CheckList = App.CheckList;
//     var myTruck = new Truck('ncc-1701', new DataStore());
//     window.myTruck = myTruck;
//     var checkList = new CheckList(CHECKLIST_SELECTOR);
//     checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
//     var formHandler = new FormHandler(FORM_SELECTOR);
//     var RemoteDataStore = App.RemoteDataStore;
//     formHandler.addSubmitHandler(function (data) {
//         myTruck.createOrder.call(myTruck, data);
//         checkList.addRow.call(checkList, data);
//     });

//     formHandler.addInputHandler(Validation.isCompanyEmail);

//     console.log(formHandler);
// })(window);

(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';     // CHOOSE ONLY ONE...
   var SERVER_URL = 'https://co.audstanley.com/coffeeorders';    // if running on the shared server
    // var SERVER_URL = 'http://localhost:3000/coffeeorders';          // if running locally
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    // var truck = new Truck('ncc-1701', new DataStore());
    var truck = new Truck('ncc-1701', remoteDS);
    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);