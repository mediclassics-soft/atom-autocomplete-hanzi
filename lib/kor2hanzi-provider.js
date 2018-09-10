'use babel';

import kor2hanzi from '../data/kor2hanzi';
import sentenceSymbol from '../data/sentenceSymbol';
import custom from '../data/custom';

let suggestions = kor2hanzi.concat( sentenceSymbol ).concat( custom )
const prefix_header = '!'
const prefix_capture = new RegExp( prefix_header + "\\S+$" )

class kor2hanziProvider {

	constructor() {
		// offer suggestions only when editing plain text or markdown files
		this.selector = '.text.plain, .text.plain.null-grammar, .source.gfm';

		// except when editing a comment within an HTML file
		this.disableForSelector = '.text.html.basic .comment';

		// make these suggestions appear above default suggestions
		this.suggestionPriority = 2;
	}

	getSuggestions(options) {
		const { editor, bufferPosition } = options;

		// getting the prefix on our own instead of using the one Atom provides
		let prefix = this.getPrefix(editor, bufferPosition);

		// all of our snippets start with "@"
		if ( prefix.startsWith( prefix_header ) ) {
			return this.findMatchingSuggestions( prefix );
		}
	}

	getPrefix(editor, bufferPosition) {
		// the prefix normally only includes characters back to the last word break
		// which is problematic if your suggestions include punctuation (like "@")
		// this expands the prefix back until a whitespace character is met
		// you can tweak this logic/regex to suit your needs
		let line = editor.getTextInRange( [ [bufferPosition.row, 0], bufferPosition ] );
		let match = line.match( prefix_capture  );
		return match ? match[0] : '';
	}

/*
	getSuggestions(options) {
		const { prefix } = options;

		// only look for suggestions after 3 characters have been typed
		if ( ( prefix.startsWith('$') ) && ( prefix.length > 1 )  ) {
			return this.findMatchingSuggestions( prefix );
		}
	}
*/


	findMatchingSuggestions( prefix ) {
		// using a Promise lets you fetch and return suggestions asynchronously
		// this is useful for hitting an external API without causing Atom to freeze
		return new Promise( ( resolve) => {
			// fire off an async request to the external API
			// filter json (list of suggestions) to those matching the prefix
			let matchingSuggestions = suggestions.filter( (suggestion) => {
				return suggestion.source.startsWith( prefix.substring(1) );
			});

			// bind a version of inflateSuggestion() that always passes in prefix
			// then run each matching suggestion through the bound inflateSuggestion()
			let inflateSuggestion = this.inflateSuggestion.bind(this, prefix);
			let inflatedSuggestions = matchingSuggestions.map( inflateSuggestion );

			// resolve the promise to show suggestions
			resolve( inflatedSuggestions );

		})
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(replacementPrefix, suggestion) {
		return {
			displayText: suggestion.target,
			snippet: suggestion.target,
			replacementPrefix: replacementPrefix, // ensures entire prefix is replaced
			iconHTML: '<i class="icon-comment"></i>',
			type: 'text',
			rightLabelHTML: '<span class="aab-right-label">' + suggestion.desc + '</span>' // look in /styles/atom-slds.less
		};
	}

	onDidInsertSuggestion( options ) {
		// atom.notifications.addSuccess( options.suggestion.displayText + ' was inserted.' );
	}
}
export default new kor2hanziProvider();
