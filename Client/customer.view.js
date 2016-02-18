sap.ui.jsview("Client.customer", {

    getControllerName : function() {
        return "Client.customer";
    },

    createContent : function(oController) {
        this.loyaltyText = "RANDOM";
        var that = this;
        sap.ui.globalParameters.customerPageControl = this;  
        var controller = this.getController();
        this.controller = controller;
        var circularLayout =  new sap.ui.layout.HorizontalLayout(); 
        
        
        var verticalLayoutProfile = new sap.ui.layout.VerticalLayout();
        sap.ui.globalParameters.customerIds = [];
        
        //var loyaltyLabel = new sap.ui.commons.Label({text : this.loyaltyLabel})
        //verticalLayoutProfile.addContent(loyaltyLabel);
        
        var initialPath = "Client/images/profiles/";
        var delim = ".jpg";
        this.initialPath = initialPath;
        this.delim = delim;
        var myK = "";
        var k = 1;
        for (var j = 1; j<=7; j+=2){
           
            var horizontalLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("profileHorizontal");
            for(var i = 1; i<=j; i++){
                 myK = "C" + (20000 + parseInt(k)).toString();
                var fbImage = new sap.ui.commons.Image({src : initialPath + (k++).toString() + delim, 
                                type: "button", alt : myK, 
                                press: controller.customerProfileHandler}).addStyleClass("thodaGap imageOverlayLayoutNew"); 
                this.fbImage = fbImage;
                fbImage.setWidth("77px");
                fbImage.setHeight("77px");
                horizontalLayout.addContent(fbImage);
            

            } 
            verticalLayoutProfile.addContent(horizontalLayout);
        }
        
        for (var j = 7; j>=1; j-=2){
            var horizontalLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("profileHorizontal");
            for(var i = 1; i<=j; i++){
                myK = "C" + (20000 + parseInt(k)).toString();
                var fbImage = new sap.ui.commons.Image({src : initialPath + (k++).toString() + delim, type: "button", alt : myK, 
                                        press: controller.customerProfileHandler}).addStyleClass("thodaGap imageOverlayLayoutNew"); 
                fbImage.setWidth("77px");
                fbImage.setHeight("77px");
                horizontalLayout.addContent(fbImage);
            } 
            verticalLayoutProfile.addContent(horizontalLayout);
        }
        
        for(k=1;k<500;k++){
            myValue = "C"+ (20000 + k).toString();
            sap.ui.globalParameters.customerIds.push(myValue);
        }
        
        var verticalLayoutLeft = new sap.ui.layout.VerticalLayout();
        this.verticalLayoutLeft = verticalLayoutLeft; 
        var upperLeftLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             upperLeftLogo.setHeight("100px");
             upperLeftLogo.setWidth("100px");
             upperLeftLogo.setSrc("Client/images/circle1.jpg");
         
         var lowerLeftLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             lowerLeftLogo.setHeight("100px");
             lowerLeftLogo.setWidth("100px");
             lowerLeftLogo.setSrc("Client/images/circle2.jpg");
        //verticalLayoutLeft.addContent(upperLeftLogo);
        //verticalLayoutLeft.addContent(lowerLeftLogo);
        
        var verticalLayoutRight = new sap.ui.layout.VerticalLayout();
        this.verticalLayoutRight = verticalLayoutRight;
         var upperRightLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             upperRightLogo.setHeight("100px");
             upperRightLogo.setWidth("100px");
             upperRightLogo.setSrc("Client/images/circle3.jpg");
             
         var lowerRightLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             lowerRightLogo.setHeight("100px");
             lowerRightLogo.setWidth("100px");
             lowerRightLogo.setSrc("Client/images/circle4.jpg");
         //verticalLayoutRight.addContent(upperRightLogo);
         //verticalLayoutRight.addContent(lowerRightLogo);
        
        circularLayout.addContent(verticalLayoutLeft);
        circularLayout.addContent(verticalLayoutProfile);
        circularLayout.addContent(verticalLayoutRight);
        
        this.verticalLayoutProfile = verticalLayoutProfile;
        
        
        
        return circularLayout;
        
    },
    
    
    renderNewProfilesAgain : function(customerArray){
        
        var smallLayout = new sap.ui.layout.HorizontalLayout();
        var loyaltyLabel = new sap.ui.commons.Label({text : sap.ui.globalParameters.segmentSelected}).addStyleClass("aakhriNatak");
        smallLayout.addContent(loyaltyLabel);
        this.verticalLayoutProfile.addContent(smallLayout);
        
        var k;
        var q = 0;
        for (var j = 1; j<=7; j+=2){
            var horizontalLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("profileHorizontal");
            for(var i = 1; i<=j; i++){
                k = customerArray[q++].CUST_ID;
                myVal = k.slice(-3);
                myVal = parseInt(myVal);
                if(myVal > 80) myVal = 81;
                
                var fbImage = new sap.ui.commons.Image({src : this.initialPath + (myVal).toString() + this.delim, type: "button", 
                                alt : k, press: this.controller.customerProfileHandler}).addStyleClass("thodaGap imageOverlayLayoutNew"); 
                this.fbImage = fbImage;
                fbImage.setWidth("77px");
                fbImage.setHeight("77px");
                horizontalLayout.addContent(fbImage);
            

            } 
            this.verticalLayoutProfile.addContent(horizontalLayout);
        }
        
        for (var j = 7; j>=1; j-=2){
            var horizontalLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("profileHorizontal");
            for(var i = 1; i<=j; i++){
                k = customerArray[q++].CUST_ID;
                myVal = k.slice(-3);
                myVal = parseInt(myVal);
                if(myVal > 80) myVal = 81;
                var fbImage = new sap.ui.commons.Image({src : this.initialPath + (myVal).toString() + this.delim, type: "button", 
                                alt : k, press: this.controller.customerProfileHandler}).addStyleClass("thodaGap imageOverlayLayoutNew"); 
                fbImage.setWidth("77px");
                fbImage.setHeight("77px");
                horizontalLayout.addContent(fbImage);
            } 
            this.verticalLayoutProfile.addContent(horizontalLayout);
        }
    },
    
    
    createOverlay : function(data){
      this.profileDataOverlay = new sap.ui.ux3.OverlayContainer().addStyleClass("newbrandOverlay");    
      var mainVerticalLayout = new sap.ui.layout.VerticalLayout();
      var likeLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("customerOverlayLike");
      var name = new sap.ui.commons.Label({text:data.firstName +" "+ data.lastName}).addStyleClass("customerOverlayName");
      if(data.inStore == 0)
        src = "circle_red.png";
      else
        src = "green_circle.png";
      var inStore = new sap.ui.commons.Image().addStyleClass("inStoreLogo");
             inStore.setHeight("25px");
             inStore.setWidth("25px");
             inStore.setSrc("Client/images/"+ src);
      var inStoreLabel = new sap.ui.commons.Label({text:"In Store"}).addStyleClass("inStoreLabel");
      var likeLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             likeLogo.setHeight("50px");
             likeLogo.setWidth("50px");
             likeLogo.setSrc("Client/images/Like.jpg");
       if(data.likes != 0){
      var oCarousel = new sap.ui.commons.Carousel().addStyleClass("carouselLikes");
	    oCarousel.setWidth("300px");
	    oCarousel.setOrientation("horizontal");
	   for(i=0;i<data.likes.length;i++){
	    oCarousel.addContent(new sap.ui.commons.Image({
		src : "Client/images/brands/"+ data.likes[i].FACEBOOK_LIKE_ID +".png",
		tooltip : data.likes[i].FACEBOOK_LIKE_ID ,
		width : "50px",
		height : "50px"
	   }).addStyleClass("brandImages"));
	   }
      likeLayout.addContent(name);
      likeLayout.addContent(inStore);
      likeLayout.addContent(inStoreLabel);
      likeLayout.addContent(likeLogo);
      likeLayout.addContent(oCarousel);
       }
       else{
           var noLikesLabel = new sap.ui.commons.Label({text:"No Likes"}).addStyleClass("inStoreLabel");
           likeLayout.addContent(name);
      likeLayout.addContent(inStore);
      likeLayout.addContent(inStoreLabel);
      likeLayout.addContent(likeLogo);
      likeLayout.addContent(noLikesLabel);
       }
      this.likeLayout = likeLayout;
      var overlayVerticalLayout = new sap.ui.layout.VerticalLayout();
      
      var firstHorizontalLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("overlayHor1");
      
      var favoriteLabel = new sap.ui.commons.Label().addStyleClass("overlayFavLabel");
      favoriteLabel.setText("Favorite");
      var subcatValue = data.products[0].PROD_TYPE;
      var brandValue = data.brand[0].BRAND;
      
      this.brandData = data.products;
      this.subcatData = data.brand;
      
      var subcatImage = new sap.ui.commons.Image({src : "Client/images/subcategory/" + subcatValue + ".jpg", width : "125px", height : "125px"}).addStyleClass("overlayImage");
      var plusImage = new sap.ui.commons.Image({src : "Client/images/plus.jpg", width : "70px", height : "70px"}).addStyleClass("overlayPlusImage");
      var brandImage = new sap.ui.commons.Image({src : "Client/images/brands/" + brandValue + ".png", width : "100px", height : "100px"}).addStyleClass("overlayImage");
      var trendingLabel = new sap.ui.commons.Label({text : "Trending Now"}).addStyleClass("overlayTrendLabel");
      
      
      firstHorizontalLayout.addContent(favoriteLabel);
      firstHorizontalLayout.addContent(subcatImage);
      firstHorizontalLayout.addContent(plusImage);
      firstHorizontalLayout.addContent(brandImage);
      firstHorizontalLayout.addContent(trendingLabel);
      
      var secondHorizontalLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("overLayHor2");
      
      var leftArrow = new sap.ui.commons.Image({src : "Client/images/arrowDown.png", width : "75px", height : "90px"}).addStyleClass("overlayImage overlayLeftArrow");
      var rightArrow = new sap.ui.commons.Image({src : "Client/images/arrowDown.png", width : "75px", height : "90px"}).addStyleClass("overlayImage overlayRightArrow");
      
      var imageId = sap.ui.globalParameters.currentId;
      var imageIntId = parseInt(imageId.slice(-3));
      if (imageIntId > 80) imageIntId = 81;
      
      var fbdp = new sap.ui.commons.Image({src : "Client/images/profiles/"+imageIntId.toString()+".jpg", width : "200px", height: "200px"}).addStyleClass("overlayImage");

      //secondHorizontalLayout.addContent(leftArrow);
      //secondHorizontalLayout.addContent(rightArrow);
      
      this.thirdHorizontalLayout = new sap.ui.layout.HorizontalLayout();
      this.chartLayout1 = new sap.ui.layout.VerticalLayout().addStyleClass("chartsLayout");
      this.chartLayout2 = new sap.ui.layout.VerticalLayout().addStyleClass("chartsLayout");
      var brandarray = [];
      var subcatarray = [];
     for(i=0;i<this.brandData.length;i++){
         brandarray.push(this.brandData[i].COUNTER);
     }
     var max;
     var submax;
     var brandMax = Math.max.apply(Math,brandarray);
     for(i =0;i<this.subcatData.length;i++){
         subcatarray.push(this.subcatData[i].COUNTER);
     }
     var subMax = Math.max.apply(Math,subcatarray);
     if(this.brandData.length>3 )
        max = 2;
      else
        max = this.brandData.length;
     if(this.subcatData.length>3 )
        submax = 2;
      else
        submax = this.subcatData.length;
     for(i =0;i<max;i++)
     {
     
     chart1 = this.createGraph(this.brandData[i].COUNTER,this.brandData[i].PROD_TYPE,brandMax);
      this.chartLayout1.addContent(chart1);
     }
     for(i =0;i<submax;i++)
     {
     chart1 = this.createGraph(this.subcatData[i].COUNTER,this.subcatData[i].BRAND,subMax);
      this.chartLayout2.addContent(chart1);
     }
     
       //oColumnChart2.rerender();
       //this.chartLayout2.addContent(chart2);
      
      this.thirdHorizontalLayout.addContent(this.chartLayout1);
      this.thirdHorizontalLayout.addContent(fbdp);
      this.thirdHorizontalLayout.addContent(this.chartLayout2);
      
      overlayVerticalLayout.addContent(firstHorizontalLayout);
      overlayVerticalLayout.addContent(secondHorizontalLayout);
      overlayVerticalLayout.addContent(this.thirdHorizontalLayout);
      
      mainVerticalLayout.addContent(likeLayout);
      mainVerticalLayout.addContent(overlayVerticalLayout);
      
      this.profileDataOverlay.addContent(mainVerticalLayout);
      this.profileDataOverlay.setOpenButtonVisible(false);
      this.profileDataOverlay.open();
      
    },
    createBrandCarousel: function(){
        var that = sap.ui.globalParameters.customerPageControl;
        var oCarousel = new sap.ui.commons.Carousel();
	    oCarousel.setWidth("300px");
	    oCarousel.setOrientation("horizontal");
	    oCarousel.addContent(new sap.ui.commons.Image({
		src : "Client/images/arrowDown.png",
		alt : "sample image",
		width : "40px",
		height : "40px"
	}));

	oCarousel.addContent(new sap.ui.commons.Image({
		src : "Client/images/arrowDown.png",
		alt : "sample image",
		width : "40px",
		height : "40px"
	}));

	oCarousel.addContent(new sap.ui.commons.Image({
		src : "Client/images/arrowDown.png",
		alt : "sample image",
		width : "40px",
		height : "40px"
	}));

	oCarousel.addContent(new sap.ui.commons.Image({
		src : "Client/images/arrowDown.png",
		alt : "sample image",
		width : "40px",
		height : "40px"
	}));
     that.likeLayout.addContent(oCarousel);   
    },
    createGraph : function(value,des,max){

        var pushChart = sap.ui.graph.BarChart.create({ width : 350 , height : 75});
        pushChart.showLabels = true;
    	pushChart.labelField = "des";
    	pushChart.minValue = 0;
    	pushChart.maxValue = max + (0.3)*max ;
    	pushChart.valueField = "value";
    	pushChart.data = [{value : value, des:des}];
    	return pushChart.content;
    },
    
    
  
   
    
    renderSegmentation: function(data){
        
        this.loyaltyText = data.LOYALTY;
        this.verticalLayoutLeft.addContent(this.createSegBox(data.CUST_SEGMENT[0],"silverBox","silverLabels","silverLabels1"));
        this.verticalLayoutLeft.addContent(this.createSegBox(data.CUST_SEGMENT[3],"titaniumBox","titaniumLabels","titaniumLabels1"));
        this.verticalLayoutRight.addContent(this.createSegBox(data.CUST_SEGMENT[1],"goldBox","goldLabels","goldLabels1"));
        this.verticalLayoutRight.addContent(this.createSegBox(data.CUST_SEGMENT[2],"platinumBox","platinumLabels","platinumLabels1"));
    },
    
    
    createSegBox : function(data,style,style1,style2){
        
        var hLayout = new sap.ui.layout.HorizontalLayout();
        var vLayout = new sap.ui.layout.VerticalLayout().addStyleClass(style); //250px width, 150px height
        var revenueNo = new sap.ui.commons.Link({text:data.LOYALTY, press: this.getController().loadSegmentData}).addStyleClass(style1);
        
        var revenueLabel = new sap.ui.commons.Label({text:(data.CUST_COUNT/5)+"%"}).addStyleClass(style2);
        vLayout.addContent(revenueNo);
        vLayout.addContent(revenueLabel);
        //hLayout.addContent(vLayout);
        //this.hLayout = hLayout;
        return vLayout;
    },
    
    renderNewProfiles : function(data){
        
        var customerArray = data.CUST_ID;
        
        this.verticalLayoutProfile.removeAllContent();
        
        this.renderNewProfilesAgain(customerArray);
    }
   

});
