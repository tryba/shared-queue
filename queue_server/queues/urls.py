from django.conf.urls import patterns, include, url

urlpatterns = patterns('queues.views',
    url(r'^create/$', 'create'),
    url(r'^$', 'view_all'),
    url(r'^(?P<queue_id>\d+)/$', 'view_one'),
    url(r'^(?P<queue_id>\d+)/pop/$', 'pop_song'),
    url(r'^(?P<queue_id>\d+)/push/songs/(?P<song_id>[-\da-f]+)/$', 'push_song'),
    url(r'^(?P<queue_id>\d+)/remove/memberships/(?P<membership_id>[-\da-f]+)/$', 'remove_membership')
)