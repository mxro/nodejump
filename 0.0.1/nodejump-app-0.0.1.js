// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/ajMicroSync/docs/nodejump-app-0.0.1 -->

(function($, AJ) {

	$.initNodeJumpApp = function(params) {

		var nj = {};
		var elem = params.elem;
		var client = params.client;

		nj.isChanged = false;

		// the last loaded/ edited value.
		nj.valueCache = null;

		// the reference to the currently open document
		nj.loadedNode = null;
		// access secret for current document
		nj.secret = null;
		// editor component
		nj.edit = null;
		// view component
		nj.view = null;
		// monitor for auto-refresh
		nj.monitor = null;
		// timer for auto-commit
		nj.committer = null;

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

			nj.loadedNode = node;
			nj.secret = secret;

			client.load({
				node : node,
				secret : secret,
				onSuccess : function(res) {

					nj.view.load(nj.loadedNode.url(), secret, {
						onSuccess : function() {
						},
						onFailure : function() {
						}
					});
					nj.edit.load(node.url(), secret, function() {
						nj.valueCache = nj.edit.getValue().valueOf();
					});

					callback();
				}
			});

		};

		nj.commit = function() {
			if (nj.loadedNode) {
				nj.edit.commitOrReload(function(wasChanged) {
					if (wasChanged) {
						nj.view.load(nj.loadedNode.url(), nj.secret, {
							onSuccess : function() {
							},
							onFailure : function() {
							}
						});
					}
				});
			}

			// var currentValue = nj.edit.getValue();
			//
			// var newValueNode = client.updateValue({
			// forNode : nj.loadedNode,
			// newValue : currentValue.valueOf()
			// });
			//
			// client.replace({
			// node : nj.loadedNode,
			// withNode : newValueNode
			// });
			//
			// nj.view.load(nj.loadedNode.url(), nj.secret, {
			// onSuccess : function() {
			// },
			// onFailure : function() {
			// }
			// });
			//
			// nj.isChanged = false;
			//
			// client.commit({
			// onSuccess : function() {
			//
			// }
			// });

		};

		nj.startAutoCommit = function() {
			nj.committer = setInterval(function() {
				nj.commit();
			}, 2000);
		};

		nj.stopAutoCommit = function() {
			nj.commit();
			clearInterval(nj.committer);
		};

		nj.startAutoRefresh = function() {
			if (!nj.loadedNode)
				throw "Auto refresh can only be started after a node is loaded.";

			// return;
			// nj.monitor = client
			// .monitor({
			// node : nj.loadedNode,
			// interval : 2000,
			// onChange : function(res) {
			// // if (nj.isChanged) {
			// // AJ.ui
			// // .notify(
			// // "Someone changed this document while you were editing.",
			// // "alert-warning");
			// // return;
			// // }
			//
			// nj.load(nj.loadedNode, nj.secret, function() {
			//
			// });
			//
			// }
			// });

		};

		nj.stopAutoRefresh = function() {
			if (nj.monitor) {
				nj.monitor.stop({
					onSuccess : function() {

					}
				});
				nj.monitor = null;
			}
		};

		return {
			load : nj.load,
			initComponents : nj.initComponents,
			startAutoCommit : nj.startAutoCommit,
			stopAutoCommit : nj.stopAutoCommit,
			startAutoRefresh : nj.startAutoRefresh,
			stopAutoRefresh : nj.stopAutoRefresh
		};
	};

})(jQuery, AJ);

// <!-- one.end -->
