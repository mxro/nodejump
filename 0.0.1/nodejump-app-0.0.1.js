// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/ajMicroSync/docs/nodejump-app-0.0.1 -->

(function($, AJ) {

	$.initNodeJumpApp = function(params) {

		var nj = {};
		var elem = params.elem;
		var client = params.client;

		nj.edit = null;
		nj.view = null;

		nj.initComponents = function() {

			var renderers = AJ.odb.rendering().createDefaultRendererRegistry();

			var converter = new Markdown.Converter();

			renderers.addRenderer(AJ.odb.rendering().createMarkdownRenderer(
					function(input) {
						return converter.makeHtml(input);
					}));

			nj.edit = $.initAjEdit($(".editorContent", elem), client);

			nj.edit.setEditorFactory(function() {
				$(".editorContent", elem).show(); // to assure codemirror is
													// rendered
				// correctly.

				var editorElem = $(".textArea", elem).get(0);
				if (!editorElem) {
					throw "Editor element is not defined: " + elem
							+ ".textArea";
				}

				var editor = CodeMirror.fromTextArea(editorElem, {
					// mode: 'markdown',
					lineNumbers : true,
					matchBrackets : true,
					theme : "default",
					indentWithTabs : true,
					lineWrapping : true,
					onChange : function(editor, changeParams) {

					}
				});

				return editor;
			});

			nj.view = $.initAjView({
				elem : $(".viewComponent", elem),
				client : client,
				renderers : renderers,
				editHandler : function(client, node, secret) {

				},
				nodeChangeListener : function(client, node, secret) {

				}
			});

		};

		nj.load = function(node, secret, callback) {

			client.load({
				node : node,
				secret : secret,
				onSuccess : function(res) {
					nj.view.load(node.url(), secret, {
						onSuccess : function() {
						},
						onFailure : function() {
						}
					});
					nj.edit.load(node.url(), secret, function() {

					});
				}
			});

		};

		return {
			load : nj.load,
			initComponents : nj.initComponents
		};
	};

})(jQuery, AJ);

// <!-- one.end -->
