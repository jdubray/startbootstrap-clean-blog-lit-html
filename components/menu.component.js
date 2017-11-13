// 

'user strict;'

// this is the business logic behind the menu
// it is generally common to any menu (as implemented in theme.js)

var menu = {

    acceptors: [
        
        { 
            name: "setMenuItem",
            order: 0,
            acceptor: function(model,data) {
             // change menu item
                if (data.menuItem) {
                    model.data.popped = data.popped || false ;
                    model.data.menuItem = data.menuItem ;
                    model.data.header.menu.map((item) => item.active = (item.href === data.menuItem)) ;
                    model.needsUpdate.p = true ;
                    model.needsUpdate.h = true ;
                    model.needsUpdate.f = true ;
                    if (model.data.home.blog.blogid) { delete model.data.home.blog.blogid ; }
                }
            }
        }

    ],

    actions: [

        { 
            name: "setMenuItem",
            implementation: function(data, present, model) {
                data = data || { menuItem : "home" } ;
                data.__action = 'setMenuItem' ;
                if (model) { 
                    model.present(data) ;
                } else {
                    present(data) ;
                }
                return false ;
            }
        }
    ],

    reactors: []

}

export { menu }