
<!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/edit/docs/5/6/doc -->
# nodejump Objectives

This document outlines the directions for the nodejump application.

## Must

- fix: the auto commit and refresh background tasks are sometimes started 'too early' leading to an exception which prevents auto updates.


## Maybe

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
 - done 28/8/2012 in 2<!-- one.end -->
