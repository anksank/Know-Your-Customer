sap.ui.jsview("Client.openingPage", {

    getControllerName : function() {
        return "Client.openingPage";
    },

      createContent : function(oController) {
          sap.ui.globalParameters.openingView = this;
        var vLayout = new sap.ui.layout.VerticalLayout().addStyleClass("openingPage");
        var windowWidth = $(window).width();
        var openingImg = new sap.ui.commons.Image({type:"icon",press:this.openApp});
             openingImg.setHeight("758px");
             openingImg.setWidth("1600px");
             openingImg.setSrc("Client/images/new_image.jpg");//Like.jpg
             
        vLayout.addContent(openingImg);
        oController.vLayout = vLayout;
        this.vLayout = vLayout; 
        return vLayout;
       
    },

     openApp : function(event){
         var that =  sap.ui.globalParameters.openingView;
    var view = sap.ui.view({viewName:"Client.Main", type:sap.ui.core.mvc.ViewType.JS});
    that.vLayout.removeAllContent();
    that.vLayout.addContent(view);
    
},
      

});
