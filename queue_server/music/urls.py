from django.conf.urls import patterns, include, url

urlpatterns = patterns('music.views',

    url(r'^sync/$', 'sync'),
    url(r'^(?P<song_id>[-\da-f]+)/$', 'view_one'),
    url(r'^(?P<song_id>[-\da-f]+)/stream_url/$', 'stream_url'),
    url(r'^$', 'view_all')
)