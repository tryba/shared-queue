Shared Queue
-------------
The Shared Queue is inspired by the Nexus Q, and is intended to be hosted on a Raspberry Pi (and then affectionately called the Raspberry Q). It allows multiple clients to collaboratively create a queue of music from a single user's Google Music library. An instance of the client can be executed in Player mode to stream the songs which have been selected for the queue. Never again will you have to stop your conversation to go queue up another song for the party.

Queue Server
============
The queue server is written in python to take advantage of the
[Unofficial Google Music API](https://github.com/simon-weber/Unofficial-Google-Music-API) to syncronize your music library, generate streaming urls, and
manage multiple song queues.

*WARNING: This server currently stores Google credentials in plain text.* Since the server is meant to be used on an intranet,
inside a firewall, with access given only to trusted users, securing these passwords is not a first priority.
Furthermore, using the Unofficial Google Music API requires a reconstituted password,
so no matter what obfuscation is done to the credentials, the server will have all of the information necessary to decrypt these credentials. Really,
the only secure way to deal with this scenario is to require users to enter credentials every time they need to interact with the Google API, but this
makes the multi-user use case impossible without directly handing your password out to your friends.

*WARNING: This server currently allows anonymous access to music librarys and streaming urls.* A client does not need to be logged in
to access music library information if they know your user id. This means that anyone with access to the server can see your library,
edit your queues, and stream your music. They cannot edit your music library in any way. To solve this problem, the existing urls will
require the user to be logged in to access them, and temporary urls will be created for anonymous access. The client will need to be
updated to reflect this change.

### Endpoints

#### GET  /accounts/register/

#### POST /accounts/register/

#### GET  /accounts/`<user id>`/music/

#### GET  /accounts/`<user id>`/music/sync/

#### GET  /accounts/`<user id>`/music/<song id>/

#### GET  /accounts/`<user id>`/music/<song id>/stream_url/

#### GET  /accounts/`<user id>`/queues/

#### GET  /accounts/`<user id>`/queues/create/

#### GET  /accounts/`<user id>`/queues/`<queue id>`/

#### GET  /accounts/`<user id>`/queues/`<queue id>`/pop/

#### GET  /accounts/`<user id>`/queues/`<queue id>`/push/songs/`<song id>`/

#### GET  /accounts/`<user id>`/queues/`<queue id>`/remove/memberships/`<membership id>`/


Queue Client
===========
The queue client is configured as either a Player or a Curator, and is attached to a single queue from a single user at a time. Further work is needed to
support managing the multiple queues and multiple users provided by the API. It is intended for there to be a single Player and one or more Curator instances
running on the same queue. However, it is possible to run multiple Players from the same queue. They
will compete for the songs in the list, rather than each independently playing through the song list.

To Do
=======
* Styling
* Client support for switching between libraries
* Client support for switching between queues
* Temporary urls for anonymous access
