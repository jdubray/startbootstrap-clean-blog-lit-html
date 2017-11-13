
////////////////////////////////////////////////////////////////////////////////
// View
//

let view = {
 
    // Initial State
    init(model, theme, intents) {
        this.intents = intents || this.intents || {} ;
        this.theme = theme || {};
        
        return view.ready(model) ;
    },

    // State representation of the ready state
    ready(model,theme, intents) { 
        model.lastEdited = model.lastEdited || {} ;
        intents = intents || this.intents ;
        theme = theme || this.theme ;
        
        var output = {
            header: model.needsUpdate.h ? theme.header(model.data) : null,
            footer: model.needsUpdate.f ? theme.footer(model.data) : null,
            page: model.needsUpdate.p ? theme.page(model.data) : null
        }
        
        return output ;
    },


    //display the state representation
    display(representation,next) {
        if (next) {
            next(representation) ;
        } 
    }

} ;

export { view } ;