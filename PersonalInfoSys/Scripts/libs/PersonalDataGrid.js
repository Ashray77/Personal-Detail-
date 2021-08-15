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

function DetailVM() {
    const self = this;

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
    

        UiElements: function () {
            self.MyModel = ko.observable(new models.MyModel());
            self.DetailList = ko.observableArray([]);
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
        },
    };

    const UiEvents = {
        functions: {
            Save: function (control) {
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
                        { title: "PhoneNumber", align: "Center", dataIndx: "PhoneNumber", width: "10%" },
                        { title: "Email", align: "Center", dataIndx: "Email", width: "10%" },
                        { title: "Gender", align: "Center", dataIndx: "Gender", width: "10%" },
                        { title: "Nationality", align: "Center", dataIndx: "Nationality", width: "10%" },
                        {
                            title: "Action", align: "Center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.delete(${ui.rowIndx});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.edit(${ui.rowIndx});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.DetailList()) };
                    options.showBottom = false;
                    $("#" + control).pqGrid(options);
                }
            }
        },
    }

    function Init() {
        models.UiElements();
        UiEvents.functions.Save("DetailGrid");
    }

    Init();
}

$(document).ready(function () {
    obj = new DetailVM();
    ko.applyBindings(obj);


});
