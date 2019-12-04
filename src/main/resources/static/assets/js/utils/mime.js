/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Utilerias MIME
 */

function getExtention(name) {
	var extention = '';
	//
	if (name.includes('audio/aac')) {
		extention = '.aac';
	}
	if (name.includes('application/x-abiword')) {
		extention = '.abw';
	}
	if (name.includes('application/octet-stream')) {
		extention = '.arc';
	}
	if (name.includes('video/x-msvideo')) {
		extention = '.avi';
	}
	if (name.includes('application/vnd.amazon.ebook')) {
		extention = '.azw';
	}
	if (name.includes('application/octet-stream')) {
		extention = '.bin';
	}
	if (name.includes('application/x-bzip')) {
		extention = '.bz';
	}
	if (name.includes('application/x-bzip2')) {
		extention = '.bz2';
	}
	if (name.includes('application/x-csh')) {
		extention = '.csh';
	}
	if (name.includes('text/css')) {
		extention = '.css';
	}
	if (name.includes('text/csv')) {
		extention = '.csv';
	}
	if (name.includes('application/msword')) {
		extention = '.doc';
	}
	
	if (name.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
		extention = '.docx';
	}
	if (name.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
		extention = '.pptx';
	}
	if (name.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
		extention = '.xlsx';
	}
	
	if (name.includes('application/epub+zip')) {
		extention = '.epub';
	}
	if (name.includes('image/gif')) {
		extention = '.gif';
	}
	if (name.includes('text/html')) {
		extention = '.html';
	}
	if (name.includes('image/x-icon')) {
		extention = '.ico';
	}
	if (name.includes('text/calendar')) {
		extention = '.ics';
	}
	if (name.includes('application/java-archive')) {
		extention = '.jar';
	}
	if (name.includes('image/jpeg')) {
		extention = '.jpeg';
	}
	if (name.includes('application/javascript')) {
		extention = '.js';
	}
	if (name.includes('application/json')) {
		extention = '.json';
	}
	if (name.includes('audio/midi')) {
		extention = '.mid';
	}
	if (name.includes('video/mpeg')) {
		extention = '.mpeg';
	}
	if (name.includes('application/vnd.apple.installer+xml')) {
		extention = '.mpkg';
	}
	if (name.includes('application/vnd.oasis.opendocument.presentation')) {
		extention = '.odp';
	}
	if (name.includes('application/vnd.oasis.opendocument.spreadsheet')) {
		extention = '.ods';
	}
	if (name.includes('application/vnd.oasis.opendocument.text')) {
		extention = '.odt';
	}
	if (name.includes('audio/ogg')) {
		extention = '.oga';
	}
	if (name.includes('video/ogg')) {
		extention = '.ogv';
	}
	if (name.includes('application/ogg')) {
		extention = '.ogx';
	}
	if (name.includes('application/pdf')) {
		extention = '.pdf';
	}
	if (name.includes('application/vnd.ms-powerpoint')) {
		extention = '.ppt';
	}
	if (name.includes('application/x-rar-compressed')) {
		extention = '.rar';
	}
	if (name.includes('application/rtf')) {
		extention = '.rtf';
	}
	if (name.includes('application/x-sh')) {
		extention = '.sh';
	}
	if (name.includes('image/svg+xml')) {
		extention = '.svg';
	}
	if (name.includes('application/x-shockwave-flash')) {
		extention = '.swf';
	}
	if (name.includes('application/x-tar')) {
		extention = '.tar';
	}
	if (name.includes('image/tiff')) {
		extention = '.tif';
	}
	if (name.includes('font/ttf')) {
		extention = '.ttf';
	}
	if (name.includes('application/vnd.visio')) {
		extention = '.vsd';
	}
	if (name.includes('audio/x-wav')) {
		extention = '.wav';
	}
	if (name.includes('audio/webm')) {
		extention = '.weba';
	}
	if (name.includes('video/webm')) {
		extention = '.webm';
	}
	if (name.includes('image/webp')) {
		extention = '.webp';
	}
	if (name.includes('font/woff')) {
		extention = '.woff';
	}
	if (name.includes('font/woff2')) {
		extention = '.woff2';
	}
	if (name.includes('application/xhtml+xml')) {
		extention = '.xhtml';
	}
	if (name.includes('application/vnd.ms-excel')) {
		extention = '.xls';
	}
	if (name.includes('application/xml')) {
		extention = '.xml';
	}
	if (name.includes('application/vnd.mozilla.xul+xml')) {
		extention = '.xul';
	}
	if (name.includes('application/zip')) {
		extention = '.zip';
	}
	if (name.includes('video/3gpp')) {
		extention = '.3gp';
	}
	if (name.includes('video/3gpp2')) {
		extention = '.3g2';
	}
	if (name.includes('application/x-7z-compressed')) {
		extention = '.7z';
	}
	//
	return extention;
}

function getData(name) {
	var extention = '';
	//
	if (name.includes('.aac')) {
		extention = 'audio/aac';
	}
	if (name.includes('.abw')) {
		extention = 'application/x-abiword';
	}
	if (name.includes('.arc')) {
		extention = 'application/octet-stream';
	}
	if (name.includes('.avi')) {
		extention = 'video/x-msvideo';
	}
	if (name.includes('.azw')) {
		extention = 'application/vnd.amazon.ebook';
	}
	if (name.includes('.bin')) {
		extention = 'application/octet-stream';
	}
	if (name.includes('.bz')) {
		extention = 'application/x-bzip';
	}
	if (name.includes('.bz2')) {
		extention = 'application/x-bzip2';
	}
	if (name.includes('.csh')) {
		extention = 'application/x-csh';
	}
	
	if (name.includes('.txt')) {
		extention = 'text/plain';
	}
	
	if (name.includes('.css')) {
		extention = 'text/css';
	}
	if (name.includes('.csv')) {
		extention = 'text/csv';
	}
	if (name.includes('.doc')) {
		extention = 'application/msword';
	}
	
	if (name.includes('.docx')) {
		extention = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
	}
	if (name.includes('.pptx')) {
		extention = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
	}
	if (name.includes('.xlsx')) {
		extention = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	}
	
	if (name.includes('.epub')) {
		extention = 'application/epub+zip';
	}
	if (name.includes('.gif')) {
		extention = 'image/gif';
	}
	if (name.includes('.html')) {
		extention = 'text/html';
	}
	if (name.includes('.ico')) {
		extention = 'image/x-icon';
	}
	if (name.includes('.ics')) {
		extention = 'text/calendar';
	}
	if (name.includes('.jar')) {
		extention = 'application/java-archive';
	}
	if (name.includes('.jpeg')) {
		extention = 'image/jpeg';
	}
	if (name.includes('.png')) {
		extention = 'image/jpeg';
	}
	if (name.includes('.jpg')) {
		extention = 'image/jpg';
	}
	if (name.includes('.js')) {
		extention = 'application/javascript';
	}
	if (name.includes('.json')) {
		extention = 'application/json';
	}
	if (name.includes('.mid')) {
		extention = 'audio/midi';
	}
	if (name.includes('.mpeg')) {
		extention = 'video/mpeg';
	}
	if (name.includes('.mpkg')) {
		extention = 'application/vnd.apple.installer+xml';
	}
	if (name.includes('.odp')) {
		extention = 'application/vnd.oasis.opendocument.presentation';
	}
	if (name.includes('.ods')) {
		extention = 'application/vnd.oasis.opendocument.spreadsheet';
	}
	if (name.includes('.odt')) {
		extention = 'application/vnd.oasis.opendocument.text';
	}
	if (name.includes('.oga')) {
		extention = 'audio/ogg';
	}
	if (name.includes('.ogv')) {
		extention = 'video/ogg';
	}
	if (name.includes('.ogx')) {
		extention = 'application/ogg';
	}
	if (name.includes('.pdf')) {
		extention = 'application/pdf';
	}
	if (name.includes('.ppt')) {
		extention = 'application/vnd.ms-powerpoint';
	}
	if (name.includes('.rar')) {
		extention = 'application/x-rar-compressed';
	}
	if (name.includes('.rtf')) {
		extention = 'application/rtf';
	}
	if (name.includes('.sh')) {
		extention = 'application/x-sh';
	}
	if (name.includes('.svg')) {
		extention = 'image/svg+xml';
	}
	if (name.includes('.swf')) {
		extention = 'application/x-shockwave-flash';
	}
	if (name.includes('.tar')) {
		extention = 'application/x-tar';
	}
	if (name.includes('.tif')) {
		extention = 'image/tiff';
	}
	if (name.includes('.ttf')) {
		extention = 'font/ttf';
	}
	if (name.includes('.vsd')) {
		extention = 'application/vnd.visio';
	}
	if (name.includes('.wav')) {
		extention = 'audio/x-wav';
	}
	if (name.includes('.weba')) {
		extention = 'audio/webm';
	}
	if (name.includes('.webm')) {
		extention = 'video/webm';
	}
	if (name.includes('.webp')) {
		extention = 'image/webp';
	}
	if (name.includes('.woff')) {
		extention = 'font/woff';
	}
	if (name.includes('.woff2')) {
		extention = 'font/woff2';
	}
	if (name.includes('.xhtml')) {
		extention = 'application/xhtml+xml';
	}
	if (name.includes('.xls')) {
		extention = 'application/vnd.ms-excel';
	}
	if (name.includes('.xml')) {
		extention = 'application/xml';
	}
	if (name.includes('.xul')) {
		extention = 'application/vnd.mozilla.xul+xml';
	}
	if (name.includes('.zip')) {
		extention = 'application/zip';
	}
	if (name.includes('.3gp')) {
		extention = 'video/3gpp';
	}
	if (name.includes('.3g2')) {
		extention = 'video/3gpp2';
	}
	if (name.includes('.7z')) {
		extention = 'application/x-7z-compressed';
	}
	//
	return extention;
}