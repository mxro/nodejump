
<!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/edit/docs/5/6/doc -->
# nodejump Objectives

This document outlines the directions for the nodejump application.

## Must

- fix: the auto commit and refresh background tasks are sometimes started 'too early' leading to an exception which prevents auto updates.

For 0.0.2:

- 3/enh/nodejump: allow to link to other resources
 - external link
 - other page
 
- 3/enh/nodejump: allow to embed pictures
 - integrate with 3rd party picture upload service?


## Maybe

- 1/enh/nodejump: check if there is a way for nodejump to align the first line of editor and view (or at least assure that the currently selected link in the editor is shown 

- enh: enable 'templates', which allow to build documents based on one or a cluster of connected documents
 - these can include applications (linked with onexite)
 - these can include forms (see below)
 - for instance for task management, managing implementation objectives, managing your personal data

- enh: when text is selected before <button>Insert Link</button> is clicked, this text will automatically be cut & paste into the new document.

- enh: 'hide' links in the editor (upon a click they can be opened and edited?)

- enh: add logic to define forms with markdown, also allow to define a submit button, which will by default append the data from the form to the current node (but also other node can be specified). 
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
 - 29/8/2012 done in 5<!-- one.end -->
