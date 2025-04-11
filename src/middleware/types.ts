export function imageFileType(mimetype: string): string | boolean {
    switch(mimetype) {
        case 'image/jpeg':
            return '.jpeg';
        case 'image/jpg':
            return '.jpg';
        case 'image/png':
            return '.png';
        default: 
            return false;
    }
}