sap.ui.controller("Client.homePage", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
       var that = this;
       this.calenderLogo.attachPress(that.calenderDropdownHandler,that);
       sap.ui.globalParameters.homePageCtrl = this;
       this.getView().testButton.attachPress(this.uploadCsvHandler, this);
       
	 this.loadMetaData();
   },
   	
  loadMetaData : function(){
      if(sap.ui.globalParameters.Period == undefined)
      sap.ui.globalParameters.Period = "3";
       var PassingParam = {};
       PassingParam.overAll = true;
       PassingParam.period = sap.ui.globalParameters.Period;
       var that = this;
       var handler={};
        handler.callback=function(data){
            that.getView().loadBottom(data);
        };
      sap.json.execute(PassingParam,"GET",handler.callback); 
    
  },
  uploadCsvHandler: function(){
       // this.getFields(this);
        this.getView().createDialogCSV(this.getView());
        this.getView().oSimpleFileUploader.attachChange(this.mappingCSV, this);
      
  },
   mappingCSV: function() {
        this.fileText = null;
        this.firstLine = null;

        //get the csv data including the fields
        var uploaderId = this.getView().oSimpleFileUploader.getId() + "-fu";
        var fileInput = jQuery.sap.domById(uploaderId);
        this.getView().uploadDialog.close();
        this.readTextFile(fileInput.files[0]);
     //   this.getView().createDScsvDialog(this.getView());
     //   this.getView().oRBYes.attachSelect(this.radioHandlerYes, this);
      //  this.getView().oRBNo.attachSelect(this.radioHandlerNo, this);
     //   this.getView().EntityComboBox.attachChange(this.renderHandler, this);
        //this.getView().DSNameComboBox.attachChange(this.getKey, this);

        //this.handlePopulation(this);
     //   this.populateEntities();
        
        
    },
    readTextFile: function(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        var that = this;
        reader.onload = function(e) {
            var fileText = reader.result;
            that.fileText = fileText;
            var i = fileText.indexOf("\n");
            var fields = fileText.split("\n");
            that.fields = fields.slice(1);
            var data;
            var PassingParam = {};
            PassingParam.fields=JSON.stringify(that.fields);
            PassingParam.customerAaya=true;
            PassingParam.overAll=false;
            var handler={};
            handler.callback=function(data){
               that.loadMetaData();
            };
            sap.json.execute(PassingParam,"GET",handler.callback);
            
          //  that.populateCSVFields(fields, that);

            //decision to populate data source keys
            //that.populateKey(that);
        //    var oModel = sap.ui.getCore().getModel();
         //   oModel.getData().DScsvText = fileText;
        };
    },
  loadInStoreCustomers : function(event){
      var control = sap.ui.globalParameters.homePageCtrl;
        var PassingParam = {};
        PassingParam.in_store = true;
        var that = this;
        var handler={};
        handler.callback=function(data){
            control.getView().createInStoreOverlay(data);
        };
        sap.json.execute(PassingParam,"GET",handler.callback);
  },
  calenderDropdownHandler : function(){
      this.getView().calenderDropdown();
      var that = this;
      this.calenderDrop.attachChange(that.dropdownHandler,that);
  },
  dropdownHandler: function(event){
      var selected = event.getParameter("selectedItem");
      var key = selected.getKey();
      var text = selected.getText();
      sap.ui.globalParameters.Period = key;
      sap.ui.globalParameters.calenderText = text;
      this.calenderDrop.setValue(text);
      this.loadMetaData();
      this.getView().loadCalender(text);
  }


/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

});
