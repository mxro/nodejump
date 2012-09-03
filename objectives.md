
<!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/edit/docs/5/6/doc -->
# nodejump Objectives

This document outlines the directions for the nodejump application.

## I Want

- 1/fix/nodejump: Show error message, when no authorization for node
 - suggest that user logs in and reloads page

- 3/fix/edit+nodejump: fix various issues
 - somtimes the last few characters entered are removed by the background update process
  - same behaviour in nodejump!!
 - fix that for unknown nodes, the secret is stored _every time the page is loaded_.
  - also make this feature available for nodejump
 - fix that sometimes hash seems not  be updated correctly (when going from view to edit?)
 - dupl 1/fix/nodejump: Investigate why editor is 'eating' nodes sometimes
  - it seems to occur when synchronization is slow (or maybe multiple syncs started at the same time?) 

- 3/enh/nodejump: explore how performance can be increased even more

- 3/comm/nodejump: prepare version 0.0.1

- 2/enh/nodejump: Make a 'fixed toolbar', which always stays on top of the page
 - including the <button>Insert Link</button> and <button>Share</button>
 - maybe also add forward and back button, especially for full screen editing.

- 1/fix/nodejump: reduce impact of background synchronization on performance.
 - the synchronization sometimes seems to hang a little bit. Even if this is not problematic, since its happening in the background, it can make the app a bit sluggish, since a change of nodes, only occurs when background sync is done.


## Quick Win

- 1/nodejump/add keyboard shortcuts to nodejump

- 1/nodejump/add keyboard shortcut, which will follow a link, if its selected in the markdown editor.
 - for this must make utilitymethod inMarkdownLink(...)



## Maybe

- 3/enh/nodejump+aj-edit: implement and editor for Integers
 - also for float?
 - allow for variants for int editor, for instance if there is a marker _percentage_ show a slider instead.
 - make this in a way that it is easy for others to contribute/register 'plug-ins' which render other kinds of nodes.
 - how would this work in Java?

- 2/enh/nodejump+onedb: add to API .makeShort, which will return a short URL for any URL passed
 - what about .makePretty, which will return a search engine friendly url (e.g. http://appjangle/d/markdown_reference?!?!
 - use this for nodejump?!?, when a document title is given?!?
 - maybe this only in 0.0.2?!?

- 3/enh/nodejump: allow to link to other resources
 - external link
 - other page
 
- 3/enh/nodejump: allow to embed pictures
 - integrate with 3rd party picture upload service?


- 1/enh/nodejump: allow to insert other kinds of links, eg generic hyperlink

- 3/enh/nodejump: enable nodejump to be started with a template as a parameter
 - prepare to build common module for this, if possible
 - 29/8/2012 postponed

- 2/enh/nodejump: explore how a toolbar for the markdown editing would look like 
 - maybe replace editor component with specific markdown editor?


- 1/enh/nodejump: check if there is a way for nodejump to align the first line of editor and view (or at least assure that the currently selected link in the editor is shown 

- 1/comm/nodjump: check how nodejump could be published on the Chrome Web Store

- enh: enable 'templates', which allow to build documents based on one or a cluster of connected documents
 - these can include applications (linked with onexite)
 - these can include forms (see below)
 - for instance for task management, managing implementation objectives, managing your personal data

- enh: when text is selected before <button>Insert Link</button> is clicked, this text will automatically be cut & paste into the new document.

- enh: 'hide' links in the editor (upon a click they can be opened and edited?)

- enh: add logic to define forms with markdown, also allow to define a submit button, which will by default append the data from the form to the current node (but also other node can be specified).
 - something like name = ___, [Submit]

- enh: add 'new application' button to nodejump - this will append and link an application to the currently open node
 - especially useful in combination with the forms (see above).

## DONE

### 0.0.1

- admin: set up github project and dev environment.
- enh: implement markdown node editor with markdown preview
- enh: improve speed, in which Markdown preview is updated!
 - event listener for editor
 - editor seperate methods for commit to local network, commit to remote partner and load updates from remote partner
 - DONE, 26/8/2012
- 3/enh/nodejump: implement startup for logged in and anonymous users
 - will there always be one root document (or can logged in user create multiple root documents?)
 - done 28/8/2012 in 4.5
- 1/enh/nodejump: allow to parameterize with uri of node to be loaded
 - also update hash according to the loaded node
 - done 28/8/2012 in 1
- 1/enh/nodejump: implement insert link button very basic feature (automatically inserts link to new child)
 - done 28/8/2012 in 2
- 2/enh/nodejump: manage clicks on links in view to load new node in nodejump
 - done 28/8/2012 in 1
- 2/enh/nodejump: various small enhancements
 - improve speed in which edit component is loaded
  - fixed
 - fix ui that window only closes after changes have been committed
  - attempted to fix with jquery onunload - but might not work in all circumstances
 - fix ui that when link inserted again title from previous link is still in title field
  - fixed
 - fix that hash value does not appear to be updated correctly
  - fixed
 - fix ui, add where it shows which document is open (maybe as short url?)
  - fixed
 - fix ui, that it shows when a document is saved
  - fixed
 - 29/8/2012 DONE in 2
- 1/enh/nodejump: make the loading process more visually appealing
 - eg both view and editor show loading bar before actual content is shown
 - DONE 29/8/2012 -> added status labels
- 3+/enh/nodejump: build a share-ui common, which can also be used by edit and view
 - as modal dialog -- problematic for mobile devices ... built flexible enough that it will also work on mobile devices.
 - 29/8/2012 done in 5
- 1/enh/nodejump: make insert link dialog mobile friendly.
 - use bootstrap-utils
 - finished implementation thus far but cannot test due to bug in textsync
 - DONE 30/8/2012 in 2
- 1/enh/nodejump/edit: change api of share module to allow edit links to point to nodejump docs.
 - also done for view links
 - DONE 30/8/2012 in 1
- 3+/enh/nodejump: make new ui module (which can be shown where preview is) which shows help (and also markdown reference)
 - DONE 31/8/2012 in 12
- 1/enh/nodejump: add further variations for the link button
 - if text is selected, use selected text as document title
  - also add note about this in popup dialog
  - popup dialog, then, does not need to be displayed.
  - DONE in 1, 31/8/2012
- 1/fix/nodejump: the auto commit and refresh background tasks are sometimes started 'too early' leading to an exception which prevents auto updates.
 - FIXED, 1/9/2012<!-- one.end -->
