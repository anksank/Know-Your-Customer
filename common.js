sap.ui.globalParameters = {};
updateMatrixSelectionSettings = function(layout,items,clickHandler,hasHeaders) {
	
	if ( !hasHeaders )
		hasHeaders = false;
	
	var rows = layout.getRows();
	
	var that = layout;

	for ( var i = 0; i < rows.length; i++ ) {
		rows[i].removeStyleClass("selectedMatrixRow");
		rows[i].removeStyleClass("highlightedMatrixRow");
		rows[i].addStyleClass("normalMatrixRow");
		
		if ( hasHeaders ) {
			if ( i > 0 )
				registerMatrixRowSelectionEvents(rows[i],that,i-1,items[i-1],clickHandler);
		} else {
			registerMatrixRowSelectionEvents(rows[i],that,i,items[i],clickHandler);

		}
		
	}
	
	if ( layout.selectedRow && rows.indexOf(layout.selectedRow) == -1 ) {
		layout.selectedRow = undefined;
	}
	
	layout.highlightedRow = undefined;
	
	if ( layout.selectedRow ) {
		layout.selectedRow.removeStyleClass("normalMatrixRow");
		layout.selectedRow.addStyleClass("selectedMatrixRow");		
	}

		
};

registerMatrixRowSelectionEvents = function(row,layout,anIndex,data,clickHandler) {
	
	var dom = row.getDomRef();
	
	dom.onmouseover = function(event) {
		if ( layout.highlightedRow ) {
			layout.highlightedRow.removeStyleClass("highlightedMatrixRow");
			layout.highlightedRow.addStyleClass("normalMatrixRow");
		}
		row.removeStyleClass("normalMatrixRow");
		row.addStyleClass("highlightedMatrixRow");		
		layout.highlightedRow = row;
	};
	dom.onclick = function(event) {
		if ( layout.selectedRow ) {
			layout.selectedRow.removeStyleClass("selectedMatrixRow");
			layout.selectedRow.addStyleClass("normalMatrixRow");
		}
		row.removeStyleClass("normalMatrixRow");
		row.addStyleClass("selectedMatrixRow");		
		layout.selectedRow = row;
		
		if ( clickHandler )
			clickHandler({ selectedItem : data, selectedIndex : anIndex });
	};
};