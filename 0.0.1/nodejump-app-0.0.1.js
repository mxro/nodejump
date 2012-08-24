// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/ajMicroSync/docs/nodejump-app-0.0.1 -->

(function($, AJ) {

	$.initNodeJumpApp = function(params) {

		var nj = {};
		var elem = params.elem;
		var client = params.client;

		nj.valueCache = null;
		nj.isChanged = false;
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
						if (nj.loadedNode) {
							nj.isChanged = true;

							nj.view.load(nj.loadedNode.url(), nj.secret, {
								onSuccess : function() {
								},
								onFailure : function() {
								}
							});
						}
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
					nj.valueCache = client.dereference({
						ref : node
					}).value();
					nj.loadedNode = node;
					nj.secret = secret;

					nj.view.load(nj.loadedNode.url(), secret, {
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

		nj.commit = function() {
			if (nj.valueChanged) {

				var currentValue = nj.edit.getValue();

				var newValueNode = client.updateValue({
					forNode : nj.loadedNode,
					newValue : currentValue
				});

				client.replace({
					node : nj.loadedNode,
					withNode : newValueNode
				});
				nj.valueChanged = false;

				client.commit({
					onSuccess : function() {

					}
				});
			}
		};

		nj.startAutoCommit = function() {
			nj.committer = setInterval(function() {
				nj.commit();
			}, 1000);
		};

		nj.stopAutoCommit = function() {
			nj.commit();
			clearInterval(nj.committer);
		};

		nj.startAutoRefresh = function() {
			if (nj.loadedNode) {
				nj.monitor = client
						.monitor({
							node : nj.loadedNode,
							interval : 2000,
							onChange : function(res) {
								if (nj.valueChanged) {
									AJ.ui
											.notify(
													"Someone changed this document while you were editing.",
													"alert-warning");
									return;
								}

								nj.load(nj.loadedNode, nj.secret, function() {

								});

							}
						});
			}
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
