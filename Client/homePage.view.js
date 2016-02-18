sap.ui.jsview("Client.homePage", {

    getControllerName : function() {
        return "Client.homePage";
    },

      createContent : function(oController) {
        var windowWidth = $(window).width();
        var sideWidth = "200";
        
        
        oController.loadMetaData();
        
        var calenderDrop = new sap.ui.commons.DropdownBox();
        calenderDrop.setTooltip("calender");
        calenderDrop.setEditable(true);
        calenderDrop.setWidth("150px");
        var oItem = new sap.ui.core.ListItem({text:"3 Months",key:"3"});
        calenderDrop.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text:"6 Months",key:"6"});
        calenderDrop.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text:"9 Months", key:"9"});
         calenderDrop.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text:"1 year", key:"1"});
        calenderDrop.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text:"2 years", key:"2"});
        calenderDrop.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text:"3 years", key:"5"});
        calenderDrop.addItem(oItem);
        oItem = new sap.ui.core.ListItem({text:"4 years", key:"4"});
        calenderDrop.addItem(oItem);
        oController.calenderDrop = calenderDrop;
        this.calenderDrop = calenderDrop;
     
        var mainLayout = new sap.ui.layout.VerticalLayout({width:(windowWidth-sideWidth)+"px"}).addStyleClass("rightSide");
        var testButton = new sap.ui.commons.Button({text:"Update"}).addStyleClass("UpdateButton");
        this.testButton = testButton;
        var insightsLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("insightsLayout");
        var bottomMainLayout = new sap.ui.layout.VerticalLayout({width:(windowWidth-sideWidth)+"px"}).addStyleClass("homeBottom");
        var bottomLayout = new sap.ui.layout.HorizontalLayout();
        var leftlineLogo = new sap.ui.commons.Image().addStyleClass("line");
        leftlineLogo.setSrc("Client/images/Horizontal_Line.png");
        var customerInsightsLabel = new sap.ui.commons.Label().addStyleClass("customerInsightsLabel");
        customerInsightsLabel.setText("CUSTOMER INSIGHTS");
        var rightlineLogo = new sap.ui.commons.Image().addStyleClass("line");
        rightlineLogo.setSrc("Client/images/Horizontal_Line.png");
        
        insightsLayout.addContent(leftlineLogo);
        insightsLayout.addContent(customerInsightsLabel);
        insightsLayout.addContent(rightlineLogo);
        
        var retailLogo = new sap.ui.commons.Image().addStyleClass("retailLogo");
        retailLogo.setSrc("Client/images/patloons.jpg");
        
        var kycLogo = new sap.ui.commons.Image().addStyleClass("kycLogo");
        kycLogo.setSrc("Client/images/logo.png"); 
        
        var customersLogo = new sap.ui.commons.Image().addStyleClass("bottomIcons");
        customersLogo.setSrc("Client/images/customers.png");
        
        var customersinLogo = new sap.ui.commons.Image({press:oController.loadInStoreCustomers}).addStyleClass("bottom2Icons");
        customersinLogo.setSrc("Client/images/customer in store.png");
        
        var transactionsLogo = new sap.ui.commons.Image().addStyleClass("bottom2Icons");
        transactionsLogo.setSrc("Client/images/transactions.png");
        
        var calenderLogo = new sap.ui.commons.Image().addStyleClass("bottom2Icons");
        calenderLogo.setSrc("Client/images/Calendar.png"); 
        oController.calenderLogo = calenderLogo;
        
        var vLayout = new sap.ui.commons.layout.VerticalLayout();
        var vLayout1 = new sap.ui.commons.layout.VerticalLayout();
        var vLayout2 = new sap.ui.commons.layout.VerticalLayout();
        var vLayout3 = new sap.ui.commons.layout.VerticalLayout();
        this.vLayout2 = vLayout2;
        var customersNoLabel = new sap.ui.commons.Label().addStyleClass("NoLabel");
        var custLabel = new sap.ui.commons.Label({text: "Customers"}).addStyleClass("bottomLabels");
        
        var customersinNoLabel = new sap.ui.commons.Label().addStyleClass("NoLabel");
        var custinLabel = new sap.ui.commons.Label({text: "Customers In Store"}).addStyleClass("bottomLabels");
        
        var transactionsNoLabel = new sap.ui.commons.Label().addStyleClass("NoLabel");
        var transLabel = new sap.ui.commons.Label({text: "Transactions"}).addStyleClass("bottomLabels");
        
        var calenderNoLabel = new sap.ui.commons.Label().addStyleClass("NoLabel");
        var calenderLabel = new sap.ui.commons.Label({text: "Months"}).addStyleClass("bottomLabels");
        
        bottomLayout.addContent(customersLogo);
        vLayout.addContent(customersNoLabel);
        vLayout.addContent(custLabel);
        bottomLayout.addContent(vLayout);
        
        bottomLayout.addContent(customersinLogo);
        vLayout3.addContent(customersinNoLabel);
        vLayout3.addContent(custinLabel);
        bottomLayout.addContent(vLayout3);
        
        bottomLayout.addContent(transactionsLogo);
        vLayout1.addContent(transactionsNoLabel);
        vLayout1.addContent(transLabel);
        bottomLayout.addContent(vLayout1);
        
        bottomLayout.addContent(calenderLogo);
        vLayout2.addContent(calenderNoLabel);
       
        bottomLayout.addContent(vLayout2);
        bottomMainLayout.addContent(bottomLayout);
        this.customersNoLabel = customersNoLabel;
        this.transactionsNoLabel = transactionsNoLabel;
        this.customersinNoLabel = customersinNoLabel;
        this.calenderNoLabel = calenderNoLabel;
        mainLayout.addContent(testButton);
        mainLayout.addContent(insightsLayout);
        mainLayout.addContent(retailLogo);
        //mainLayout.addContent(kycLogo);
        mainLayout.addContent(bottomMainLayout);
    	
    	return mainLayout;
    },
      
 loadBottom : function(data){
     if(sap.ui.globalParameters.calenderText == undefined)
        sap.ui.globalParameters.calenderText ="3 Months";
      this.customersNoLabel.setText(data.customerCount);
      this.transactionsNoLabel.setText(data.transactionCount);
      this.customersinNoLabel.setText(data.customerInStore);
      this.calenderNoLabel.setText(sap.ui.globalParameters.calenderText);
 },
 calenderDropdown : function(){
     if(this.vLayout2.getContent().length == 2)
     this.vLayout2.removeContent(this.calenderDrop);
     else
     this.vLayout2.addContent(this.calenderDrop);
     
 },
 loadCalender : function(text){
     if(sap.ui.globalParameters.calenderText == undefined)
        sap.ui.globalParameters.calenderText ="3 Months";
     this.vLayout2.removeContent(this.calenderDrop);
     this.calenderNoLabel.setText(sap.ui.globalParameters.calenderText);
 },
 createInStoreOverlay: function(data){
      this.customerInOverlay = new sap.ui.ux3.OverlayContainer().addStyleClass("brandOverlay");
      var mainLayout = new sap.ui.layout.VerticalLayout();
      var scrollLayout = new sap.ui.commons.layout.VerticalLayout({ width : "900px" , height : "140px"}).addStyleClass("customerList");
      var likesLayout = new sap.ui.layout.HorizontalLayout();
      this.likesLayout = likesLayout;
      var discountsLayout = new sap.ui.layout.VerticalLayout();
      this.discountsLayout = discountsLayout;
      var consumerLayout = new sap.ui.commons.layout.MatrixLayout({ width : "100%" , columns : 3 , widths : ["50%","25%","25%"]});
      consumerLayout.createRow(this.createCell(new sap.ui.commons.Label({ text : "Customer"}).addStyleClass("columnHeaderLabel").addStyleClass("campaignColumnHeader"),true,false),
    			  					this.createCell(new sap.ui.commons.Label({ text : "Gender"}).addStyleClass("columnHeaderLabel").addStyleClass("campaignColumnHeader"),true,true),
    			  					this.createCell(new sap.ui.commons.Label({ text : "Age"}).addStyleClass("columnHeaderLabel").addStyleClass("campaignColumnHeader"),true,true)
    			  					);
      this.consumerLayout = consumerLayout;
      this.renderDetails(data);
      scrollLayout.addContent(consumerLayout);
      mainLayout.addContent(scrollLayout);
      mainLayout.addContent(likesLayout);
      mainLayout.addContent(discountsLayout);
      this.customerInOverlay.addContent(mainLayout);
      this.customerInOverlay.setOpenButtonVisible(false);
      this.customerInOverlay.open();
},
 createCell : function(content,header,seperation) {
    	  var cell = new sap.ui.commons.layout.MatrixLayoutCell( { content : content ,
  		  	backgroundDesign : sap.ui.commons.layout.BackgroundDesign.None,
				separation : seperation?sap.ui.commons.layout.Separation.SmallWithLine:sap.ui.commons.layout.Separation.None } );
    	  return cell;

      },
renderDetails: function(data){
    var PassingParam = {};
    PassingParam.id = data.RESULT[0].CUST_ID;
    PassingParam.trending = true;
    
      for(i=0;i<data.RESULT.length;i++){
          this.createInStoreConsumerRow(data.RESULT[i]);
      }
    this.renderDetailsChart(PassingParam.id);
      var that =this;
		var handler = {};
		handler.callback = function(data) {
	    that.renderDetailsChart(data.selectedItem.CUST_ID);
	};
	if ( that.consumerLayout.getRows() && that.consumerLayout.getRows().length > 0) {
		that.consumerLayout.selectedRow = that.consumerLayout.getRows()[1];
	}
    this.consumerLayout.onAfterRendering = function(event) {
		updateMatrixSelectionSettings(that.consumerLayout,data.RESULT,handler.callback,true);
	};  
   },
createInStoreConsumerRow : function(data){
    this.consumerLayout.createRow(this.createCell(new sap.ui.commons.Label({ text :data.FIRST_NAME + " " +data.LAST_NAME }).addStyleClass("journeyRowlabel"),false,false),
					this.createCell(new sap.ui.commons.Label({ text : data.GENDER }).addStyleClass("journeyRowlabel"),false,true),
					this.createCell(new sap.ui.commons.Label({ text : data.AGE }).addStyleClass("journeyRowlabel"),false,true)
					).addStyleClass("consumerListMatrix");
    
},
createDialogCSV: function() {
        var uploadDialog = new sap.ui.commons.Dialog({
            title: "Upload CSV file"
        });
       // uploadDialog.addStyleClass("dialog1");
    //    uploadDialog.addStyleClass("dialog2");
     //   uploadDialog.addStyleClass("dialog3");
        
        this.oSimpleFileUploader = new sap.ui.commons.FileUploader({
            name: "fileUploader",
            uploadOnChange: false
        });
        // attach it to the page
        uploadDialog.addContent(this.oSimpleFileUploader);
        //this.uploadOk = new sap.ui.commons.Button({text: "OK"});

        //uploadDialog.addButton(this.uploadOk);
        this.uploadDialog = uploadDialog;
        uploadDialog.open();
    },
    
  renderDetailsChart : function(id){
       var PassingParam = {};
      PassingParam.trending = true;
      PassingParam.id = id;
      sap.ui.globalParameters.currentId = PassingParam.id;
      var that = this;
       var handler={};
      handler.callback=function(data){
         that.renderPastDiscounts(data);
        };
      sap.json.execute(PassingParam,"GET",handler.callback); 
  },
  renderPastDiscounts : function(data){
      this.likesLayout.removeAllContent();
      this.discountsLayout.removeAllContent();
      var hLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("inStoreLikeLayout");
      var likeLogo = new sap.ui.commons.Image().addStyleClass("inStorelikeLogo");
             likeLogo.setHeight("100px");
             likeLogo.setWidth("100px");
             likeLogo.setSrc("Client/images/Like.jpg");
     if(data.likes.length!=0){
      var oCarousel = new sap.ui.commons.Carousel();
	    oCarousel.setWidth("300px");
	    oCarousel.setOrientation("horizontal");
	   for(i=0;i<data.likes.length;i++){
	    oCarousel.addContent(new sap.ui.commons.Image({
		src : "Client/images/brands/"+ data.likes[i].FACEBOOK_LIKE_ID +".png",
		tooltip : data.likes[i].FACEBOOK_LIKE_ID ,
		width : "90px",
		height : "90px"
	   }));
	   }
	   hLayout.addContent(likeLogo);
	   hLayout.addContent(oCarousel);
     }
     else{
         hLayout.addContent(new sap.ui.commons.Label({text:"No Facebook Likes"}).addStyleClass("noLikesLabel"));
     }
     var vLayout = new sap.ui.layout.VerticalLayout();
     if(data.discount.length !=0){
     var discountAssign = new sap.ui.commons.Label({text:"Discount Assigned:"}).addStyleClass("discountLabels");
     vLayout.addContent(discountAssign);
     for(i=0;i<data.discount.length;i++){
         var discountLabels = new sap.ui.commons.Label({text:i+1+"."+data.discount[i].BRAND+"-"+data.discount[i].DISCOUNT+"%"}).addStyleClass("discountLabels");
         vLayout.addContent(discountLabels);
     }
     }
     else{
         vLayout.addContent(new sap.ui.commons.Label({text:"No Discounts Assigned Yet"}).addStyleClass("noLikesLabel"));
     }
	  this.likesLayout.addContent(hLayout); 
	  this.discountsLayout.addContent(vLayout);
  }

});
