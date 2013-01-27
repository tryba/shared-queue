from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.template import RequestContext
from django.contrib.auth.models import User
from accounts.models import UserProfile
from queue_server.decorators import AllowJSONPCallback

import logging
logger = logging.getLogger(__name__)

def register(request):
  if('email' not in request.POST):
    return render_to_response('accounts/register.html', context_instance=RequestContext(request))
  else:
    try:
      user = User.objects.get(username=request.POST['email'])
      return render_to_response('accounts/register.html')
    except User.DoesNotExist:
      user = User.objects.create_user(request.POST['email'], request.POST['email'], request.POST['password'])
      user.save()
      profile = UserProfile.objects.create(user=user)
      profile.google_music_password = request.POST['google_password']
      profile.save()
      return redirect('/accounts/' + str(user.pk) + '/')

def view(request, user_id):
  user = User.objects.get(pk=user_id)
  logger.info("user = " + user.username)
  return render_to_response('accounts/view.html', {'user': user})