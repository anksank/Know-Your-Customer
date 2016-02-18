sap.ui.jsview("Client.productInventory", {

    getControllerName : function() {
        return "Client.productInventory";
    },

      createContent : function(oController) {
          
         sap.ui.globalParameters.productInvView = this; 
        //object.onload=function(){myScript};
        /*
        var iDiv1 = document.createElement('div');
        iDiv1.className = 'flip-container';
        iDiv1.ontouchstart = "this.classList.toggle('hover')";
        document.getElementsByTagName('body')[0].appendChild(iDiv1);
        
        var iDiv2 = document.createElement('div');
        iDiv2.className = "flipper";
        
        var iDiv3 = document.createElement('div');
        iDiv3.id = "frontImage";
        iDiv3.className = "front";
        // content
        iDiv2.appendChild(iDiv3);
        
        var iDiv4 = document.createElement('div');
        iDiv4.className = "back";
        // content
        iDiv2.appendChild(iDiv4);
        
        iDiv1.appendChild(iDiv2);
        */
        
       // document.getElementsByTagName('body').onload = 
                
        var productMatrix = new sap.ui.commons.layout.MatrixLayout({
            columns : 6,
        	layoutFixed : false
        	});
        	
        
        
       // var row1 = new sap.ui.commons.layout.MatrixLayoutRow();
        
        this.getController().loadProductInventory();
        this.productMatrix = productMatrix;
        
        return productMatrix;
        
    },
    
    
    createBrandBox : function(inventory, revenue){
        
        var hLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("productBox");
        var vLayout = new sap.ui.layout.VerticalLayout(); //250px width, 150px height
        var oImage1 = new sap.ui.commons.Image({type:"button",press:this.getController().brandPressHandler}).addStyleClass("boxIcons");
                oImage1.setSrc("Client/images/brands/"+inventory+".png");
                oImage1.setHeight("115px");
                oImage1.setWidth("115px");
            	hLayout.addContent(oImage1);
        var revenueNo = new sap.ui.commons.Label({text:revenue}).addStyleClass("revenueNoLabel");
        var revenueLabel = new sap.ui.commons.Label({text:"Revenue(Rs)"}).addStyleClass("revenueLbl");
        vLayout.addContent(revenueNo);
        vLayout.addContent(revenueLabel);
        hLayout.addContent(vLayout);
        this.hLayout = hLayout;
        hLayout.attachEvent ("click", this.boxHover);
        return hLayout;
    },
    
    loadRevenues : function(){
        
        
    },
      
  boxHover : function(){
    this.hLayout.removeAllContent();
   },
   
   loadInventory : function(data){
       var revenue = [];
       var inventoryList = [];
       for(var i = 0; i<data.prod.length; i++){
           inventoryList.push(data.prod[i].BRAND);
       }
       var uniqueInventory = inventoryList.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        this.uniqueInventory = uniqueInventory;
        
        var k = 0;
        for(var i= 0; i<(data.prod.length-2); i++){
            revenue.push(data.prod[i].REVENUE);
        
            while(data.prod[i].BRAND == data.prod[++i].BRAND){
                revenue[k] += data.prod[i].REVENUE;
            }
            i--;
            k++;
            //revenue.push(data.prod[i].REVENUE);
        }
        revenue.push(data.prod[i-1].REVENUE);
        this.revenue = revenue;
       
        var initialPath = "Client/images/brands/";
        var delim = ".png";
        var cellList = [];
        //var revenueList = ["200", "400"];
        
        //var productList = ["Adidas", "Allen solly", "American Eagle", "American Swan", "Banana Republic","Bebe", "Blackberrys"];
        
        for(var j = 0; j<3; j++){
            for(var i = 0; i<4; i++){
                
                var box = this.createBrandBox(uniqueInventory[(j*4)+i], revenue[(j*4)+i]);
                var brandTab = new sap.ui.commons.layout.HorizontalLayout();
                
            	var cell = new sap.ui.commons.layout.MatrixLayoutCell({
                    content: box,
                });
                
                cellList.push(cell);
            }
            
            this.productMatrix.createRow( cellList[0], cellList[1], cellList[2], cellList[3] );	
            cellList = [];
        }
   },
  createOverlay : function(data){
    sap.ui.globalParameters.allOverlayData = data;
     var brandDataOverlay = new sap.ui.ux3.OverlayContainer().addStyleClass("brandOverlay");
     var hLayout = new sap.ui.layout.HorizontalLayout();
     var hLayout1 = new sap.ui.layout.HorizontalLayout().addStyleClass("horzOverlay");
     var mainvLayout = new sap.ui.layout.VerticalLayout();
     var vLayout = new sap.ui.layout.VerticalLayout().addStyleClass("verOverlay");
     var vLayout2 = new sap.ui.layout.VerticalLayout();
     var vLayout3 = new sap.ui.layout.VerticalLayout();
     var likesLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("overlayboxbought");
     var labelLayout = new sap.ui.layout.VerticalLayout();
     var likeLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             likeLogo.setHeight("100px");
             likeLogo.setWidth("100px");
             likeLogo.setSrc("Client/images/Like.jpg");//Like.jpg
     var likesLabel = new sap.ui.commons.Label({text:"Number of Likes"}).addStyleClass("overlayLabel");
     var perLabel = new sap.ui.commons.Label({text:data.liked}).addStyleClass("largeLabel");
     labelLayout.addContent(likesLabel);
     labelLayout.addContent(perLabel);
     likesLayout.addContent(likeLogo);
     likesLayout.addContent(labelLayout);
     
     var boughtLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("overlaybox");
     var boughtLabelLayout = new sap.ui.layout.VerticalLayout();
     var boughtLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             boughtLogo.setHeight("100px");
             boughtLogo.setWidth("100px");
             boughtLogo.setSrc("Client/images/bought.png");
     var boughtLabel1 = new sap.ui.commons.Label({text:"Number of people"}).addStyleClass("overlayLabel");
     var boughtLabel2 = new sap.ui.commons.Label({text:"who bought"}).addStyleClass("simple");
     var perboughtLabel = new sap.ui.commons.Label({text:data.bought}).addStyleClass("largeLabel");
     boughtLabelLayout.addContent(boughtLabel1);
     boughtLabelLayout.addContent(boughtLabel2);
     boughtLabelLayout.addContent(perboughtLabel);
     boughtLayout.addContent(boughtLogo);
     boughtLayout.addContent(boughtLabelLayout);
     
     
     var neverboughtLayout = new sap.ui.layout.HorizontalLayout().addStyleClass("overlayboxnever");
     var neverboughtLabelLayout = new sap.ui.layout.VerticalLayout();
     var neverboughtLogo = new sap.ui.commons.Image().addStyleClass("likeLogo");
             neverboughtLogo.setHeight("100px");
             neverboughtLogo.setWidth("100px");
             neverboughtLogo.setSrc("Client/images/never bought.png");
     var neverboughtLabel = new sap.ui.commons.Label({text:"Likely to Buy"}).addStyleClass("overlayLabel");
     var neverperboughtLabel = new sap.ui.commons.Label({text:data.likely}).addStyleClass("largeLabel");
     neverboughtLabelLayout.addContent(neverboughtLabel);
     neverboughtLabelLayout.addContent(neverperboughtLabel);
     neverboughtLayout.addContent(neverboughtLogo);
     neverboughtLayout.addContent(neverboughtLabelLayout);
     
     
     vLayout.addContent(likesLayout);
     vLayout.addContent(boughtLayout);
     vLayout.addContent(neverboughtLayout);
     
     var whatIfLabel = new sap.ui.commons.Label({text:"WHAT-IF-SCENARIO"}).addStyleClass("bigLabel");
     var likelyLabel = new sap.ui.commons.Label({text:"LIKELY TO BUY -> ASSURED"}).addStyleClass("smallLabel");
     
     var conversionLabel = new sap.ui.commons.Label({text:"Conversion Factor"}).addStyleClass("overlayLabel1");
     var conversionSlider = new sap.ui.commons.Slider({
	                width: '200px',
	                min: 0,
	                max: 100,
	                value: 50,
	                totalUnits: 2,
	                smallStepWidth: 5,
	                stepLabels : true,
    	}).addStyleClass("slider");
     conversionLabel.setLabelFor(conversionSlider);
     this.getController().conversionSlider = conversionSlider;
     vLayout2.addContent(conversionLabel);
     vLayout2.addContent(conversionSlider);
     
     var discountLabel = new sap.ui.commons.Label({text:"Discounts"}).addStyleClass("dropLabel");
     var discountDrop = new sap.ui.commons.DropdownBox().addStyleClass("dropdown");;
    discountDrop.setEditable(true);
    discountDrop.setWidth("200px");
    var oItem = new sap.ui.core.ListItem({text:"10%",key:"10"});
    discountDrop.addItem(oItem);
    oItem = new sap.ui.core.ListItem({text:"20%",key:"20"});
    discountDrop.addItem(oItem);
    oItem = new sap.ui.core.ListItem({text:"30%",key:"30"});
    discountDrop.addItem(oItem);
    oItem = new sap.ui.core.ListItem({text:"40%",key:"40"});
    discountDrop.addItem(oItem);
    oItem = new sap.ui.core.ListItem({text:"50%",key:"50"});
    discountDrop.addItem(oItem);
    discountDrop.setValue("10%");
    this.getController().discountDrop = discountDrop;
    vLayout3.addContent(discountLabel);
    vLayout3.addContent(discountDrop);
    var graphLayout = new sap.ui.layout.VerticalLayout();
     
     //oBarChart = this.initChart();
     var oModel = new sap.ui.model.json.JSONModel({
		businessData : [
			{Country :"1",revenue:data.revenue},
			{Country :"2",revenue:((data.revenue/data.bought)*(0.9)*(0.5)*(data.likely+data.bought))}
		]
	});		

    // A Dataset defines how the model data is mapped to the chart 
	var oDataset = new sap.viz.ui5.data.FlattenedDataset({

		// a Bar Chart requires exactly one dimension (x-axis) 
		dimensions : [ 
			{
				axis : 1, // must be one for the x-axis, 2 for y-axis
				name : 'Country', 
				value : "{Country}"
			} 
		],

		// it can show multiple measures, each results in a new set of bars in a new color 
		measures : [ 
		    // measure 1
			{
				name : 'Revenue', 
				value : '{revenue}'
			} 
		],
		
		// 'data' is used to bind the whole data collection that is to be displayed in the chart 
		data : {
			path : "/businessData"
		}
		
	});

    // create a Bar chart
    // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
    // for Donut and Pie please remove one of the two measures in the above Dataset.  
	var oBarChart = new sap.viz.ui5.Bar({
		width : "550px",
		height : "350px",
		plotArea : {
		//'colorPalette' : d3.scale.category20().range()
		},
		title : {
			visible : true,
			text : 'Change in Revenue'
		},
		dataset : oDataset
	});
    this.oBarChart = oBarChart;
    // attach the model to the chart and display it
	oBarChart.setModel(oModel);
	
	oBarChart.addDelegate({
	   onAfterRendering : function() {
	       var chart = oBarChart.getDomRef();
	       try {
	       if ( chart && chart.childNodes && chart.childNodes.length> 0 )
	        chart.childNodes[0].style.display = "block";
	       }catch(ex) {
	           
	       }
	   } 
	    
	});
     
	var assignCampLink = new sap.ui.commons.Link({
        	text: "Assign Campaign",
        	}).addStyleClass("assignLink");
         assignCampLink.attachPress(this.assignLink,this);
            
    this.mainvLayout = mainvLayout;
    hLayout1.addContent(vLayout2);
    hLayout1.addContent(vLayout3);

    mainvLayout.addContent(whatIfLabel);
    mainvLayout.addContent(likelyLabel);
    mainvLayout.addContent(hLayout1);
    graphLayout.addContent(oBarChart)
    mainvLayout.addContent(graphLayout);
    this.graphLayout = graphLayout;
    mainvLayout.addContent(assignCampLink);
    
     hLayout.addContent(vLayout);
     hLayout.addContent(mainvLayout);
     brandDataOverlay.addContent(hLayout);
     brandDataOverlay.setOpenButtonVisible(false);
     brandDataOverlay.open();
    oBarChart.rerender();
    },
    
    renderGraph: function(){
        this.graphLayout.removeAllContent();
        if(sap.ui.globalParameters.conversion == undefined)
            sap.ui.globalParameters.conversion = "50";
        var revenue = sap.ui.globalParameters.allOverlayData.revenue;
        var likely = sap.ui.globalParameters.allOverlayData.likely;
        var bought = sap.ui.globalParameters.allOverlayData.bought;
        var discount = sap.ui.globalParameters.selectedDiscount;
        var conversion = sap.ui.globalParameters.conversion;
        var oModel = new sap.ui.model.json.JSONModel({
		businessData : [
			{Country :"1",revenue: revenue},
			{Country :"2",revenue:((revenue/bought)*((100-parseInt(discount))/100)*(parseInt(conversion)/100)*(likely+bought))}
		]
	});		

    // A Dataset defines how the model data is mapped to the chart 
	var oDataset = new sap.viz.ui5.data.FlattenedDataset({

		// a Bar Chart requires exactly one dimension (x-axis) 
		dimensions : [ 
			{
				axis : 1, // must be one for the x-axis, 2 for y-axis
				name : 'Country', 
				value : "{Country}"
			} 
		],

		// it can show multiple measures, each results in a new set of bars in a new color 
		measures : [ 
		    // measure 1
			{
				name : 'Revenue', 
				value : '{revenue}'
			} 
		],
		
		// 'data' is used to bind the whole data collection that is to be displayed in the chart 
		data : {
			path : "/businessData"
		}
		
	});
	var oBarChart = new sap.viz.ui5.Bar({
		width : "550px",
		height : "350px",
		plotArea : {
		//'colorPalette' : d3.scale.category20().range()
		},
		title : {
			visible : true,
			text : 'Change in Revenue'
		},
		dataset : oDataset
	});
    //this.oBarChart = oBarChart;
    // attach the model to the chart and display it
	oBarChart.setModel(oModel);
	
/*	oBarChart.addDelegate({
	   onAfterRendering : function() {
	       var chart = oBarChart.getDomRef();
	       try {
	       if ( chart && chart.childNodes && chart.childNodes.length> 0 )
	        chart.childNodes[0].style.display = "block";
	       }catch(ex) {
	           
	       }
	   } 
	    
	});*/
     //oBarChart.rerender();
      this.graphLayout.addContent(oBarChart);  
    },
     assignLink: function(){
        this.getController().sendDiscountData();
    }
   

});
