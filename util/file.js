const fs = require('fs');

const deleteFile = (filePath) => {
    console.log("TCL: deleteFile -> filePath", filePath);
    if (filePath[0] == '/') {
        filePath = filePath.substring(1, filePath.length);
        console.log("TCL: deleteFile -> filePath huhu", filePath);
    }
    
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    });
}

exports.deleteFile = deleteFile;