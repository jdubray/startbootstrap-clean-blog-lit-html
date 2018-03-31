
var initPageLifeCycle = function() {
	 	
	jQuery(document).ready(function($) {
			
			if (window.history && window.history.pushState) {

				$(window).on('popstate', function() {
					let hashName = location.hash.split("#")[1];
					
					if (hashName && (hashName !== '')) {
						window.setMenuItem({menuItem:hashName, popped: true}) ;						
					} else {
						window.setMenuItem({menuItem:'home', popped: true}) ;	
					}
				});
			}
		});
	
}

var initElements = function() {
    jQuery(function($) {
        $(document).ready(function() {
            // this method is called after the State Representation 
            // has been mounted in the page
            // it gives the opportunity to initialize HTML elements
            // such as Date/Time pickers
        })
    }) ;
} ;