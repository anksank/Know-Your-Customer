handleRequest($.request.method)

var param;
var XSProc;
var connection = $.db.getConnection();

function handleRequest(method)
{

	param = $.request.parameters.get("function");
	XSProc = $.import("sap.hana.xs.libs.dbutils", "procedures");
	XSProc.setTempSchema($.session.getUsername().toUpperCase());
	var schemaName = "WTH";

	switch(method)
	{
		case $.net.http.GET :		
			handleGet();
			break;			
		case $.net.http.POST :		
			handlePost();
			break;			
		case $.net.http.PUT :		
			handlePut();
			break;	
	}
	
	
	
	$.trace.debug("End: Handle Request");

}


function handlePost() {
   
   var conn = $.db.getConnection();
   conn.autocommit = false;
   
   
   
   
    
}

function handleGet()
{
	var conn = $.db.getConnection();
	conn.autocommit = true;
	
	var result = null;
	var topBottomParam=$.request.parameters.get("topBottom");
	var overAllDetails=$.request.parameters.get("overAll");
	var period=$.request.parameters.get("period");
	var dash=$.request.parameters.get("dash");
	var prodInven=$.request.parameters.get("productInventory");
	var prodInsight=$.request.parameters.get("productInsight");
	var brandInsight=$.request.parameters.get("brand");
	var segCount= $.request.parameters.get("segCount");
	var segment=$.request.parameters.get("segment");
	var prodCam=$.request.parameters.get("prodCam");
	var brandCam=$.request.parameters.get("brandCam");
	var disc=$.request.parameters.get("disc");
	var trending=$.request.parameters.get("trending");
	var id=$.request.parameters.get("id");
	var gen=$.request.parameters.get("generateReport");
	var year=$.request.parameters.get("year");
	var attr=$.request.parameters.get("attr");
	var in_store=$.request.parameters.get("in_store");
	var cust_aaya=$.request.parameters.get("customerAaya");
	var fields=$.request.parameters.get("fields");
	var fromFb= $.request.parameters.get("fromFb");
	var fid=$.request.parameters.get("fId");
	var likes=$.request.parameters.get("likes");
	/* demo code to get exception based paramaters.
	
	try{
		if($.request.parameters.get("custId") !== undefined)
			custIds=$.request.parameters.get("custId").split(',');
	}catch(e)
	{
		$.trace.debug("custId error occurred: " + e.message);
	} 
	*/
	
	//use conditions here to route to different functions.
	if(topBottomParam==='true')
	{
	result=topBottom();
	}
	else if(overAllDetails==='true')
	{
	    result=overAll(period);
	}
	else if(dash==='true')
	{
	    result=dashBoard();
	}
	else if(prodInven==='true')
	{
	    result=getProductInventory();
	}
	else if(prodInsight==='true')
	{
	    result=getProductInsight(brandInsight);
	}
	else if(segCount==='true')
	{
	    result=getSegCount();
	}
//	else if(segment=='SILVER' || segment=='GOLD' || segment=='PLATINUM' || segment=='TITANIUM')
    else if(segment!= undefined)
	{
	    result=getSegCust(segment);
	}
	else if(prodCam==='true')
	{
	    result=giveProdCam(brandCam, disc);   
	}
	else if(trending==='true')
	{
	    result=getTrends(id);   
	}
	else if(gen==='true')
	{
	    result=getReport(year,attr);   
	}
	else if(in_store==='true')
	{
	    result=getInStore();
	}
	else if(cust_aaya==='true')
	{
	    result=custInStore(fields);
	}
	else if(fromFb==='true')
	{
	    result=comingFromFb(fid,likes);
	}
	
	
    	var myResponse = JSON.stringify(result);
    
    	$.response.setBody(myResponse);
	
	
    	$.response.contentType="text/plain";
	$.response.status = $.net.http.OK;
}

//Common util functions

function executeQuery(connection,query)
{
    var result;
	try
	{
		var statement = connection.prepareStatement( query );
        statement.executeQuery();		
		 var result = statement.getResultSet();
	}
	catch ( error)
	{
		$.trace.error ( "Error ocurred");
	}
//	$.trace.debug ( " Data obtained sucessfully. Length :  " + result.length );
	
	//result = resultSetToJSONArray(result);
	return result;
	
}

function dummy ()

{
    var getAll = XSProc.procedureOfSchema("CD_PAL", "CUST_PULL");
    	var result = getAll(customerId,filter_type);
}

function topBottom ()
{
    var output={};
    var getTopBottom = XSProc.procedureOfSchema("WTH","TOP_AND_BOTTOM_FIVE");
    var result = getTopBottom();
    output.topFive=result.TOP_5;
    output.bottomFive=result.BOTTOM_5;
    return output;
}

function overAll (period)
{
    var output={};
    var getOverAll = XSProc.procedureOfSchema("WTH","OVERALL_DETAILS");
    var result= getOverAll(parseInt(period));
    output.customerCount=result.NO_OF_CUST;
    output.transactionCount=result.NO_OF_TRANS;
    output.customerInStore=result.NO_OF_CUST_IN_STORE;
    return output;
    
}
function dashBoard()
{
    var output={};
    var getOverAll = XSProc.procedureOfSchema("WTH","DASHBOARD_PROCEDURE");
    var result= getOverAll();
    output.customerSegment=result.CUST_SEGMENT;
    output.frequencyCount=result.FREQ_CNT;
    output.conversionRate=result.CUST_CON_RATE;
    output.genderStat=result.GENDER_STAT;
    return output;
}
function getProductInventory()
{
    var output={};
    var inventory = XSProc.procedureOfSchema("WTH","PRODUCT_REVENUE");
    var result= inventory();
    output.prod=result.PROD_REV;
    return output;
}
function getProductInsight(brandInsight)
{
    var output={};
    var getProdInsight = XSProc.procedureOfSchema("WTH","PRODUCT_INSIGHT");
    var result= getProdInsight(brandInsight);
    output.liked=result.TOTAL_CUST_LIKE_PROD;
    output.bought=result.TOTAL_CUST_BOUGHT_PROD;
    output.likely=result.TOTAL_CUST_LIKELY_TO_BUY;
    output.revenue=result.REVENUE;
    return output;
}
function getSegCount()
{
    var Output={};
    var getSegmentCount = XSProc.procedureOfSchema("WTH","CUST_BEFORE_OPEN");
    var result= getSegmentCount();
    return result;
    
}
function getSegCust(segment)
{
    var Output={};
    var getSegmentCustomer = XSProc.procedureOfSchema("WTH","TOP_32");
    var result= getSegmentCustomer(segment);
    return result;
}
function giveProdCam(brandCam, disc)
{
    var Output={};
    var giver = XSProc.procedureOfSchema("WTH","ASSIGN_PROD_CAMPAIGN");
    var result= giver(brandCam, parseInt(disc));
    return result;
}
function getTrends(id)
{
    var Output={};
    var getT = XSProc.procedureOfSchema("WTH","TRENDING_ALGO");
    var getC = XSProc.procedureOfSchema("WTH","GIVE_ID_GET_NAME");
    var result= getT(id);
    var result1 = getC(id);
    Output.firstName = result1.RESULT[0].FIRST_NAME;
    Output.lastName = result1.RESULT[0].LAST_NAME;
    Output.products=result.TEMP;
    Output.brand=result.RECOMMEND_BRAND;
    Output.discount=result.CUSTOMER_DISCOUNT;
    Output.likes=result.FB_LIKES;
    Output.inStore=result.CUSTOMER_IN_STORE;
    return Output;
}
function getReport(year, attr)
{
    var Output={};
    var getR = XSProc.procedureOfSchema("WTH","FULL_ANALYSIS");
    var result= getR(year,attr);
    return result;
}
function getInStore()
{
    var Output={};
    var getIn = XSProc.procedureOfSchema("WTH","IN_STORE_DETAIL");
    var result= getIn();
    return result;   
}
function custInStore(fields)
{
    var i=0;
    fields=JSON.parse(fields);
    var result;
    
    for(i=0;i<fields.length;i++)
    {
        var custStore = XSProc.procedureOfSchema("WTH","PULL_CUST");
        result= custStore((fields[i]).trim());
    }
    return result;
}
function comingFromFb(fid,likes)
{
    var i=0;
    var sendVal = 0;
    likes=JSON.parse(likes);
    for(i=0;i<likes.length;i++)
    {
        if(i == 0){
            sendVal = 100;
        }
        else sendVal = 0;
        var fromFb = XSProc.procedureOfSchema("WTH","UPDATE_FACEBOOK_LIKES");
        var result= fromFb(fid,likes[i], sendVal); 
    }
    return result;
}
function resultSetToJSONArray( rs )
{

	var meta = rs.getMetaData();
	var count = meta.getColumnCount();
	var columnTypeMetadata = new Array();
	var objList = [];
	try
	{
		while(rs.next())
		{
		  var i=1;
		  var strObj = JSON.parse("{}");
		  while(i<=count)
		  {
				var label = null;
				var typeName = null;
				var colMetadata = null;
				if ( columnTypeMetadata[i-1] == null )
				{
					label = meta.getColumnLabel(i);
					typeName = meta.getColumnTypeName(i);					
					colMetadata = new Object();
					colMetadata.label = meta.getColumnLabel(i);
					colMetadata.typeName = meta.getColumnTypeName(i);
					columnTypeMetadata.push(colMetadata);
				}
				else
				{
					colMetadata = columnTypeMetadata[i-1];
					label = colMetadata.label;
					typeName = colMetadata.typeName;
				}
					
				var str1 = "";
				if(typeName === "CHAR" || typeName === "VARCHAR" || typeName === "STRING")
				{
					str1 = rs.getString(i);
					if(str1 !== null && str1.length>0)
					{
						str1 = replaceAll(str1,"\u0009","\\t");
						str1 = replaceAll(str1,"\u000B","\\b");
						str1 = replaceAll(str1,"\u000C","\\f");
						str1 = replaceAll(str1,"\u000A","\\n");
						str1 = replaceAll(str1,"\u000D","\\n");
					}
					strObj[label] = str1;
				
				}
				else if(typeName === "NCHAR" || typeName === "NVARCHAR" || typeName === "SHORTTEXT" || typeName === "NSTRING")
				{
					var str2 = rs.getNString(i);
					if(str2 !== null && str2.length>0)
					{
						str2 = replaceAll(str2,"\u0009","\\t");
						str2 = replaceAll(str2,"\u000B","\\b");
						str2 = replaceAll(str2,"\u000C","\\f");
						str2 = replaceAll(str2,"\u000A","\\n");
						str2 = replaceAll(str2,"\u000D","\\n");
						//strObj += '"'+label+'"'+':"'+str2+'"';
					}
					strObj[label] = str2;
					//$.trace.debug("json string is ==>"+JSON.stringify(strObj));
				}
				else
				{
				   str1 = rs.getString(i);
				   strObj[label] = str1;
				}

				if(i === (count))
				{
				   var k = 0;
				}
				i++; 
		  }
		  objList.push(strObj);         
		}
	}
	catch(e)
	{
		$.trace.debug("output===>"+e);
	}
	return objList;
}