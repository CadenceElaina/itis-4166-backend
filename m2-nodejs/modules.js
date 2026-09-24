// reusable components
// each file is treated as a module, whose functionality can be used by other files
// 2 module systems
// CommonJS modules
// ES modules

/*
NodeJS wraps a module with a wrapper function, which encapsulates the module
and provides a private scope for its variables and functions
- must be exported to be used by another file

module: ref to current module
exports: a ref to module.exports
require: a function to import other modules, returns modules.exports
__filename: the file name of the current module
__dirname: the absolute path of the directory that contains teh current module

export using module.exports or exports
exports is a shortcut for module.exports, i.e., they reference the same
object, initialized to {}
-We may add properties to this object using either exports or module.exports

?
If reassign is needed, use module.exports
-if exports is assigned, it is no longer a shortcut for module.exports
?

const abc = require'./...');
const fs = require('fs'); 
*/
