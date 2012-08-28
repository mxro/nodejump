// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/ajMicroSync/docs/nodejump-app-0.0.1 -->

// node jump application module
(function($, AJ) {

	// nodejump application js
	$.initNodeJumpApp = function(params) {

		var nj = {};
		var elem = params.elem;
		var client = params.client;
		var nodeChangeHandler = params.nodeChangeHandler;
		
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
						Aj.ui.notify(
								"Unexpected exception while loading node: "
										+ ex, "alert-error");
					}
				});

			});
			
			$(".insertLinkButton", elem).click(function(evt) {
				evt.preventDefault();
				
				var codemirror = edit.getEditor();
				
				codemirror.replaceRange("[My Link](#)", codemirror.getCursor());
				
			});

		};

		nj.initForAnonymous = function(onSuccess) {

			nj.priv.createAnonymousDocument(function(node, secret) {
				nj.load(node, secret, onSuccess);
			});

		}

		nj.initForUser = function(onSuccess) {
			nj.priv.createNewUserDocument(function(node, secret) {
				nj.load(node, secret, onSuccess);
			});
		}
		
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
							if (nodeChangeHandler) {
								nodeChangeHandler(node, secret);
							}
							
						}
					});

				}
			});

		};

		nj.readHash = function(hash, callback) {
			if (!hash) {
				callback(false);
				return;
			}
			
			var link = AJ.utils.parseAppLink(hash);
			
			if (!link.address) {
				callback(false);
				return;
			}
			
			
			if (link.secret === null) {
				link.secret = AJ.userNodeSecret;
			}
			
			nj.load(client.reference(link.address), link.secret, function() {
				callback(true);
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
			if (nj.committer)
				return;
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
			if (nj.monitor)
				return;
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

		nj.priv = {};

		nj.priv.createAnonymousDocument = function(onSuccess) {
			client.seed({
				onSuccess : function(res) {

					var rootNode = client.append({
						node : "# Documents",
						to : res.root,
						atAddress : "./nj"
					});

					AJ.common.configureMarkdownNode(client, rootNode);

					onSuccess(rootNode, res.secret);

				},
				onFailure : function(ex) {
					AJ.ui.notify(
							"Unexpected error while creating anonymous document: "
									+ ex, "alert-error");
				}
			});
		};

		nj.priv.createNewUserDocument = function(onSuccess) {
			nj.priv.assertDocDbNode(function(docNode, secret) {
				AJ.common.appendDeep({
					client: client,
					toNode: docNode,
					secret: AJ.userNodeSecret,
					nodeFactory : function() {
						return "# Documents";
					},
					onSuccess : function(node, secret) {
						onSuccess(node, secret);
					},
					onFailure: function(ex) {
						AJ.ui.notify("Unexpected exception while creating new document: "+ex);
					}
				});
			});

		};

		nj.priv.assertDocDbNode = function(onSuccess) {

			client.load({
				url : AJ.userNodeUri + "/apps/nodejump/docs",
				secret : AJ.userNodeSecret,
				onSuccess : function(res) {
					onSuccess(res.loadedNode, AJ.userNodeSecret);
				},
				onUndefined : function(res) {
					nj.priv.assertAppData(function(node, secret) {
						client.assertChild({
							forNode : node,
							withPath : "docs",
							onSuccess : function(res) {
								onSuccess(res.childNode, secret);
							},
							onFailure : function(ex) {
								AJ.ui.notify(
										"Unexpected exception while creating document database: "
												+ ex, "alert-error");
							}

						});
					});
				},
				onFailure : function(ex) {
					AJ.ui.notify(
							"Unexpected exception while accessing document database: "
									+ ex, "alert-error");
				}
			});

		};

		nj.priv.assertAppData = function(onSuccess) {

			AJ.common.assertApplicationNode({
				client : client,
				applicationName : "nodejump",
				onSuccess : function(node, secret) {
					onSuccess(node, secret);

				},
				onFailure : function(ex) {

				}
			});

		};

		return {
			load : nj.load,
			initComponents : nj.initComponents,
			initForAnonymous : nj.initForAnonymous,
			initForUser : nj.initForUser,
			readHash : nj.readHash,
			startAutoCommit : nj.startAutoCommit,
			stopAutoCommit : nj.stopAutoCommit,
			startAutoRefresh : nj.startAutoRefresh,
			stopAutoRefresh : nj.stopAutoRefresh
		};
	};

})(jQuery, AJ);

// <!-- one.end -->
