Know Your Customer
==================

A web application that shows the analysis on the people visiting a particular store to make purchases. Each customer is uniquely identified using a non-intrusive technique. The customer's purchase history can be tracked to identify the behavior and buying trends. Algorithms are used to effectively identify brands and promote these brands to the customers. 

We track the Social Media activity too for the particular customer and target select customers for brand consumption, campaigns etc.

Retailers can leverage the real-time data to understand consumer buying patterns.

__**Authors**__  
A Product created by Ankit, Saumya, Nitin, Geet for a Hackathon held at SAP Labs India Pvr. Ltd which was a 28 hour contest. The code uses SAPUI5 for the front end code and .xsjs file for the middle layer. The back end was coded in SQLScript in HANA Studio.  

Built using Eclipse/HANA SAPUI5 Application project.  

.xsaccess and .xsapp files are required for this project to run, which have been renamed in github as default.xsaccess and default.xsapp

__**Running the App**__  
Install the plugin into eclipse. Copy this link into the Install New Software option - https://tools.hana.ondemand.com/mars/.  
After installation is done, create an SAPUI5 application and import the project into the WebContent directory of the project. Everything apart from the Backend calls will work, the AJAX calls need to be replaced by existing backend calls.  

If you try to run the app by some other way, change one line in Main.html file -  
https://openui5.hana.ondemand.com/resources/sap-ui-core.js instead of resources/sap-ui.core.js  
or  
https://sapui5.hana.ondemand.com/resources/sap-ui-core.js instead of resources/sap-ui.core.js
