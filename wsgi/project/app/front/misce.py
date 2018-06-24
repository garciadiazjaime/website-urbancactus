from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json

@csrf_exempt
def send_message(request):
	'''
	function to send the message
 	'''
	data = ['name', 'email', 'message']
	response = { 'status' : False}

	if request.method == 'POST' and request.is_ajax():
		try:
			msg = ''
			for row in data:
				value = request.POST.get(row, '')
				msg += row + ": " + value + '\n'
				if row == 'email':
					email = value
			send_mail('Contact form: Urban Cactus ', msg, email, ['hola@urbancactus.net'], fail_silently=False)
			response = { 'status' : True }
		except Exception, e:
			pass

	return HttpResponse(json.dumps(response), content_type='application/json')
