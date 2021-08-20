
const pqOptions = {
    width: "auto",
    height: 250,
    showTitle: false,
    showHeader: true,
    showTop: true,
    showToolbar: false,
    showBottom: false,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: false,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center", hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};

function PersonalVM() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
    };

    var isNumeric = function (str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail

    };

    const models = {
        MyModel: function (item) {
            item = item || {};
            this.SalutationId = ko.observable(item.SalutationId || "");
            this.SalutationName = ko.observable(item.SalutationName || "");
            this.FirstName = ko.observable(item.FirstName || "");
            this.LastName = ko.observable(item.LastName || "");
            this.Email = ko.observable(item.Email || "");
            this.PhoneNumber = ko.observable(item.PhoneNumber || "");//extend({ round: 2 });
            this.Age = ko.observable(item.Age || "");
            this.chosenEdu = ko.observableArray([]);

            this.SelectedGender = ko.observable();
            this.Male = ko.computed({
                read: function () {
                    return this.SelectedGender() == "Male";
                },
                write: function (value) {
                    if (value)
                        this.SelectedGender("Male");
                }

            }, this);

            this.NationalId = ko.observable(item.NationalId || "");
            this.Nationality = ko.observable(item.Nationality || "");
        },

        MyAddress: function (item1) {
            item1 = item1 || {};
            this.AddressTypeId = ko.observable(item1.AddressTypeId || "");
            this.AddressType = ko.observable(item1.AddressType || "");
            this.ProvinceId = ko.observable(item1.ProvinceId || "");
            this.Province = ko.observable(item1.Province || "");
            this.CityId = ko.observable(item1.CityId || "");
            this.City = ko.observable(item1.City || "");
            this.SelectedCat = ko.observable();
            this.Metroplitan = ko.computed({
                read: function () {
                    return this.SelectedCat() == "Metroplitan";
                },
                write: function (value) {
                    if (value)
                        this.SelectedCat("Metroplitan");
                }

            }, this);
            this.Ward = ko.observable(item1.Ward || "");
            this.Tole = ko.observable(item1.Tole || "");

        },

        UiElements: function () {
            self.MyModel = ko.observable(new models.MyModel());
            self.MyAddress = ko.observable(new models.MyAddress());
            self.DataList = ko.observableArray([]);
            self.DetailList = ko.observableArray([]);
            self.HdnId = ko.observable('');
            self.PersonalId = ko.observable('');
            self.enableDisableNew = ko.observable(true);
            self.enableDisableAllUpd = ko.observable(false);
            self.enableDisable = ko.observable(false);
            self.enableDisableGender = ko.observable(false);
            self.enableDisableAdd = ko.observable(false);
            self.enableDisableSave = ko.observable(false);
            self.enableDisableClear = ko.observable(false);
            self.enableDisableUpd = ko.observable(false);


            self.SalutationList = ko.observableArray([
                { Text: 'Mr.', Value: '0' },
                { Text: 'Ms.', Value: '1' },
                { Text: 'Mrs.', Value: '2' },
            ]);
            self.NationalList = ko.observableArray([
                { Text: 'Nepalese', Value: '0' },
                { Text: 'Chinese', Value: '1' },
                { Text: 'Indian', Value: '2' },
            ]);
            self.AddressTypeList = ko.observableArray([
                { Text: 'Permanent', Value: '0' },
                { Text: 'Temporary', Value: '1' },
            ]);

            self.ProvinceList = ko.observableArray([
                { Text: 'Province 1', Value: '0' },
                { Text: 'Province 2', Value: '1' },
                { Text: 'Province 3', Value: '2' },
                { Text: 'Province 4', Value: '3' },
                { Text: 'Province 5', Value: '4' },
                { Text: 'Province 6', Value: '5' },
                { Text: 'Province 7', Value: '6' },
            ]);
            self.CityList = ko.observableArray([
                { Text: 'Kathmandu', Value: '0' },
                { Text: 'Lalitpur', Value: '1' },
                { Text: 'Pokhara', Value: '2' },
                { Text: 'Bhartpur', Value: '3' },
                { Text: 'Biratnagar', Value: '4' },
                { Text: 'Nepaljung', Value: '5' },
            ]);

        },
    };

    const UiEvents = {
        validate: {
            SaveValidation: function () {
                // debugger
                if (isNullOrEmpty(self.MyModel().FirstName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputFirstName").focus();
                    $("#errorMessage").html('First Name is Required');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyModel().SalutationId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#salutation").focus();
                    $("#errorMessage").html('Salutation must be entered');
                    $("#dialogbox").dialog("open");
                }

                else if (isNullOrEmpty(self.MyModel().LastName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputLastName").focus();
                    $("#errorMessage").html('Last Name is Required');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    $("#errorMessage").html('Email is Required');
                    $("#dialogbox").dialog("open");
                }
                else if (!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    $("#errorMessage").html('Invalid Email');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyModel().PhoneNumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    $("#errorMessage").html('Phone Number is Required');
                    $("#dialogbox").dialog("open");
                }
                else if (!(isNumeric(self.MyModel().PhoneNumber()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    $("#errorMessage").html('Phone Number Should be Number');
                    $("#dialogbox").dialog("open");
                }
                else if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/).test(self.MyModel().PhoneNumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    $("#errorMessage").html('Phone Number is Invalid');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyModel().Age())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    $("#errorMessage").html('Age is Required');
                    $("#dialogbox").dialog("open");
                }
                else if (!(isNumeric(self.MyModel().Age()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    $("#errorMessage").html('Age must be in Number');
                    $("#dialogbox").dialog("open");
                }
                else if (!((self.MyModel().Age() < 100) && (self.MyModel().Age() > 16))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    $("#errorMessage").html('Age must be Above 16 and below 100');
                    $("#dialogbox").dialog("open");
                }
                else if (!(self.MyModel().SelectedGender() == "Male" || self.MyModel().SelectedGender() == "Female")) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inlineRadio1").focus();
                    $("#errorMessage").html('Choose the Gender');
                    $("#dialogbox").dialog("open");
                }
                else if ((self.MyModel().chosenEdu()) == "") {
                    $("#tabs").tabs({ active: 0 });
                    $("#inlineCheckbox1").focus();
                    $("#errorMessage").html('Select your Education');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyModel().NationalId())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#nationality").focus();
                    $("#errorMessage").html('Nationality must be entered');
                    $("#dialogbox").dialog("open");
                }
                else if (self.DataList() == "") {
                    $("#tabs").tabs({ active: 1 });
                    $("#addressType").focus();
                    $("#errorMessage").html('Address Must be added!!!!');
                    $("#dialogbox").dialog("open");
                }
                else {
                        self.MyModel().SalutationName((self.SalutationList().find(X => X.Value == self.MyModel().SalutationId()) || {}).Text);
                        self.MyModel().Nationality((self.NationalList().find(X => X.Value == self.MyModel().NationalId()) || {}).Text);
                        if (isNullOrEmpty(self.PersonalId())) {
                            UiEvents.AjaxFunction.AjaxCallForSave();
                        }
                        else {
                            UiEvents.AjaxFunction.AjaxCallForUpdate();
                        }
                        return true;
                     }
            },

            AddressValidation: function () {
                if (isNullOrEmpty(self.MyAddress().AddressTypeId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#addressType").focus();
                    $("#errorMessage").html('Address Type Should must be entered');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyAddress().ProvinceId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#province").focus();
                    $("#errorMessage").html('Province Should must be entered');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyAddress().CityId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#city").focus();
                    $("#errorMessage").html('City Should must be entered');
                    $("#dialogbox").dialog("open");
                }
                else if (!(self.MyAddress().SelectedCat() == "Metroplitan" || self.MyAddress().SelectedCat() == "Municipality" || self.MyAddress().SelectedCat() == "SubMunicipality")) {
                    $("#tabs").tabs({ active: 1 });
                    $("#Metroplitan").focus();
                    $("#errorMessage").html('Choose the City Category');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyAddress().Ward())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    $("#errorMessage").html('Ward Should must be entered');
                    $("#dialogbox").dialog("open");
                }
                else if (!(self.MyAddress().Ward() < 21)) {
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    $("#errorMessage").html('Ward must be below 20');
                    $("#dialogbox").dialog("open");
                }
                else if (isNullOrEmpty(self.MyAddress().Tole())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#tole").focus();
                    $("#errorMessage").html('Tole must be entered');
                    $("#dialogbox").dialog("open");

                }
                else {
                    debugger
                    //var a = self.MyAddress().AddressTypeId((self.AddressTypeList().find(X => X.Text == self.MyAddress().AddressType()) || {}).Value);
                    if (ko.toJS(self.DataList().find(x => (x.AddressTypeId == self.MyAddress().AddressTypeId())))) {
                        $("#errorMessage").html('Same Address Type!!......Data Already Exist!!');
                        $("#dialogbox").dialog("open");
                    }
                    else {
                        self.MyAddress().AddressType((self.AddressTypeList().find(X => X.Value == self.MyAddress().AddressTypeId()) || {}).Text);
                        self.MyAddress().Province((self.ProvinceList().find(X => X.Value == self.MyAddress().ProvinceId()) || {}).Text);
                        self.MyAddress().City((self.CityList().find(X => X.Value == self.MyAddress().CityId()) || {}).Text);
                        self.DataList.push(ko.toJS(self.MyAddress()));

                        return true;
                    }

                }
            },

            UpdateValidation: function () {
                if (isNullOrEmpty(self.MyAddress().AddressTypeId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#addressType").focus();
                    alert("Address Type Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().ProvinceId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#province").focus();
                    alert("Province Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().CityId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#city").focus();
                    alert("City Should must be entered");
                }
                else if (!(self.MyAddress().SelectedCat() == "Metroplitan" || self.MyAddress().SelectedCat() == "Municipality" || self.MyAddress().SelectedCat() == "SubMunicipality")) {
                    $("#tabs").tabs({ active: 1 });
                    $("#Metroplitan").focus();
                    alert("Choose the City Category");
                }
                else if (isNullOrEmpty(self.MyAddress().Ward())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    alert("Ward Should must be entered");
                }
                else if (!(self.MyAddress().Ward() < 21)) {
                    alert("Ward must be below 20");
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    return;
                }
                else if (isNullOrEmpty(self.MyAddress().Tole())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#tole").focus();
                    alert("Tole must be entered");
                }
                else {
                    return true;
                }
            },
        },

        AjaxFunction: {
            AjaxCallForSave: function () {
                /*debugger*/
                var edu = ko.toJS(self.MyModel().chosenEdu())
                var edulist = [];

                for (let i = 0; i < edu.length; i++) {

                    edulist.push({ "name": edu[i] })
                }
                debugger
                let personInfo = {
                    Id: self.PersonalId(),
                    Salutation: self.MyModel().SalutationName(),
                    FirstName: self.MyModel().FirstName(),
                    LastName: self.MyModel().LastName(),
                    Email: self.MyModel().Email(),
                    PhoneNumber: self.MyModel().PhoneNumber(),
                    Age: self.MyModel().Age(),
                    Gender: self.MyModel().SelectedGender(),
                    Educations: edulist,
                    Nationality: self.MyModel().Nationality(),

                    AddressList: ko.toJS(self.DataList())
                    //AddressList: [{ "AddressType": self.MyAddress().AddressType(), "Province": self.MyAddress().Province(), "City": self.MyAddress().City(), "CityCategory": self.MyAddress().SelectedCat(), "Ward": self.MyAddress().Ward(), "Tole": self.MyAddress().Tole() },
                    //{ "AddressType": "per", "Province": "Prov- 2", "City": "Bharatpur", "CityCategory": "asd", "Ward": "4", "Tole": "asd" }]
                }
                console.log(personInfo);

                $.ajax({

                    type: "POST",
                    url: '/Home/GetJsonData',
                    dataType: "json",
                    data: JSON.stringify({ "data": personInfo }),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        /*debugger*/
                        alert("Successfully Submited!!");
                        //alert(data.Name + "-" + data.Email + "-" + data.Phone + "-" + data.Age);

                    }

                });
            },

            AjaxCallForUpdate: function () {
                /*debugger*/
                var edu = ko.toJS(self.MyModel().chosenEdu())
                var edulist = [];

                for (let i = 0; i < edu.length; i++) {

                    edulist.push({ "name": edu[i] })
                }
                debugger
                let personInfo = {
                    Id: self.PersonalId(),
                    Salutation: self.MyModel().SalutationName(),
                    FirstName: self.MyModel().FirstName(),
                    LastName: self.MyModel().LastName(),
                    Email: self.MyModel().Email(),
                    PhoneNumber: self.MyModel().PhoneNumber(),
                    Age: self.MyModel().Age(),
                    Gender: self.MyModel().SelectedGender(),
                    Educations: edulist,
                    Nationality: self.MyModel().Nationality(),

                    AddressList: ko.toJS(self.DataList())
                    //AddressList: [{ "AddressType": self.MyAddress().AddressType(), "Province": self.MyAddress().Province(), "City": self.MyAddress().City(), "CityCategory": self.MyAddress().SelectedCat(), "Ward": self.MyAddress().Ward(), "Tole": self.MyAddress().Tole() },
                    //{ "AddressType": "per", "Province": "Prov- 2", "City": "Bharatpur", "CityCategory": "asd", "Ward": "4", "Tole": "asd" }]
                }
                console.log(personInfo);

                

                $.ajax({

                    type: "POST",
                    url: '/Home/GetJsonData',
                    dataType: "json",
                    data: JSON.stringify({ "data": personInfo }),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        alert("Successfully Updated!!");
                    }

                });
            },

            AjaxCallforDetail: function () {
                $.ajax({

                    type: "POST",
                    url: '/Home/GetAllData',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        /*debugger;*/
                        self.DetailList([]);
                        self.DetailList(result.Data);
                        UiEvents.functions.AddDetails("DetailGrid");
                    }
                });
            },

            AjaxForEdit: function (PersonalId) {
                /*debugger*/
                self.DataList([]);
                $.ajax({
                    type: "POST",
                    url: '/Home/FetchDetails',
                    dataType: "json",
                    data: JSON.stringify({ Id: PersonalId }),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        UiEvents.functions.AddDetails("DetailGrid");
                        $("#tabs").tabs({ active: 0 });
                        self.enableDisableAllUpd(true);
                        self.enableDisableClear(true);
                        self.enableDisableNew(false);
                        self.enableDisableSave(false);
                        self.enableDisable(true);
                        self.enableDisableAdd(false);
                        self.enableDisableAdd(true);
                        self.enableDisableUpd(false);
                        self.DataList([]);
                        self.DataList(data.Data.AddressList);
                        UiEvents.functions.Save("dataGrid");
                        self.PersonalId(data.Data.Id);
                        self.MyModel().FirstName(data.Data.FirstName);
                        self.MyModel().FirstName(data.Data.FirstName);
                        self.MyModel().LastName(data.Data.LastName);
                        self.MyModel().Age(data.Data.Age);
                        self.MyModel().PhoneNumber(data.Data.PhoneNumber);
                        self.MyModel().Email(data.Data.Email);
                        self.MyModel().SelectedGender(data.Data.Gender);

                        /*debugger*/
                        var edu = data.Data.Educations;
                        let edulist = [];
                        for (let i = 0; i < edu.length; i++) {
                            edulist.push(edu[i].Name);
                        }
                        self.MyModel().chosenEdu(edulist);

                        self.MyModel().SalutationId((self.SalutationList().find(x => x.Text == data.Data.Salutation)).Value);
                        self.MyModel().NationalId((self.NationalList().find(x => x.Text == data.Data.Nationality)).Value);
                        /*self.MyModel().Nationality((self.NationalList().find(X => X.Value == self.MyModel().NationalId()) || {}).Text*/
                    }
                })
            },

            AjaxForDelete: function (PersonalId) {

                $.ajax({
                    type: "POST",
                    url: '/Home/DeleteData',
                    dataType: "json",
                    data: JSON.stringify({ Id: PersonalId }),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        /*debugger*/
                        UiEvents.AjaxFunction.AjaxCallforDetail();
                    }
                })
            }

        },

        clear: {
            ResetAll: function () {
                self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                $("#tabs").tabs();
                self.DataList([]);

            },

            clearfield: function () {
                //self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                $("#tabs").tabs();

            },

        },

        functions: {
            Save: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "Type", align: "left", dataIndx: "AddressType", width: "10%" },
                        { title: "Province", align: "center", dataIndx: "Province", width: "15%" },
                        { title: "City", align: "center", dataIndx: "City", width: "15%" },
                        { title: "CityCategory", align: "Center", dataIndx: "SelectedCat", width: "15%" },
                        { title: "Ward", align: "Center", dataIndx: "Ward", width: "10%" },
                        { title: "Tole", align: "Center", dataIndx: "Tole", width: "15%" },
                        {
                            title: "Action", align: "Center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.Add_delete(${ui.rowIndx});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.Add_edit(${ui.rowIndx});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    options.showBottom = false;

                    $("#" + control).pqGrid(options);
                }
            },

            AddDetails: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DetailList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "Salutation", align: "center", dataIndx: "Salutation", width: "5%" },
                        { title: "FirstName", align: "left", dataIndx: "FirstName", width: "10%" },
                        { title: "LastName", align: "center", dataIndx: "LastName", width: "10%" },
                        { title: "Age", align: "center", dataIndx: "Age", width: "5%" },
                        { title: "PhoneNumber", align: "Center", dataIndx: "PhoneNumber", width: "15%" },
                        { title: "Email", align: "Center", dataIndx: "Email", width: "15%" },
                        { title: "Gender", align: "Center", dataIndx: "Gender", width: "10%" },
                        { title: "Nationality", align: "Center", dataIndx: "Nationality", width: "10%" },
                        {
                            title: "Action", align: "Center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.DetailDelete(${ui.rowData.Id});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.DetailEdit(${ui.rowData.Id});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.DetailList()) };
                    options.showBottom = true;
                    options.height = 300;
                    $("#" + control).pqGrid(options);
                }
            },
        },

    };


    self.onChangeOfSalutation = function () {
        if (self.MyModel().SalutationId() == "0") {
            self.MyModel().SelectedGender("Male");
            self.enableDisableGender(false);
        }
        else if (self.MyModel().SalutationId() == "1" || self.MyModel().SalutationId() == "2") {
            self.MyModel().SelectedGender("Female");
            self.enableDisableGender(false);
        }
        else {
            self.enableDisableGender(true);
            return;
        }

    };

    self.Save = function () {
        
        if (UiEvents.validate.SaveValidation()) {
            self.DataList([]);
            UiEvents.functions.Save("dataGrid");
            UiEvents.clear.ResetAll();
            self.enableDisableClear(false);
            self.enableDisableNew(true);
            self.enableDisableSave(false);
            self.enableDisable(false);
            self.enableDisableAdd(false);

        }
    };

    self.Add = function () {
        
        if (UiEvents.validate.AddressValidation()) {
            UiEvents.functions.Save("dataGrid");
            UiEvents.clear.clearfield();
            self.enableDisableClear(true);
            self.enableDisableNew(true);
            self.enableDisableSave(true);
            self.enableDisable(true);
            self.enableDisableAdd(true);

        }
    };

    self.Clear = function () {
        UiEvents.clear.ResetAll();
        self.enableDisableClear(false);
        self.enableDisableNew(true);
        self.enableDisableSave(false);
        self.enableDisable(false);
        self.enableDisableAdd(false);
        self.enableDisableAllUpd(false);
        UiEvents.functions.Save("dataGrid");
        //PersonalVM.Init();

    };

    self.New = function () {
        self.enableDisableSave(true);
        self.enableDisableClear(true);
        self.enableDisable(true);
        self.enableDisableGender(true);
        self.enableDisableNew(false);
        self.enableDisableAdd(true);
        UiEvents.functions.Save("dataGrid");

    };

    self.Add_delete = function deleteRow(index) {

        self.DataList.splice(index, 1);
        UiEvents.functions.Save("dataGrid");

    };

    self.Add_edit = function editRow(index) {
            var a = $('#dataGrid').pqGrid("getRowData", { rowIndx: index });
            self.MyAddress().AddressTypeId((self.AddressTypeList().find(x => x.Text == a.AddressType)).Value);
            self.MyAddress().ProvinceId((self.ProvinceList().find(x => x.Text == a.Province)).Value);
            self.MyAddress().CityId((self.CityList().find(x => x.Text == a.City)).Value);
            //self.MyAddress().ProvinceId(a.ProvinceId);
            //self.MyAddress().CityId(a.CityId);
            self.MyAddress().SelectedCat(a.SelectedCat);
            self.MyAddress().Ward(a.Ward);
            self.MyAddress().Tole(a.Tole);
            self.enableDisableSave(false);
            self.enableDisableUpd(true);
            self.enableDisableClear(false);
            self.enableDisable(true);
            self.enableDisableAdd(false);

            self.HdnId(index);
    };

    self.Update = function () {
        //debugger
        if (isNullOrEmpty(self.HdnId())) {
            alert('Error!!......Invalid Selection!!');
        }
        else {
            self.MyAddress().AddressType((self.AddressTypeList().find(X => X.Value == self.MyAddress().AddressTypeId()) || {}).Text);
            self.MyAddress().Province((self.ProvinceList().find(X => X.Value == self.MyAddress().ProvinceId()) || {}).Text);
            self.MyAddress().City((self.CityList().find(X => X.Value == self.MyAddress().CityId()) || {}).Text);

            let list = ko.toJS(self.DataList());

            list[self.HdnId()].AddressType = self.MyAddress().AddressType();
            list[self.HdnId()].Province = self.MyAddress().Province();
            list[self.HdnId()].City = self.MyAddress().City();
            list[self.HdnId()].SelectedCat = self.MyAddress().SelectedCat();
            list[self.HdnId()].Ward = self.MyAddress().Ward();
            list[self.HdnId()].Tole = self.MyAddress().Tole();
            debugger;
            if (UiEvents.validate.UpdateValidation()) {
                    self.DataList([]);
                    self.DataList(list);
                    UiEvents.functions.Save("dataGrid");
                    UiEvents.clear.clearfield();
                    self.enableDisableSave(false);
                    self.enableDisableUpd(false);
                    self.enableDisableClear(false);
                    self.enableDisable(false);
                    self.enableDisableNew(true);
                    self.HdnId('');
            }

        }
    };

    self.DetailDelete = function (PersonalId) {
        UiEvents.AjaxFunction.AjaxForDelete(PersonalId);
    };

    self.DetailEdit = function (PersonalId) {
        UiEvents.AjaxFunction.AjaxForEdit(PersonalId);
        self.PersonalId(PersonalId);
    };

    self.AllUpdate = function () {
        if (UiEvents.validate.SaveValidation()) {
            self.DataList([]);
            UiEvents.functions.Save("dataGrid");
            UiEvents.clear.ResetAll();
            self.enableDisableClear(false);
            self.enableDisableNew(true);
            self.enableDisableSave(false);
            self.enableDisable(false);
            self.enableDisableAdd(false);

        }
        
    }

    function Init() {
        models.UiElements();
        $("#tabs").tabs();
        UiEvents.clear.ResetAll();

        $("#tabs, #tabs-2").click(function () {
            UiEvents.functions.Save("dataGrid");
        });

        $("#tabs, #tabs-3").click(function () {
            UiEvents.AjaxFunction.AjaxCallforDetail();
        });

        $("#dialogbox").dialog({
            autoOpen: false,
        });

    }

    Init();
}

var obj;

$(document).ready(function () {
    obj = new PersonalVM();
    ko.applyBindings(obj);


});