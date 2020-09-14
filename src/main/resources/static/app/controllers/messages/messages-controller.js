angular.module('App').controller('MessagesController', MessagesController)
    .directive('customOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    });
MessagesController.$inject = ['$scope', '$filter', '$rootScope', '$injector', 'MessagesService', 'ReceiversService'];
function MessagesController($scope, $filter, $rootScope, $injector, MessagesService, ReceiversService) {

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()

    clearAll();
    $scope.sendMessages = [];
    $scope.date = formatted_date;
    $scope.isLoadingSingle = false;
    $scope.isLoadingBulk = false;
    $scope.user = {
        id: 3,
        username: "vince",
        firstName: "Vince",
        lastName: "Rapisura",
        middleName: ""
    };
    $scope.message = {
        senderDetail: $scope.user,
        receiver: $scope.receiver,
        body: '',
        portalType: ''
    };

    $scope.uploadFile = function () {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            $scope.ProcessExcel(e.target.result);
        }
    };

    $scope.bulkSubmit = function () {
        $scope.isLoadingBulk = true;
        var viber = {
            recipients: [],
            message: ''
        };
        var whatsapp = {
            recipients: [],
            message: ''
        };
        var sms = {
            recipients: [],
            message: ''
        };

        angular.forEach($scope.sendMessages, function (value, key) {
            var receiver = {
                firstName: value.Firstname,
                lastName: value.Lastname,
                middleName: value.Middlename,
                mobileNo: value.Number,
                location: value.Location
            }
            var message = {
                senderDetail: $scope.user,
                receiver: receiver,
                body: value.Message,
                portalType: value.Module
            }

            if (message.portalType == 'Viber') {
                viber.recipients.push(message.receiver.mobileNo);
                viber.message = message.body;
            } else if (message.portalType == 'WhatsApp') {
                whatsapp.recipients.push(message.receiver.mobileNo);
                whatsapp.message = message.body;
            } else {
                sms.recipients.push(message.receiver.mobileNo);
                sms.message = message.body;
            }
        });

        var viberPromise = MessagesService.sendBulkViberMessage(viber);
        viberPromise.then(function (res) {
            if (res.data.length > 0) {
                console.log(res.data);
                var whatsappPromise = MessagesService.sendBulkWhatsappMessage(whatsapp);
                whatsappPromise.then(function (res) {
                    if (res.data.length > 0) {
                        console.log(res.data);
                        var smsPromise = MessagesService.sendBulkSms(sms);
                        smsPromise.then(function (res) {
                            if (res.data.length > 0) {
                                console.log(res.data);
                                $scope.isLoadingBulk = false;
                                swal("Send!", "Message has been sent.", "success");
                            } else {
                                $scope.isLoadingBulk = false;
                                console.log('elsewhere saveMessage');
                                swal("Denied", "Something went wrong", "error");
                            }
                        }, function (errRes) {
                            $scope.isLoadingBulk = false;
                            console.log(errRes);
                            swal("Denied", "Something went wrong", "error");
                        });
                    } else {
                        $scope.isLoadingBulk = false;
                        console.log('elsewhere saveMessage');
                        swal("Denied", "Something went wrong", "error");
                    }
                }, function (errRes) {
                    $scope.isLoadingBulk = false;
                    console.log(errRes);
                    swal("Denied", "Something went wrong", "error");
                });
            } else {
                $scope.isLoadingBulk = false;
                console.log('elsewhere saveMessage');
                swal("Denied", "Something went wrong", "error");
            }
        }, function (errRes) {
            console.log(errRes);
            swal("Denied", "Something went wrong", "error");
            $scope.isLoadingBulk = false;
        });

        // angular.forEach($scope.sendMessages, function (value, key) {
        //     var receiver = {
        //         firstName: value.Firstname,
        //         lastName: value.Lastname,
        //         middleName: value.Middlename,
        //         mobileNo: value.Number,
        //         location: value.Location
        //     }
        //     var message = {
        //         senderDetail: $scope.user,
        //         receiver: receiver,
        //         body: value.Message,
        //         portalType: value.Module
        //     }
        //     var receiverPromise = ReceiversService.searchByMobileNo(receiver.mobileNo);
        //     receiverPromise.then(function (res) {
        //         if (res.data.id) {
        //             if (message.portalType == 'Viber') {
        //                 viber.push(message.receiver.mobileNo);
        //             } else if (message.portalType == 'WhatsApp') {
        //                 whatsapp.push(message.receiver.mobileNo);
        //             } else {
        //                 sms.push(message.receiver.mobileNo);
        //             }
        //             // saveMessage(res.data);
        //         } else {
        //             var receiverSavePromise = ReceiversService.saveReceiver(message.receiver);
        //             receiverSavePromise.then(function (res) {
        //                 console.log(res);
        //                 if (res.data.id) {
        //                     if (message.portalType == 'Viber') {
        //                         viber.push(message.receiver.mobileNo);
        //                     } else if (message.portalType == 'WhatsApp') {
        //                         whatsapp.push(message.receiver.mobileNo);
        //                     } else {
        //                         sms.push(message.receiver.mobileNo);
        //                     }
        //                     // saveMessage(res.data);
        //                 } else {
        //                     console.log('elsewhere saveReceiver');
        //                 }
        //             }, function (err) {
        //                 console.log(err);
        //             });
        //         }
        //     }, function (err) {
        //         console.log(err);
        //     })
        // });

        // console.log(viber);
        // console.log(whatsapp);
        // console.log(sms);
    };

    $scope.singleSubmit = function () {
        $scope.isLoadingSingle = true;
        var receiverPromise = ReceiversService.searchByMobileNo($scope.message.receiver.mobileNo);
        receiverPromise.then(function (res) {
            if (res.data.id) {
                console.log(res.data);
                saveMessage(res.data);
            } else {
                var receiverSavePromise = ReceiversService.saveReceiver($scope.message.receiver);
                receiverSavePromise.then(function (res) {
                    console.log(res);
                    if (res.data.id) {
                        saveMessage(res.data);
                    } else {
                        console.log('elsewhere saveReceiver');
                        $scope.isLoadingSingle = false;
                        swal("Denied", "Something went wrong", "error");
                    }
                }, function (err) {
                    console.log(err);
                    $scope.isLoadingSingle = false;
                    swal("Denied", "Something went wrong", "error");
                });
            }
        }, function (err) {
            console.log(err);
            $scope.isLoadingSingle = false;
            swal("Denied", "Something went wrong", "error");
        })
    }

    function saveMessage(data) {
        $scope.message.receiver = data;
        var messagePromise = MessagesService.saveMessage($scope.message);
        messagePromise.then(function (res) {
            if (res.data.id) {
                var sendMessage = {
                    recepientNo:res.data.receiver.mobileNo,
                    message:res.data.body
                }
                var messagePromise;

                if(res.data.portalType == 'Viber'){
                    messagePromise = MessagesService.sendSingleViberMessage(sendMessage);
                } else if(res.data.portalType == 'WhatsApp'){
                    messagePromise = MessagesService.sendSingleWhatsappMessage(sendMessage);
                } else {
                    messagePromise = MessagesService.sendSingleSms(sendMessage);
                }
                messagePromise.then(function (res) {
                    if (res.data.sid) {
                        console.log(res.data);
                        $scope.isLoadingSingle = false;
                        swal("Send!", "Message has been sent.", "success");
                    } else {
                        $scope.isLoadingSingle = false;
                        console.log('elsewhere saveMessage');
                        swal("Denied", "Something went wrong", "error");
                    }
                }, function (errRes) {
                    $scope.isLoadingSingle = false;
                    console.log(errRes);
                    swal("Denied", "Something went wrong", "error");
                });

            } else {
                $scope.isLoadingSingle = false;
                console.log('elsewhere saveMessage');
                swal("Denied", "Something went wrong", "error");
            }
            $scope.isLoadingSingle = false;
        }, function (errRes) {
            console.log(errRes);
            swal("Denied", "Something went wrong", "error");
            $scope.isLoadingSingle = false;
        });
    }

    $scope.ProcessExcel = function (data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        //Display the data from Excel file in Table.
        $scope.$apply(function () {
            $scope.sendMessages = excelRows
        });
    }

    function clearAll() {
        $scope.receiver = {
            firstName: '',
            lastName: '',
            middleName: '',
            mobileNo: '',
            location: ''
        };
    }

    $('.dropify').dropify();
    // $('select').material_select();
}