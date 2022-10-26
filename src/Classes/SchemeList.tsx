import { stringify } from "querystring";

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

let defaultSchemes: Scheme[] = [];
let userSchemes: Scheme[] = [];
let schemes: Scheme[] = [];
let ind = 0;

const pathToDefaultSchemesFolder: string = path.join('src', 'schemes', 'default');
defaultSchemes = readSchemesFromFolder(pathToDefaultSchemesFolder);

// Make sure at least 1 scheme exists in <defaultSchemes>
if (defaultSchemes.length == 0)
    defaultSchemes.push({ name: 'No schemes found :(', notes:["#000000", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"] });

const pathToUserSchemesFolder: string = path.join('src', 'schemes');
userSchemes = readSchemesFromFolder(pathToUserSchemesFolder);

schemes = defaultSchemes.concat(userSchemes);

export class SchemeList {
	
	public static getSchemes(): Scheme[] {
		return schemes;
	}

	public static isInDefaultSchemes(scheme: Scheme): boolean {
		for (let i = 0; i < defaultSchemes.length; i++) {
			if (defaultSchemes[i].name == scheme.name)
				return true;
		}

		return false;
	}

	public static isInUserSchemes(scheme: Scheme): boolean {
		for (let i = 0; i < userSchemes.length; i++) {
			if (userSchemes[i].name == scheme.name)
				return true;
		}

		return false;
	}

	public static addScheme(scheme: Scheme): void {
		schemes.push(scheme);
	}

	public static deleteScheme(scheme: Scheme): void {
		// Don't allow user to remove default schemes
		if (this.isInDefaultSchemes(scheme)) {
			console.log('Error: Cannot delete default schemes');
			return;
		}

		for (let i = 0; i < userSchemes.length; i++) {
			if (userSchemes[i].name == scheme.name) {
				schemes.splice(defaultSchemes.length + i, 1);
				fs.unlinkSync(path.join(pathToUserSchemesFolder, scheme.name + '.json'));
				console.log(scheme.name + " was successfully deleted");
				return;
			}
		}

		console.log("Error: A scheme by that name was not found");
	}
}