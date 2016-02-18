sap.ui.jsview("Client.report", {

    getControllerName : function() {
        return "Client.report";
    },

      createContent : function(oController) {
          
          var mainVLayout = new sap.ui.layout.VerticalLayout();
          this.mainVLayout = mainVLayout;
          var hLayout= new sap.ui.layout.HorizontalLayout().addStyleClass("reportLayout");
          this.hLayout = hLayout;
          var vLayout1=new sap.ui.layout.HorizontalLayout();
           var vLayout2=new sap.ui.layout.HorizontalLayout();
           var vLayout3=new sap.ui.layout.VerticalLayout();
           
           var oDropdownBox1 = new sap.ui.commons.DropdownBox().addStyleClass("reportDrop");
            oDropdownBox1.setTooltip("Dimension");
            oDropdownBox1.setEditable(true);
            oDropdownBox1.setWidth("140px");
            var oItem = new sap.ui.core.ListItem({key:"GENDER"});
            oItem.setText("GENDER");
            oDropdownBox1.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"SUB_CATEGORY"});
            oItem.setText("CATEGORY");
            oDropdownBox1.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"OCCUPATION"});
            oItem.setText("OCCUPATION");
            oDropdownBox1.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"PROD_TYPE"});
            oItem.setText("PRODUCT TYPE");
            oDropdownBox1.addItem(oItem);
            
            oController.oDropdownBox1 = oDropdownBox1;
            oDropdownBox1.setValue("GENDER");
            
            var dimensionLabel = new sap.ui.commons.Label().addStyleClass("DimensionLabel");
            dimensionLabel.setText("Dimension:");
            
            this.hLayout.addContent(dimensionLabel);
            
            this.hLayout.addContent(oDropdownBox1);
       //     vLayout1.setWidth("300px");
            
            var oDropdownBox2 = new sap.ui.commons.DropdownBox().addStyleClass("reportDrop");
            oDropdownBox2.setTooltip("Select Year");
            oDropdownBox2.setEditable(true);
            oDropdownBox2.setWidth("100px");
            var oItem = new sap.ui.core.ListItem({key:"2010"});
            oItem.setText("2010");
            oDropdownBox2.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"2011"});
            oItem.setText("2011");
            oDropdownBox2.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"2012"});
            oItem.setText("2012");
            oDropdownBox2.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"2013"});
            oItem.setText("2013");
            oDropdownBox2.addItem(oItem);
            oItem = new sap.ui.core.ListItem({key:"2014"});
            oItem.setText("2014");
            oDropdownBox2.addItem(oItem);
            oDropdownBox2.setValue("2014");
            oController.oDropdownBox2 = oDropdownBox2;
            var measureLabel = new sap.ui.commons.Label().addStyleClass("DimensionLabel");
            measureLabel.setText("Year :");
            
            this.hLayout.addContent(measureLabel);
            
            this.hLayout.addContent(oDropdownBox2);
       //     vLayout2.setWidth("300px");
            that = this;
            
                var oButton1 = new sap.ui.commons.Button({
                	text : "Generate Report",
                	tooltip : "Generate",
                	press : function() {that.oController.buttonHandler()}
                }).addStyleClass("reportButton");
                this.hLayout.addContent(oButton1);
            
            //hLayout.addContent(vLayout1);
            
            //hLayout.addContent(vLayout2);
             //hLayout.addContent(vLayout3);
             
            this.mainVLayout.addContent(this.hLayout); 
            this.mainVLayout.addContent(new sap.ui.commons.Label()); 
            this.mainVLayout.addContent(new sap.ui.commons.Label());             
            this.mainVLayout.addContent(new sap.ui.commons.Label());   
            this.mainVLayout.addContent(new sap.ui.commons.Label()); 
            this.mainVLayout.addContent(new sap.ui.commons.Label());             
            this.mainVLayout.addContent(new sap.ui.commons.Label());     
            return this.mainVLayout;
            
},

renderGraph : function(data) {
    
    var myData = [];
    
    myData = data.ANALYSIS;
    
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    
    
    for(var i = 0; i<data.ANALYSIS.length; i++) {
            myData[i].myVal = monthArray.map(function(e) { 
                return e; 
                }).indexOf(myData[i].MNTH);
    }
    
    newData = myData.sort(function(a, b){  return a.myVal - b.myVal;   });
         
         /*
    var sortable = [];
    for (var val in myData)
          sortable.push([vehicle, maxSpeed[vehicle]])
    sortable.sort(function(a, b) {return a[1] - b[1]})
    */
   
    if(this.oBarChart !== undefined){
        this.mainVLayout.removeContent(this.oBarChart);
        }
    this.mainVLayout
    // some business data 
	var oModel = new sap.ui.model.json.JSONModel({
		businessData : newData/* [
			{Country :"Canada",revenue:410.87,profit:-141.25, population:34789000},
			{Country :"China",revenue:338.29,profit:133.82, population:1339724852},
			{Country :"France",revenue:487.66,profit:348.76, population:65350000},
			{Country :"Germany",revenue:470.23,profit:217.29, population:81799600},
			{Country :"India",revenue:170.93,profit:117.00, population:1210193422},
			{Country :"United States",revenue:905.08,profit:609.16, population:313490000}
		]*/
	});		

    // A Dataset defines how the model data is mapped to the chart 
	var oDataset = new sap.viz.ui5.data.FlattenedDataset({

		// a Bar Chart requires exactly one dimension (x-axis) 
		dimensions : [ 
			{
				axis : 1, // must be one for the x-axis, 2 for y-axis
				name : 'MONTH', 
				value : "{MNTH}"
			},
			{
			    axis : 2,
			    name : 'ATTRIBUTE',
			    value : "{ATTR}"
			    
			}
			
		],

		// it can show multiple measures, each results in a new set of bars in a new color 
		measures : [ 
		    // measure 1
			{
				name : 'COUNT OF CUSTOMER', // 'name' is used as label in the Legend 
				value : '{CONT}' // 'value' defines the binding for the displayed value   
			}/*,
			{
				name : 'Revenue', 
				value : '{revenue}'
			} */
		],
		
		// 'data' is used to bind the whole data collection that is to be displayed in the chart 
		data : {
			path : "/businessData"
		}
		
	});

    // create a Bar chart
    // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
    // for Donut and Pie please remove one of the two measures in the above Dataset.  
	var oBarChart = new sap.viz.ui5.StackedColumn({
		width : "1250px",
		height : "600px",
		plotArea : {
	//	'colorPalette' : d3.scale.category20().range()
		},
		title : {
			visible : true,
			text : 'Customer Count By Month'
		},
		dataset : oDataset
	});
	this.oBarChart = oBarChart;

    // attach the model to the chart and display it
	oBarChart.setModel(oModel);
	this.mainVLayout.addContent(this.oBarChart);
	
}
    
    

    
      

});