sap.ui.controller("Client.productInventory", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	 var that = this;
	 sap.ui.globalParameters.productInvCont = this;
	 /*
	 var handler={};
        handler.callback=function(data){
            that.getView().loadRevenues(data);
        };
      sap.json.execute(PassingParam,"GET",handler.callback); 
	 */
   },
   loadProductInventory : function(){
       var PassingParam = {};
       PassingParam.productInventory = true;
       var that = this;
       var handler={};
        handler.callback=function(data){
            that.getView().loadInventory(data);
        };
      sap.json.execute(PassingParam,"GET",handler.callback); 
   },
   brandPressHandler : function(event){
       var brand = event.getSource().getSrc();
       var control = sap.ui.globalParameters.productInvCont;
       var str = [];
       
       brand = brand.slice(21);
       for(var i=0;i<brand.length;i++){
           if(brand[i] != '.')
            str[i] = brand[i];
            else break;
       }
       var string = str.join("");
       sap.ui.globalParameters.selectedBrand = string;
       control.loadLikesData(string);
       //control.getView().createOverlay();
     
   },
   
   loadLikesData: function(brand){
       var control = sap.ui.globalParameters.productInvCont;
       var PassingParam = {};
      PassingParam.productInsight = true;
      PassingParam.brand = brand;
      var that = this;
       var handler={};
        handler.callback=function(data){
            control.bindOverlay(data);
        };
        sap.json.execute(PassingParam,"GET",handler.callback);
   },
   bindOverlay : function(data){
       var control = sap.ui.globalParameters.productInvCont;
       control.getView().createOverlay(data);
       var that = control;
       control.discountDrop.attachChange(that.discountDropHandler,that);
       
   },
   sendDiscountData : function(){
       var control = sap.ui.globalParameters.productInvCont;
       if(sap.ui.globalParameters.selectedDiscount== undefined)
        sap.ui.globalParameters.selectedDiscount = "10";
        var PassingParam = {};
        PassingParam.prodCam = true;
      PassingParam.brandCam = sap.ui.globalParameters.selectedBrand;
      PassingParam.disc = sap.ui.globalParameters.selectedDiscount;
      var that = this;
       var handler={};
        handler.callback=function(data){
           control.successCamp(); 
        };
        sap.json.execute(PassingParam,"GET",handler.callback);
       
   },
   	
   discountDropHandler: function(event){
       var control = sap.ui.globalParameters.productInvCont;
      var selected = event.getParameter("selectedItem");
      var text = selected.getText();
      var key = selected.getKey();
      sap.ui.globalParameters.selectedDiscount = key;
      control.getView().renderGraph();
   },
   
   successCamp: function(){
       sap.ui.commons.MessageBox.alert("Campaign successfully assigned!");
   },
   
   conversionHandler : function(event){
       var control = sap.ui.globalParameters.productInvCont;
       var value = event.getParameter("value");
       sap.ui.globalParameters.conversion = value;
       control.getView().renderGraph();
   },

   	



/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
   onBeforeRendering: function() {
          
   },

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
