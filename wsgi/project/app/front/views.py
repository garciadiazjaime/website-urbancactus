# -*- coding: utf-8 -*-
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.shortcuts import HttpResponse, render_to_response
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect
from django.template import RequestContext
#from models import ContactForm

from datetime import date
# from twitter import *

def home(request, lang=0):
	page = "home"
	title = "Welcome to Urban Cactus | Healthy mexican food"
	description = "Urban Cactus is committed to promote healthy eating habits by incorporating high quality ingredients and low-fat recipes without sacrificing affordability and the distinctive flavors of our rich Mexican culinary heritage."
	year = date.today().year
	return render_to_response('section/home.html', locals(), context_instance=RequestContext(request))

def menu(request, lang=0, slug=''):
	page = "menu"
	title = "Our Menu | Urban Cactus"
	description = "Urban Cactus Tacos are made in our premises out of Organic Corn Masa and freshly cooked on a comal (griddle). They are naturally gluten free, Non-GMO, low in fat and sodium, rich in calcium, fiber and magnesium."
	year = date.today().year
	return render_to_response('section/menu.html', locals(), context_instance=RequestContext(request))

def about_us(request, lang=0, slug=''):
	page = "about_us"
	title = "About Us | Urban Cactus"
	description = "A few years ago, we met by chance in Vancouver British Columbia. One of the many reasons that brought us together is the desire to eat nutritious, organic and clean food (to be healthy for our future kids) without sacrificing any of the traditional flavors we grew up with in Mexico."
	year = date.today().year
	return render_to_response('section/about_us.html', locals(), context_instance=RequestContext(request))

def location(request, lang=0, slug=''):
	page = "location"
	title = "Our Location | Urban Cactus"
	description = "Do you have any questions? Give us a call at 92868 (714) 978-3000 or write us to hola@urbancactus.net. You can also find us at 3070 W. Chapman Ave. Suite C Orange CA, "
	year = date.today().year
	return render_to_response('section/location.html', locals(), context_instance=RequestContext(request))
