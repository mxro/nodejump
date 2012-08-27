// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/ajMicroSync/docs/nodejump-app-0.0.1 -->

// node jump application module
(function($, AJ) {

	// nodejump application js
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
			
			nj.edit.setTextChangeListener(function() {
					nj.view.load(nj.loadedNode.url(), nj.secret, {
						onSuccess : function() {
						},
						onFailure : function(ex) {
							Aj.ui.notify("Unexpected exception while loading node: "+ex, "alert-error");
						}
					});
				
			});

		};

		nj.load = function(node, secret, callback) {

			nj.loadedNode = node;
			nj.secret = secret;

			client.load({
				node : node,
				secret : secret,
				onSuccess : function(res) {

					var counter = 0;
					nj.view.load(nj.loadedNode.url(), secret, {
						onSuccess : function() {
							counter++;
							if (counter == 2) {
								counter = -5;
								callback();
							}
						},
						onFailure : function() {
						}
					});
					nj.edit.load(node.url(), secret, function() {
						nj.valueCache = nj.edit.getValue().valueOf();
						counter++;
						if (counter == 2) {
							counter = -5;
							callback();
						}
					});

					
				}
			});

		};

		nj.commitLocal = function(callback) {
			if (nj.loadedNode) {
				nj.edit.commitLocal(callback);
			}
		};

		nj.commitOrLoadRemote = function(callback) {
			if (nj.loadedNode) {
				nj.edit.commitOrReload(function(wasChanged) {
					
				});
			}
		}
		
		nj.startAutoCommit = function() {
			if (nj.committer) return;
			nj.committer = setInterval(function() {
				nj.commitLocal(function() {
					
				});
			}, 900);
		};

		nj.stopAutoCommit = function() {
			nj.commitLocal(function() {
				
			});
			clearInterval(nj.committer);
			nj.committer = null;
		};

		nj.startAutoRefresh = function() {
			if (nj.monitor) return;
			nj.monitor = setInterval(function() {
				nj.commitOrLoadRemote(function() {
					
				});
			}, 2000);
			nj.commitOrLoadRemote(function() {
				
			});
			
		};

		nj.stopAutoRefresh = function() {
			nj.commitOrLoadRemote(function() {
				
			});
			clearInterval(nj.monitor);
			nj.monitor = null;
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
