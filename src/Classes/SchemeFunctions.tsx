const fs = window.require('fs');
const path = window.require('path');
const isDev = process.env.NODE_ENV === 'production' ? false : true;

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

const schemeDir: string = isDev ? '.' : 'resources';
const pathToDefaultSchemesFolder: string = path.join(schemeDir, 'schemes', 'default');
const pathToUserSchemesFolder: string = path.join(schemeDir, 'schemes');

defaultSchemes = readSchemesFromFolder(pathToDefaultSchemesFolder);
userSchemes = readSchemesFromFolder(pathToUserSchemesFolder);

// Make sure at least 1 scheme exists in <defaultSchemes>
if (defaultSchemes.length === 0)
    defaultSchemes.push({ name: 'No schemes found :(', notes:["#000000", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"] });

let schemes: Scheme[] = defaultSchemes.concat(userSchemes);

export class SchemeFunctions {
	public static getSchemes(): Scheme[] {
		return schemes;
	}

	public static getPathToDefaultSchemes(): string {
		return pathToDefaultSchemesFolder;
	}

	public static getPathToUserSchemes(): string {
		return pathToUserSchemesFolder;
	}

	public static isInDefaultSchemes(scheme: Scheme): boolean {
		for (let i = 0; i < defaultSchemes.length; i++) {
			if (defaultSchemes[i].name === scheme.name)
				return true;
		}

		return false;
	}

	public static isInUserSchemes(scheme: Scheme): boolean {
		for (let i = 0; i < userSchemes.length; i++) {
			if (userSchemes[i].name === scheme.name)
				return true;
		}

		return false;
	}

	public static addScheme(scheme: Scheme): void {
		schemes.push(scheme);
	}

	public static editScheme(originalName: string, scheme: Scheme): void {
		for (let i = defaultSchemes.length; i < schemes.length; i++) {
			if (originalName === schemes[i].name) {
				schemes[i] = scheme;
				return;
			}
		}
	}

	public static deleteScheme(scheme: Scheme): void {
		// Don't allow user to remove default schemes
		if (this.isInDefaultSchemes(scheme)) {
			console.log('Error: Cannot delete default schemes');
			return;
		}

		for (let i = 0; i < schemes.length; i++) {
			if (schemes[i].name === scheme.name) {
				schemes.splice(i, 1);
				fs.unlinkSync(path.join(pathToUserSchemesFolder, scheme.name + '.json'));
				console.log(scheme.name + " was successfully deleted");
				return;
			}
		}

		console.log("Error: A scheme by that name was not found");
	}
}