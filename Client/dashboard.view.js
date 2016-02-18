sap.ui.jsview("Client.dashboard", {

    getControllerName : function() {
        return "Client.dashboard";
    },

      createContent : function(oController) {
          
        this.graphLayout = new sap.ui.commons.layout.MatrixLayout({
            columns : 2,
            width: "100%",
            widths : ["50%", "50%"],
            layoutFixed : false,
        });
        
        //this.graph1 = this.initGraph1();
        
        var that = this;
        
        return this.graphLayout;
        
    },
    
    
    
    initGraph1 : function(conversionRateData){
        
            var oModel = new sap.ui.model.json.JSONModel({
                businessData : conversionRateData });
    	/*	businessData : [
    			{LOYALTY :"Canada",BILL_COUNT:410.87,VISIT_COUNT:-141.25, population:34789000},
    			{LOYALTY :"China",BILL_COUNT:338.29,VISIT_COUNT:133.82, population:1339724852},
    			{LOYALTY :"France",BILL_COUNT:487.66,VISIT_COUNT:348.76, population:65350000},
    			{LOYALTY :"Germany",BILL_COUNT:470.23,VISIT_COUNT:217.29, population:81799600},
    			{LOYALTY :"India",BILL_COUNT:170.93,VISIT_COUNT:117.00, population:1210193422},
    			{LOYALTY :"United States",BILL_COUNT:905.08,VISIT_COUNT:609.16, population:313490000}
    		]
    	});*/		
    
        // A Dataset defines how the model data is mapped to the chart 
    	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
    
    		// a Bar Chart requires exactly one dimension (x-axis) 
    		dimensions : [ 
    			{
    				axis : 1, // must be one for the x-axis, 2 for y-axis
    				name : 'LOYALTY', 
    				value : "{LOYALTY}"
    			} 
    		],
    
    		// it can show multiple measures, each results in a new set of bars in a new color 
    		measures : [ 
    		    // measure 1
    			{
    				name : 'VISIT_COUNT', // 'name' is used as label in the Legend 
    				value : '{VISIT_COUNT}' // 'value' defines the binding for the displayed value   
    			},
    			{
    				name : 'BILL_COUNT', 
    				value : '{BILL_COUNT}'
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
    	var oBarChart = new sap.viz.ui5.Area({
    		width : "550px",
    		height : "350px",
    		plotArea : {
    		'colorPalette' : d3.scale.category20().range()
    		},
    		title : {
    			visible : true,
    			text : 'Visit and Bill Count of Customers from different Segments'
    		},
    		dataset : oDataset
    	});
    
        // attach the model to the chart and display it
    	oBarChart.setModel(oModel);
        return oBarChart;
    },
    
    initGraph2 : function(customerSegmentData){
            var oModel2 = new sap.ui.model.json.JSONModel({
                businessData2 : customerSegmentData });
    		/*businessData : [
    			{LOYALTY :"Canada",BILL_COUNT:410.87,VISIT_COUNT:-141.25, population:34789000},
    			{LOYALTY :"China",BILL_COUNT:338.29,VISIT_COUNT:133.82, population:1339724852},
    			{LOYALTY :"France",BILL_COUNT:487.66,VISIT_COUNT:348.76, population:65350000},
    			{LOYALTY :"Germany",BILL_COUNT:470.23,VISIT_COUNT:217.29, population:81799600},
    			{LOYALTY :"India",BILL_COUNT:170.93,VISIT_COUNT:117.00, population:1210193422},
    			{LOYALTY :"United States",BILL_COUNT:905.08,VISIT_COUNT:609.16, population:313490000}
    		]
    	});	*/
    
        // A Dataset defines how the model data is mapped to the chart 
    	var oDataset2 = new sap.viz.ui5.data.FlattenedDataset({
    
    		// a Bar Chart requires exactly one dimension (x-axis) 
    		dimensions : [ 
    			{
    				axis : 1, // must be one for the x-axis, 2 for y-axis
    				name : 'LOYALTY', 
    				value : "{LOYALTY}"
    			} 
    		],
    
    		// it can show multiple measures, each results in a new set of bars in a new color 
    		measures : [ 
    		    // measure 1
    			{
    				name : 'CUST_COUNT', // 'name' is used as label in the Legend 
    				value : '{CUST_COUNT}' // 'value' defines the binding for the displayed value   
    			},
    		//	{
    		//		name : 'BILL_COUNT', 
    		//		value : '{BILL_COUNT}'
    		//	} 
    		],
    		
    		// 'data' is used to bind the whole data collection that is to be displayed in the chart 
    		data : {
    			path : "/businessData2"
    		}
    		
    	});
    
        // create a Bar chart
        // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
        // for Donut and Pie please remove one of the two measures in the above Dataset.  
    	var oBarChart2 = new sap.viz.ui5.Pie({
    		width : "550px",
    		height : "350px",
    		plotArea : {
    		'colorPalette' : d3.scale.category20().range()
    	
    		},
    		title : {
    			visible : true,
    			text : 'Visitors from Different Loyalty Segments'
    		},
    		dataset : oDataset2
    	});
    
        // attach the model to the chart and display it
    	oBarChart2.setModel(oModel2);
        return oBarChart2;
    },    

    initGraph3 : function(frequencyCountData){
        
            var oModel = new sap.ui.model.json.JSONModel({
                businessData : frequencyCountData });
    	/*	businessData : [
    			{LOYALTY :"Canada",BILL_COUNT:410.87,VISIT_COUNT:-141.25, population:34789000},
    			{LOYALTY :"China",BILL_COUNT:338.29,VISIT_COUNT:133.82, population:1339724852},
    			{LOYALTY :"France",BILL_COUNT:487.66,VISIT_COUNT:348.76, population:65350000},
    			{LOYALTY :"Germany",BILL_COUNT:470.23,VISIT_COUNT:217.29, population:81799600},
    			{LOYALTY :"India",BILL_COUNT:170.93,VISIT_COUNT:117.00, population:1210193422},
    			{LOYALTY :"United States",BILL_COUNT:905.08,VISIT_COUNT:609.16, population:313490000}
    		]
    	});*/		
    
        // A Dataset defines how the model data is mapped to the chart 
    	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
    
    		// a Bar Chart requires exactly one dimension (x-axis) 
    		dimensions : [ 
    			{
    				axis : 1, // must be one for the x-axis, 2 for y-axis
    				name : 'Number of Visits', 
    				value : "{FREQUENCY_NO}"
    			} 
    		],
    
    		// it can show multiple measures, each results in a new set of bars in a new color 
    		measures : [ 
    		    // measure 1
    			{
    				name : 'Number of Customers', // 'name' is used as label in the Legend 
    				value : '{FREQUENCY_COUNT}' // 'value' defines the binding for the displayed value   
    			},
    			{
    				name : 'Number of Customers', 
    				value : '{FREQUENCY_COUNT}'
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
    	var oBarChart = new sap.viz.ui5.Combination({
    		width : "550px",
    		height : "350px",
    		plotArea : {
    		'colorPalette' : d3.scale.category20().range()
    		},
    		title : {
    			visible : true,
    			text : 'Frequency Count of Customer Re-Visit to Store'
    		},
    		dataset : oDataset
    	});
    
        // attach the model to the chart and display it
    	oBarChart.setModel(oModel);
        return oBarChart;
    },
    
    initGraph4 : function(genderStatData){
        
            var oModel = new sap.ui.model.json.JSONModel({
                businessData : genderStatData });
    	/*	businessData : [
    			{LOYALTY :"Canada",BILL_COUNT:410.87,VISIT_COUNT:-141.25, population:34789000},
    			{LOYALTY :"China",BILL_COUNT:338.29,VISIT_COUNT:133.82, population:1339724852},
    			{LOYALTY :"France",BILL_COUNT:487.66,VISIT_COUNT:348.76, population:65350000},
    			{LOYALTY :"Germany",BILL_COUNT:470.23,VISIT_COUNT:217.29, population:81799600},
    			{LOYALTY :"India",BILL_COUNT:170.93,VISIT_COUNT:117.00, population:1210193422},
    			{LOYALTY :"United States",BILL_COUNT:905.08,VISIT_COUNT:609.16, population:313490000}
    		]
    	});*/		
    
        // A Dataset defines how the model data is mapped to the chart 
    	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
    
    		// a Bar Chart requires exactly one dimension (x-axis) 
    		dimensions : [ 
    			{
    				axis : 1, // must be one for the x-axis, 2 for y-axis
    				name : 'Sub-Catergory', 
    				value : "{SUB_CAT}"
    			} 
    		],
    
    		// it can show multiple measures, each results in a new set of bars in a new color 
    		measures : [ 
    		    // measure 1
    			{
    				name : 'Revenue', // 'name' is used as label in the Legend 
    				value : '{REVENUE}' // 'value' defines the binding for the displayed value   
    			},
    		//	{
    		//		name : 'Revenue', 
    		//		value : '{REVENUE}'
    		//	} 
    		],
    		
    		// 'data' is used to bind the whole data collection that is to be displayed in the chart 
    		data : {
    			path : "/businessData"
    		}
    		
    	});
    
        // create a Bar chart
        // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
        // for Donut and Pie please remove one of the two measures in the above Dataset.  
    	var oBarChart = new sap.viz.ui5.Combination({
    		width : "550px",
    		height : "350px",
    		plotArea : {
    		'colorPalette' : d3.scale.category20().range()
    		},
    		title : {
    			visible : true,
    			text : 'Sub Category Performance'
    		},
    		dataset : oDataset
    	});
    
        // attach the model to the chart and display it
    	oBarChart.setModel(oModel);
        return oBarChart;
    },
    
    
    
    renderDashboard : function(data) {
        var conversionRateData = data.conversionRate;
        var customerSegmentData = data.customerSegment;
        var frequencyCountData = data.frequencyCount;
        var genderStatData = data.genderStat;
        
        this.graph1 = this.initGraph1(conversionRateData);
        this.graph2 = this.initGraph2(customerSegmentData);
        this.graph3 = this.initGraph3(frequencyCountData);
        this.graph4 = this.initGraph4(genderStatData);
        
                
        this.renderGraphs();
        
    },
    
    renderGraphs : function() {
        
       
        //var graph3 = this.initGraph3();
        //var graph4 = this.initGraph4();
        
        var cell1 = new sap.ui.commons.layout.MatrixLayoutCell({
                    content: this.graph1,
                });
        
        var cell2 = new sap.ui.commons.layout.MatrixLayoutCell({
                    content: this.graph2,
                });
        var cell3 = new sap.ui.commons.layout.MatrixLayoutCell({
                    content: this.graph3,
                });
        var cell4 = new sap.ui.commons.layout.MatrixLayoutCell({
                    content: this.graph4,
                });
        
        this.graphLayout.createRow(cell1, cell2);
        this.graphLayout.createRow();
        this.graphLayout.createRow(cell3, cell4);
        
    },
    
    

    
      

});
