// For file I/O (Electron app only)
const fs = window.require('fs');
const path = window.require('path');

type Scheme = {
	name: string,
	notes: string[]
}

// Reads all color-schemes in 'folderPath/'
function readSchemesFromFolder(folderPath: string) {
	let schemes: Scheme[] = [];

	let files: string[] = fs.readdirSync(folderPath);
	files.forEach((file: string) => {
		if (file.slice(-5) === '.json') {
			let filePath: string = path.join(folderPath, file);
			let data: string = fs.readFileSync(filePath,
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

// Read all default schemes
const pathToDefaultSchemesFolder: string = path.join('src', 'schemes', 'default');
defaultSchemes = readSchemesFromFolder(pathToDefaultSchemesFolder);

// Make sure at least 1 scheme exists in <defaultSchemes>
if (defaultSchemes.length === 0)
    defaultSchemes.push({ name: 'No schemes found :(', notes:["#000000", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"] });

// Read all user schemes
const pathToUserSchemesFolder: string = path.join('src', 'schemes');
userSchemes = readSchemesFromFolder(pathToUserSchemesFolder);

// Store list of available schemes (default-schemes followed by user-schemes)
let schemes: Scheme[] = defaultSchemes.concat(userSchemes);

export class SchemeFunctions {
	public static getSchemes(): Scheme[] {
		return schemes;
	}

	// Checks if <scheme> is a name in <defaultSchemes> (Returns T/F)
	public static isInDefaultSchemes(scheme: Scheme): boolean {
		for (let i = 0; i < defaultSchemes.length; i++) {
			if (defaultSchemes[i].name === scheme.name)
				return true;
		}

		return false;
	}

	// Checks if <scheme> is a name in <userSchemes> (Returns T/F)
	public static isInUserSchemes(scheme: Scheme): boolean {
		for (let i = 0; i < userSchemes.length; i++) {
			if (userSchemes[i].name === scheme.name)
				return true;
		}

		return false;
	}

	// Adds <scheme> to list of available schemes
	public static addScheme(scheme: Scheme): void {
		schemes.push(scheme);
	}

	// Replaces the scheme with former name <originalName> with new <scheme>
	public static editScheme(originalName: string, scheme: Scheme): void {
		for (let i = defaultSchemes.length; i < schemes.length; i++) {
			if (originalName === schemes[i].name) {
				schemes[i] = scheme;
				return;
			}
		}
	}

	// Deletes <scheme> from the list of available schemes
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