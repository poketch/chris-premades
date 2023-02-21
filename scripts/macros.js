import {armorOfAgathys} from './macros/spells/armorOfAgathys/armorOfAgathys.js';
import {callLightning} from './macros/spells/callLightning/callLightning.js';
import {conditionResistanceEarly, conditionResistanceLate} from './macros/mechanics/conditionResistance/conditionResistance.js';
import {conditionVulnerabilityEarly, conditionVulnerabilityLate} from './macros/mechanics/conditionVulnerability/conditionVulnerability.js';
import {charmPerson} from './macros/spells/charmPerson/charmPerson.js';
import {chillTouch} from './macros/spells/chillTouch/chillTouch.js';
import {cloudkill} from './macros/spells/cloudkill/cloudkill.js';
import {darkness} from './macros/spells/darkness/darkness.js';
import {deathWard} from './macros/spells/deathWard/deathWard.js';
import {detectThoughts} from './macros/spells/detectThoughts/detectThoughts.js';
import {dragonsBreath} from './macros/spells/dragonsBreath/dragonsBreath.js';
import {hex} from './macros/spells/hex/hex.js';
import {holyWeapon} from './macros/spells/holyWeapon/holyWeapon.js';
import {lightningArrow} from './macros/spells/lightningArrow/lightningArrow.js';
import {massCureWounds} from './macros/spells/massCureWounds/massCureWounds.js';
import {mirrorImage} from './macros/spells/mirrorImage/mirrorImage.js';
import {protectionFromEvilAndGood} from './macros/spells/protectionFromEvilAndGood/protectionFromEvilAndGood.js';
import {sanctuary} from './macros/spells/sanctuary/sanctuary.js';
import {shadowBlade} from './macros/spells/shadowBlade/shadowBlade.js';
import {spikeGrowth} from './macros/spells/spikeGrowth/spikeGrowth.js';
import {spiritShroud} from './macros/spells/spiritShroud/spiritShroud.js';
export let macros = {
	'armorOfAgathys': armorOfAgathys,
	'callLightning': callLightning,
	'conditionResistanceEarly': conditionResistanceEarly,
	'conditionResistanceLate': conditionResistanceLate,
	'conditionVulnerabilityEarly': conditionVulnerabilityEarly,
	'conditionVulnerabilityLate': conditionVulnerabilityLate,
	'charmPerson': charmPerson,
	'actorOnUse': useActorOnUse,
	'cloudkill': cloudkill,
	'darkness': darkness,
	'deathWard': deathWard,
	'detectThoughts': detectThoughts,
	'dragonsBreath': dragonsBreath,
	'hex': hex,
	'holyWeapon': holyWeapon,
	'lightningArrow': lightningArrow,
	'massCureWounds': massCureWounds,
	'mirrorImage': mirrorImage,
	'protectionFromEvilAndGood': protectionFromEvilAndGood,
	'sanctuary': sanctuary,
	'shadowBlade': shadowBlade,
	'spikeGrowth': spikeGrowth,
	'spiritShroud': spiritShroud
}
function actorOnUseMacro(itemName) {
	return 'await chrisPremades.macros.actorOnUse(this, "' + itemName + '");';
}
export async function setupMacroFolder() {
	let macroFolder = game.folders.find((folder) => folder.name === "CPR Macros" && folder.type === "Macro");
	if (!macroFolder) {
		await Folder.create({
		color: "#117e11",
		name: "CPR Macros",
		parent: null,
		type: "Macro"
		});
	}
}
async function createMacro(name, content, isGM) {
	let macroFolder = game.folders.find((folder) => folder.name === 'CPR Macros' && folder.type === 'Macro');
	let data = {
		'name': 'CPR-' + name,
		'type': 'script',
		'img': 'icons/svg/dice-target.svg',
		'scope': 'global',
		'command': content,
		'folder': macroFolder ? macroFolder.id : undefined,
		'flags': {
			'advanced-macros': {
				'runAsGM': isGM
			},
		}
	};
	let existingMacro = game.macros.find((m) => m.name == 'CPR-' + name);
	if (existingMacro) data._id = existingMacro.id;
	let macro = existingMacro
	? existingMacro.update(data)
	: Macro.create(data, {
		temporary: false,
		displaySheet: false,
	});
}
export async function setupWorldMacros() {
	await createMacro('chillTouch', actorOnUseMacro('chillTouch'), false);
	await createMacro('hex', actorOnUseMacro('hex'), false);
	await createMacro('lightningArrowAttack', actorOnUseMacro('lightningArrowAttack'), false);
	await createMacro('lightningArrowDamage', actorOnUseMacro('lightningArrowDamage'), false);
	await createMacro('spiritShroud', actorOnUseMacro('spiritShroud'), false);
}
async function useActorOnUse(workflow, itemName) {
	switch (itemName) {
		default:
			console.log('Invalid actor onUse macro!');
			return;
		case 'chillTouch':
			await chillTouch(workflow);
			break;
		case 'hex':
			await hex.attack(workflow);
			break;
		case 'lightningArrowAttack':
			await lightningArrow.attack(workflow);
			break;
		case 'lightningArrowDamage':
			await lightningArrow.damage(workflow);
			break;
		case 'spiritShroud':
			await spiritShroud.attack(workflow);
	}
}