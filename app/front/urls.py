from django.conf.urls import patterns, include, url

#0:Spanish
#1:English

urlpatterns = patterns('',
    url(r'^$', 'app.front.views.home', {'lang':0}, name='home'),
    url(r'^index$', 'app.front.views.home', {'lang': 0}, name='home'),
    url(r'^home$', 'app.front.views.home', {'lang': 0}, name='home'),
    url(r'^menu$', 'app.front.views.menu', {'lang': 0}, name='menu'),
		url(r'^menu/(?P<slug>[^/]+)$', 'app.front.views.menu', {'lang': 0}, name='menu'),
    url(r'^about-us$', 'app.front.views.about_us', {'lang': 0}, name='about-us'),
		url(r'^about-us/(?P<slug>[^/]+)$', 'app.front.views.about_us', {'lang': 0}, name='menu'),
    url(r'^location$', 'app.front.views.location', {'lang': 0}, name='location'),
    	url(r'^location/(?P<slug>[^/]+)$', 'app.front.views.location', {'lang': 0}, name='location'),
    url(r'^send_message/$', 'app.front.misce.send_message', name='send_message'),
)
