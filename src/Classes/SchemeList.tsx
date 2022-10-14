const fs = window.require('fs');
const path = window.require('path');

type Scheme = {
	name: string,
	notes: string[]
}

// Reads all color-schemes in 'folderPath/'
function readSchemesFromFolder(folderPath: string) {
	let schemes: Scheme[] = [];

	let files = fs.readdirSync(folderPath);
	files.forEach((file: string) => {
		if (file.slice(-5) === '.json') {
			let filePath = path.join(folderPath, file);
			let data = fs.readFileSync(filePath,
				{
					encoding: 'utf8',
					flag: 'r'
				});

			// Format each JSON file into a 2-array of <name> and <notes>
			schemes.push(JSON.parse(data));
		}
	});

	return schemes;
}

let schemeList: Scheme[] = [];
let ind = 0;

// Get all Default Schemes
const pathToDefaultSchemesFolder = path.join('src', 'schemes', 'default');
schemeList = schemeList.concat(readSchemesFromFolder(pathToDefaultSchemesFolder));

// Get all User-made schemes
const pathToUserSchemesFolder = path.join('src', 'schemes');
schemeList = schemeList.concat(readSchemesFromFolder(pathToUserSchemesFolder));

// Make sure at least 1 scheme exists in <schemeList>
if (schemeList.length == 0)
    schemeList.push({ name: 'No schemes found :(', notes:["#000000", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"] });

export { schemeList };