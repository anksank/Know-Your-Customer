sap.ui.jsview("Client.Main", {

    getControllerName : function() {
        return "Client.Main";
    },

      createContent : function(oController) {
        
        var windowWidth = $(window).width();
        var sideWidth = "200";
        var mainLayout = new sap.ui.layout.VerticalLayout({width:windowWidth+"px"});
        var titleLayout = new sap.ui.layout.HorizontalLayout({width:windowWidth}).addStyleClass("titleLayout");
        var linesLogo = new sap.ui.commons.Image().addStyleClass("linesLogo");
        linesLogo.setSrc("Client/images/three_lines.jpg");
        var titleLogo = new sap.ui.commons.Image({type:"button"}).addStyleClass("titleLogo");
        titleLogo.setSrc("Client/images/patloons.jpg");
        this.titleLogo = titleLogo;
        //titleLayout.addContent(linesLogo);
        titleLayout.addContent(titleLogo);
        
        var mainBottomLayout = new sap.ui.layout.HorizontalLayout();
        var verticalSidePanelLayout = new sap.ui.layout.VerticalLayout().addStyleClass("sidePanel");
        var mainPageLayout = new sap.ui.layout.VerticalLayout({width:(windowWidth-sideWidth)+"px"});
        this.mainPageLayout = mainPageLayout;
        
        var dashboardIcon = new sap.ui.commons.Image({type:"button"}).addStyleClass("IconsLogo");
        dashboardIcon.setSrc("Client/images/dashboard_icon.png");
        this.dashboardIcon = dashboardIcon;
        var dashboardLabel = new sap.ui.commons.Label().addStyleClass("IconLabel");
        dashboardLabel.setText("Dashboard");
        
        var customerIcon = new sap.ui.commons.Image({type:"icon"}).addStyleClass("IconsLogo");
        customerIcon.setSrc("Client/images/customer_icon.png");
        this.customerIcon = customerIcon;
        
        var customerLabel = new sap.ui.commons.Label().addStyleClass("IconLabel");
        customerLabel.setText("Customers");
        
        var productIcon = new sap.ui.commons.Image({type:"icon"}).addStyleClass("IconsLogo");
        productIcon.setSrc("Client/images/product_icon.png");
        this.productIcon = productIcon;
        var productLabel = new sap.ui.commons.Label().addStyleClass("BrandLabel");
        productLabel.setText("Brands");
        
        var reportIcon = new sap.ui.commons.Image({type:"icon"}).addStyleClass("IconsLogo");
        reportIcon.setSrc("Client/images/report_icon.png");
        this.reportIcon=reportIcon;
        
        var reportLabel = new sap.ui.commons.Label().addStyleClass("reportLabel");
        reportLabel.setText("Reports");
        
        this.homeLoad();
        
        oController.dashboardIcon = dashboardIcon;
        oController.mainPageLayout = mainPageLayout;
        
        verticalSidePanelLayout.addContent(dashboardIcon);
        verticalSidePanelLayout.addContent(dashboardLabel);
        verticalSidePanelLayout.addContent(customerIcon);
        verticalSidePanelLayout.addContent(customerLabel);
        verticalSidePanelLayout.addContent(productIcon);
        verticalSidePanelLayout.addContent(productLabel);
        verticalSidePanelLayout.addContent(reportIcon);
        verticalSidePanelLayout.addContent(reportLabel);
        
        // mainPageLayout.addContent(insightsLayout);
        // mainPageLayout.addContent(retailLogo);
       // mainPageLayout.addContent(kycLogo);
        
        mainBottomLayout.addContent(verticalSidePanelLayout);
        mainBottomLayout.addContent(mainPageLayout);
        mainLayout.addContent(titleLayout);
        mainLayout.addContent(mainBottomLayout);
          
        
        
        
        
       
        //var view = sap.ui.view({id:"MainViewtest", viewName:"Client.testSaum", type:sap.ui.core.mvc.ViewType.JS});
    	  
    
    	return mainLayout;
    	  
    },
    
    customerLoad : function(){
        this.mainPageLayout.removeAllContent();
        var customerView = new sap.ui.view({viewName:"Client.customer", type: sap.ui.core.mvc.ViewType.JS});
        this.mainPageLayout.addContent(customerView);
    },
    
    
    productLoad : function(){
        this.mainPageLayout.removeAllContent();
        var productView = new sap.ui.view({ viewName:"Client.productPage", type:sap.ui.core.mvc.ViewType.JS});
        this.mainPageLayout.addContent(productView);
    },
    
    homeLoad : function(){
        this.mainPageLayout.removeAllContent();
        var homeView = new sap.ui.view({ viewName:"Client.homePage", type:sap.ui.core.mvc.ViewType.JS});
        this.mainPageLayout.addContent(homeView);
        
    },
    
    reportLoad : function(){
        this.mainPageLayout.removeAllContent();
        var reportView = new sap.ui.view({ viewName:"Client.report", type:sap.ui.core.mvc.ViewType.JS});
        this.mainPageLayout.addContent(reportView);
    },
    
    loadDashboard : function(){
        this.mainPageLayout.removeAllContent();
        var dashboardView = new sap.ui.view({viewName: "Client.dashboard", type: sap.ui.core.mvc.ViewType.JS});
        this.mainPageLayout.addContent(dashboardView);
    },
      

    
      

});
