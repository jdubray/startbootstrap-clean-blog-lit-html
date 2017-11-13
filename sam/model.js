///////////////////////////////////////////////////////////////////////////////
// This is free and unencumbered software released into the public domain.
//
// Anyone is free to copy, modify, publish, use, compile, sell, or
// distribute this software, either in source code form or as a compiled
// binary, for any purpose, commercial or non-commercial, and by any
// means.
//
// In jurisdictions that recognize copyright laws, the author or authors
// of this software dedicate any and all copyright interest in the
// software to the public domain. We make this dedication for the benefit
// of the public at large and to the detriment of our heirs and
// successors. We intend this dedication to be an overt act of
// relinquishment in perpetuity of all present and future rights to this
// software under copyright law.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// For more information, please refer to <http://unlicense.org/>



////////////////////////////////////////////////////////////////////////////////
// Model 
//

// API Endpoints

let model = { 
    data : {},
    needsUpdate: {},


    init(state, components, options) {
        this.state = state 
        this.components = components 
        this.options = options 
        this.data = components.data 

        this.needsUpdate.h = true 
        this.needsUpdate.p = true 
        this.needsUpdate.f = true 
        
    },

    applyFilters(data) {
    
        // filters

        // provide some hints as to what changed 
        // in the model to render the view
        this.needsUpdate.h = false 
        this.needsUpdate.p = false 
        this.needsUpdate.f = false 
        this.needsUpdate.render = true 
        
        this.components.filters.forEach((_) => _.filter(this,data)) 

    },

    accept(data) {
        // Execute acceptors
        this.components.acceptors.forEach( _ => _.acceptor(this,data) ) 
        
    },


    postProcessing(){

        // perform ancillary assignments
        
        this.components.postProcessings.forEach((_) => _.post(this,data)) 

    },
                
    present(proposal = {}, next) {
    
        this.applyFilters(proposal) 

        this.accept(proposal) 

        this.postProcessing() 
    
        if (this.needsUpdate.render) { this.state.render(model,next) }
    }

} 

export { model } 