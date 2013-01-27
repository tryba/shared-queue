from django.conf.urls import patterns, include, url

urlpatterns = patterns('accounts.views',
    url(r'^(?P<user_id>\d+)/queues/', include('queues.urls')),
    url(r'^(?P<user_id>\d+)/music/', include('music.urls')),

    url(r'^register/$', 'register'),
    url(r'^(?P<user_id>\d+)/$', 'view')
)
